# SquigWord Cursive Font - Failure Handoff Memo

**Date:** January 29, 2026  
**Status:** FAILED - Multiple approaches attempted, none produced acceptable results

---

## What We Tried

### Attempt 1: Manual Coordinate Arrays
- Defined letters as arrays of [x,y] points
- Used Catmull-Rom spline interpolation
- **Result:** Letters unrecognizable. 's' looked like backwards 'e', descenders were weird loops.

### Attempt 2: D'Nealian Cursive Rewrite
- Researched proper cursive stroke order
- Rewrote all 26 letters following grade-school cursive rules
- **Result:** Still terrible. Spline interpolation distorts the shapes unpredictably.

### Attempt 3: SVG Bezier Paths
- Defined letters using SVG path syntax (M, L, Q, C commands)
- Proper cubic/quadratic Bezier curves
- **Result:** Not working. Either rendering fails or letters still look wrong.

---

## Root Cause Analysis

**The fundamental problem:** We're hand-authoring font data that professional type designers spend months perfecting with specialized tools. No amount of coordinate tweaking will match professional results.

**Secondary issues:**
- Catmull-Rom splines don't behave like pen strokes
- Connecting letters seamlessly requires per-pair kerning/ligature data
- We lack visual feedback during path authoring (blind coordinate entry)

---

## What To Try Next (Ranked by Promise)

### 1. **USE A REAL FONT + OPENTYPE.JS** ⭐⭐⭐⭐⭐
Load an actual cursive .ttf font, extract glyph outlines programmatically.

```javascript
import opentype from 'opentype.js';
const font = await opentype.load('Pacifico.ttf');
const path = font.getPath('hello', 0, 100, 72);
// path.commands gives you actual bezier data
```

**Pros:** Professional letterforms, guaranteed quality  
**Cons:** Requires font file, external library  
**Fonts to try:** Pacifico, Dancing Script, Sacramento, Allura (all free Google Fonts)

---

### 2. **CANVAS FONT RENDERING + PATH EXTRACTION** ⭐⭐⭐⭐
Use browser's native font rendering, then trace the result.

```javascript
ctx.font = '72px "Dancing Script"';
ctx.fillText('hello', 0, 100);
// Then use canvas pixel data or Path2D
```

Or with `measureText` and `TextMetrics.getActualBoundingBox()` for positioning.

**Pros:** Zero dependencies, uses browser's font engine  
**Cons:** Can't easily get path data for squiggle effects

---

### 3. **HERSHEY VECTOR FONTS** ⭐⭐⭐⭐
These are simple single-stroke vector fonts designed for plotters. Already defined as coordinate paths.

- Source: https://emergent.unpythonic.net/software/hershey
- Script variants exist (cursive-like)
- Simple format: just line segments

```javascript
// Hershey format is literally just arrays of points
const letterA = [[0,0], [5,-10], [10,0], null, [2,-5], [8,-5]];
// null = pen up
```

**Pros:** Already path-based, designed for this exact use case  
**Cons:** May look "plottery" not handwritten

---

### 4. **POTRACE SVG CONVERSION** ⭐⭐⭐
1. Render text with a real cursive font to canvas
2. Use Potrace (or similar) to convert bitmap → vector paths
3. Sample those paths for squiggle rendering

**Pros:** Gets real letterforms as paths  
**Cons:** Extra processing step, may lose quality

---

### 5. **HANDWRITING SYNTHESIS MODEL** ⭐⭐⭐
Use a neural network that generates handwriting:
- Graves handwriting synthesis (RNN-based)
- Various JS implementations exist

**Pros:** Most authentic "human" look  
**Cons:** Complex, heavy dependency, overkill?

---

### 6. **ABANDON CURSIVE - USE CONNECTED PRINT** ⭐⭐
Make a "connected print" style instead of cursive:
- Simpler letterforms (basically print letters)
- Just add connecting strokes between them
- Much easier to define manually

**Pros:** Achievable with manual definitions  
**Cons:** Not "cursive", different aesthetic

---

### 7. **HYBRID: FONT SPRITES + SQUIGGLE STROKE** ⭐⭐
1. Pre-render each letter A-Z at high-res with real cursive font
2. Store as path data (one-time extraction)
3. Ship the extracted paths as JSON

This is basically "bake the font" approach.

---

## Recommended Path Forward

**Go with Option 1 (OpenType.js) or Option 3 (Hershey fonts).**

OpenType.js example implementation:

```html
<script src="https://cdn.jsdelivr.net/npm/opentype.js"></script>
<script>
opentype.load('https://fonts.gstatic.com/s/pacifico/v22/FwZY7-Qmy14u9lezJ-6H6Mw.ttf', (err, font) => {
    const path = font.getPath('squiggles', 50, 150, 72);
    // path.commands = [{type:'M',x,y}, {type:'C',x1,y1,x2,y2,x,y}, ...]
    // NOW apply squiggle rendering to these professional paths!
});
</script>
```

---

## Key Insight

**Stop trying to author font data. Extract it from existing fonts.**

The squiggle algorithm is solid. The letter paths are the problem. Use paths created by actual type designers, then apply our rendering on top.

---

## Files

- `/home/claude/black-script.html` - Latest failed attempt
- `/mnt/project/squigword-vF.html` - Last working squiggle version (bad fonts)
- Transcript: `/mnt/transcripts/2026-01-29-14-13-39-cursive-font-development.txt`

---

*"The goal isn't to render letters with squiggles - it's to make squiggles that happen to be readable as letters."*

We had the squiggles right. We just need letters that are actually letters.
