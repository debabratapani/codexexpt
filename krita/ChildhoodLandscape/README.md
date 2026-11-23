# Childhood Landscape in Krita

Open `ChildhoodLandscape.kra` in Krita. This 1200 × 900 painting was built from separate renders of the procedural landscape. The reference PNG was used as a visual guide during the sketch's development.

- **River** contains separate paint layers for water color, tree reflections, pencil ripples, and the bank.
- **Cottage and trees** separates the cottage, framing tree, and smaller trees.
- **Ground** contains the road and meadow marks.
- **Background** contains the meadow, ridge, sunset, and paper color.
- **Finishing touches** contains the grasses and flowers, rocks, fences, birds, and paper grain.

Edit the KRA directly and export a new `preview.png` for each revision you want to compare in Git. You can move or repaint individual layers. When moving the cottage, adjust the end of the footpath on the road layer too.

## Linux conversion without a visible desktop

The KRA was created by opening a layered OpenRaster document in the Linux Krita AppImage and saving it through the command-line export option. The AppImage uses Qt, so this worked through a virtual X display with Xvfb:

```sh
xvfb-run -a krita ChildhoodLandscape.ora --export --export-filename ChildhoodLandscape.kra
```

The checked-in KRA is ready to open directly in Krita.
