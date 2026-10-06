"""Regenerate Schita PNG icons (Pillow). Run from anywhere:  python tools/make_icons.py
Draws the same design as icons/icon.svg: white tile, black pencil, pink swirl from its tip.
Version 1.0.0
"""
import math
from pathlib import Path
from PIL import Image, ImageDraw

OUT = Path(__file__).resolve().parent.parent / "icons"
SS = 4  # supersampling factor
INK, PINK, WHITE, BORDER = (28, 23, 25), (224, 69, 123), (255, 255, 255), (237, 228, 232)

# Pencil lives in local coords (tip at origin, pointing along +x), then rotated -45 deg
# and moved so the tip sits at TIP (512-unit design space). Must match icons/icon.svg.
TIP = (170, 360)
ANGLE = math.radians(-45)
CUBICS = [  # pink swirl, cubic Bezier segments starting at the pencil tip
    ((170, 360), (205, 415), (285, 445), (335, 415)),
    ((335, 415), (385, 385), (365, 320), (320, 335)),
    ((320, 335), (285, 347), (290, 405), (345, 425)),
    ((345, 425), (380, 437), (430, 420), (445, 385)),
]
SWIRL_W = 30


def xf(pt):
    x, y = pt
    c, s = math.cos(ANGLE), math.sin(ANGLE)
    return (TIP[0] + x * c - y * s, TIP[1] + x * s + y * c)


def bezier(p0, p1, p2, p3, n=60):
    for i in range(n + 1):
        t = i / n
        u = 1 - t
        yield (u**3 * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t**3 * p3[0],
               u**3 * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t**3 * p3[1])


def draw_art(d, k, ox, oy):
    """Draw pencil + swirl. k = pixel scale per design unit, (ox, oy) = pixel offset."""
    def P(pt):
        return (pt[0] * k + ox, pt[1] * k + oy)

    def poly(pts, fill):
        d.polygon([P(xf(p)) for p in pts], fill=fill)

    # swirl: round-capped stroke = discs along the curve
    r = SWIRL_W / 2 * k
    for seg in CUBICS:
        for x, y in bezier(*seg):
            px, py = P((x, y))
            d.ellipse([px - r, py - r, px + r, py + r], fill=PINK)
    # pencil
    poly([(0, 0), (70, -38), (70, 38)], INK)            # cone outline
    poly([(22, 0), (72, -27), (72, 27)], WHITE)         # wood
    poly([(0, 0), (24, -13), (24, 13)], INK)            # graphite
    poly([(70, -38), (250, -38), (250, 38), (70, 38)], INK)   # body
    poly([(250, -38), (288, -38), (288, 38), (250, 38)], PINK)  # ferrule band
    poly([(288, -38), (312, -38), (312, 38), (288, 38)], INK)   # end cap


def make(size, kind):
    big = size * SS
    img = Image.new("RGBA", (big, big), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    if kind == "tile":
        rad = 0.22 * big
        d.rounded_rectangle([0, 0, big - 1, big - 1], rad, fill=BORDER)
        m = 0.012 * big
        d.rounded_rectangle([m, m, big - 1 - m, big - 1 - m], rad - m, fill=WHITE)
        k = big / 512
    else:  # "flat" (apple) and "maskable": full-bleed white
        d.rectangle([0, 0, big, big], fill=WHITE)
        k = big / 512 * (0.8 if kind == "maskable" else 1.0)
    off = (big - 512 * k) / 2
    draw_art(d, k, off, off)
    img = img.resize((size, size), Image.LANCZOS)
    if kind != "tile":
        img = img.convert("RGB")
    return img


if __name__ == "__main__":
    OUT.mkdir(exist_ok=True)
    make(192, "tile").save(OUT / "icon-192.png")
    make(512, "tile").save(OUT / "icon-512.png")
    make(180, "flat").save(OUT / "apple-touch-icon.png")
    make(512, "maskable").save(OUT / "icon-maskable-512.png")
    print("icons written to", OUT)
