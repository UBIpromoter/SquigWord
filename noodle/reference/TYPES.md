# Chromie Squiggle Type Reference

See images in this folder. All sourced from Art Blocks CDN.

## Normal (normal-2855.png)
- Smooth, solid rainbow rope — no individual circles visible
- Thick, clean gradient flow
- Rounded endpoint caps
- **Our Normal: Good match**

## Bold (bold-4697.png)
- HUGE overlapping circles creating psychedelic layered rainbow discs
- Each circle individually visible due to enormous size (H/5)
- HyperRainbow creates concentric rainbow patterns in overlap zones
- **Our Bold: Decent match**

## Slinky (slinky-816.png)
- Thin stroked rings (NOT filled), see-through center
- Background visible through the spring
- Filled dots at wave endpoints only
- Spring/coil/mesh look from overlapping ring outlines
- **Our Slinky: Good after recent fix**

## Pipe (pipe-2695.png)
- BLACK DOMINATES — thick black outer tube
- Colored slinky rings visible inside the black
- Black outer ring (H/7) much larger than colored inner ring (H/13)
- Heavy, industrial, 3D tube effect
- Nearly invisible on dark backgrounds
- **Our Pipe: Needs work**

## Fuzzy (fuzzy-1913.png)
- Soft, gaseous particle cloud — airbrush/spray effect
- No hard edges — pure atmospheric color blending
- Colors bleed into each other
- The wave shape is suggested by density, not drawn with solid circles
- **Our Fuzzy: Good after scatter tuning**

## Ribbed (ribbed-80.png, ribbed-3112.png, ribbed-8107.png)
- **CRITICAL FINDING: Gray body is DOMINANT, colored rings are accents**
- Solid continuous gray body (like a gray Normal squiggle)
- Colored STROKED rings at regular intervals ON TOP of the gray
- Gray color from decPairs[25] — ranges from dark (#80) to light (#3112)
- Looks like a caterpillar or segmented tube
- The gray takes 70-80% of the visual; colored rings are thin accents
- **Our Ribbed: WRONG — we have colored body + gray dots. Need to flip.**

## Architecture Summary
| Type | Body | Accent |
|------|------|--------|
| Normal | Colored filled circles | None |
| Bold | Large colored filled circles | None |
| Slinky | None (transparent) | Colored stroked rings |
| Pipe | Black stroked rings (H/7) | Colored stroked rings (H/13) |
| Fuzzy | None | Scattered colored particles |
| Ribbed | **Gray filled circles** | **Colored stroked rings** |
