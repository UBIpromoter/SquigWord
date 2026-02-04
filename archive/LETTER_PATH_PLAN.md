# SquigWord Letter Path Solution Plan

## The Problem (Why We Keep Failing)

After analyzing **6 versions** (vA, vB, vD, vE, vF, and my OpenType attempt), the failures fall into two categories:

### Failure Type 1: Hand-Authored Paths
- **vA-vF approach**: Manually defined coordinate arrays for each letter
- **Result**: Letters either unrecognizable OR don't flow like squiggles
- **Root cause**: Professional type designers spend months perfecting letterforms. We can't hand-code quality paths.

### Failure Type 2: OpenType Font Extraction
- **My first attempt**: Used OpenType.js to extract Bezier curves from Pacifico font
- **Result**: Rendered filled blob shapes, not rope tubes
- **Root cause**: OpenType fonts define **OUTLINES** (boundaries to fill), not single-stroke paths

## The Core Requirement

Chromie Squiggles work because they trace a **single continuous path**. For letters to work:
- Each letter must be ONE stroke (like how a pen writes)
- No outline/boundary paths - just the centerline
- The stroke WIDTH comes from overlapping circles, not from the path itself

## The Solution: Hershey Vector Fonts

**Hershey fonts are EXACTLY what we need:**

| Feature | Why It Matters |
|---------|----------------|
| Single-stroke design | No double-lines, no outlines - just the path a pen would trace |
| Already coordinate arrays | Ready to feed to our Catmull-Rom renderer |
| Multiple styles | Includes cursive/script variants |
| JavaScript library exists | `hersheytext` npm package with SVG-ready output |
| Proven for plotters | AxiDraw, laser cutters - same "continuous stroke" requirement |

### What Hershey Fonts Look Like
```
Traditional font: Defines the BOUNDARY of a letter (to fill)
    ┌─────────┐
    │  ┌───┐  │  <- Two paths: outer and inner boundary
    │  │   │  │
    └──┴───┴──┘

Hershey font: Defines the STROKE through the letter (to trace)
       │
       │         <- One path: the centerline
       │
```

## Implementation Plan

### Phase 1: Proof of Concept
1. Load HersheyTextJS library
2. Get path data for "hello"
3. Convert Hershey format to our `[[x,y], [x,y], ...]` format
4. Render with existing Squiggle algorithm
5. **Verify**: Does it look like a squiggle rope?

### Phase 2: Font Selection
Hershey has multiple styles. Test these for best "casual script" aesthetic:
- `futural` - Sans-serif (fallback)
- `scripts` - Script/cursive style
- `scriptc` - Complex script
- `cursive` - Dedicated cursive variant

### Phase 3: Letter Connection
- Hershey letters are standalone (not connected)
- Need to add connectors between letters for word continuity
- Use entry/exit points + smooth midpoint bridges

### Phase 4: Full Integration
- Replace hand-authored FONT_SMOOTH with Hershey data
- Keep all 6 render types (Normal, Slinky, etc.)
- Maintain seed-based trait system
- Add animation support

## Technical Details

### HersheyTextJS Data Format
```javascript
const hershey = require('hersheytext');

// Access a glyph
const glyph = hershey.fonts['futural'].chars['A'];

// glyph.d contains SVG path string: "M 0 0 L 10 20 L 20 0"
// We need to parse this into coordinate arrays
```

### Conversion Function
```javascript
function hersheyToPath(svgD) {
    // Parse SVG path commands: M (move), L (line)
    // Hershey uses simple M/L commands, no curves
    const points = [];
    const commands = svgD.match(/[ML][^ML]+/g);

    for (const cmd of commands) {
        const [x, y] = cmd.slice(1).trim().split(/\s+/).map(Number);
        if (cmd[0] === 'M' && points.length > 0) {
            // Pen lift - could add connector or break path
        }
        points.push([x, y]);
    }

    return points;
}
```

### CDN Options
```html
<!-- Option 1: npm package -->
<script src="https://unpkg.com/hersheytext@latest/dist/hersheytext.min.js"></script>

<!-- Option 2: Direct from GitHub -->
<script src="https://cdn.jsdelivr.net/gh/techninja/hersheytextjs/dist/hersheytext.min.js"></script>
```

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Hershey looks too "plottery" | Test multiple font variants; add organic variations via transforms |
| Letters don't connect | Implement connector logic (we already have this from vF) |
| Library loading fails | Fallback to embedded Hershey data (it's small, can inline) |
| Scaling issues | Hershey uses font units; normalize to 0-1 like current system |

## Why This Will Work

1. **Hershey fonts are designed for exactly our use case** - single-stroke rendering
2. **Professional quality** - Created by engineers for precision applications
3. **JavaScript library exists** - No need to parse raw font data
4. **Multiple styles available** - Can find/create the right aesthetic
5. **Small data footprint** - Can inline entire font if needed
6. **Proven track record** - Used in plotters, CNC, laser cutters for decades

## Alternative: If Hershey Doesn't Work

If the Hershey aesthetic is too mechanical, we have two backup options:

### Backup A: Skeleton Extraction
- Use Python `skimage.morphology.skeletonize` on rasterized font
- Convert skeleton back to vector
- More complex but gives centerline of ANY font

### Backup B: Improve Hand-Authored Paths
- Use Hershey as visual reference
- Hand-trace more carefully with fewer points
- Focus on 10-15 most common letters first

## Success Criteria

1. Letters are immediately readable
2. Output looks like Chromie Squiggles (rainbow rope aesthetic)
3. Color flows continuously across entire word
4. All 6 render types work correctly
5. Same seed = same output (deterministic)

---

## Next Steps

1. **Test HersheyTextJS** - Load library, inspect available fonts
2. **Render "Squiggles"** - Use Hershey paths with our renderer
3. **Evaluate aesthetic** - Does it look like squiggles?
4. **Iterate on font choice** - Try different Hershey variants
5. **Add connectors** - Implement letter-to-letter bridges
