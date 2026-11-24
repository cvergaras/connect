#!/usr/bin/env python3
"""Generate print-ready QR assets for the permanent website URL."""

from pathlib import Path

import qrcode
from qrcode.constants import ERROR_CORRECT_H


SITE_URL = "https://cvergaras.github.io/connect/"
ASSETS = Path(__file__).resolve().parents[1] / "assets"
ASSETS.mkdir(exist_ok=True)

qr = qrcode.QRCode(error_correction=ERROR_CORRECT_H, box_size=48, border=4)
qr.add_data(SITE_URL)
qr.make(fit=True)
matrix = qr.get_matrix()

png = qr.make_image(fill_color="black", back_color="white").convert("RGB")
png.save(ASSETS / "connect-qr.png", optimize=True)

size = len(matrix)
modules = "".join(
    f"M{x} {y}h1v1h-1z"
    for y, row in enumerate(matrix)
    for x, is_dark in enumerate(row)
    if is_dark
)
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" shape-rendering="crispEdges" role="img" aria-labelledby="title desc">
<title id="title">QR code for Claudio Vergara-Sáez's Let's connect website</title>
<desc id="desc">Scan to visit {SITE_URL}</desc>
<rect width="{size}" height="{size}" fill="#fff"/>
<path d="{modules}" fill="#000"/>
</svg>
'''
(ASSETS / "connect-qr.svg").write_text(svg, encoding="utf-8")
print(f"Wrote {png.width} × {png.height} PNG and SVG QR for {SITE_URL}")
