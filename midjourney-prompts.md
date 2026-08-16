# Midjourney prompts — icon set for brianmeise.com

Site palette (put the hexes in the prompt — MJ approximates but lands close):
ground `#45091E` wine · ivory `#F7EEE4` · orange `#F4602C` · gold `#F3B13C` · rose `#EF8BA2`

## Main prompt — one sheet, all subjects

```
hand-drawn doodle icon sheet on a deep burgundy wine background #45091E, evenly
spaced grid: a music note, a small house with a chimney, an adhesive bandage, an
eight-point starburst, two small children, a rugby ball, a hockey stick and puck,
a film clapperboard, a green onion scallion, a checked checkbox — chunky naive
shapes with imperfect hand-cut edges, flat gouache fills in warm gold #F3B13C,
dusty rose #EF8BA2, hot orange #F4602C and warm ivory #F7EEE4, slightly tilted,
childlike but confident, in the spirit of Kika MacFarlane and mid-century
picture-book illustration, flat color, no gradients, no outlines, no text
--ar 4:3 --v 7 --style raw --no text, letters, words, gradients, 3d, shadows, photo
```

## Per-style variants (swap the style clause)

- **Ink line:** `single-color line drawings in warm ivory #F7EEE4, one wobbly
  paint-marker stroke, no fills, sketchbook energy`
- **Riso misprint:** `two-layer risograph print, color layer misregistered 2mm
  off a warm ivory line layer, zine print texture`
- **Sticker:** `die-cut vinyl sticker sheet, thick warm ivory border around each
  shape, soft drop shadow on the wine background`

## Workflow notes

- Run the sheet prompt, pick the best generation, then reroll the weak icons
  individually with `--sref <URL of the winning image>` so new ones match.
- `--style raw` matters: without it MJ prettifies toward render-y illustration.
- Output is raster. To use on the site: upscale, cut each icon out (Figma or
  remove.bg), export transparent PNGs ~96px, and swap them in for the inline
  SVGs. Or treat MJ output as reference and I redraw the winners as SVG —
  keeps them crisp at any size and inside the exact palette.
- MJ will not hit the hex values exactly. If close-but-off bothers you, the
  redraw-as-SVG route is the fix.
```
