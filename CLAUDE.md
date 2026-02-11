# SquigWord

> Inherits from `~/.claude/CLAUDE.md`

---

## What This Is

Render user-typed text as Chromie Squiggle-style cursive using single-stroke font paths.

> "The goal isn't to render letters with squiggles — it's to make squiggles that happen to be readable as letters."

## Architecture

1. **Single-stroke fonts** — Hershey fonts for plotters (NOT OpenType outlines)
2. **Normalization pipeline** — Raw font data → 0-1 coordinate space
3. **Squiggle Renderer** (from Snowfro) — rainbow rope along paths

## Critical Rules

- OpenType fonts give OUTLINES (wrong) — we need SINGLE-STROKE paths
- Hershey fonts require normalization: parse SVG, flip Y, calc entry/exit
- Maintain color continuity across entire word (colorCounter never resets)
- Match original Squiggle rendering exactly

## Font Options

| Font | Source | Character |
|------|--------|-----------|
| Smooth | Hand-authored vF | Organic cursive |
| Angular | Hand-authored vF | Blocky/geometric |
| Script | Hershey conversion | Clean script |

## Render Types

| Type | Steps | Style |
|------|-------|-------|
| Normal | 70-120 | Dense filled circles |
| Bold | 70-120 | Larger filled circles |
| Slinky | 12-30 | Stroked rings (NOT filled) |
| Pipe | 12-30 | Black outline + colored ring |
| Fuzzy | 250-400 | Scattered particles |
| Ribbed | 70-120 | Filled + gray hole strokes |

## Color System

- HSB mode (H: 0-255, S: 255, B: 255)
- Global colorCounter across entire word
- Spread controls cycle speed
- Reverse flips gradient direction

## Key Files

| File | Purpose |
|------|---------|
| `squigword-engine.js` | Shared rendering engine (fonts, parsing, rendering pipeline) |
| `squigword.html` | User UI — clean, minimal controls, single canvas |
| `squigword-dev.html` | Dev UI — all controls, reference squiggle, shape sliders |
| `squigword-base.html` | Reference (vF with hand-authored fonts) |
| `LESSONS.md` | What we've learned |
