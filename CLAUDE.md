# SquigWord Project

> **Global protocol:** `~/.claude/CLAUDE.md` (V5 — Final Synthesis)

---

## Quick Reference

| Trigger | Action |
|---------|--------|
| "Try X" | Build in `noodle/` |
| "Merge it" | Integrate to production |
| "Status" | Show current state |

## Workspace

| Location | Purpose |
|----------|---------|
| `squigword.html` | Production |
| `noodle/` | Experiments |
| `tools/` | Tests, scripts |
| `tasks/status.md` | Current state |

---

## Overview
Render user-typed text as Chromie Squiggle-style cursive using professional font path extraction.

## Key Principle
> "The goal isn't to render letters with squiggles - it's to make squiggles that happen to be readable as letters."

## Architecture
1. **Single-stroke fonts** - Hershey fonts designed for plotters (NOT OpenType outlines)
2. **Normalization pipeline** - Converts raw font data to 0-1 coordinate space
3. **Squiggle Renderer** (from Snowfro) draws rainbow rope along paths

## Font Options
| Font | Source | Character |
|------|--------|-----------|
| Smooth | Hand-authored vF | Organic cursive |
| Angular | Hand-authored vF | Blocky/geometric |
| Script | Hershey conversion | Clean script |

## Critical Rules
- OpenType fonts give OUTLINES (wrong) - we need SINGLE-STROKE paths
- Hershey fonts require normalization pipeline (parse SVG, flip Y, calc entry/exit)
- Maintain color continuity across entire word (colorCounter never resets)
- Match original Squiggle rendering exactly

## Files
- `squigword.html` - Main implementation
- `squigword-base.html` - Reference (vF with hand-authored fonts)
- `PLAN.md` - Implementation plan
- `LESSONS.md` - Learnings and corrections

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
