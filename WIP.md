# WIP: NMRIH2 toolkit (resume here)

**Last worked:** 2026-10-31. **Status: rebooted as Kill Chain, live.**

The site is now one page built on the NMRiH2 Info Compendium by @SchwarzFenrir. See README.md for layout and refresh steps.

- Everything hangs off one state object in `site/app.js`, mirrored in the URL hash so setups can be shared.
- Math lives in `site/engine.js`. Add a perk effect to `FX` and it flows to the kill board, weapon panel and perk details.
- `tools/build_intel.py` regenerates `site/intel.js` from the live sheet. It stops if the sheet's layout or the curated rules' source text changes.
- Decisions: the Infection tab's 60% table beats the older "below 50%" player tip. The 1.2 patch note that Stamina Starved no longer hits firearms beats the older Mechanics note, so guns ignore it. The old catalog-only sections (recipes, challenges, responder backgrounds) were dropped and remain in git history.
- Open courtesy: the sheet has no stated license. Let @SchwarzFenrir know about the site on the NMRiH Discord and follow their wishes.

Everything below documents the game-file pipeline, which still supplies icons, map art and the Mutated stats. Its references to the old site's tabs and `build_site_data.py`/`data.js` are history.

---

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
