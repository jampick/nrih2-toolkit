#!/usr/bin/env python3
"""Turn catalog.json + data/stats/stats.json into site/data.js for the static site.

Writes `window.NMRIH2 = {...}` so the site works from file:// with no server.

Stats provenance:
  * Weapons / melee / throwables / zombies / items  -> REAL from-files numbers,
    decoded from the game's own UCurveTable assets (CUE4Parse + a foreign UE5.6.1
    usmap). See tools/build_stats.py. source = "files".
  * Skills -> magnitudes live in Blueprint GameplayEffects that a foreign usmap
    cannot decode, so they remain name-only here (source = wiki, pending overlay).
"""
import json, re, os, glob, math

ROOT = r"C:\Users\OddJob\projects\NRIH2"
CATALOG = os.path.join(ROOT, "data", "catalog", "catalog.json")
STATS = os.path.join(ROOT, "data", "stats", "stats.json")
SKILLS = os.path.join(ROOT, "data", "stats", "skills.json")
AMMO = os.path.join(ROOT, "data", "stats", "ammo.json")
IMAGES = os.path.join(ROOT, "data", "images", "images.json")
OUT = os.path.join(ROOT, "site", "data.js")

# ---------------------------------------------------------------- name helpers
def words(s):
    s = re.sub(r'^(SD_|ID_Consumable_|ID_Permanent_|ID_Recipe_|ID_|IA_|AES_|BP_|STIM_|GE_|CT_|ATT_|DT_|CDT_|CCT_)', '', s)
    s = s.replace('_', ' ')
    s = re.sub(r'(?<=[a-z])(?=[A-Z])', ' ', s)
    s = re.sub(r'(?<=[A-Z])(?=[A-Z][a-z])', ' ', s)
    return re.sub(r'\s+', ' ', s).strip()

def prettify_stat(key):
    """`Zombie.MeleeDamage_Basic` -> `Melee Damage Basic`; `RateOfFire` -> `Rate Of Fire`."""
    key = key.split('.')[-1]
    key = key.replace('_', ' ')
    key = re.sub(r'(?<=[a-z])(?=[A-Z])', ' ', key)
    key = re.sub(r'(?<=[A-Z])(?=[A-Z][a-z])', ' ', key)
    return re.sub(r'\s+', ' ', key).strip()

def fmt(v):
    if isinstance(v, float):
        if v == int(v):
            return str(int(v))
        return f"{v:.4g}"
    return str(v)

# --------------------------------------------------------------- classification
MELEE = {"BaseballBat","ClawHammer","Cleaver","Crowbar","ETool","FireAxe","FryingPan","HatchetWoodsman",
    "HockeyStick","KitchenKnife","KnifeBayonet","KnifeHunter","KnifeSmall","Machete","Mallet","Pipe","PipeSmall",
    "PipeWrench","Rake","Rebar","Shovel","Skillet","Sledge","TireIron","TireIronVariant","TreeTrimmer","Welder",
    "WrenchLarge","WrenchSmall","Chainsaw","LargePlank","BarricadingPlank","Bottle","BeerBottle","Fists"}
FIREARMS = {"1911","590A1","686","870","AP85","BauerPrecision","Bull","CoachGun","CX8","DT11","Eder17","FAL",
    "Gruber922","GruberMkVII","GruberRanch","Hunter85","LeeEnfield","M1014","M14","M16A4","M1Garand","M7","M9A1",
    "Martial","MC15","Mk18","Model13","MP5","MP5A4_Old","P350","RX12","SKS","Winchester_1873"}
THROWABLE = {"Molotov","Dynamite","Pipebomb","Grenade_M67","IED","DirectionalMine","ProximityExplosive"}

def classify(name):
    if name in FIREARMS: return "Firearm"
    if name in MELEE: return "Melee"
    if name in THROWABLE: return "Throwable"
    return "Other"

# Gun types are hand-assigned (real-world archetype of each gun; mirrors the game's
# Handgun/SMG/Shotgun/Rifle/Sniper skill trees). Not decodable from the curve tables.
GUNTYPE = {}
for t, names in {
    "Handgun": {"1911","686","AP85","Bull","Eder17","GruberMkVII","M9A1","Martial","Model13","P350"},
    "SMG":     {"MP5","MP5A4_Old"},
    "Shotgun": {"590A1","870","CoachGun","DT11","M1014","RX12"},
    "Rifle":   {"CX8","FAL","Gruber922","GruberRanch","M14","M16A4","M1Garand","M7","MC15",
                "Mk18","SKS","Winchester_1873"},
    "Sniper":  {"BauerPrecision","Hunter85","LeeEnfield"},
}.items():
    for n in names:
        GUNTYPE[n] = t

# Curated primary stats (raw keys), shown first on each card.
PRIMARY = {
    "Firearm": ["Damage","HeadshotDamage","BulletsPerShot","LimbDamage","StabilityDamage",
                "AmmoCapacity","RateOfFire","MaxPenetrations","Range","MaxSpreadDegrees"],
    "Melee":   ["Damage","HeadshotDamage","LimbDamage","StrongAttackDamage","HeavyAttackDamage",
                "ThrowDamage","StabilityDamage","Range","QuickAttackStaminaCost"],
    "Throwable":["Damage","ThrowDamage","HeadShotDamage","StabilityDamage","LimbDamage",
                 "AmmoCapacity","Cooldown"],
    "Zombie":  ["Health.MaxHealth","Movement.MovementSpeed","Zombie.MeleeDamage_Basic",
                "Zombie.MeleeDamage_Heavy","Zombie.CombatRange","Zombie.InfectionChance",
                "Zombie.GrabBiteDamage","Zombie.AttackCooldown_Basic"],
}

# ---------------------------------------------------------------- zombie math
# "Shots to drop" per zombie type, computed from the REAL decoded numbers:
# zombie Health.MaxHealth vs weapon Damage/HeadshotDamage (x pellets for shotguns).
# Deliberately NOT a DPS stat: the files' RateOfFire is inconsistently authored
# (0 for Winchester, 0.02 for a semi-auto pistol), so time-based math would lie.
ZROSTER = [  # ascending HP; Child variants all share one HP profile
    ("Child",          "Zomb_Child_WLK"),
    ("Shambler",       "Zomb_Adult_SHA"),
    ("Walker",         "Zomb_Adult_WLK"),
    ("Runner",         "Zomb_Adult_RNR"),
    ("Runner Prime",   "Zomb_Adult_RNR_Prime"),
    ("Walker Prime",   "Zomb_Adult_WLK_Prime"),
    ("Shambler Prime", "Zomb_Adult_SHA_Prime"),
    ("Mutated",        "Zomb_Adult_MUT"),
]

def zombie_hp_roster(stats):
    out = []
    for label, inst in ZROSTER:
        z = stats.get("zombies", {}).get(inst)
        hp = z and z["stats"].get("Health.MaxHealth")
        if hp:
            out.append((label, hp))
    return out

def kill_math(raw, category, zhp):
    """Attachable zmath block: shots (firearms) / heavy swings (melee) to drop
    each zombie type. Rows with identical counts are merged into HP ranges."""
    if not zhp:
        return None
    if category == "Firearm":
        body, head = raw.get("Damage"), raw.get("HeadshotDamage")
        pellets = int(raw.get("BulletsPerShot") or 1)
        title, unit = "Shots to drop", "shot"
    elif category == "Melee":
        body = max((raw.get(k) or 0) for k in ("Damage", "StrongAttackDamage", "HeavyAttackDamage"))
        head = max((raw.get(k) or 0) for k in
                   ("HeadshotDamage", "StrongAttackHeadshotDamage", "HeavyAttackHeadShotDamage"))
        pellets, title, unit = 1, "Heavy swings to drop", "swing"
    else:
        return None
    if not body:
        return None
    body_full = body * pellets
    head_full = (head or 0) * pellets
    rows = []
    for label, hp in zhp:
        rows.append({"labels": [label], "lo": hp, "hi": hp,
                     "head": math.ceil(hp / head_full) if head_full else None,
                     "body": math.ceil(hp / body_full)})
    merged = []
    for r in rows:
        if merged and merged[-1]["head"] == r["head"] and merged[-1]["body"] == r["body"]:
            merged[-1]["labels"] += r["labels"]
            merged[-1]["hi"] = r["hi"]
        else:
            merged.append(r)
    out_rows = []
    for r in merged:
        L = r["labels"]
        label = L[0] if len(L) == 1 else (L[0] + " / " + L[1] if len(L) == 2
                                          else L[0] + " → " + L[-1])
        hp = fmt(r["lo"]) if r["lo"] == r["hi"] else fmt(r["lo"]) + "–" + fmt(r["hi"])
        out_rows.append({"label": label, "hp": hp, "head": r["head"], "body": r["body"]})
    z = {"title": title, "rows": out_rows}
    if pellets > 1:
        z["note"] = ("Full blast: " + str(pellets) + " pellets × " + fmt(body) + " = " +
                     fmt(body_full) + " dmg (" + fmt(head_full) + " head), all pellets on target")
    onetap = [r for r in rows if r["head"] == 1]
    if onetap and len(onetap) < len(rows):
        z["onetap"] = "One " + unit + " to the head drops anything up to a " + onetap[-1]["labels"][-1]
    return z

# --------------------------------------------------------------- stat matching
def norm(s):
    return re.sub(r'[^a-z0-9]', '', s.lower())

def build_item_index(stats):
    """normalized item-key -> real key, with alias fixes for roster/table name drift."""
    idx = {}
    for k in stats["items"]:
        idx[norm(k)] = k
    alias = {"1911":"M1911","590a1":"M590A1","hatchetwoodsman":"Hatchet","pipe":"PipeLarge",
             "pipebomb":"PipeBomb","medkit":"Medical","hatchet":"Hatchet"}
    for a, real in alias.items():
        if real in stats["items"]:
            idx[norm(a)] = real
    return idx

def lookup_item(idx, stats, roster_name):
    """roster_name is an AES_/BP_ id already stripped of prefix."""
    n = norm(roster_name)
    for cand in (n, "m"+n):
        if cand in idx:
            return idx[cand]
    return None

def stat_blocks(raw_stats, category):
    """Return (primary_ordered, all_ordered) as pretty dicts of formatted values."""
    primary_keys = PRIMARY.get(category, [])
    primary = {}
    for k in primary_keys:
        if k in raw_stats:
            primary[prettify_stat(k)] = fmt(raw_stats[k])
    alld = {}
    for k in sorted(raw_stats):
        alld[prettify_stat(k)] = fmt(raw_stats[k])
    return primary, alld

# ------------------------------------------------------------------------- load
def load(path):
    with open(path, encoding='utf-8') as f:
        return json.load(f)

def skill_category(name):
    n = name.lower()
    for key, cat in [("handgun","Handgun"),("rifle","Rifle"),("sniper","Sniper"),("shotgun","Shotgun"),
                     ("smg","SMG"),("melee","Melee"),("1hmelee","Melee"),("2hmelee","Melee"),
                     ("heal","Support/Medical"),("medic","Support/Medical"),("revive","Support/Medical"),
                     ("grab","Survival"),("shove","Melee"),("grenad","Throwable"),("build","Utility"),
                     ("loot","Utility"),("scaveng","Utility"),("battery","Utility"),("ammo","Utility")]:
        if key in n: return cat
    return "General"

ZTYPE = {"WLK":"Walker","RNR":"Runner","SHA":"Shambler","MUT":"Mutated"}
def zombie_name(inst):
    # Zomb_Adult_WLK_Prime -> "Adult Walker (Prime)"
    parts = inst.split('_')
    age = parts[1] if len(parts) > 1 else ""
    code = parts[2] if len(parts) > 2 else ""
    prime = "_Prime" in inst or (len(parts) > 3 and parts[3] == "Prime")
    name = f"{age} {ZTYPE.get(code, code)}".strip()
    return name + (" (Prime)" if prime else "")

# -------------------------------------------------------------------------- main
def main():
    c = load(CATALOG)
    stats = load(STATS) if os.path.exists(STATS) else {"items": {}, "zombies": {}}
    idx = build_item_index(stats)
    zhp = zombie_hp_roster(stats)

    def attach(row, roster_name, category):
        row["statsExpected"] = True
        key = lookup_item(idx, stats, roster_name)
        if key:
            raw = stats["items"][key]["stats"]
            primary, alld = stat_blocks(raw, category)
            row["stats"] = primary
            row["allStats"] = alld
            row["statSource"] = "files"
            z = kill_math(raw, category, zhp)
            if z:
                row["zmath"] = z
        return row

    ammo = load(AMMO)["firearms"] if os.path.exists(AMMO) else {}
    firearms, melee_aes, throwables, other_sets = [], [], [], []
    for e in c["firearmsAndSets"]:
        key = e["name"][4:] if e["name"].startswith("AES_") else e["name"]
        cat = classify(key)
        if key.startswith("Zombie"):      # AES_Zombie* are enemy ability sets, not player weapons
            continue
        row = {"id": e["name"], "name": words(key), "raw": e["name"]}
        if cat == "Firearm" and key in GUNTYPE:
            row["category"] = GUNTYPE[key]
        if e["name"] in ammo:
            row["caliber"] = ammo[e["name"]]["caliber"]
            row["ammoIconKey"] = "AMMO_" + ammo[e["name"]]["icon"]
        if cat == "Firearm":
            firearms.append(attach(row, key, "Firearm"))
        elif cat == "Melee":
            melee_aes.append(attach(row, key, "Melee"))
        elif cat == "Throwable":
            throwables.append(attach(row, key, "Throwable"))
        else:
            other_sets.append(row)

    # Melee: BP_ tier list carries rarity. It duplicates every weapon as a world
    # "Pickup" variant -> drop those, keep the real weapon (which also matches stats).
    melee_tiers = []
    for e in c["melee"]:
        if re.search(r'pick[_ ]?up', e["name"], re.I):
            continue
        key = e["name"][3:] if e["name"].startswith("BP_") else e["name"]
        row = {"id": e["name"], "name": words(e["name"]), "rarity": e.get("rarity", "")}
        melee_tiers.append(attach(row, key, "Melee"))

    skill_overlay = (load(SKILLS)["skills"] if os.path.exists(SKILLS) else {})
    skills = []
    for s in c["skills"]:
        row = {"id": s["name"], "name": words(s["name"]),
               "category": skill_category(s["name"]), "hasUltimate": s["hasUltimate"]}
        w = skill_overlay.get(s["name"])
        if w:
            st = {"Effect": w["effect"], "Expert effect": w["expert"]}
            if w.get("unlockLevel") is not None:
                st["Expert unlock"] = "Level " + str(w["unlockLevel"])
            row["stats"] = st
            row["statSource"] = "fandom"
        skills.append(row)

    def simple(key):
        return [{"id": e["name"], "name": words(e["name"]), "raw": e["name"]} for e in c[key]]

    def recipe_cat(path):
        m = re.search(r'/Recipes/([^/]+)/', path)
        return m.group(1) if m else "General"
    recipes = [{"id": e["name"], "name": words(e["name"]), "category": recipe_cat(e["path"])}
               for e in c["recipes"]]

    # Zombies: driven straight off the real stat profiles (base + Prime variants).
    zombies = []
    for inst in sorted(stats.get("zombies", {})):
        primary, alld = stat_blocks(stats["zombies"][inst]["stats"], "Zombie")
        cat = "Prime" if "Prime" in inst else ("Child" if "Child" in inst else "Adult")
        zombies.append({"id": inst, "name": zombie_name(inst), "raw": inst, "category": cat,
                        "stats": primary, "allStats": alld, "statSource": "files"})

    files_stats = sum(1 for grp in (firearms, melee_tiers, throwables, zombies)
                      for r in grp if r.get("statSource") == "files")
    wiki_skills = sum(1 for r in skills if r.get("statSource") == "fandom")

    out = {
        "meta": c["meta"],
        "hasStats": True,
        "statsInfo": {
            "filesDecoder": stats.get("decoder", ""),
            "filesNote": "Weapon, melee, throwable, item and zombie numbers are read directly "
                         "from the game's UCurveTable data assets.",
            "skillsNote": "Skill effects and Expert unlock levels are community-sourced from the "
                          "Fandom wiki (CC-BY-SA) — their magnitudes live in Blueprint effects a "
                          "foreign usmap cannot decode.",
            "wikiAttribution": skill_overlay and (load(SKILLS).get("attribution")) or "",
            "withStats": files_stats,
            "wikiSkills": wiki_skills,
        },
        "sections": {
            "skills": skills,
            "firearms": firearms,
            "melee": melee_tiers,
            "throwables": throwables,
            "consumables": simple("consumables"),
            "gear": simple("permanents"),
            "attachments": simple("attachments"),
            "recipes": recipes,
            "zombies": zombies,
            "challenges": simple("challengeTasks"),
        }
    }
    # Attach game-file icons (keyed by catalog id) to every section row.
    imgmap = load(IMAGES) if os.path.exists(IMAGES) else {}
    withimg = 0
    for rows in out["sections"].values():
        for r in rows:
            img = imgmap.get(r.get("id"))
            if img:
                r["img"] = img
                withimg += 1
            if r.get("ammoIconKey"):
                r["ammoIcon"] = imgmap.get(r.pop("ammoIconKey"))
    out["statsInfo"]["withImages"] = withimg

    # Atmospheric map loading-screens for the header hero (random per visit).
    flavor_dir = os.path.join(ROOT, "site", "img", "flavor")
    if os.path.isdir(flavor_dir):
        out["flavor"] = sorted("img/flavor/" + os.path.basename(p)
                                for p in glob.glob(os.path.join(flavor_dir, "*.jpg")))

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        f.write("window.NMRIH2 = ")
        json.dump(out, f, ensure_ascii=False, indent=1)
        f.write(";\n")
    counts = {k: len(v) for k, v in out["sections"].items()}
    print("Wrote", OUT)
    print(json.dumps(counts, indent=2))
    print("cards with real from-files stats:", files_stats)
    print("skills with wiki effects:", wiki_skills)

if __name__ == "__main__":
    main()
