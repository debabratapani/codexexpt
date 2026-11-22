# Childhood Landscape (Processing)

A nostalgic, procedurally drawn pencil-and-pastel landscape inspired by a childhood drawing: distant mountains, setting sun, birds, river flowing toward the left foreground, red-tiled cottage on the near bank, winding road, a little walking/bicycle lane, and lush vegetation.

## Run

1. Install [Processing 4](https://processing.org/download).
2. Open `ChildhoodLandscape.pde` in Processing (Java mode).
3. Click **Run**.

The drawing uses a 1200 × 800 canvas and requires no third-party libraries.

Press **S** while the sketch is running to save a PNG image in the sketch folder.

## Edit

- Change `SEED` at the top for different foliage and paper grain.
- Move the sun by modifying the coordinates in `drawSun()`.
- Modify the river's Bézier vertices in `drawRiver()`.
- Change the cottage's roof shape and tile colors in `drawHouse()`.
- Adjust the road and connecting lane independently in `drawRoad()` and `drawLane()`.

This is an initial procedural illustration, not an exact reconstruction of the earlier AI-generated image. Processing rendering has not been executed or visually validated in this environment.
