# Handoff: Render Type Fixes — Feb 5, 2026

## What Happened
Resumed SquigWord after dinner checkpoint. Fixed all four render types that needed work (Slinky, Pipe, Fuzzy, Ribbed). Normal and Bold were already good and remained unchanged.

## The Core Problems & Fixes

### Slinky — "rings were invisible"
**Problem:** Too few steps (6), too thin stroke (0.5px), same ring size as Normal (H/13). Rings either piled up in curves or were too sparse in straights.
**Fix:** Larger rings (H/9), thicker stroke (2px), and a **minimum-distance algorithm** that only draws a ring when it's far enough from the previous one. This gives uniform ring spacing regardless of path density.
**Key code:** `slinkyMinDist = circleSize * 0.35` — skip ring if distance from last < this threshold.

### Pipe — "dark muddy worm"
**Problem:** Drawing black fill circles FIRST, then colored circles on top. At high density, black accumulated and overwhelmed the color.
**Fix:** Flipped to colored fill first + thin dark stroke outline (0.3 alpha, 1px). Color dominates, outlines add depth.

### Fuzzy — "pixelated, not cloudy"
**Problem:** Uniform random distribution, low particle count (3), fixed low alpha (0.15).
**Fix:** Gaussian-ish distribution (sum of two randoms for bell curve), 5 particles/step, varied alpha (0.08-0.20), slightly tighter spread.

### Ribbed — "identical to Normal"
**Problem:** Was skipping every 3rd circle — at 80 steps/segment with dense overlap, this was completely invisible.
**Fix:** **Two-pass rendering.** Pass 1 draws all colored circles normally AND collects hole positions. Pass 2 draws gray holes ON TOP of everything so they're actually visible. This is the only way to make holes show through dense overlapping circles.

## What's NOT Done
- Philip hasn't reviewed any of these yet — no taste feedback
- Endpoint caps (spec calls for filled circles at path terminations)
- Complex capital letters may need font stroke cleanup
- Animation not re-tested with new render types

## Key Lesson
Dense overlapping circles at 80 steps/segment mean single-pass effects get buried. Anything that needs to be visible ON TOP of the rope (ribbed holes, pipe outlines) needs either a second pass or reversed draw order. The path density from Hershey fonts (many control points per letter) is much higher than original Chromie Squiggles (simple wave), so step counts from the original spec don't map 1:1.

## File
`noodle/stroke-animation/squigword-integrated.html` — single file, all changes in one place.
