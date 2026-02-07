# SquigWord Status

**Last Updated:** 2026-02-06 (evening)

## Current State

Three working files:
- `noodle/stroke-animation/squiggle-compare.html` — **comparison tool** (reference squiggle + SquigWord side-by-side)
- `noodle/stroke-animation/squigword-integrated.html` — **standalone app** (full UI, animation, variation) — older render logic
- `noodle/stroke-animation/ribbed-test.html` — **ribbed A/B test** (4 approaches side-by-side)

The **compare file** has the most faithful Snowfro renderer. All ribbed fixes applied here.

## What Changed Today (Feb 6)

### Ribbed Type — Major Fix
- **Root cause found:** High div (rib interval >10) causes crescent erosion — progressive draw order eats through gray overlay
- **Fix: Step scaling with div** — `steps = 200 × max(1, div/5)` for reference, `80 × max(1, div/5)` for words
- Philip tested 3 approaches via `ribbed-test.html`: cap div, aggressive steps (div/5), mild steps (div/8)
- **Winner: Approach C** (aggressive `div/5`) — Philip confirmed "C is best, D next"
- Ribbed now looks correct across all div values (3-20)

### Rejected Approaches (Ribbed)
- Two-pass rendering (gray tube + colored accents) — all variants produced "sticker effect"
- Scaled gray overlay size — didn't fix directional crescent erosion
- Cap div at 10 — loses Snowfro variety
- Higher resolution canvases — crescents scale proportionally

### P Descender Fix
- Hershey 'p' descender shortened from (-11, 21) to (-8, 17) — was ~20% too long and swung too far left

### Earlier Today (from previous session)
- Built `squiggle-compare.html` with Snowfro's actual Chromie Squiggles code
- Ported exact source from `chromie-squiggles.com/source-code`
- All 6 render types working: Normal, Bold, Slinky, Pipe, Fuzzy, Ribbed
- effectiveH ratio system, endpoint fill fix, auto-fit text

## Render Type Status (compare file)

| Type | Status | Notes |
|------|--------|-------|
| Normal | Good | Matches reference — thick gradient rope |
| Bold | Good | Big overlapping blobs |
| Slinky | Good | Clean rings forming readable text |
| Pipe | Good (light bg) | Auto-switches to white bg |
| Fuzzy | Good | Scattered particle cloud, readable |
| Ribbed | Good | Step scaling fixes high-div. Philip approved. |

## TODO

- [ ] Port Snowfro-faithful renderer from compare file → integrated file
- [ ] Word ribbed rendering at small scales (moiré/blending when text is long)
- [ ] Endpoint caps (filled circles at word start/end)
- [ ] Complex capitals cleanup
- [ ] Animation testing with new render types
- [ ] Multi-seed testing across all types
