# SquigWord Letter Path Fix - PLAN.md

## Goal
Convert Hershey single-stroke font paths into vF-compatible format (normalized 0-1 coordinates with entry/exit metadata).

## Non-Goals
- Not creating new fonts
- Not hand-authoring coordinates
- NOT using OpenType outline fonts (they give outlines, not single-strokes)

## Root Cause of Previous Failures

After analyzing Ok Squig Path.html (EMS Allure) and vF, the failures stem from **format mismatch**:

| Feature | vF (Works) | EMS Allure / Hershey (Failed) |
|---------|------------|-------------------------------|
| Coordinates | Normalized 0-1 | Raw font units (0-1000) |
| Format | `[[x,y], [x,y]]` arrays | SVG path strings "M x y L x y" |
| Entry/Exit | `{x, y, angle}` objects | **Missing entirely** |
| Y-axis | 0=top, 1=bottom | 0=baseline, negative=above |
| Width | Per-letter width ratio | From glyph.width raw units |

**The Key Insight:** Previous Hershey attempts failed because they didn't transform the data into vF's expected format. The paths were fed raw - wrong coordinate system, no entry/exit angles, no width normalization.

**The Fix:** Transform raw Hershey paths through a proper normalization pipeline.

## Acceptance Checks
- [ ] Letters are immediately readable
- [ ] Output looks like rainbow rope squiggles (not filled shapes)
- [ ] Color flows continuously across entire word
- [ ] All 6 render types work (Normal, Bold, Slinky, Pipe, Fuzzy, Ribbed)
- [ ] Same seed = same deterministic output
- [ ] Smooth connections between letters

## Task Map

| Task | Description |
|------|-------------|
| 1. Load Hershey | Fetch HersheyTextJS and identify best script font |
| 2. Parse SVG | Convert "M x y L x y" strings to [[x,y]] arrays |
| 3. Normalize | Transform to 0-1 space with correct Y-axis flip |
| 4. Entry/Exit | Calculate angles from first/last path segments |
| 5. Width | Compute per-letter width ratio |
| 6. Integrate | Replace FONT_SMOOTH with converted Hershey data |
| 7. Test | Verify with "Squiggles" text, all render types |

## Implementation Details

### Step 1: Load Hershey Fonts

```javascript
// Use CDN
const HERSHEY_CDN = 'https://unpkg.com/hersheytext@latest/dist/hersheytext.min.js';

// Available script fonts to test:
// - scripts (simple script)
// - scriptc (complex script)
// - cursive
```

### Step 2: Parse SVG Path to Array

```javascript
function parseSvgPath(d) {
    const points = [];
    const commands = d.match(/[ML][^ML]+/g) || [];
    for (const cmd of commands) {
        const coords = cmd.slice(1).trim().split(/[\s,]+/).map(Number);
        points.push([coords[0], coords[1]]);
    }
    return points;
}
```

### Step 3: Normalize Coordinates

```javascript
function normalizeGlyph(points) {
    // Find bounding box
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    for (const [x, y] of points) {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
    }

    const width = maxX - minX || 1;
    const height = maxY - minY || 1;

    // Normalize: X to 0-1, Y flipped and normalized
    // Hershey uses Y-up (negative above baseline), vF uses Y-down (0=top, 1=bottom)
    return points.map(([x, y]) => [
        (x - minX) / width,
        1 - (y - minY) / height
    ]);
}
```

### Step 4: Calculate Entry/Exit

```javascript
function calculateEntryExit(normalizedPoints) {
    if (normalizedPoints.length < 2) return { entry: null, exit: null };

    const first = normalizedPoints[0];
    const second = normalizedPoints[1];
    const last = normalizedPoints[normalizedPoints.length - 1];
    const secondLast = normalizedPoints[normalizedPoints.length - 2];

    const entryAngle = Math.atan2(second[1] - first[1], second[0] - first[0]) * 180 / Math.PI;
    const exitAngle = Math.atan2(last[1] - secondLast[1], last[0] - secondLast[0]) * 180 / Math.PI;

    return {
        entry: { x: first[0], y: first[1], angle: entryAngle },
        exit: { x: last[0], y: last[1], angle: exitAngle }
    };
}
```

### Step 5: Build vF-Compatible Font Object

```javascript
function convertHersheyToVF(hersheyFont) {
    const result = {};

    for (const char of 'abcdefghijklmnopqrstuvwxyz') {
        const glyph = hersheyFont.chars[char];
        if (!glyph || !glyph.d) continue;

        const rawPoints = parseSvgPath(glyph.d);
        if (rawPoints.length < 2) continue;

        const normalized = normalizeGlyph(rawPoints);
        const { entry, exit } = calculateEntryExit(normalized);

        result[char] = {
            path: normalized,
            entry: entry,
            exit: exit,
            width: 0.8  // Standard width, can refine later
        };
    }

    return result;
}
```

## Testing Strategy

1. **Visual test**: Render "Squiggles" - does it look like rope?
2. **Readability test**: Show to someone cold - can they read it?
3. **Render type test**: Cycle through all 6 types
4. **Animation test**: Smooth color flow?
5. **Font variants test**: Try scripts, scriptc, cursive

## Break Attempt

| Happy Path | Chaos Path | Regression | Vibe Check | Verdict |
|------------|------------|------------|------------|---------|
| "hello" renders | Empty string? | Does Normal type still work? | Feels like squiggles? | TBD |
| All a-z work | Numbers? Symbols? | Animation still smooth? | Letters readable? | TBD |
| Color flows | Very long words? | Seed determinism? | Not too "plottery"? | TBD |

## Fallback Plan

If Hershey scripts variant looks too mechanical:
1. Try Hershey `cursive` or `scriptc` variants first
2. Add organic variation: slight random offsets to control points
3. Use Hershey as skeleton, add intermediate points for smoother Catmull-Rom curves
4. Keep vF hand-authored paths as fallback "Smooth" option

---

**Status:** READY TO IMPLEMENT

Previous failures were not due to Hershey being wrong - they were due to missing the normalization pipeline. This plan addresses that directly.
