# SquigWord Status

**Last Updated:** 2026-02-05

## Current State
Working file: `noodle/stroke-animation/squigword-integrated.html`

## Render Types Progress

| Type | Status | Notes |
|------|--------|-------|
| Normal | Done | Smooth gradient rope, unchanged |
| Bold | Done | Big overlapping circles, unchanged |
| Slinky | Improved | Overlapping ring mesh with min-distance spacing. Looks good on dark. |
| Pipe | Improved | Color-first + thin dark stroke outline. Philip hasn't reviewed yet. |
| Fuzzy | Improved | Gaussian-ish particle spread, soft cloud/watercolor effect |
| Ribbed | Improved | Two-pass: colored circles first, gray holes punched on top |

## What Changed This Session (Feb 5)

### Slinky
- Ring size: H/13 → H/9 (larger, per spec)
- Stroke weight: 0.5 → 2px
- Steps: 6 → 8 per segment
- Added **minimum-distance spacing** (`circleSize * 0.35`) — prevents rings from piling up in tight curves while staying evenly spaced in straights
- No taper — constant ring size for uniform spring look

### Pipe
- **Flipped the draw order**: was black fill first (dominated), now colored fill + thin dark stroke on top
- Black alpha: 0.7 → 0.3
- Circle size: H/7 → H/10
- Steps: 10 → 30

### Fuzzy
- Particles per step: 3 → 5
- Distribution: uniform random → gaussian-ish (sum of two randoms)
- Spread: circleSize * 2 → circleSize * 1.5 (tighter)
- Alpha: fixed 0.15 → varied 0.08-0.20
- Particle size: 1-5 → 2-7

### Ribbed
- **Two-pass rendering** (the key fix):
  - Pass 1: Draw colored circles exactly like Normal
  - Pass 2: Draw gray holes ON TOP at intervals (collected during pass 1)
- Previously: skipped every 3rd circle (invisible difference from Normal)
- Now: visible gray dots breaking up the rainbow rope

## Philip Has NOT Reviewed
- All four types were improved but Philip hasn't given taste feedback yet
- Pipe especially needs his eyes — the dark outlines give depth but may need tuning
- Slinky min-distance threshold may need adjustment
- Ribbed gray value varies by seed — some seeds give nearly-black holes that create a neon-outline effect on dark backgrounds (could be a feature or a bug depending on taste)

## Still TODO
- Philip's taste review of all render types
- Complex capitals (R) have overlapping strokes — may need font cleanup
- Endpoint caps not implemented (spec calls for filled circles at path start/end)
- Animation needs testing with new render types
- Different seed testing across all types
