# WIP — NMRIH2 Toolkit (resume here)

**Last worked:** 2026-08-29. **Status: LIVE and feature-complete for current game content.**
**Goal:** an Icarus-Toolkit-style player guide for No More Room in Hell 2, built from the game's
own files, enriched with community-wiki numbers.

- **Live site:** https://jampick.github.io/nrih2-toolkit/
- **Repo:** github.com/jampick/nrih2-toolkit (gh auth = `jampick`). GitHub Pages via
  `.github/workflows/deploy.yml` — **push to `main` auto-deploys** the `site/` folder (~20s).
- **Game install:** `E:\SteamLibrary\steamapps\common\nmrih2` (Steam appid 292000, UE5.6).

## What the live site shows
- **Firearms** — real from-files stats (16 with full sheets; unreleased guns show "no stat table"),
  game-file icon, and a clear **AMMO row** (caliber + ammo icon) for the 11 released guns.
  **Bullets Per Shot** is promoted next to damage so shotguns read correctly (17 dmg × 10 pellets).
- **Zombie Math panel** (firearms + melee) — "Shots to drop" / "Heavy swings to drop" per zombie
  type, computed in `build_site_data.py::kill_math` from real zombie `Health.MaxHealth` vs weapon
  damage (× pellets for shotguns; melee uses best of quick/strong/heavy). Rows with equal counts
  merge into HP ranges ("Child → Walker Prime"); green highlight + "one-tap" line for head-kills.
  Deliberately NOT DPS: files' RateOfFire is junk-authored (0 for Winchester, 0.02 for a pistol).
- **Firearm filters** — chip groups for **Type** (Handgun/SMG/Shotgun/Rifle/Sniper; hand-assigned
  `GUNTYPE` map in `build_site_data.py`, mirrors the skill trees) and **Ammo** (caliber, 11 guns).
  Search also matches caliber/category. Filter UI is multi-facet (`FACETS` in app.js).
- **Melee** (18/18) / **Throwables** — real stats + icons + rarity.
- **Zombies** (10 profiles incl. **Prime** elites) — real stats from `CT_ATT_Zomb_*`, Adult/Child/Prime filters.
- **Skills** (66) — wiki-sourced Effect / Expert effect / Expert unlock level for 44; icons for 53.
  22 unreleased skills are name-only.
- **Consumables / Gear / Attachments** — names + icons, plus a **wiki shop overlay**
  (`data/stats/equipment.json`, raw capture `data/wiki-raw/fandom-equipment-shop.md`): effect
  text, Loadout-Shop price + unlock reqs (blue **Shop** strip), attachment friendly names +
  "Fits" gun lists. Shop prices also on mapped melee/firearms/throwables; ammo-box price+level
  shown in the AMMO row. Coverage: 7/19 consumables, 4/19 gear, 8/19 attachments (the rest
  aren't in the wiki's shop tables — field-found items).
- **Recipes / Challenges** — names + icons where available.
- **Responders** (75 background types + 6 voice sets) — the pre-outbreak jobs a generated
  Responder can roll, read from `DT_CharacterBackgrounds` (row names / loc keys only; the
  `KCharacterBackground` row struct is game-native so props don't decode, and display text
  lives in a runtime string table `UI_Progression` not shipped in the paks). Voice sets =
  `Data/VoiceSets/VS_{Hooper,King,Lynch,Roje,Romero,Wright}` (NMRiH1 cast homage), each with
  Male/Female variants (per the customization VO events). Overlay: `data/stats/responders.json`
  (the "type" buckets there are OUR editorial grouping, like GUNTYPE). Neither wiki documents
  responders (checked 2026-08-29: Fandom Responders page is empty; nmrih2wiki.org has none).
  Starter-skill-per-background mapping is NOT in the files (skills don't reference backgrounds
  either; likely Blueprint logic) - name-only until a native usmap or wiki coverage appears.
- Source tags everywhere: green **from files** (decoded) vs blue **from wiki** (Fandom, CC-BY-SA).
- **Spooky header hero** = a random in-game map loading-screen behind a dark wash (per visit).
- **Favicon/app icon** = fire-axe game icon, diagonal on dark w/ red ring (`site/icons/`,
  `site/favicon.ico`, `site.webmanifest` for add-to-home-screen). Generator inline in git
  history (Pillow one-off, commit "Site icon").

## How the numbers were unlocked (the key insight)
Paks are unencrypted but use UE5 **unversioned properties**, so decoding needs a `.usmap`.
Self-generating one needs UE4SS/Dumper injected into the running game → **kernel-level EAC**
(no downloadable dedicated-server exe to target offline) → ToS/account risk → **declined**.
**Solution: a FOREIGN UE 5.6.1 usmap** (`data/mappings/Mappings.usmap` = NewMoon/Mixtape from
Nexus; git-ignored, not ours to redistribute). A cross-game usmap decodes all **engine +
shared-plugin** types — which is exactly where our numbers live: `UCurveTable` = weapon/melee/
throwable/zombie/item stats. **Blueprint `GE_` GameplayEffects (skill magnitudes) do NOT decode**
with a foreign usmap → skills use the wiki overlay instead.

## Pipeline (all under `tools/`)
```
extractor/        .NET/CUE4Parse app. Commands:
  list   GAME_UE5_6                                  -> bin/.../file_list.txt (76,637 files)
  export <out> <filter> GAME_UE5_6 <usmap>           -> asset JSON (stats)
  texture <out> <filter> GAME_UE5_6 <usmap>          -> PNG (only uncompressed; BC7/DXT FAIL, see below)
  texraw  <out> <filter> GAME_UE5_6 <usmap>          -> raw mip bytes + manifest.txt (BC7/DXT workaround)
build_catalog.ps1        -> data/catalog/catalog.json (names/paths of everything)
build_stats.py           -> data/stats/stats.json    (curve tables: weapons/zombies/items)
build_skill_stats.py     -> data/stats/skills.json   (Fandom wiki skill effects, name->SD_ map)
decode_images.py         -> data/images-png/*.png     (BC7/DXT icons -> cropped web PNGs, 256px)
decode_flavor.py         -> site/img/flavor/*.jpg     (map loading-screens -> 1600px JPEGs)
match_images.py          -> site/img/* + data/images/images.json (icon<->item/skill matching)
build_site_data.py       -> site/data.js             (merges catalog + all overlays + images)
```
`data/stats/ammo.json` = hand-authored firearm calibers (wiki, 11 released guns).

## Refresh after a game update (in order)
1. `cd tools/extractor && dotnet run -- list GAME_UE5_6` (+ `build_catalog.ps1` if roster changed)
2. `dotnet run -- export ../../data/stats-raw CT_ItemAttributes GAME_UE5_6 ../../data/mappings/Mappings.usmap`
   and again with filter `CT_ATT_Zomb`.  Then `python tools/build_stats.py`.
3. For icons: `dotnet run -- texraw ../../data/rawmip "UI/Icons/<Cat>/" ...` per category, then
   `python tools/decode_images.py` and `python tools/match_images.py`.
4. `python tools/build_skill_stats.py` (skills) — re-check the name->SD_ map if skills were added.
5. `python tools/build_site_data.py`, then `git add -A && git commit && git push` (auto-deploys).
6. Verify live (browser can't reach localhost here — check the https Pages URL after deploy).

## Gotchas / hard-won facts (don't relearn these)
- **Texture decode:** CUE4Parse's native detex ISN'T shipped ("Detex decompression failed: not
  initialized") so the `texture` cmd fails on BC7/DXT. Workaround = `texraw` dumps raw mips, Python
  `texture2ddecoder` (pip) + Pillow decompresses. Formats seen: PF_BC7, PF_DXT1, PF_DXT5.
- **Version pin:** extractor pinned to **CUE4Parse 1.2.2.202607** to match CUE4Parse-Conversion
  .202607 (was .202608 → PixelFormatUtils field-not-found). Don't bump one without the other.
- **Consumables/gear/attachments have NO decodable stats** (verified 2026-08-29): `ID_Consumable_*`
  export fine but come out as EMPTY `KConsumableItemAsset` shells — game-native K-classes, same
  foreign-usmap wall as `GE_` skills. Only 42 `CT_ItemAttributes_*` tables exist (weapons+Battery+
  Medical). Way forward = wiki overlay: Fandom Equipment page tabs (Passive/Medical/Throwable/
  Melee/Firearms Gear) hold per-item price + account level; see RE-VISIT note in
  `data/wiki-raw/fandom-enemies-equipment.md`.
- **Icon matching:** exact + explicit alias ONLY. A fuzzy-substring fallback caused false hits
  (MP5 rail grabbing the MP5 gun; Large/Small attachment collisions). If coverage looks low, add an
  alias in `match_images.py` — never re-enable substring matching.
- **Icons live at** `NMRiH2/Content/UI/Icons/{Guns,Melee,Throwables,Meds,Gear,Attachments,Skills,Ammo}/`
  (`_Textured_Icn` preferred). Flavor = `NMRiH2/Content/Textures/UI/LoadingScreen/`.
- **Serve locally:** `cd site && python -m http.server 8791` → http://localhost (file:// blocked;
  data.js is inline so no fetch needed). The Chrome-extension screenshots can't reach localhost in
  this env — verify on the deployed URL instead.

## .gitignore (what's NOT committed)
`data/mappings/*.usmap` (foreign, not ours to redistribute), `data/stats-raw/`, `data/rawmip/`,
`data/rawflavor/`, `data/images-png/`, extractor `bin/obj`, `tools/ue4ss/`, and the old
`tools/generate_usmap.ps1` (the abandoned ToS-risky UE4SS route). `site/img/` (~7MB) IS committed.

## Data sources & attribution
- **From files** (decoded): weapon/melee/throwable/zombie/item stats + all icons + flavor images.
- **Fandom wiki** (CC-BY-SA, credited in footer): skill effects/levels + firearm calibers. Raw
  captures in `data/wiki-raw/` (`fandom-skills.md`, `fandom-weapons.md`, `fandom-enemies-equipment.md`).
  WebFetch is blocked on the wikis (403/402) — read via Chrome tools (navigate + get_page_text).

## Possible future work (all optional; site is complete as-is)
- Wire remaining wiki numbers: gear/consumable prices + level reqs, weapon tier lists
  (nmrih2wiki.org), attachment compatibility per gun.
- Calibers for the newer from-files guns not on the wiki (DT11, RX12, Gruber*, BauerPrecision).
- Weapon compare view; zombie resistance breakdown; skill icons for the 13 unmatched skills.
- If a NATIVE NMRiH2 usmap ever appears (non-EAC path), `GE_` skill magnitudes become decodable —
  the extractor pipeline is already set up for it.
