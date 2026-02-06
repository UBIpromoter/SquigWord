# SquigWord Taste Log

## Slinky
- **Confirmed:** 5 steps/segment + effectiveH/8 rings + 1px stroke = visible individual rings forming tube
- **Rejected:** 50 steps (too dense, looks like Normal) · min-distance filtering (sparse loose rings) · normalDiam rings (too small, skeletal)

## Fuzzy
- **Confirmed:** effectiveH/13 scatter radius — good balance of fuzziness + readability
- **Rejected:** height/10 (original, unreadable for letters) · effectiveH/20 (too tight, not fuzzy enough) · effectiveH/16 (slightly too tight)

## Seed Variation
- **Confirmed:** Per-letter transforms from decPairs (Y wobble ±10px, rotation ±4°, scale ±6%)
- **Rejected:** Per-control-point path deformation (destroyed letter shapes completely)

## Scaling
- **Confirmed:** Max height cap via maxHeightScale so 1-2 char text fits in canvas
