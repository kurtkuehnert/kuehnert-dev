"""The KK logo: |</>| drawn as K/K, on a 512 grid.

Geometry (all multiples of 8, centre at 256 256):
- strokes 48 wide with round caps; stems 144 long; arms at 45 degrees;
- left K: stem x=144 from y=144 to 288, chevron 240,144 -> 168,216 -> 232,280
  (the lower arm ends under the slash);
- right K: the left K turned 180 degrees around the centre;
- slash 44 wide at a 1:2 slope (26.6 degrees) from 312,144 to 200,368;
- the mark fills a 272 square (120..392), drawn with an 8 margin (112..400);
  a 448 circle around it gives about 23% padding.

Colour: each K is a top-to-bottom gradient interpolated in OKLab (sky on the
left, ember on the right), stems a touch darker than the chevrons. The slash is
a neutral gradient in the text colour. Soft shadows: chevron onto stem, and
slash onto the arms.

Usage: python3 branding/kk.py [out-dir]  (defaults to the folder of this script)
"""

import math
import pathlib
import sys

# ------------------------------------------------------------------ colour


def lin_to_srgb(c):
    return 12.92 * c if c <= 0.0031308 else 1.055 * c ** (1 / 2.4) - 0.055


def oklab_to_lin(L, a, b):
    l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
    m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
    s = (L - 0.0894841775 * a - 1.2914855480 * b) ** 3
    return (
        4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
        -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
        -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s,
    )


def oklch(L, C, h):
    """OKLCH to OKLab, reducing chroma until the colour fits in sRGB."""
    while True:
        a, b = C * math.cos(math.radians(h)), C * math.sin(math.radians(h))
        if all(-1e-4 <= x <= 1 + 1e-4 for x in oklab_to_lin(L, a, b)) or C <= 0:
            return (L, a, b)
        C -= 0.002


def to_hex(lab):
    rgb = (min(1, max(0, lin_to_srgb(min(1, max(0, x))))) for x in oklab_to_lin(*lab))
    return "#" + "".join(f"{round(x * 255):02x}" for x in rgb)


def ramp(top, bottom, dL=0.0, n=9):
    """Hex stops from top to bottom, interpolated linearly in OKLab."""
    top, bottom = (top[0] + dL, *top[1:]), (bottom[0] + dL, *bottom[1:])
    return [to_hex(tuple(t + (b - t) * i / (n - 1) for t, b in zip(top, bottom))) for i in range(n)]


SKY = (oklch(0.83, 0.11, 228), oklch(0.47, 0.20, 276))
EMBER = (oklch(0.88, 0.15, 90), oklch(0.50, 0.19, 26))
SLASH = {"light": ("#6b6b6b", "#0f0f0f"), "dark": ("#ffffff", "#9a9a9a")}
DISC = {"light": "#ffffff", "dark": "#161616"}

# ---------------------------------------------------------------- geometry

# A: half the distance between the stems (and between the K tops and bottoms,
# which keeps the mark square). DX: how far the slash leans across its height.
A, DX = 112, 112


def geometry(a=None, dx=None, trim=0):
    """Paths and boxes for the mark centred at 256 256. Stems are 144 long and
    48 wide; the chevron vertex sits 24 right of the stem; arms run at 45°."""
    a = A if a is None else a
    dx = DX if dx is None else dx
    lx, top = 256 - a, 256 - a
    rx, bot = 256 + a, 256 + a
    # The lower arm ends under the slash. Pick its length (a multiple of 8)
    # so its round end stays fully covered by the 44-wide slash.
    h = 2 * a
    norm = (h * h + dx * dx) ** 0.5
    n = (h / norm, dx / norm)  # slash normal
    side = 24 * abs(-n[0] + n[1]) / 2**0.5  # how far the cap's sides reach across

    def dist(t):  # signed distance of the arm end from the slash centre line
        ex, ey = lx + 24 + t, top + 72 + t
        return (256 - ex) * n[0] + (256 - ey) * n[1]

    lo, hi = 2, 22 - side
    t = min(range(8, 400, 8), key=lambda t: abs(dist(t) - (lo + hi) / 2))
    assert lo <= dist(t) <= hi, (a, dx, dist(t), lo, hi)
    margin = a + 24 + 8
    r = round(((a * a * 2) ** 0.5 + 24) * 1.25 / 8) * 8  # circle with ~25% padding
    return dict(
        stem_l=f"M{lx} {top}V{top + 144}",
        chev_l=f"M{lx + 96} {top}L{lx + 24} {top + 72}L{lx + 24 + t} {top + 72 + t}",
        stem_r=f"M{rx} {bot}V{bot - 144}",
        chev_r=f"M{rx - 96} {bot}L{rx - 24} {bot - 72}L{rx - 24 - t} {bot - 72 - t}",
        slash=f"M{256 + dx // 2 - trim * dx // h} {top + trim}L{256 - dx // 2 + trim * dx // h} {bot - trim}",
        box_l=(top - 24, top + 168),
        box_r=(bot - 168, bot + 24),
        box_s=(top - 24, bot + 24),
        view=f"{256 - margin} {256 - margin} {2 * margin} {2 * margin}",
        view_badge=f"{256 - r} {256 - r} {2 * r} {2 * r}",
        r=r,
    )


def svg(theme, badge=False, sfx="", g=None):
    """theme: "light", "dark", or "auto" (follows prefers-color-scheme).
    sfx makes ids unique when several logos share one HTML page.
    g overrides the geometry (see geometry())."""
    g = g or geometry()
    STEM_L, CHEV_L, STEM_R, CHEV_R, SLASH_PATH = (g[k] for k in ("stem_l", "chev_l", "stem_r", "chev_r", "slash"))

    def stops(colours):
        return "".join(f'<stop offset="{i / (len(colours) - 1):g}" stop-color="{c}"/>' for i, c in enumerate(colours))

    def grad(name, colours, y1, y2):
        return f'<linearGradient id="{name}{sfx}" gradientUnits="userSpaceOnUse" x1="0" y1="{y1}" x2="0" y2="{y2}">{stops(colours)}</linearGradient>'

    def stroke_mask(name, paths, width):
        p = "".join(f'<path d="{d}"/>' for d in paths)
        return (
            f'<mask id="{name}{sfx}" maskUnits="userSpaceOnUse" x="0" y="0" width="512" height="512">'
            f'<g fill="none" stroke="#fff" stroke-width="{width}" stroke-linecap="round" stroke-linejoin="round">{p}</g></mask>'
        )

    def shadow(name, paths, opacity):
        p = "".join(f'<path d="{d}"/>' for d in paths)
        return f'<g mask="url(#{name}{sfx})"><g stroke="#000" opacity="{opacity}" filter="url(#blur{sfx})">{p}</g></g>'

    if theme == "auto":
        light, dark = SLASH["light"], SLASH["dark"]
        style = (
            f"<style>.s0{{stop-color:{light[0]}}}.s1{{stop-color:{light[1]}}}"
            f"@media (prefers-color-scheme:dark){{.s0{{stop-color:{dark[0]}}}.s1{{stop-color:{dark[1]}}}}}</style>"
        )
        slash_grad = f'<linearGradient id="sl{sfx}" gradientUnits="userSpaceOnUse" x1="0" y1="{g['box_s'][0]}" x2="0" y2="{g['box_s'][1]}"><stop class="s0" offset="0"/><stop class="s1" offset="1"/></linearGradient>'
    else:
        style = ""
        slash_grad = grad("sl", SLASH[theme], *g["box_s"])

    defs = (
        style
        + f'<filter id="blur{sfx}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="10"/></filter>'
        + grad("kl", ramp(*SKY), *g["box_l"])
        + grad("kr", ramp(*EMBER), *g["box_r"])
        + grad("sml", ramp(*SKY, dL=-0.06), *g["box_l"])
        + grad("smr", ramp(*EMBER, dL=-0.06), *g["box_r"])
        + slash_grad
        + stroke_mask("jl", [STEM_L], 48)
        + stroke_mask("jr", [STEM_R], 48)
        + stroke_mask("arms", [CHEV_L, CHEV_R], 48)
    )
    disc = ""
    if badge:
        fill = DISC.get(theme, DISC["dark"])
        disc = f'<circle cx="256" cy="256" r="{g["r"]}" fill="{fill}"/>'
    body = (
        f'<g fill="none" stroke-width="48" stroke-linecap="round" stroke-linejoin="round">'
        f'<path d="{STEM_L}" stroke="url(#sml{sfx})"/><path d="{STEM_R}" stroke="url(#smr{sfx})"/>'
        f'{shadow("jl", [CHEV_L], 0.35)}{shadow("jr", [CHEV_R], 0.35)}'
        f'<path d="{CHEV_L}" stroke="url(#kl{sfx})"/><path d="{CHEV_R}" stroke="url(#kr{sfx})"/>'
        f'{shadow("arms", [SLASH_PATH], 0.5)}'
        f'<path d="{SLASH_PATH}" stroke="url(#sl{sfx})" stroke-width="44"/></g>'
    )
    view = g["view_badge"] if badge else g["view"]
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{view}"><defs>{defs}</defs>{disc}{body}</svg>\n'


if __name__ == "__main__":
    out = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else pathlib.Path(__file__).parent)
    out.mkdir(parents=True, exist_ok=True)
    files = {
        "kk.svg": svg("auto"),
        "kk-light.svg": svg("light"),
        "kk-dark.svg": svg("dark"),
        "kk-circle-light.svg": svg("light", badge=True),
        "kk-circle-dark.svg": svg("dark", badge=True),
    }
    for name, text in files.items():
        (out / name).write_text(text)
    print("wrote", ", ".join(files))
