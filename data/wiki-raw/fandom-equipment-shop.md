# Fandom wiki — Equipment page, ALL Loadout Shop tabs (captured 2026-08-29)
Source (CC-BY-SA): https://no-more-room-in-hell-two.fandom.com/wiki/Equipment
Captured via Chrome tabber-panel DOM dump (item names live in image alt text).
Format: name | description | requirements | price. "CharLv"=Character Level, "NM"=Nightmare Level.

## General Gear
- Barricade Stack — 5 wood boards, barricade entry points | AcctLv17 | 500cr
- Flashlight Batteries — pack of D-Cell, replace flashlight batteries | AcctLv13 | 500cr
- Deployable Worklight — internally-powered halogen | AcctLv28 | 1,000cr
- Deployable Radio — portable AM/FM, loud distraction | AcctLv58 | 1,500cr
- Ammo Box — assorted firearm ammo, shareable | AcctLv73 + CharLv20 | 10,000cr

## Ammunition (all boxes of 10, all 3,000cr)
- .308 Win | AcctLv43 — Hunter 85, M14
- .357 Magnum | AcctLv18 — Model 13, Rochester 1873
- .45 ACP | AcctLv26 — M1911
- 5.56 NATO | AcctLv61 — MC-15
- 6.8x51mm | AcctLv68 — M7A1
- 9mm | AcctLv53 — M93A3, MP5
- 12ga (00 buckshot) | AcctLv38 — Fierra DB12, 590A1

## Passive Gear
- Nailer — reduces barricading time (electric nail gun) | AcctLv56 | 3,000cr
- Ranger Boots — reduces movement noise | AcctLv66 + CharLv20 | 5,000cr
- Adrenaline Shot — greatly increases max stamina (epinephrine injector) | AcctLv78 + CharLv40 | 10,000cr
- Body Armor — reduces damage taken (aramid vest) | AcctLv86 + CharLv40 + NM3 | 12,000cr
- Satchel — increases inventory space | AcctLv92 + CharLv40 + NM30 | 15,000cr

## Medical Gear
- Bandages — moderately restores health | AcctLv8 | 1,500cr
- Medkit — greatly restores health | AcctLv22 + CharLv20 | 3,000cr
- Pills — temporarily staves off infection, only usable when infected | AcctLv42 + CharLv20 + NM15 | 5,000cr
- Mass Casualty Kit — HERA kit: 2 Pills, 4 Bandages, 1 m[edkit?] (desc cut) | AcctLv76 + CharLv20 | 10,000cr
- Revive Syringe — revives you at full health | AcctLv95 + CharLv40 + NM20 | 15,000cr
- Gene Therapy — one-time experimental DNA cure, possible side effects | AcctLv100 + CharLv40 + NM50 | 20,000cr

## Throwable Gear
- Prox IED — plant on ground, detonates on first mover | AcctLv11 | 1,500cr
- Pipe Bomb — shrapnel + concussive force, throw to draw attention | AcctLv33 + CharLv20 | 2,000cr
- Frag (M67) — 3.6s fuse, lethal within 5m | AcctLv47 + CharLv40 + NM1 | 3,000cr

## Melee Gear
- Small Pipe — 1H blunt light | Default weapon | 0cr
- Long Pipe — 2H blunt heavy | AcctLv2 | 2,000cr
- Kitchen Knife — 1H sharp light | AcctLv3 | 2,000cr
- Rebar — 2H blunt heavy | AcctLv4 | 2,000cr
- Tire Iron — 1H blunt light | AcctLv5 | 2,000cr
- Large Wrench — 2H blunt heavy | AcctLv6 | 2,000cr
- Adjustable Wrench — 1H blunt light | AcctLv15 | 2,000cr

## Firearms (only 2 listed on wiki as of capture)
- Model 13 — 1H .357 revolver | Default weapon | 0cr
- Fierra DB12 — 2H over-under 12ga | AcctLv10 | 5,000cr

## Mapping note (shop name -> catalog id)
Bandages->ID_Consumable_Bandage | Medkit->ID_Consumable_Medkit | Pills->ID_Consumable_PhalanxPills |
MCK->ID_Consumable_MassCasualtyKit | Revive Syringe->ID_Consumable_StimPack |
Gene Therapy->ID_Consumable_GeneTherapy | Adrenaline Shot->ID_Consumable_Adrenaline |
Prox IED->AES_ProximityExplosive | Pipe Bomb->AES_Pipebomb | Frag->AES_Grenade_M67 |
Small Pipe->BP_PipeSmall | Long Pipe->BP_Pipe | Kitchen Knife->BP_KnifeSmall (only 1H sharp light
knife in the catalog; moderate confidence) | Rebar->BP_Rebar | Tire Iron->BP_TireIron |
Large Wrench->BP_WrenchLarge | Adjustable Wrench->BP_WrenchSmall | Model 13->AES_Model13 |
Fierra DB12->AES_CoachGun. Passive/General Gear items have NO catalog counterparts (the site's Gear
tab = ID_Permanent_* field-found items, which are not in the shop).
