# SquigWord

Render text as [Chromie Squiggle](https://chromiesquiggles.com/)-style cursive — rainbow ropes that happen to be readable as letters.

Built with single-stroke font paths (Hershey Script + hand-authored cursive) rendered through Snowfro's original circle-based squiggle technique.

## Try It

**[Live Demo →](https://ubipromoter.github.io/SquigWord/)**

Type a word. Pick a seed. Watch it squiggle.

## How It Works

Each letter is a single-stroke path — the kind a pen plotter would draw in one continuous motion. The renderer walks along these paths, stamping overlapping colored circles that shift through the HSB spectrum, producing the signature Chromie Squiggle rainbow rope effect.

Six render types match the original Squiggles: **Normal**, **Bold**, **Slinky**, **Pipe**, **Fuzzy**, and **Ribbed**.

Seeds drive everything — type, color, shape parameters — just like the on-chain Squiggles.

## Files

| File | Purpose |
|------|---------|
| `squigword-engine.js` | Rendering engine — fonts, parsing, drawing pipeline |
| `index.html` | User-facing UI — clean controls, single canvas |
| `squigword-dev.html` | Dev UI — all controls, reference squiggle, shape sliders |

## Credits

Inspired by [Chromie Squiggles](https://chromiesquiggles.com/) by [Snowfro](https://twitter.com/ArtBlocks_io).
Font data derived from [Hershey fonts](https://github.com/kamalmostafa/hershey-fonts) and [EMS Allure](https://www.fontspace.com/ems-allure-font-f26532).

## License

This is an artistic/educational project honoring Chromie Squiggles. Not affiliated with Art Blocks or Snowfro.
