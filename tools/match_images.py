#!/usr/bin/env python3
"""Match decoded icon PNGs (data/images-png) to catalog item/skill IDs.

Copies the matched icons into site/img/ and writes data/images/images.json:
    { "AES_M14": "img/M14.png", "SD_Athlete": "img/skill_Athlete.png", ... }
build_site_data.py reads that and attaches row["img"].
"""
import os, re, json, glob, shutil

ROOT = r"C:\Users\OddJob\projects\NRIH2"
PNG = os.path.join(ROOT, "data", "images-png")
CATALOG = os.path.join(ROOT, "data", "catalog", "catalog.json")
SITE_IMG = os.path.join(ROOT, "site", "img")
OUT = os.path.join(ROOT, "data", "images", "images.json")

def norm(s):
    return re.sub(r'[^a-z0-9]', '', s.lower())

ITEM_PREFIXES = ["T_UI_Gun_Pistol_", "T_UI_Gun_Rifle_", "T_UI_Gun_Shotgun_", "T_UI_Gun_SMG_",
                 "T_UI_Melee_", "T_UI_Throwable_", "T_UI_Trap_", "T_UI_Meds_", "T_UI_Gear_",
                 "T_UI_Attachment_", "T_UI_SupplyItem_", "T_UI_Utility_", "T_UI_"]
ITEM_SUFFIXES = ["_Textured_Icn", "_Texture_Icn", "_Textured", "_Icn", "_icn", "_Icon"]

def clean_item(fn):
    s = fn
    for p in ITEM_PREFIXES:
        if s.startswith(p):
            s = s[len(p):]; break
    for suf in ITEM_SUFFIXES:
        if s.endswith(suf):
            s = s[:-len(suf)]; break
    return s

def build_item_index():
    """normalized clean-name -> filename (prefer *Textured* variants)."""
    idx = {}
    for path in glob.glob(os.path.join(PNG, "*.png")):
        fn = os.path.basename(path)[:-4]
        if fn.lower().startswith("skill"):
            continue
        key = norm(clean_item(fn))
        if not key:
            continue
        textured = "textured" in fn.lower() or "texture" in fn.lower()
        if key not in idx or (textured and "textured" not in idx[key].lower()):
            idx[key] = fn
    return idx

def build_skill_index():
    """normalized skill-name -> filename (prefer 'Normal' over 'Ultimate')."""
    idx = {}
    for path in glob.glob(os.path.join(PNG, "Skill*.png")):
        fn = os.path.basename(path)[:-4]
        s = fn
        for p in ["Skill_Icons_Skill_Normal_", "Skill_Icons_Skill_Ultimate_",
                  "Skill_Normal_", "Skill_Ultimate_", "Skill_Icons_"]:
            if s.startswith(p):
                s = s[len(p):]; break
        s = s.lstrip("-")
        key = norm(s)
        if not key:
            continue
        is_ult = "ultimate" in fn.lower()
        if key not in idx or (not is_ult and "ultimate" in idx[key].lower()):
            idx[key] = fn
    return idx

# roster-name (normalized) -> icon-key (normalized)
ITEM_ALIAS = {
    "1911": "m1911", "winchester1873": "winchester", "hatchetwoodsman": "hatchet",
    "sledge": "sledgehammer", "pipe": "pipelarge", "knifesmall": "smallknife",
    "grenadem67": "m67", "mc15": "ar15", "m16a4": "ar15", "medkit": "medkit",
    "genetherapy": "genetherapy", "bandage": "bandages", "phalanxpills": "pills",
    "maglite": "flashlight",
}
# SD_ id (normalized, full) or wiki-name -> skill-icon key
SKILL_ALIAS = {
    "sd2hmeleehardblow": "hardblow", "sd2hmeleeheavyattackrush": "rush",
    "sd1hmeleehitman": "hitman", "sdhandgunheadblown": "headblown",
    "sdhandgunsteadyhand": "steadyhand", "sdriflehellfire": "hellfire",
    "sdriflemohawk": "mohawk", "sdriflereducedrecoilcrouch": "steadylowangleshot",
    "sdsmgreducedrecoil": "lockedon", "sdsmgwinged": "winged",
    "sdshotgunicarus": "icarus", "sdshotgunoverkill": "overkill",
    "sdshotguntightshot": "tightshot", "sdshotgunlongrange": "highrange",
    "sdsniperironchamber": "ironchamber", "sdsniperpenetratingshot": "penetratingshot",
    "sdfaterrevive": "fasterrevive", "sdantibodies": "antibodies",
    "sdresidentgenetherapy": "residentgenes", "sdteddybear": "teddybear",
    "sdforeman": "theforemen", "sdquietsteps": "quietstep", "sdheavyshoves": "heavyshove",
    "sdlighterhealing": "healingitemstack", "sdquickreloadhandgun": "handgunreload",
    "sdquickreloadrifleandsmg": "riflereload", "sdquickreloadshotgun": "shotgunreload",
}

def resolve(idx, keys, alias):
    # exact normalized match or explicit alias only — no loose substring
    # matching (it produced false hits like an MP5 rail grabbing the MP5 gun).
    for k in keys:
        nk = norm(k)
        if nk in alias and alias[nk] in idx:
            return idx[alias[nk]]
        if nk in idx:
            return idx[nk]
    return None

def strip_id(name):
    return re.sub(r'^(AES_|BP_|SD_|IA_|ID_Consumable_|ID_Permanent_|ID_)', '', name)

def item_cands(base):
    """Candidate keys: full, and with a trailing version suffix (_01A/_01) removed."""
    cands = [base]
    trimmed = re.sub(r'_\d+[A-Za-z]?$', '', base)
    if trimmed != base:
        cands.append(trimmed)
    return cands

def main():
    c = json.load(open(CATALOG, encoding="utf-8"))
    item_idx = build_item_index()
    skill_idx = build_skill_index()
    os.makedirs(SITE_IMG, exist_ok=True)
    os.makedirs(os.path.dirname(OUT), exist_ok=True)

    mapping = {}
    used = set()

    def assign(cat_id, fn, prefix=""):
        src = os.path.join(PNG, fn + ".png")
        if not os.path.exists(src):
            return False
        dest_name = prefix + re.sub(r'[^A-Za-z0-9_]', '', cat_id) + ".png"
        shutil.copyfile(src, os.path.join(SITE_IMG, dest_name))
        mapping[cat_id] = "img/" + dest_name
        used.add(fn)
        return True

    stats = {}
    # Weapons / throwables / sets
    for e in c["firearmsAndSets"]:
        fn = resolve(item_idx, item_cands(strip_id(e["name"])), ITEM_ALIAS)
        if fn:
            assign(e["name"], fn)
    # Melee (BP tiers; skip pickups)
    for e in c["melee"]:
        if re.search(r'pick[_ ]?up', e["name"], re.I):
            continue
        fn = resolve(item_idx, item_cands(strip_id(e["name"])), ITEM_ALIAS)
        if fn:
            assign(e["name"], fn)
    # Consumables + permanents (gear) + attachments
    for key in ("consumables", "permanents", "attachments"):
        for e in c.get(key, []):
            fn = resolve(item_idx, item_cands(strip_id(e["name"])), ITEM_ALIAS)
            if fn:
                assign(e["name"], fn)
    # Skills
    skills_overlay = {}
    sp = os.path.join(ROOT, "data", "stats", "skills.json")
    if os.path.exists(sp):
        skills_overlay = json.load(open(sp, encoding="utf-8"))["skills"]
    for s in c["skills"]:
        sd = s["name"]
        base = strip_id(sd)
        # candidate keys: full-normalized, last segment, wiki name
        cands = [base, base.split("_")[-1]]
        if sd in skills_overlay:
            cands.append(skills_overlay[sd]["wikiName"])
        fn = resolve(skill_idx, cands, SKILL_ALIAS)
        # also try SD-alias on full id
        if not fn:
            fn = resolve(skill_idx, [sd], SKILL_ALIAS)
        if fn:
            assign(sd, fn, prefix="skill_")

    # Zombies: the game ships no per-type portraits, so these are Fandom wiki
    # screenshots (CC-BY-SA) committed directly in site/img as zomb_<type>.jpg.
    # Prime variants share one image; Adult/Child share the base type image.
    ZOMB_TYPE_IMG = {"WLK": "zomb_walker.jpg", "RNR": "zomb_runner.jpg", "SHA": "zomb_shambler.jpg"}
    zstats = os.path.join(ROOT, "data", "stats", "stats.json")
    if os.path.exists(zstats):
        for inst in json.load(open(zstats, encoding="utf-8")).get("zombies", {}):
            code = inst.split("_")[2] if len(inst.split("_")) > 2 else ""
            fn = "zomb_prime.jpg" if "Prime" in inst else ZOMB_TYPE_IMG.get(code)
            if fn and os.path.exists(os.path.join(SITE_IMG, fn)):
                mapping[inst] = "img/" + fn

    # Ammo caliber icons (referenced by data/stats/ammo.json) -> site/img/ammo_<key>.png
    ammo_path = os.path.join(ROOT, "data", "stats", "ammo.json")
    if os.path.exists(ammo_path):
        ammo = json.load(open(ammo_path, encoding="utf-8"))
        for key in {v["icon"] for v in ammo["firearms"].values()}:
            for variant in (f"T_UI_Ammo_{key}_Textured_Icn", f"T_UI_Ammo_{key}_Icn"):
                src = os.path.join(PNG, variant + ".png")
                if os.path.exists(src):
                    shutil.copyfile(src, os.path.join(SITE_IMG, f"ammo_{key}.png"))
                    mapping[f"AMMO_{key}"] = f"img/ammo_{key}.png"
                    break

    json.dump(mapping, open(OUT, "w", encoding="utf-8"), indent=1, ensure_ascii=False)

    # coverage report
    def cov(name, entries, idfield="name"):
        ids = [e[idfield] for e in entries]
        hit = sum(1 for i in ids if i in mapping)
        return f"{name}: {hit}/{len(ids)}"
    print("Wrote", OUT, "with", len(mapping), "images;", len(used), "unique icons used")
    print(" ", cov("firearms+sets", c["firearmsAndSets"]))
    print(" ", cov("melee(all incl pickup)", c["melee"]))
    print(" ", cov("consumables", c["consumables"]))
    print(" ", cov("permanents", c["permanents"]))
    print(" ", cov("attachments", c["attachments"]))
    print(" ", cov("skills", c["skills"]))

if __name__ == "__main__":
    main()
