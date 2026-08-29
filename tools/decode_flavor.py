#!/usr/bin/env python3
"""Decode the map loading-screen mips (data/rawflavor) into atmospheric header
backgrounds at site/img/flavor/<Map>.jpg (JPEG, no alpha needed)."""
import os, texture2ddecoder
from PIL import Image

ROOT = r"C:\Users\OddJob\projects\NRIH2"
RAW = os.path.join(ROOT, "data", "rawflavor")
OUT = os.path.join(ROOT, "site", "img", "flavor")
WIDE = 1600

def dec(fmt, data, w, h):
    if fmt == "PF_BC7":
        return texture2ddecoder.decode_bc7(data, w, h)
    if fmt in ("PF_DXT1", "PF_BC1"):
        return texture2ddecoder.decode_bc1(data, w, h)
    return None

def main():
    os.makedirs(OUT, exist_ok=True)
    n = 0
    for line in open(os.path.join(RAW, "manifest.txt"), encoding="utf-8"):
        line = line.strip()
        if not line:
            continue
        name, fmt, w, h, ln = line.split("|")
        w, h = int(w), int(h)
        if "EndMatch" in name or "Tutorial" in name:   # keep the atmospheric "enter" shots
            continue
        d = dec(fmt, open(os.path.join(RAW, name + ".bin"), "rb").read(), w, h)
        if d is None:
            continue
        img = Image.frombytes("RGBA", (w, h), d, "raw", "BGRA").convert("RGB")
        img = img.resize((WIDE, round(img.height * WIDE / img.width)), Image.LANCZOS)
        key = (name[2:] if name.startswith("T_") else name).replace("_EnterMatch", "")
        img.save(os.path.join(OUT, key + ".jpg"), "JPEG", quality=82, optimize=True)
        n += 1
    print(f"wrote {n} flavor images -> {OUT}")

if __name__ == "__main__":
    main()
