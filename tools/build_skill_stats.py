#!/usr/bin/env python3
"""Build data/stats/skills.json from the Fandom wiki capture.

Skill magnitudes live in Blueprint GameplayEffects that a foreign usmap can't
decode, so unlike weapons/zombies these numbers come from the community wiki
(Fandom, CC-BY-SA — must be attributed). We parse the structured lines in
data/wiki-raw/fandom-skills.md and map each wiki skill to its from-files SD_ id.

Output entries are keyed by SD_ id:
  { "SD_Athlete": {"wikiName","effect","expert","unlockLevel","source":"fandom"} }
"""
import json, os, re

ROOT = r"C:\Users\OddJob\projects\NRIH2"
WIKI = os.path.join(ROOT, "data", "wiki-raw", "fandom-skills.md")
CATALOG = os.path.join(ROOT, "data", "catalog", "catalog.json")
OUT = os.path.join(ROOT, "data", "stats", "skills.json")

# wiki skill name -> from-files SD_ id. Direct name matches plus the resolved
# ambiguous cases (chosen by matching the wiki effect text to the SD_ id).
NAME_TO_SD = {
    "Acquired Immunity": "SD_Antibodies",
    "Adrenaline Rush": "SD_AdrenalineRush",
    "Athlete": "SD_Athlete",
    "Averaging": "SD_Averaging",
    "Builder": "SD_Builder",
    "Butcher": "SD_Butcher",
    "Caravan": "SD_Caravan",
    "Deprived": "SD_Deprived",
    "Doorbreaker": "SD_Doorbreaker",
    "Foreman": "SD_Foreman",
    "Grenadier": "SD_Grenadier",
    "Guts": "SD_Guts",
    "Hard Blow": "SD_2hMelee_HardBlow",
    "Headblown": "SD_Handgun_Headblown",
    "Headhunter": "SD_Headhunter",
    "Healing Item Stack": "SD_LighterHealing",       # "medical items reduced weight" == lighter healing
    "Heavy Shoves": "SD_HeavyShoves",
    "Hellfire": "SD_Rifle_Hellfire",
    "Hitman": "SD_1hMelee_Hitman",                   # wiki text is the 1H-melee variant
    "Icarus": "SD_Shotgun_Icarus",
    "Limbo": "SD_Limbo",
    "Locked On": "SD_SMG_ReducedRecoil",
    "Longer Battery": "SD_LongerBattery",
    "Lucky Pathogen": "SD_LuckyPathogen",
    "Marathon Runner": "SD_MarathonRunner",
    "Mohawk": "SD_Rifle_Mohawk",
    "Mule": "SD_Mule",
    "Overkill": "SD_Shotgun_Overkill",
    "Penetrating Shot": "SD_Sniper_PenetratingShot",
    "Quiet Steps": "SD_QuietSteps",
    "Resident Genes": "SD_ResidentGeneTherapy",
    "Rush": "SD_2hMelee_HeavyAttackRush",
    "Scavenger": "SD_Scavenger",
    "Skilled Medic": "SD_SkilledMedic",
    "Stayin' Alive": "SD_FaterRevive",
    "Steady Hand": "SD_Handgun_SteadyHand",
    "Steady Shot": "SD_Rifle_ReducedRecoil_Crouch",  # "reduced while crouching" == the crouch variant
    "Steel Chamber": "SD_Sniper_IronChamber",
    "Sturdy Body": "SD_SturdyBody",
    "Tedy Bear": "SD_TeddyBear",                      # wiki misspelling of Teddy
    "Thick Skin": "SD_ThickSkin",
    "Tight Shot": "SD_Shotgun_TightShot",
    "Wicked": "SD_Wicked",
    "Winged": "SD_SMG_Winged",
    # Intentionally unmapped (no confident from-files match / GE-only):
    #   Eagle Eye, Resilience, Vulture
}

def parse_wiki():
    """Return {wikiName: (effect, expert, level or None)} from the '- ...' lines."""
    out = {}
    for line in open(WIKI, encoding="utf-8"):
        line = line.strip()
        if not line.startswith("- ") or "|" not in line:
            continue
        parts = [p.strip() for p in line[2:].split("|")]
        if len(parts) < 3:
            continue
        name, effect, expert = parts[0], parts[1], parts[2]
        level = None
        if len(parts) >= 4:
            m = re.search(r"\d+", parts[3])
            if m:
                level = int(m.group())
        out[name] = (effect, expert, level)
    return out

def main():
    catalog_ids = {s["name"] for s in json.load(open(CATALOG, encoding="utf-8"))["skills"]}
    wiki = parse_wiki()

    skills, unmatched_sd, bad_map = {}, [], []
    for name, sd in NAME_TO_SD.items():
        if sd not in catalog_ids:
            bad_map.append((name, sd))
            continue
        if name not in wiki:
            bad_map.append((name, sd + " (no wiki line)"))
            continue
        effect, expert, level = wiki[name]
        skills[sd] = {
            "wikiName": name,
            "effect": effect,
            "expert": expert,
            "unlockLevel": level,
            "source": "fandom",
        }

    covered = set(skills)
    unmatched_sd = sorted(catalog_ids - covered)

    out = {
        "source": "fandom",
        "attribution": "No More Room in Hell 2 Wiki on Fandom (CC-BY-SA). "
                       "https://no-more-room-in-hell-two.fandom.com/wiki/Skills",
        "note": "Skill effects/unlock levels are community-sourced (wiki), not decoded "
                "from files — magnitudes live in Blueprint GameplayEffects.",
        "skills": skills,
    }
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=1)

    print("Wrote", OUT)
    print(f"  skills with wiki data: {len(skills)} / {len(catalog_ids)}")
    if bad_map:
        print("  !! mapping problems:", bad_map)
    print(f"  from-files skills still name-only ({len(unmatched_sd)}):")
    print("   ", ", ".join(unmatched_sd))

if __name__ == "__main__":
    main()
