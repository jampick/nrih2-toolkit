# WIP — NMRIH2 Toolkit (resume here)

**Last worked:** 2026-08-29. **Goal:** an Icarus-Toolkit-style player guide/tools site for
No More Room in Hell 2, built from the game's own files, enriched with community-wiki numbers.

**PUBLISHED:** https://jampick.github.io/nrih2-toolkit/ (repo: github.com/jampick/nrih2-toolkit,
GitHub Pages via .github/workflows/deploy.yml — push to main auto-deploys). Live site shows real
from-files weapon/melee/throwable/zombie stats (47 cards, "from files" badge + expandable full
attribute lists) AND wiki-sourced skill effects (44/66 skills: Effect + Expert effect + Expert
unlock level, "from wiki" badge, Fandom CC-BY-SA credited in footer). 22 unreleased skills stay
name-only. Verified rendering in browser. **The site is feature-complete for current game content.**

## TL;DR of where we are
- Full **from-files catalog** is DONE and is the backbone (names/paths/structure).
- **BREAKTHROUGH (2026-08-29): real from-files numbers are now UNLOCKED, ToS-safely,** via a
  **foreign UE 5.6.1 usmap** (no injection, no EAC — just a downloaded mappings file). It decodes
  everything stored in native `UCurveTable` assets, which turns out to be the **entire weapon /
  melee / throwable / zombie / item stat backbone.** Verified: `CT_ItemAttributes_M14` gives
  Damage=35, HeadshotDamage=150, LimbDamage=50, AmmoCapacity=20, RateOfFire=0.05, full recoil/
  spread/penetration/range — a complete stat sheet, per weapon. Raw JSON in `data/stats-raw/`.
- **Still wiki-only: SKILLS.** The 66 skills' numeric effects live in Blueprint `GE_` GameplayEffect
  CDOs, whose property layout is game-specific and NOT in a foreign usmap, so they deserialize empty.
  A native usmap would fix this but needs EAC injection (declined). Skills stay on the wiki overlay.
- A **names-only site** is already built and works (`site/`). Next: merge the real curve-table stats
  (weapons/zombies) + wiki skill stats into the site.

## The EAC blocker (why we pivoted to wiki data)
Game is UE5.6, paks are unencrypted but use unversioned properties -> need a `.usmap` to decode
stats. No public usmap exists. Generating one needs UE4SS injected into the running game, but this
title arms EAC from inside the shipping exe (via `EOSSDK-Win64-Shipping.dll`), so UE4SS is blocked
(error `0xc0e90002`). Defeating EAC = ToS/account risk; we declined. UE4SS was removed from the
game folder (install is clean). If a usmap ever appears at `data/mappings/Mappings.usmap`, the
extractor (`tools/extractor`) can produce pure from-files numbers — pipeline is ready (see README).

## usmap revisited (2026-08-29) — the ToS-SAFE way forward: a FOREIGN UE 5.6 usmap
Researched the modding community (FModel/CUE4Parse Discussions, Unreal-Mappings-Archive, Nexus,
UE4SS docs). Conclusions:
- **Every self-generation tool needs the LIVE process** — UE4SS, Dumper-7, UnrealMappingsDumper all
  inject a DLL / load into the running game. NMRiH2 runs **kernel-level EAC** and hosts all MP on
  Torn Banner's own cloud servers (NO downloadable dedicated-server exe to target offline). So there
  is no safe self-generate route. Declining injection was correct — kernel AC + inject = worst case.
- **The safe route: use a usmap from a DIFFERENT UE 5.6.x game.** Per FModel Discussion #418, a
  cross-game usmap correctly decodes all **engine + shared-plugin types** (UCurveTable, UDataTable,
  and the **GAS** GameplayEffect/GameplayAbility classes). Only a game's *custom* UStructs fail.
  This is a plain file download — **zero injection, zero EAC contact, no ToS issue at all.**
- **Why this should unlock most of our numbers:** the stats we want live largely in engine/plugin
  types — `CT_ATT_*` zombie curve tables + weapon `DamageFalloff` (UCurveTable = engine, should
  decode), and `GE_` gameplay effects (GAS plugin = shared, should decode). Torn Banner's custom
  `AES_`/skill data-asset subclasses may not map (top-level class must be known to deserialize) —
  those stay "stats pending", same honesty policy as the wiki overlay.
- **Sources to get a UE 5.6 usmap (needs your Nexus login to download):** "Mixtape Mappings.usmap
  – UE 5.6.1" (nexusmods.com/mixtape/mods/9), Outer Worlds 2, Silent Hill f, Oblivion Remastered
  (all UE 5.6-era). Prefer the highest 5.6.x. Also TheNaeem/Unreal-Mappings-Archive on GitHub.

### usmap path — DONE, here's what landed (2026-08-29)
- usmap in place: `data/mappings/Mappings.usmap` = `NewMoon-5.6.1-0+UE5-dd6777a8.usmap` (Mixtape /
  "NewMoon", UE 5.6.1). Downloaded from Nexus by user; zip verified clean (1 file, usmap magic
  `C4 30`, no exe). Extractor cmd:
  `dotnet run -- export ../../data/stats-raw <filter> GAME_UE5_6 ../../data/mappings/Mappings.usmap`
- **WORKS (real numbers, in `data/stats-raw/`):** 59 `UCurveTable` files —
  `CT_ItemAttributes_*` (all firearms/melee/throwables), `CT_ATT_Zomb_*` (all zombie types),
  `CT_Tunables_AI`, `CT_ItemAttributes_Battery/Medical`, weapon `DamageFalloff` curves.
- **DOESN'T work (empty on foreign usmap):** Blueprint `GE_` GameplayEffects (325 empty CDOs) =
  skill magnitudes; and BP-defined props on `AES_` sets. Needs native usmap (EAC-blocked). → wiki.

### NEXT STEPS (revised)
1. **Author `data/stats/stats.json` from `data/stats-raw/` curve tables** — parse each
   `CT_ItemAttributes_*` (row name -> value) and `CT_ATT_Zomb_*` into the overlay keyed by from-files
   ID, `source:"files"`. This replaces the wiki weapon/zombie numbers with REAL ones.
2. **Skills stay wiki** (`source:"fandom"`) — BP-GAS magnitudes don't decode. Keep the wiki-raw
   mapping tables for SD_ ids.
3. Merge overlay in `build_site_data.py`, render stat rows + source badges in `site/app.js`.
4. Rebuild + verify in browser, screenshot, tell user.
Note: the two sources are complementary — files for weapons/zombies/items, wiki for skills.

## What's DONE
- `tools/extractor` — CUE4Parse app; mounts paks (76,637 files), can export JSON *with* a usmap.
  - `dotnet run -- list GAME_UE5_6` -> `bin/Debug/net10.0/file_list.txt`
  - `dotnet run -- export <out> <filter> GAME_UE5_6 <usmap>` (needs usmap; blocked)
- `tools/build_catalog.ps1` -> `data/catalog/catalog.json` (names/paths of everything).
- `tools/build_site_data.py` -> `site/data.js` (categorized, display-ready; `hasStats:false`).
- `site/` — static site (index.html, style.css, app.js). Tabs: Skills, Firearms, Melee,
  Throwables, Consumables, Gear, Attachments, Recipes, Zombies, Challenges. Search + filters.
  Serve it: `cd site && python -m http.server 8791` then open localhost (file:// is blocked by the
  Chrome ext, and fetch isn't used anyway — data.js is inline).
- `tools/generate_usmap.ps1` + `tools/ue4ss/` — the (blocked) usmap route, kept for reference/if
  a non-EAC path emerges. Do NOT run against the live EAC game.

## Wiki data GATHERED so far (raw, in `data/wiki-raw/`)
- `fandom-weapons.md` — melee tiers/damage-type/descriptions; firearms caliber+mag+headshot
  breakpoints+attachment compat; attachment compatibility lists. (~13 guns detailed of 33 in files.)
- `fandom-skills.md` — ~48 skills: base effect + Expert(=Ultimate) effect + Expert unlock account
  level, PLUS a best-effort wiki-name -> from-files SD_ id mapping table.
- `fandom-enemies-equipment.md` — 8 zombie types w/ behaviors; General Gear shop prices/levels;
  supply-item XP values; progression milestones.

Primary source = **Fandom wiki** (`no-more-room-in-hell-two.fandom.com`), CC-BY-SA (must attribute).
Secondary = `nmrih2wiki.org` (guide prose, tier lists — good for weapon tier rankings, light on
hard numbers). WebFetch is BLOCKED (403/402) on both — must use the **Chrome browser tools**
(navigate + get_page_text) to read them.

## NEXT STEPS (in order)
1. **Finish gathering** the Equipment sub-tabs not yet captured: Passive Gear, Medical Gear,
   Throwable Gear, Melee Gear, Firearms (prices + level reqs) from
   `.../wiki/Equipment`. Also grab per-weapon pages if they have more numbers, and
   `nmrih2wiki.org` Weapons Tier List for tier rankings.
2. **Author `data/stats/stats.json`** — a hand-built overlay keyed by from-files ID, e.g.
   `{ "skills": { "SD_Athlete": {"effect":"Increased stamina","ultimate":"Greatly increased
   stamina","unlockLevel":72,"source":"fandom"} }, "firearms": { "M14": {"caliber":".308 Win",
   "mag":"20+1", ...} } }`. Use the mapping tables in the wiki-raw files. Every entry carries a
   `source` field for attribution.
3. **Update `tools/build_site_data.py`** to merge `stats.json` onto the catalog by ID, set
   `hasStats:true`, and attach a per-field `source`. Leave "stats pending" where no wiki data.
4. **Update `site/app.js` + `style.css`** to render the stat rows and a small source badge/footer
   ("Numbers: Fandom wiki, CC-BY-SA" + link). Add weapon compare view if time allows.
5. **Rebuild + verify** in browser (screenshot), then tell the user.

## Coverage reality (set expectations)
Wikis cover the CORE game well (the ~13 released guns, ~48 skills, 8 enemy types) but NOT every
from-files asset (paks have 33 gun AES sets, 66 skills — extras are likely unreleased/renamed
internal content). So the hybrid site will show real numbers for released content and
"stats pending" for the rest. That's honest and still the strongest available guide.

## Task IDs (this session): #6 weapons, #7 skills, #8 items/zombies, #9 merge+site.
