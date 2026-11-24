#!/usr/bin/env python3
"""Independently decode both QR assets and check the permanent URL."""

import re
import xml.etree.ElementTree as ET
from pathlib import Path

from PIL import Image, ImageDraw
import zxingcpp


EXPECTED = "https://cvergaras.github.io/connect/"
ASSETS = Path(__file__).resolve().parents[1] / "assets"


def verify(image: Image.Image, label: str) -> None:
    result = zxingcpp.read_barcode(image)
    if result is None or result.text != EXPECTED:
        raise SystemExit(f"{label} QR did not decode to {EXPECTED!r}")
    print(f"{label}: {result.text}")


verify(Image.open(ASSETS / "connect-qr.png"), "PNG")

root = ET.parse(ASSETS / "connect-qr.svg").getroot()
size = int(root.attrib["viewBox"].split()[-1])
path = root.find("{http://www.w3.org/2000/svg}path")
if path is None:
    raise SystemExit("SVG QR path missing")
coordinates = re.findall(r"M(\d+) (\d+)h1v1h-1z", path.attrib["d"])
if not coordinates or len(coordinates) != path.attrib["d"].count("M"):
    raise SystemExit("SVG QR path invalid")
scale = 24
svg_raster = Image.new("RGB", (size * scale, size * scale), "white")
draw = ImageDraw.Draw(svg_raster)
for x_text, y_text in coordinates:
    x, y = int(x_text), int(y_text)
    draw.rectangle((x * scale, y * scale, (x + 1) * scale - 1, (y + 1) * scale - 1), fill="black")
verify(svg_raster, "SVG")
