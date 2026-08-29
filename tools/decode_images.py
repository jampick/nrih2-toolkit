#!/usr/bin/env python3
"""Decode the raw texture mips dumped by `extractor texraw` into web PNGs.

The BC7/DXT5 UI icons can't go through CUE4Parse's native detex path, so the
extractor dumps raw mip0 bytes + a manifest and we decompress here with
texture2ddecoder, then auto-crop transparent margins and downscale for the web.
"""
import os, glob
import texture2ddecoder
from PIL import Image

ROOT = r"C:\Users\OddJob\projects\NRIH2"
RAW = os.path.join(ROOT, "data", "rawmip")
OUT = os.path.join(ROOT, "data", "images-png")
MAX_DIM = 256

def decode(fmt, data, w, h):
    if fmt in ("PF_BC7",):
        return texture2ddecoder.decode_bc7(data, w, h)
    if fmt in ("PF_DXT5", "PF_BC3"):
        return texture2ddecoder.decode_bc3(data, w, h)
    if fmt in ("PF_DXT1", "PF_BC1"):
        return texture2ddecoder.decode_bc1(data, w, h)
    return None  # unsupported

def main():
    os.makedirs(OUT, exist_ok=True)
    ok = skip = fail = 0
    for line in open(os.path.join(RAW, "manifest.txt"), encoding="utf-8"):
        line = line.strip()
        if not line:
            continue
        name, fmt, w, h, ln = line.split("|")
        w, h = int(w), int(h)
        binp = os.path.join(RAW, name + ".bin")
        if not os.path.exists(binp):
            skip += 1
            continue
        try:
            data = open(binp, "rb").read()
            dec = decode(fmt, data, w, h)
            if dec is None:
                print("  unsupported format", fmt, name)
                fail += 1
                continue
            img = Image.frombytes("RGBA", (w, h), dec, "raw", "BGRA")
            # trim fully-transparent margins
            bbox = img.getbbox()
            if bbox:
                img = img.crop(bbox)
            # downscale to web size
            if max(img.size) > MAX_DIM:
                r = MAX_DIM / max(img.size)
                img = img.resize((max(1, round(img.width * r)), max(1, round(img.height * r))),
                                 Image.LANCZOS)
            img.save(os.path.join(OUT, name + ".png"), optimize=True)
            ok += 1
        except Exception as e:
            print("  FAIL", name, e)
            fail += 1
    print(f"decoded={ok} skip={skip} fail={fail} -> {OUT}")

if __name__ == "__main__":
    main()
