# SquigWord Lessons Learned

## From Previous Attempts (Pre-Project)

### Mistake: Hand-authoring letter coordinate arrays
- **Root Cause:** Underestimated complexity of type design
- **Rule:** NEVER hand-author font data. Use professional font extraction.
- **Example:** Spent hours tweaking coordinates for 's' - still looked like backwards 'e'

### Mistake: Using Catmull-Rom on poorly-defined control points
- **Root Cause:** Catmull-Rom assumes smooth input; garbage in = garbage out
- **Rule:** Feed high-quality sampled Bezier curves, not sparse hand-drawn points
- **Example:** Letter 'a' bowl distorted unpredictably with different spline tensions

### Mistake: Defining letters individually instead of extracting connected words
- **Root Cause:** Manual connection logic is error-prone
- **Rule:** Let the font engine handle kerning and connections
- **Example:** `font.getPath('hello')` returns already-connected cursive path

---

## Session Log

### Mistake: Used OpenType.js font paths directly for squiggle rendering
- **Root Cause:** OpenType fonts define letter OUTLINES (boundaries to fill), not single-stroke paths through letter centers
- **Rule:** Squiggle aesthetic requires SINGLE-STROKE paths like pen traces, not outline paths. OpenType outlines create filled blob shapes, not rope tubes.
- **Example:** "Squiggles" with OpenType looked like filled letter shapes, not rainbow ropes
- **Fix:** Use vF's hand-authored single-stroke paths. They may need refinement for letter recognition, but the squiggle aesthetic is correct.

### Update to Pre-Project Lesson
The "NEVER hand-author" rule needs nuance:
- OpenType fonts = OUTLINE paths (for filling) - wrong for squiggles
- Hand-authored single-stroke paths = correct aesthetic, harder to make letters readable
- **Better approach:** Find or create single-stroke/skeleton font data, OR compute centerlines from outlines

### Mistake: Previous Hershey font attempts failed
- **Root Cause:** Raw Hershey paths were fed directly to the renderer without format conversion. Hershey uses:
  - Absolute font units (0-20ish), not normalized 0-1 coordinates
  - SVG path string format ("M x y L x y"), not [[x,y]] arrays
  - Y-axis up (negative = above baseline), not Y-axis down
  - No entry/exit angle metadata for smooth letter connections
- **Rule:** Hershey paths require a normalization pipeline before use:
  1. Parse SVG path string to coordinate array
  2. Normalize coordinates to 0-1 space
  3. Flip Y-axis (Hershey Y-up to vF Y-down)
  4. Calculate entry/exit angles from path tangents
  5. Compute width ratios from original proportions
- **Example:** EMS Allure had paths like "M 495 183 L 457 132..." but vF expected `[[.1,.6],[.18,.45],...]`
- **Fix:** Created `convertHersheyToVF()` pipeline that handles all transformations

### Mistake: Used wrong Hershey font variant
- **Root Cause:** Hershey has multiple font families. "scripts" is NOT cursive - it's a simple sans-serif print font
- **Rule:** Use Hershey "cursive" (Script 1-stroke alt) variant for flowing connected letters
- **Example:** Initial test showed disconnected print letters; switching to cursive variant showed proper flowing script

### Mistake: SVG path parser didn't handle implicit L commands
- **Root Cause:** SVG path format allows implicit commands: `M9,16 L8,14 6,13` means `M9,16 L8,14 L6,13`
- **Rule:** After an L command, subsequent coordinate pairs without a command letter are also L commands
- **Example:** Parser only captured first 2 points of each letter, resulting in tiny fragments
- **Fix:** Track current command state and apply it to bare coordinate pairs

### Success: Direct rendering without normalization
- **Insight:** For debugging, skip the normalization pipeline entirely
- **Rule:** Render Hershey paths directly in their native coordinate system first
- **Example:** `hershey-test.html` uses raw Hershey coordinates with simple scaling - works perfectly
- **Lesson:** Normalize AFTER confirming raw data renders correctly

### Success: Proper Hershey cursive integration
- **Approach:** Port working Hershey cursive data from test file to main app
- **Key insight:** The test file (`hershey-test.html`) proved the data was correct; the issue was the main file using wrong font variant
- **Rule:** When integrating fonts, verify the variant name matches the intended style (e.g., "cursive" vs "scripts")
- **Result:** Cursive font now uses actual flowing cursive letters, not print font

### Mistake: Catmull-Rom spline on sparse control points
- **Root Cause:** Catmull-Rom interpolation overshoots when points have sharp direction changes
- **Rule:** Use linear interpolation for font paths that weren't designed for spline smoothing
- **Example:** Letter paths with sharp corners became wild loops with Catmull-Rom
- **Fix:** Replaced with linear interpolation along path segments

### Mistake: Used metadata exit/entry points for connectors
- **Root Cause:** FONT_SMOOTH's exit/entry metadata doesn't match where paths actually end
- **Rule:** Track ACTUAL last rendered point of each letter for connectors, not metadata
- **Example:** 's' metadata said exit at x=0.8 but stroke visually ended elsewhere
- **Fix:** `lastPoint = transformedPath[transformedPath.length - 1]`

### Insight: Connector shape matters
- **Issue:** Straight-line connectors between letters look terrible
- **Rule:** Cursive connectors should curve DOWN to baseline, then UP to next letter
- **Example:** S→q connector should dip down like handwriting, not cut diagonally across

---

## ROOT CAUSE: Shape Paths vs Stroke Paths (February 2026)

### The Pattern We Kept Repeating
Every font source we tried failed the same way:
- Hand-authored FONT_SMOOTH → letters cross over themselves
- Hershey fonts → same problem after conversion
- OpenType fonts → outlines, not strokes (different failure)
- Fixing connectors, interpolation, endpoints → none of it helped

**We kept fixing downstream symptoms while the upstream data was broken.**

### The Fundamental Problem
Font paths define letter **shapes** (coordinates that form the letter), not letter **strokes** (the order you'd draw them with a pen).

Squiggle rendering draws a continuous rope along the path *in sequence*. When paths jump backwards or skip around, the rope crosses over itself.

### Example: The Letter 'q'

**Current path (FONT_SMOOTH):**
```
Start middle-left → up to top → down right side →
JUMP back up to left → JUMP to middle → down the stem
```
Result: Rope criss-crosses through the letter.

**Correct stroke order:**
```
Enter from baseline → loop UP counter-clockwise (bowl) →
continue DOWN into descender → curl RIGHT → exit toward baseline
```
Result: One clean continuous rope.

### The Intuition: How Cursive Is Taught
Think about 5th-grade cursive workbooks. Every letter follows the same rules:

1. **Start where the last letter ended** (baseline, left side)
2. **Pen never lifts** — one continuous motion
3. **Always moving forward** — left-to-right, even while looping up or down
4. **End ready to connect** (baseline, right side)

Loops carry momentum. You never backtrack. You never jump.

### Validation Criteria for Correct Paths
Before using any letter path, verify:
- [ ] Path starts on the left side, near baseline
- [ ] Path ends on the right side, near baseline
- [ ] X-coordinates generally increase (allowing for loops)
- [ ] No sudden jumps to distant points
- [ ] Traceable with one continuous pen stroke

### What This Means
- **No existing font source works as-is** — they all define shapes, not strokes
- **Connector logic doesn't matter** if letters don't end where strokes would end
- **Interpolation method doesn't matter** if the point sequence is wrong
- **Must author new paths** or algorithmically reorder existing ones into stroke sequence

---

## BREAKTHROUGH: Use Real Plotter Font Data (February 2026)

### The Solution
**Hershey Script Simplex** (1967) — the original vector font designed for pen plotters — has correct stroke order because it was literally designed to be drawn by machines.

### Why Previous Hershey Attempts Failed
We had the right idea (Hershey fonts) but wrong execution:
1. Used wrong variant ("cursive" data that was actually hand-modified and broken)
2. Tried to normalize/convert the data, introducing errors
3. Hand-modified coordinates when things looked wrong (making them worse)

### What Actually Worked
1. Found raw Hershey Script Simplex data from `kamalmostafa/hershey-fonts` repo
2. Used the **original encoded format** directly (e.g., `'a': 'L\\UUTSRRPRNSMTLVLXMZO[Q[SZTXVRUWUZV[W[YZZY\\V'`)
3. Decoded in-place: first 2 chars = margins, rest = coordinate pairs, ` R` = pen-up
4. Rendered with simple scaling — no normalization pipeline

### The Rule
**Don't hand-author font data. Don't "fix" existing font data. Find the right source.**

Pen plotter fonts (Hershey, EMS) were designed for stroke-by-stroke drawing. They have correct stroke order by definition. Trust the original data.

### Source
- Repo: `https://github.com/kamalmostafa/hershey-fonts`
- Files: `scriptc.jhf` (uppercase), `scripts.jhf` (lowercase)
- Format: JHF (James Hurt Format) — documented at emergent.unpythonic.net

### Working Demo
`noodle/stroke-animation/hershey-demo.html` — animates text stroke-by-stroke with correct order.

---

<!-- Format:
### Mistake: [Brief description]
- **Root Cause:** [Why it happened]
- **Rule:** [What to do instead]
- **Example:** [Concrete case]
-->
