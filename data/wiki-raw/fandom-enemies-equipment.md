# Fandom wiki — Enemies + Equipment/Progression (captured 2026-08-29)
Sources (CC-BY-SA):
- https://no-more-room-in-hell-two.fandom.com/wiki/Enemies
- https://no-more-room-in-hell-two.fandom.com/wiki/Equipment
- https://no-more-room-in-hell-two.fandom.com/wiki/Progression

## Enemies (8 zombie types)
General: 2 heavy head attacks kill most zombies (except Prime + armor).
- Walkers — standard slow zombies; dangerous in numbers. (from-files: CT_ATT_Zomb_Adult_WLK)
- Runners — look like walkers but run; rapid screams; spawn more on unsuppressed fire / high-danger
  zones; can also be special variants (Firefighter/Riot). (CT_ATT_Zomb_*_RNR)
- Shamblers — flesh & bones, gas cloud aura; small screams then a LOUD scream that spawns more
  Walkers/Runners/Primes; on death gas cloud ~20s = high infection chance; zombies passing through
  become more infectious. (CT_ATT_Zomb_*_SHA)
- Prime Zombies ("red") — bloodied, glowing red eyes; recently fed, stronger, take & deal more
  damage. Need 2 headshots from many guns vs 1 for normal. (CT_ATT_Zomb_Adult_MUT = "Mutated"?)
- Construction Workers — Walkers w/ hardhat; ~2 melee strikes to knock hat off before head damage.
- Firefighters — helmet (like hardhat) + oxygen tank; shooting tank -> squeal then explosion that
  knocks down nearby zombies.
- Riot Police — full body armor, sometimes riot shields; armor/shield highly resistant to melee &
  guns, destroyable after a few hits.
- National Guard — (unfinalized) like Riot Police but head protection takes 2x hits, resistant to
  knockback; kicks only apply heavy stagger.

Child variants exist in files (CT_ATT_Zomb_Child_RNR/SHA/WLK).

## Equipment — Loadout Shop (General Gear only captured; page has more tabs)
Tabs on page: General Gear, Ammunition, Passive Gear, Medical Gear, Throwable Gear, Melee Gear, Firearms.
General Gear captured (name inferred from desc | account level | price):
- Barricade boards (stack of 5) — barricade entry points | Lv17 | 500cr
- D-Cell batteries — replace flashlight batteries | Lv13 | 500cr
- Work Light (deployable halogen) — illuminate spaces | Lv28 | 1,000cr
- Radio (portable AM/FM, deployable) — loud noise distraction | Lv58 | 1,500cr
- Ammo Crate (assorted firearm ammo, shareable) | Lv73 + Char Lv20 | 10,000cr
NOTE: ALL Equipment tabs now captured in `fandom-equipment-shop.md` (2026-08-29) and wired into
the site via `data/stats/equipment.json`.

## Progression / Supplies (XP pickups; do not take inventory slots except Critical)
- Small Computing/Camp Supplies — 25 pts
- Medium Computing Supplies — 100 pts (a variant exists)
- Large Computing/Camping Supplies — 500 pts
- Critical Clinical Supplies — 5000 pts (TAKES an inventory slot)
Responder perks unlock at levels 5,10,15,20,30,40,50 (max 50, resets on death). Account level
unlocks perks into the pool (does not reset).
