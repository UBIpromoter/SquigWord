# SquigWord Tuning Notes (2026-02-09)

## Session Summary
Interactive playground built at `noodle/parameter-playground/index.html` for comparing Snowfro vs v2.4 vs experimental params. Narrative comparison at `noodle/color-comparison/index.html`.

## Changes Shipped in v2.4 (committed `572d600`)
- Bold: circles effectiveH/7 (was /4), 30% extra letter spacing
- Slinky: ring size matches Normal (effectiveH/13), 10 steps (was 5)
- Pipe: big black outer rings (effectiveH/5), thin colored inner rings (normalDiam), 8 steps, dainty stroke weight, filled dots at path endpoints, no double-draw at segment joins
- Pipe gets same 30% letter spacing as Bold
- Fixed endpoint detection: `(seg===0 && i===0) || (lastSeg && i===steps)`

## Findings from Playground — NOT YET APPLIED

### Normal step count: 80 → ~35
- Insight: match the COLOR RANGE of a reference squiggle, not the raw step count
- Snowfro: 200 steps × ~15 segments = ~3000 total circles along one wave
- Our 5-letter word at 80 steps overshoots the color cycle
- At ~35 steps, a 5-letter word produces a similar start-to-end color sweep as the reference
- Longer words cycle through more colors — acceptable, more letters = more rainbow is natural

### Idea: Dynamic step count tied to word length
- Calculate total path points to match Snowfro's ~3000 total
- `steps = Math.round(TARGET_TOTAL / totalSegments)` where TARGET_TOTAL ≈ 3000
- Would automatically scale: short words get more steps/segment, long words get fewer
- Ensures consistent color range regardless of text length
- STATUS: Idea stage, not validated. Needs testing in playground.

### Pipe still needs work
- Reference pipe has colored dots surrounded by black at segment boundaries (~30 per wave)
- We only fill at path endpoints (~2 per stroke)
- Pipe outer size eH/5 is bigger than Snowfro's H/7
- Both ring types should use same hairline stroke weight (sw), not different weights

### Slinky is close
- Ring size matching Normal is correct direction
- 10 steps feels about right for letter-scale paths

## Key Architectural Insight
The root cause of all visual gaps: Snowfro draws ONE continuous wave with ~3000 evenly-spaced circles. We draw MANY short letter strokes with fewer circles each. Every type-specific gap traces back to this structural difference. The dynamic step count idea directly addresses this.

## Files
- `squigword-v2.4.html` — current checkpoint (committed)
- `squigword-v2.3.html` — also has changes (working file)
- `noodle/parameter-playground/index.html` — interactive tuning tool
- `noodle/color-comparison/index.html` — narrative comparison doc
