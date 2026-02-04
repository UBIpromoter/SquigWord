# SquigWord Status

**Last Updated:** 2026-02-04 (dinner checkpoint)

## Current State
Working file: `noodle/stroke-animation/squigword-integrated.html`

## Render Types Progress

| Type | Status | Notes |
|------|--------|-------|
| Normal | Good | Working well |
| Bold | Good | Added extra letter spacing (+20px) |
| Slinky | Progress | Airy rings, dots filled, needs refinement |
| Pipe | Needs work | Thinner strokes, dots filled, still not right |
| Fuzzy | Progress | Pixelated particles, not quite Snowfro's cloud look |
| Ribbed | Progress | Skip-based gaps showing texture, closer but needs tuning |

## Recent Fixes
- Fixed truncation bug (steps+1 calculation)
- Text centered in canvas
- isDot flag for special dot rendering
- Bold/Pipe get extra letter spacing
- Dots render filled (not rings) for Slinky/Pipe

## Next Steps
- Refine Slinky to look more like real Chromie Squiggles
- Fix Pipe rendering
- Make Fuzzy more cloud-like
- Fine-tune Ribbed interval/appearance
- Complex capitals (R) have overlapping strokes - may need font cleanup
