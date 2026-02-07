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

## Ribbed
- **Confirmed:** Rainbow body (H/13) + gray OVERLAY (H/12) at rib intervals (Snowfro architecture). Scaled steps for high div: `steps = 200 × max(1, div/5)` keeps crescents thin at all rib intervals. Word renderer: `80 × max(1, div/5)`.
- **Rejected:** Gray body + colored stroked rings (architecture backwards) · All two-pass approaches (sticker effect — gray tube + colored accents) · Scaled gray overlay size (didn't fix directional crescent erosion) · Cap div at 10 (loses Snowfro variety) · Mild step scaling div/8 (not aggressive enough)

## Scaling
- **Confirmed:** Max height cap via maxHeightScale so 1-2 char text fits in canvas
