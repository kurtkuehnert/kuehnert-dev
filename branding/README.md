# Branding

The KK logo and the files made from it. The logo draws the code brackets `|</>|` as two Ks with a slash between them: `K/K`.

## Logo

`kk.py` generates every SVG in this folder. Run it after changing the geometry or colours:

```sh
python3 branding/kk.py
```

The files it writes:

| File                  | Use                                                          |
| --------------------- | ------------------------------------------------------------ |
| `kk.svg`              | The logo. The slash follows the viewer's light or dark mode. |
| `kk-light.svg`        | The logo for light backgrounds.                              |
| `kk-dark.svg`         | The logo for dark backgrounds.                               |
| `kk-circle-light.svg` | The logo on a white circle, for avatars.                     |
| `kk-circle-dark.svg`  | The logo on a dark circle, for avatars.                      |

The geometry sits on a 512 grid with every coordinate a multiple of 8. The strokes are 48 wide with round ends, and the slash leans at a 1:2 slope. The top of `kk.py` lists the exact coordinates.

Each K is a gradient from top to bottom, blended in OKLab: sky blue on the left, ember orange on the right. The slash is a grey gradient. Soft shadows fall from each chevron onto its stem and from the slash onto the arms that pass under it.

## Images

`png/` holds the raster exports: the logo and the circle versions at 1024 px, the favicon sizes and `favicon.ico`, the touch icon, and `og.png` for link previews. They were rendered in a browser, because ImageMagick does not draw the masks and blur filters correctly.

The site uses copies of `kk.svg`, `favicon.ico`, `apple-touch-icon.png` and `og.png` from `public/`. Copy them over again after regenerating.

## Type and colour

Headings use Nunito at weight 800, body text uses Geist, and small labels use Geist Mono. The page itself stays in neutral greys, so the logo is the only colour.

## Legacy

`legacy/` keeps the 2024 logo: the original Illustrator file with its PDF, EPS, SVG, PNG and JPG exports, and the dark circle version the old site used.
