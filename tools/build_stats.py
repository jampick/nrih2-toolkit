#!/usr/bin/env python3
"""Build data/stats/stats.json from the extracted curve tables in data/stats-raw/.

These are REAL from-files numbers, decoded via CUE4Parse + a foreign UE 5.6.1 usmap
(NewMoon/Mixtape mappings). Only native UCurveTable assets decode this way, which
happens to be the whole weapon / melee / throwable / zombie / item stat backbone.
Blueprint GameplayEffects (skill magnitudes) do NOT decode with a foreign usmap and
are not produced here — those stay on the wiki overlay.

A single curve table can hold several stat profiles, distinguished by the leading
row-key prefix (e.g. `Zomb_Adult_WLK` vs `Zomb_Adult_WLK_Prime`). We group by that
prefix so each profile becomes its own entry.
"""
import json, os, glob

ROOT = r"C:\Users\OddJob\projects\NRIH2"
RAW = os.path.join(ROOT, "data", "stats-raw")
OUT = os.path.join(ROOT, "data", "stats", "stats.json")

# CT_ItemAttributes tables that are templates/tests, not real player items.
SKIP_ITEM = {"Default", "CommonFirearm", "CommonShotgun", "CommonMelee", "CommonCarryable"}

def curve_value(cell):
    keys = cell.get("Keys")
    if keys:
        v = keys[0].get("Value")
        return v
    return None

def rows_by_prefix(exp):
    """Return {instance_prefix: {stat_path: value}} for one CurveTable export."""
    out = {}
    for full, cell in (exp.get("Rows") or {}).items():
        if "." not in full:
            inst, stat = "", full
        else:
            inst, stat = full.split(".", 1)
        val = curve_value(cell)
        if val is None:
            continue
        out.setdefault(inst, {})[stat] = val
    return out

def load_curve_tables(path):
    """Merge all CurveTable exports in a file into {prefix: {stat: val}}."""
    with open(path, encoding="utf-8") as f:
        exports = json.load(f)
    merged = {}
    for exp in exports:
        if exp.get("Type") == "CurveTable" and exp.get("Rows"):
            for inst, stats in rows_by_prefix(exp).items():
                merged.setdefault(inst, {}).update(stats)
    return merged

def relpath(p):
    return os.path.relpath(p, ROOT).replace("\\", "/")

def main():
    items, zombies, tunables = {}, {}, {}

    # Weapons / items: CT_ItemAttributes_<Name>
    for p in glob.glob(os.path.join(RAW, "**", "CT_ItemAttributes_*.json"), recursive=True):
        base = os.path.basename(p)[:-5]              # CT_ItemAttributes_M14
        name = base[len("CT_ItemAttributes_"):]      # M14
        if name in SKIP_ITEM or name.endswith("_MeleeTest"):
            continue
        merged = load_curve_tables(p)
        # One instance expected; take the largest stat block.
        if not merged:
            continue
        inst = max(merged, key=lambda k: len(merged[k]))
        items[name] = {"stats": merged[inst], "table": base, "path": relpath(p)}

    # Zombies: CT_ATT_Zomb_<Type>  (may hold base + _Prime + variants)
    for p in glob.glob(os.path.join(RAW, "**", "CT_ATT_Zomb_*.json"), recursive=True):
        base = os.path.basename(p)[:-5]
        for inst, stats in load_curve_tables(p).items():
            if len(stats) < 3:          # skip stray/near-empty prefixes
                continue
            zombies[inst] = {"stats": stats, "table": base, "path": relpath(p)}

    # AI tunables (global knobs) — nice-to-have reference
    for p in glob.glob(os.path.join(RAW, "**", "CT_Tunables_AI.json"), recursive=True):
        base = os.path.basename(p)[:-5]
        for inst, stats in load_curve_tables(p).items():
            tunables[inst or base] = {"stats": stats, "table": base, "path": relpath(p)}

    out = {
        "source": "files",
        "decoder": "CUE4Parse 1.2.2 + foreign UE5.6.1 usmap (NewMoon/Mixtape)",
        "note": "Real values from the game's own UCurveTable assets. Skill magnitudes "
                "(Blueprint GameplayEffects) do not decode with a foreign usmap and are not here.",
        "items": items,
        "zombies": zombies,
        "tunables": tunables,
    }
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=1)
    print("Wrote", OUT)
    print(f"  items(weapons/items): {len(items)}")
    print(f"  zombies(profiles):    {len(zombies)}")
    print(f"  tunables:             {len(tunables)}")
    print("  item keys:", ", ".join(sorted(items)))
    print("  zombie keys:", ", ".join(sorted(zombies)))

if __name__ == "__main__":
    main()
