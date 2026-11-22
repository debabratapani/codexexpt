# Childhood Landscape — p5.js

Browser-based JavaScript version of the original Processing Java sketch.

## Run

Open `index.html` from a static web server (or import `sketch.js` into the [p5.js Web Editor](https://editor.p5js.org/)). The page loads p5.js from a CDN, so it needs an internet connection.

For example, from this folder:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000.

Press **S** to save a PNG.

## Customize

Edit constants `W`, `H` and `SEED` in `sketch.js`. Dedicated functions control the mountains, river, road, lane, cottage, birds, trees and pastel-like grain.

The sketch is a deterministic procedural interpretation of the childhood drawing. It uses clipped, layered pencil strokes and paper grain for the pastel finish.
