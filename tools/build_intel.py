#!/usr/bin/env python3
"""Build site/intel.js from the NMRiH2 Info Compendium (by @SchwarzFenrir and contributors).

    python tools/build_intel.py            # fetch the live sheet, then build
    python tools/build_intel.py --cache D  # read <D>/<gid>.csv and <D>/home.html instead of fetching

The raw CSVs are not committed. The sheet is someone else's work and the live copy is the
one that should get read and corrected, so we keep only the parsed facts the site uses.

Sheet layouts shift when the sheet gets edited, so anything we can't find fails the build
(see `need` and the asserts at the bottom) rather than shipping a silently wrong number.
"""
import csv, html, io, json, os, re, sys, urllib.parse, urllib.request, datetime

BASE = ('https://docs.google.com/spreadsheets/d/e/2PACX-1vRYRiLDS0qkszc2GgVRzTiNy46i-'
        'JaatWB2qbgsufwzwpCbyZCBqcaQ3avoYnLEAiif-ZYJLD-OD5rW')
TABS = {
    'home': 834458701, 'perks': 160707575, 'professions': 1243812137, 'exp': 345628904,
    'maps': 903970191, 'difficulty': 703432921, 'mechanics': 1249881909, 'passives': 1928548077,
    'guns': 2130222439, 'melee': 545299304, 'other': 1433700980, 'economy': 1486487671,
    'weekly': 2067372352, 'retirement': 844150941, 'zombies': 1426584761, 'infection': 359394605,
    'spawning': 485286560, 'stimuli': 687627877, 'unlocks': 2106950113, 'misc': 115969216,
    'tips': 1659569103, 'audio': 408040571, 'extracts': 1304165467, 'events': 1979088375,
    'changelog': 1779231848,
}
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def load(cache):
    tabs, raw = {}, {}
    if cache:
        with open(os.path.join(cache, 'home.html'), encoding='utf8') as f:
            home_html = f.read()
    else:
        home_html = urllib.request.urlopen(f'{BASE}/pubhtml/sheet?headers=false&gid={TABS["home"]}', timeout=60).read().decode('utf8')
    for name, gid in TABS.items():
        if cache:
            with open(os.path.join(cache, f'{gid}.csv'), encoding='utf8') as f:
                text = f.read()
        else:
            url = f'{BASE}/pub?gid={gid}&single=true&output=csv'
            text = urllib.request.urlopen(url, timeout=60).read().decode('utf8')
        raw[name] = text
        tabs[name] = list(csv.reader(io.StringIO(text)))
    return tabs, raw, home_html


def need(raw, tab, *strings):
    """Hand-curated facts below cite the sheet text they came from. If it changed, stop."""
    for s in strings:
        if s not in raw[tab]:
            raise SystemExit(f'build_intel: "{s}" no longer in the {tab} tab, recheck the curated facts')


def cell(row, i):
    return row[i].strip() if i < len(row) else ''


def num(s):
    s = str(s).replace(',', '').replace('%', '').strip()
    m = re.fullmatch(r'-?\d+(\.\d+)?', s)
    return float(s) if m and '.' in s else int(s) if m else None


def slug(s):
    return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')


# ---- guns ---------------------------------------------------------------------------------
GUN_ALIASES = {  # sheet name -> (display name, game icon)
    'Double Barrel Shotgun DT11': ('Fierra DB12', 'AES_DT11'), 'M590A1': ('M590A1', 'AES_590A1'),
    'X12 Super': ('X12 Super', 'AES_RX12'), 'M9A3': ('M9A3', 'AES_M9A1'),
    'Model 13': ('Model 13', 'AES_Model13'), 'M1911': ('M1911A1', 'AES_1911'),
    'Gruber MKVII': ('Gruber MKVII', 'AES_GruberMkVII'), 'MP5A4': ('MP5A4', 'AES_MP5'),
    'MC15': ('MC-15', 'AES_MC15'), 'Gruber Ranch Rifle': ('Gruber Ranch', 'AES_GruberRanch'),
    'M7A1': ('M7A1', 'AES_M7'), 'Gruber 922 (Ruger 10/22)': ('Gruber 922', 'AES_Gruber922'),
    'Rochester 1873': ('Rochester 1873', 'AES_Winchester_1873'), 'Hunter 85': ('Hunter 85', 'AES_Hunter85'),
    'M14 Battle Rifle': ('M14 Battle Rifle', 'AES_M14'),
}
GUN_FIELDS = {'Damage': 'dmg', 'Headshot Damage': 'head', 'Limb Damage': 'limb', 'Stability Damage': 'stab',
              'Damage Falloff Per Pen': 'penFalloff', 'Base # Penetration': 'pen', 'Pellets': 'pellets'}


def parse_guns(rows):
    guns, cur, klass = [], None, None
    for r in rows[3:]:
        if cell(r, 0):
            klass = cell(r, 0)
        if cell(r, 1):
            key = ' '.join(cell(r, 1).split())
            name, icon = GUN_ALIASES[key]
            cur = {'id': slug(name), 'kind': 'gun', 'name': name, 'icon': icon, 'cls': klass,
                   'pen': 0, 'pellets': 1, 'penFalloff': None}
            guns.append(cur)
        if not cur:
            continue
        label, val = cell(r, 4), cell(r, 5)
        if label in GUN_FIELDS:
            cur[GUN_FIELDS[label]] = num(val)
        elif label == 'Ammo Capacity':
            cur['mag'] = val
            cur['magN'] = sum(int(x) for x in val.split('+'))
            cur['ammo'] = cell(r, 6)
        elif label == 'Range':
            cur['range'] = num(val.rstrip('m'))
            cur['kg'] = float(cell(r, 2).upper().replace('KG', ''))
            cur['ammoMinKg'] = float(cell(r, 7).split('KG')[0])
        elif label == 'Sound Range':
            cur['sound'] = num(val.rstrip('m'))
            cur['roundKg'] = float(cell(r, 7).split('KG')[0])
    return guns


# ---- melee --------------------------------------------------------------------------------
MELEE_ICONS = {
    'Kitchen Knife': 'AES_KitchenKnife', 'Cleaver': 'BP_Cleaver', 'Hatchet': 'BP_HatchetWoodsman',
    'Machete': 'BP_Machete', 'Shovel': 'AES_Shovel', 'Fire Axe': 'BP_FireAxe', 'Treetrimmer': 'BP_TreeTrimmer',
    'Claw Hammer': 'BP_ClawHammer', 'Pipe (Small)': 'BP_PipeSmall', 'Wrench (Small)': 'BP_WrenchSmall',
    'Tire Iron': 'BP_TireIron', 'Mallet': 'BP_Mallet', 'Crowbar': 'BP_Crowbar', 'Rebar': 'BP_Rebar',
    'Wrench (Large)': 'BP_WrenchLarge', 'Baseball Bat': 'BP_BaseballBat', 'Pipe (Large)': 'BP_Pipe',
    'Sledge Hammer': 'BP_Sledge', 'Hockey Stick': 'BP_HockeyStick',
}
MELEE_ROWS = {
    'Damage': ('light', 'dmg'), 'Strong Damage': ('strong', 'dmg'), 'Charged Damage': ('charged', 'dmg'),
    'Headshot Damage': ('light', 'head'), 'Strong Headshot Damage': ('strong', 'head'),
    'Charged Headshot Damage': ('charged', 'head'), 'Limb Damage': ('light', 'limb'),
    'Strong Limb Damage': ('strong', 'limb'), 'Charged Limb Damage': ('charged', 'limb'),
    'Stability Damage': ('light', 'stab'), 'Strong Stability Damage': ('strong', 'stab'),
    'Charged Stability Damage': ('charged', 'stab'),
}
MELEE_COST = {'Damage': 'light', 'Strong Damage': 'strong', 'Charged Damage': 'charged'}
MELEE_SIDE = {'Secondary Hit Dmg Multiplier': 'cleave2', 'Tertiary Hit Dmg Multiplier': 'cleave3',
              'Secondary Stab Dmg Multiplier': 'stab2', 'Tertiary Stability Dmg Multiplier': 'stab3'}
MELEE_THROW = {'Throw Damage': 'dmg', 'Throw Stability Damage': 'stab', 'Throw Limb Damage': 'limb',
               'Throw Stamina Cost': 'cost'}


def parse_melee(rows):
    out, unarmed, cur, group = [], {}, None, None
    for r in rows[4:]:
        if cell(r, 0):
            group = ' '.join(cell(r, 0).split())
        name = cell(r, 1).split('\n')[0].strip()
        if group == 'Unarmed':
            if name:
                cur = unarmed.setdefault(name.lower(), {})
            label, val = cell(r, 3), cell(r, 4)
            keys = {'Stamina Cost': 'cost', 'Stability Damage': 'stab', 'Max Targets': 'targets', 'Range': 'range'}
            if label in keys:
                cur[keys[label]] = num(val)
            continue
        if name:
            cur = {'id': slug(name), 'kind': 'melee', 'name': name, 'icon': MELEE_ICONS[name],
                   'blade': group.startswith('Bladed'), 'two': 'Two' in group, 'cls': group,
                   'light': {}, 'strong': {}, 'charged': {}, 'throw': {}}
            out.append(cur)
        if not cur:
            continue
        label, val = cell(r, 3), num(cell(r, 4))
        if label in MELEE_ROWS:
            mode, field = MELEE_ROWS[label]
            cur[mode][field] = val
        if label in MELEE_COST:
            cur[MELEE_COST[label]]['cost'] = num(cell(r, 5))
        for lc, vc in ((6, 7), (8, 9)):
            l2, v2 = cell(r, lc), cell(r, vc)
            if l2 in MELEE_SIDE:
                cur[MELEE_SIDE[l2]] = num(v2) or 0
            elif l2 in MELEE_THROW:
                cur['throw'][MELEE_THROW[l2]] = num(v2)
            elif l2 == 'Range':
                cur['range'] = num(v2)
            elif l2 == 'Quick Stamina per Hit':
                cur['light']['perHit'] = num(v2)
            elif l2 == 'Strong Stamina per Hit':
                cur['strong']['perHit'] = num(v2)
            elif l2 == 'Charged Stamina per Hit':
                cur['charged']['perHit'] = num(v2)
        if cell(r, 9).upper().endswith('KG'):
            cur['kg'] = float(cell(r, 9).upper().replace('KG', ''))
    return out, unarmed


# ---- perks --------------------------------------------------------------------------------
PERK_ICON = {
    'Acquired Immunity': 'Antibodies', 'Adrenaline Rush': 'AdrenalineRush', 'Athlete': 'Athlete', 'Builder': 'Builder',
    'Butcher': 'Butcher', 'Caravan': 'Caravan', 'Deprived': 'Deprived', 'Doorbreaker': 'Doorbreaker',
    'Foreman': 'Foreman', 'Grenadier': 'Grenadier', 'Handgun Reloading': 'QuickReload_Handgun',
    'Hard Blow': '2hMelee_HardBlow', 'Headblown': 'Handgun_Headblown', 'Headhunter': 'Headhunter',
    'Healing Item Stack': 'LighterHealing', 'Heavy Shoves': 'HeavyShoves', 'Hellfire': 'Rifle_Hellfire',
    'Hitman': '1hMelee_Hitman', 'Icarus': 'Shotgun_Icarus', 'Limbo': 'Limbo', 'Locked On': 'SMG_ReducedRecoil',
    'Longer Battery': 'LongerBattery', 'Lucky Pathogen': 'LuckyPathogen', 'Marathon Runner': 'MarathonRunner',
    'Mohawk': 'Rifle_Mohawk', 'Mule': 'Mule', 'Overkill': 'Shotgun_Overkill', 'Penetrating Shot': 'Sniper_PenetratingShot',
    'Quiet Steps': 'QuietSteps', 'Resident Genes': 'ResidentGeneTherapy', 'Rifle Reloading': 'QuickReload_RifleAndSMG',
    'Rush': '2hMelee_HeavyAttackRush', 'Scavenger': 'Scavenger', 'Shotgun Reloading': 'QuickReload_Shotgun',
    'Skilled Medic': 'SkilledMedic', "Stayin' Alive": 'FaterRevive', 'Steady Hand': 'Handgun_SteadyHand',
    'Steady Shot': 'Rifle_ReducedRecoil_Crouch', 'Steel Chamber': 'Sniper_IronChamber', 'Sturdy Body': 'SturdyBody',
    'Thick Skin': 'ThickSkin', 'Tight Shot': 'Shotgun_TightShot', 'Vulture': 'SupplyStack', 'Wicked': 'Wicked',
    'Winged': 'SMG_Winged', 'Eagle Eye': 'Shotgun_LongRange',
}
PERK_ICON.pop('Eagle Eye')  # the old icon match pointed at a shotgun asset; no icon beats a wrong one
PERK_TYPES = {'D': 'Damage', 'W': 'Weapon', 'M': 'Melee', 'U': 'Utility', 'H': 'Health', 'S': 'Stamina'}


def parse_perks(rows):
    perks, section = {}, 'base'
    for r in rows[3:]:
        head = cell(r, 0)
        if head.startswith('RETIREMENT'):
            section = 'retire'
            continue
        if head.startswith('REMOVED'):
            break
        name = cell(r, 2)
        if not name:
            continue
        expert = name.endswith('- Expert')
        base = name.replace(' - Expert', '').strip()
        p = perks.setdefault(base, {'id': slug(base), 'kind': 'perk', 'name': base,
                                    'types': [PERK_TYPES[t] for t in (cell(r, 5), cell(r, 6), cell(r, 7)) if t in PERK_TYPES],
                                    'retire': None, 'expertLvl': None})
        lines = [l.strip() for l in cell(r, 3).split('\n') if l.strip()]
        text = lines[0] if lines else ''
        effect = '; '.join(lines[1:]) if len(lines) > 1 else text
        p['expert' if expert else 'base'] = effect
        if not expert:
            p['blurb'] = text.strip('"')
        if section == 'retire':
            p['retire'] = int(re.search(r'(\d+)', head).group(1))
        elif expert:
            p['expertLvl'] = num(head)
        if base in PERK_ICON:
            p['icon'] = 'skill_SD_' + PERK_ICON[base]
    return list(perks.values())


PERK_NAME_FIX = {'Tightshot': 'Tight Shot', 'Head Blown': 'Headblown', 'Pistol Reloading': 'Handgun Reloading'}


def parse_professions(rows, perks):
    names = {p['name'] for p in perks}
    out = []
    for r in rows[2:]:
        if not cell(r, 0) or not cell(r, 1):
            continue
        ps = [PERK_NAME_FIX.get(cell(r, i), cell(r, i)) for i in (1, 2)]
        for p in ps:
            assert p in names, f'profession perk {p!r} not in perk list'
        out.append({'id': slug(cell(r, 0)), 'kind': 'prof', 'name': cell(r, 0), 'perks': [slug(p) for p in ps]})
    return out


# ---- maps ---------------------------------------------------------------------------------
MAP_META = {  # sheet title -> (id, flavor image, Critical Supply + Objective links on Home)
    'Power Plant': ('power-plant', 'PowerPlant', 'objective'),
    'Pottsville': ('pottsville', 'Pottsville', 'objective'),
    'Pottsville (Scenario 2)': ('pottsville-2', 'Pottsville', 'objective'),
    'Lewiston': ('lewiston', 'Waldo', 'objective'),
    'Broadway': ('broadway', 'Broadway', 'objective'),
    'Beaulieu (Hospital)': ('beaulieu', 'Hospital', 'objective'),
    'Raven Rock': ('raven-rock', 'Bunker', 'objective'),
    'Flooded': ('flooded', 'Flooded', 'survival'),
    'Lighthouse': ('lighthouse', 'Lighthouse', 'survival'),
    'NotLD': ('notld', 'NOTLD', 'survival'),
    'Ruby Lake': ('ruby-lake', None, 'survival'),
}
DIFFS = ['beginner', 'normal', 'hard', 'nightmare']


def parse_maps(rows):
    maps, cur = [], None
    for i, r in enumerate(rows):
        title = cell(r, 1)
        if title in MAP_META and i + 1 < len(rows) and cell(rows[i + 1], 1) == 'Objective':
            mid, art, mode = MAP_META[title]
            cur = {'id': mid, 'kind': 'map', 'name': title.replace(' (Hospital)', ''), 'art': art, 'mode': mode,
                   'objectives': [], 'exp': {}, 'charExp': {}, 'credits': {}, 'creditsCrit': {}}
            maps.append(cur)
            continue
        if not cur or not title or title == 'Objective':
            continue
        vals = [num(cell(r, c)) for c in range(2, 6)]
        if title.startswith('Total Account EXP'):
            if 'Full Clear' in title or 'Triple' in title or not cur['exp']:
                cur['exp'] = dict(zip(DIFFS, vals))
        elif title == 'Character EXP':
            cur['charExp'] = dict(zip(DIFFS, vals))
        elif title == 'Total Credits':
            cur['credits'] = dict(zip(DIFFS, vals))
        elif title.startswith('Total Credits w/'):
            if vals[0] is not None:
                cur['creditsCrit'] = dict(zip(DIFFS, vals))
            cur['crit'] = int(re.search(r'\[(\d+)\]', title).group(1))
        elif title == 'Extraction Bonus':
            cur['extractBonus'] = dict(zip(DIFFS, vals))
        elif vals[0] is not None or cell(r, 2) == '--':
            cur['objectives'].append({'name': title, 'xp': vals[1]})
    return maps


# ---- spawning, stimuli, infection ---------------------------------------------------------
def parse_spawning(rows):
    out = {'cap': {}, 'elite': {}, 'cooldown': {}, 'initial': {}, 'weights': {}}
    sect, arch = None, None
    dmap = {'Easy': 'beginner', 'Normal': 'normal', 'Hard': 'hard', 'Nightmare': 'nightmare'}
    for r in rows:
        a, b = cell(r, 0), cell(r, 1)
        if a.startswith('Maximum Location'):
            sect = 'cap'
        elif a.startswith('Elite Max'):
            sect = 'elite'
        elif a.startswith('Respawn Cooldowns'):
            sect = 'cooldown'
        elif a.startswith('Initial Selection'):
            sect = 'initial'
        elif a.startswith('Archetype Distribution'):
            sect = 'weights'
            weight_d = dmap[a.split(' - ')[1].split()[0]]
            out['weights'][weight_d] = {}
        elif sect == 'cap' and b in dmap:
            out['cap'][dmap[b]] = [num(cell(r, c)) for c in range(2, 10)]
        elif sect in ('elite', 'cooldown', 'initial') and b in dmap:
            if a:
                arch = a
            out[sect].setdefault(arch, {})[dmap[b]] = [num(cell(r, c)) for c in range(2, 10)]
        elif sect == 'weights' and a and a != 'Archetype' and not a.startswith('Notes'):
            out['weights'][weight_d][a] = [num(cell(r, c)) for c in range(1, 6)]
    return out


def parse_stimuli(rows):
    out = []
    for r in rows[2:]:
        if not cell(r, 0) or num(cell(r, 1)) is None:
            if out:
                break
            continue
        out.append({'name': cell(r, 0), 'radius': num(cell(r, 1)), 'occluded': num(cell(r, 2)), 'life': num(cell(r, 3)),
                    'los': cell(r, 4) == 'TRUE', 'priority': cell(r, 5)})
    return out


def chance_table(text):
    pts = []
    for m in re.finditer(r'(\d+)%(?:\s*-\s*(\d+)%)?\s*HP:\s*([\d.]+)%', text):
        hi, lo, c = int(m.group(1)), m.group(2), float(m.group(3))
        pts.append([hi, c])
        if lo is not None:
            pts.append([int(lo), c])
    return sorted(pts)


def stamps(text):
    return [{'t': int(m.group(1)) * 60 + int(m.group(2)), 'label': m.group(3).strip()}
            for m in re.finditer(r'(\d):(\d\d) - ([^\n]+)', text)]


def parse_infection(rows):
    timeline = rows[2][0]
    how = rows[2][1]
    initial, pills = timeline.split('Infection Timeline(Pills):')
    swipe = how.split('Zombie Swipes')[1].split('Shambler Gas Cloud')[0]
    gas = how.split('Shambler Gas Cloud')[1].split('Prevention')[0]
    return {'timeline': stamps(initial), 'pillsTimeline': stamps(pills), 'swipe': chance_table(swipe), 'gas': chance_table(gas)}


# ---- economy, unlocks, progression --------------------------------------------------------
ECON_IDS = {
    '.22 LR': 'ammo:22lr', '9mm': 'ammo:9mm', '.357 Magnum': 'ammo:357-magnum', '.45 ACP': 'ammo:45-acp',
    '.308 WIN': 'ammo:308win', '5.56 NATO': 'ammo:5-56-nato', '6.8x51mm': 'ammo:6-8x51mm', '12GA Shotgun Shells': 'ammo:12ga-shell',
    'Barricade Stack (x5)': 'item:barricade', 'Flashlight Battery': 'item:battery', 'Deployable Radio': 'item:radio',
    'Deployable Worklight': 'item:worklight', 'Ranger Boots': 'item:ranger-boots', 'Nailer': 'item:nailer',
    'Adrenaline Shot': 'item:adrenaline-shot', 'Body Armor': 'item:body-armor', 'Satchel': 'item:satchel',
    'Ammo Crate': 'item:ammo-crate', 'Rescue Beacon': 'item:rescue-beacon', 'Bandages': 'item:bandage', 'Medkit': 'item:medkit',
    'Phalanx Pills': 'item:phalanx-pills', 'Revive Syringe': 'item:revive-syringe', 'Mass Casualty Kit': 'item:mass-casualty-kit',
    'Experimental Gene Therapy': 'item:gene-therapy', 'M67 Frag Grenade': 'item:m67-frag', 'Proximity IED': 'item:ied',
    'Molotov Cocktail': 'item:molotov', 'Pipe Bomb': 'item:pipe-bomb',
    'Small Pipe (Pre 1.0 Starter Item)': 'melee:pipe-small', 'Mallet (1.0 Starter Item)': 'melee:mallet',
    'Kitchen Knife': 'melee:kitchen-knife', 'Rebar': 'melee:rebar', 'Shovel': 'melee:shovel', 'Adjustable Wrench': 'melee:wrench-small',
    'Wood Baseball Bat': 'melee:baseball-bat', 'Cleaver': 'melee:cleaver', 'Hockey Stick': 'melee:hockey-stick',
    'Tire Iron': 'melee:tire-iron', 'Tree Trimmer': 'melee:treetrimmer', 'Large Wrench': 'melee:wrench-large',
    'Claw Hammer': 'melee:claw-hammer', 'Crowbar': 'melee:crowbar', 'Fire Axe': 'melee:fire-axe', 'Hatchet': 'melee:hatchet',
    'Machete': 'melee:machete', 'Long Pipe': 'melee:pipe-large', 'Sledgehammer': 'melee:sledge-hammer',
    'Model 13 (Pre 1.0 Starter Item)': 'gun:model-13', 'Gruber MKVII (1.0 Starter Item)': 'gun:gruber-mkvii',
    'Gruber 922': 'gun:gruber-922', 'Gruber Ranch': 'gun:gruber-ranch', 'Hunter 85': 'gun:hunter-85', 'Fierra DB12': 'gun:fierra-db12',
    '590A1': 'gun:m590a1', 'M1911A1': 'gun:m1911a1', 'M9A3': 'gun:m9a3', 'M14 Battle Rifle': 'gun:m14-battle-rifle',
    'Rochester 1873': 'gun:rochester-1873', 'M7A1': 'gun:m7a1', 'MC-15': 'gun:mc-15', 'X12 Super': 'gun:x12-super', 'MP5A4': 'gun:mp5a4',
}


def parse_economy(rows):
    shop = {}
    for i, r in enumerate(rows):
        name = cell(r, 1)
        if cell(r, 0) == 'COSMETICS':
            break
        if name in ECON_IDS:
            merit = num(cell(rows[i + 1], 3)) if not cell(rows[i + 1], 1) else None
            shop[ECON_IDS[name]] = {'cr': num(cell(r, 3)), 'lvl': num(cell(r, 4)), 'merits': merit}
    missing = set(ECON_IDS.values()) - set(shop)
    assert not missing, f'economy rows missing: {missing}'
    return shop


def parse_levels(rows):
    levels = {}
    for r in rows:
        for c in range(1, len(r) - 1, 3):
            lv, xp = num(cell(r, c)), num(cell(r, c + 1))
            if lv is not None and xp is not None:
                levels[lv] = xp
    return levels


def parse_exp(rows):
    # the tab stacks account, character and retirement tables under their own header rows
    idx = {cell(r, 1): i for i, r in enumerate(rows) if cell(r, 1) in ('Account Level', 'Character Level', 'Retirement Level')}
    acc = parse_levels(rows[idx['Account Level'] + 1:idx['Character Level']])
    char = parse_levels(rows[idx['Character Level'] + 1:idx['Retirement Level']])
    return {'account': [acc[i] for i in range(1, 100)], 'character': [char[i] for i in range(1, 100)]}


def parse_unlocks(rows):
    out = {}
    for r in rows[2:]:
        lv = num(cell(r, 0))
        if lv is None:
            continue
        gear = [g.strip() for g in cell(r, 2).split('\n') if g.strip()]
        out[lv] = gear
    return out


def parse_retirement(rows):
    ranks = []
    for r in rows:
        rk = num(cell(r, 0))
        if rk is None or not cell(r, 3):
            continue
        ranks.append({'rank': rk, 'xp': num(cell(r, 1)), 'reward': cell(r, 3), 'type': ' '.join(cell(r, 5).split())})
    return ranks


def parse_events(rows):
    out = []
    current = None
    for r in rows[1:]:
        if cell(r, 1):
            current = {'start': f'{cell(r, 1)} {cell(r, 0)}', 'end': f'{cell(r, 3)} {cell(r, 2)}', 'bonus': []}
            out.append(current)
        if current and cell(r, 5):
            current['bonus'].append({'x': float(cell(r, 5).rstrip('x')), 'what': cell(r, 6)})
    return out


def parse_weekly(rows):
    out = []
    for r in rows[2:]:
        if cell(r, 0) and num(cell(r, 1)) is not None:
            out.append({'task': cell(r, 0).rstrip('*'), 't': [num(cell(r, c)) for c in (1, 2, 3)]})
    return out


def parse_timeline(rows):
    out = []
    for r in rows:
        if cell(r, 5).startswith('█'):
            out.append({'redacted': True})
        elif num(cell(r, 5)) is not None and cell(r, 8):
            out.append({'day': num(cell(r, 5)), 'date': cell(r, 6), 'time': cell(r, 7), 'map': cell(r, 8), 'where': cell(r, 9)})
    return out


def parse_extracts(rows):
    out, cur = {}, None
    for r in rows:
        a = cell(r, 0)
        if a in ('Pottsville', 'Lewiston', 'Power Plant', 'Broadway', 'Beaulieu'):
            cur = out.setdefault(slug(a), [])
        elif a.startswith('Location #') and cur is not None:
            text = a.split(':', 1)[1].strip()
            if text:
                cur.append(text)
    return out


def parse_tips(rows):
    hints, tips = [], []
    for i, r in enumerate(rows):
        for c, v in enumerate(r):
            v = v.strip()
            if v.startswith('Loading Screen Hints') or v.startswith('Player Tip'):
                body = cell(rows[i + 1], c) if i + 1 < len(rows) else ''
                if not body:
                    continue
                body = ' '.join(body.replace('""', '"').split()).strip('"')
                if v.startswith('Player Tip'):
                    # "below 50%" predates the Infection tab's 60% table, which we use
                    if 'Fixed in' not in body and 'be fixed' not in body and 'below 50% of your HP' not in body:
                        tips.append(body)
                else:
                    hints.append(body)
    return hints, tips


def parse_changelog(rows):
    """Flatten the stacked Perk/Item/Weapon/Other columns to {update, kind, subject, change}."""
    out, update = [], None
    subject = {}
    for r in rows[2:]:
        if cell(r, 0):
            update = ' '.join(cell(r, 0).split())
            subject = {}
            if not update.startswith('1.'):  # the older log stays on the sheet, it no longer matches the game
                break
        for kind, a, b in (('perk', 2, 3), ('item', 5, 6), ('weapon', 8, 9)):
            if cell(r, a):
                subject[kind] = cell(r, a)
            if cell(r, b):
                out.append({'u': update, 'k': kind, 's': subject.get(kind, ''), 'c': cell(r, b)})
        if cell(r, 11):
            out.append({'u': update, 'k': 'other', 's': '', 'c': ' '.join(cell(r, 11).split())})
    return out


def parse_attachments(rows):
    out, on = [], False
    for r in rows:
        if cell(r, 1).startswith('ATTACHMENTS'):
            on = True
            continue
        if on and cell(r, 1).startswith('Notes'):
            break
        if on and cell(r, 1) and cell(r, 1) != 'Attachment':
            lines = cell(r, 1).split('\n')
            name = ' '.join(l.strip() for l in lines[:-1]) or lines[0]
            slot = lines[-1].strip('() ')
            clean = lambda s: [l.strip() for l in s.split('\n') if l.strip() and l.strip() != '—']
            out.append({'id': slug(name), 'kind': 'attachment', 'name': name, 'slot': slot,
                        'recoil': clean(cell(r, 3)), 'spread': clean(cell(r, 4)), 'other': clean(cell(r, 5))})
    return out


# ---- zombies ------------------------------------------------------------------------------
def parse_zombies(rows):
    """Five archetype blocks side by side, then two crawler blocks further down."""
    head_i = next(i for i, r in enumerate(rows) if cell(r, 0).startswith('Walker (Zombie)'))
    crawl_i = next(i for i, r in enumerate(rows) if cell(r, 9) == 'Crawler')
    blocks = []

    def block(hi, col, zid, name, alias, art):
        z = {'id': zid, 'kind': 'zombie', 'name': name, 'alias': alias, 'art': art, 'disabled': []}
        for r in rows[hi + 1:hi + 11]:
            label = cell(r, col).lstrip('*').strip()
            raw = cell(r, col + 1)
            starred = cell(r, col).startswith('*')
            m = re.match(r'(N/A|-?[\d.]+)', raw)
            val = None if not m or m.group(1) == 'N/A' else num(m.group(1))
            rng = re.search(r'\|\s*(\d+) Range', raw)
            if label == 'HP':
                z['hp'] = val
            elif label == 'Movement Speed':
                z['speed'] = val
                sp = re.search(r'\(-(\d+)% → \+(\d+)%', raw)
                z['speedVar'] = [int(sp.group(1)), int(sp.group(2))] if sp else [0, 0]
            elif label.startswith('Basic Damage'):
                z['basic'], z['range'] = val, num(rng.group(1)) if rng else None
            elif label.startswith('Heavy Damage'):
                z['heavy'] = val
                z['heavyMulti'] = 'Multihit' in label
            elif label.startswith('Lunge Damage'):
                z['lunge'] = val
                if starred:
                    z['disabled'].append('lunge')
            elif label.startswith('Periodic Grab'):
                z['grabDmg'] = val
                if starred:
                    z['disabled'].append('grab')
            elif label.startswith('Grab Range'):
                z['grabRange'] = val
        blocks.append(z)

    block(head_i + 1, 0, 'walker', 'Walker', 'Zombie', 'zomb_walker')
    block(head_i + 1, 3, 'prime', 'Prime', 'Bloody', 'zomb_prime')
    block(head_i + 1, 6, 'runner', 'Runner', '', 'zomb_runner')
    block(head_i + 1, 9, 'shambler', 'Shambler', 'Screamer', 'zomb_shambler')
    block(head_i + 1, 12, 'prime-runner', 'Prime Runner', '', 'zomb_prime')
    block(crawl_i, 9, 'crawler', 'Crawler', '', None)
    block(crawl_i, 12, 'runner-crawler', 'Runner Crawler', '', None)
    # "Crawlers use the stats of what they were made from", so only speed and reach are their own
    for zid, parent in (('crawler', 'walker'), ('runner-crawler', 'runner')):
        z, p = next(b for b in blocks if b['id'] == zid), next(b for b in blocks if b['id'] == parent)
        for k in ('hp', 'basic', 'heavy', 'heavyMulti', 'lunge', 'grabDmg', 'grabRange', 'disabled'):
            z[k] = p[k]
        z['inheritedFrom'] = p['name']
    return blocks


def curated_zombies(raw, base):
    """Armor types have no stat block on the sheet, only the rules below, so they inherit Walker."""
    need(raw, 'zombies', '50% Damage Resistance', '50% Gunshot Damage Resistance', 'Immune to Fire', '+10 Additional Dmg to Left Hand')
    need(raw, 'guns', 'Construction/Firefighter = 1, Riot = 2, NG = 3, Shield = 3')
    need(raw, 'melee', 'Construction/Firefighter Helmets = 30hp, Riot = 60hp, NG = 90hp, Shield = 200hp')
    walker = next(z for z in base if z['id'] == 'walker')

    def armored(zid, name, helmet, pen, **kw):
        z = dict(walker, id=zid, name=name, alias='', art=None, armored=True, inherited=True, helmet=helmet, helmetPen=pen)
        z.update(kw)
        return z

    return [
        armored('national-guard', 'National Guard', 90, 3, bodyRes=0.5, stabRes=0.5, headTaken=2.0, resAll=True,
                note='Half damage everywhere except the head, half stability damage. Knocking one down strips all of it.'),
        armored('riot-police', 'Riot Police', 60, 2, vestRes=0.5, stabResGun=0.5,
                note='The vest halves gunshot damage and gunshot stability. Melee ignores it, and so do shots that miss the vest.'),
        armored('riot-shield', 'Riot Shield', 200, 3, shieldDmg=10,
                note='The shield holds 200 HP and needs penetration 3 to punch through. Left-hand attacks hit for 10 more.'),
        armored('firefighter', 'Firefighter', 30, 1, fireImmune=True,
                note='Immune to fire, so a Molotov does nothing to it. The oxygen tank on its back uses the Explosion noise.'),
        armored('construction', 'Construction', 30, 1, note='Hard hat only: 30 HP, and any gun with penetration 1 goes through it.'),
    ]


# ---- curated rules, each one checked against the sheet text it came from ------------------
def curated_difficulty(raw):
    need(raw, 'difficulty', 'Melee Damage Increase +43%', 'Firearm Damage Increase +100%', 'Firearm Headshot Damage Increase +50%',
         '-35% Damage taken', '25% Increased Damage Taken from Zombies', '50% Increased Damage Taken from Zombies',
         '40% Reduced Ammo Picked up', '40-75% Less Ammo in Found Weapons', 'Prime Spawns are increased by 100%',
         'Armored Spawn Rates are increased by 100%', '0.8x Credit Multiplier', '3.0x Character XP Multiplier', 'Reduced UI')
    return {
        'beginner': {'name': 'Beginner', 'taken': 0.65, 'melee': 1.43, 'gun': 2.0, 'gunLimb': 2.0, 'gunHead': 1.5, 'ammoPickup': 0,
                     'foundAmmo': 'Full', 'prime': 'Default', 'armored': 'None', 'respawn': 'Every 45s', 'xp': 1, 'charXp': 1, 'cr': 0.8,
                     'extra': ['Airdrops on', 'Markers visible 25% further']},
        'normal': {'name': 'Normal', 'taken': 1, 'melee': 1, 'gun': 1, 'gunLimb': 1, 'gunHead': 1, 'ammoPickup': 0,
                   'foundAmmo': '0-33% less', 'prime': '+33%', 'armored': '+40%', 'respawn': 'On objectives', 'xp': 1, 'charXp': 1.25, 'cr': 1, 'extra': []},
        'hard': {'name': 'Hard', 'taken': 1.25, 'melee': 1, 'gun': 1, 'gunLimb': 1, 'gunHead': 1, 'ammoPickup': 20,
                 'foundAmmo': '20-50% less', 'prime': '+66%', 'armored': '+70%', 'respawn': 'None', 'xp': 1.5, 'charXp': 2, 'cr': 1.5,
                 'extra': ['Area difficulty +25%']},
        'nightmare': {'name': 'Nightmare', 'taken': 1.5, 'melee': 1, 'gun': 1, 'gunLimb': 1, 'gunHead': 1, 'ammoPickup': 40,
                      'foundAmmo': '40-75% less', 'prime': '+100%', 'armored': '+100%', 'respawn': 'None', 'xp': 2, 'charXp': 3, 'cr': 2,
                      'extra': ['Area difficulty +50%', 'Reduced UI']},
    }


def curated_player(raw):
    need(raw, 'professions', 'HP: 100', 'Stamina: 100', 'Movement Speed: 200', 'Sprinting Speed Multiplier: 1.9x',
         'Stamina Regen Rate - Idle: 55/s', 'Stamina Regen Rate - Walking: 35/s', 'Stamina Regen Rate - Targeting: 15/s',
         'Critical Health = 20HP and below', 'Crouching reduces recoil by 25%')
    need(raw, 'mechanics', 'Being revived will restore your HP to 30%', 'baseline DBNO/Downed timer is 35s', 'up to ~75% Health')
    need(raw, 'infection', 'Stamina is at 15% or below')
    return {'hp': 100, 'stamina': 100, 'speed': 200, 'sprint': 1.9, 'regen': {'idle': 55, 'walk': 35, 'aim': 15, 'sprint': 0},
            'drain': 5, 'regenDelay': 1.0, 'critHp': 20, 'grabBite': 15, 'downTimer': 35, 'reviveHp': 30}


def curated_mechanics(raw):
    need(raw, 'mechanics', 'Feet L/R: 60', 'Lower Leg L/R: 70', 'Upper Leg L/R: 70', 'Hands L/R: 20', 'Lower Arm L/R: 40',
         'Upper Arm L/R: 60', 'Chest: 60', '0 – 19', '20 – 49', '50 – 99', '3.0s KD / 5.0s Get-up', '1.5x Stability Damage multiplier')
    return {
        'limbs': {'head': None, 'chest': 60, 'upperArm': 60, 'lowerArm': 40, 'hand': 20, 'upperLeg': 70, 'lowerLeg': 70, 'foot': 60},
        'stability': [
            {'min': 0, 'name': 'Flinch', 'stun': 'No stun', 'stops': False},
            {'min': 20, 'name': 'Interrupt', 'stun': '~0.75s', 'stops': True},
            {'min': 50, 'name': 'Stagger', 'stun': '~3s', 'stops': True},
            {'min': 100, 'name': 'Knockdown', 'stun': '3s down, 5s to get up', 'stops': True},
        ],
    }


def curated_items(raw, shop):
    need(raw, 'other', 'Healing Amount,25', 'Healing Amount,100', 'Contents when placed: 12 randomized ammo', 'Ground fire lasts 15 seconds')
    need(raw, 'infection', 'Each Dose resets the infection timer', 'Takes 30s to synthesize your cure')
    need(raw, 'passives', '300% faster Barricading time', '50% less Noise from all Movement', '25% less Damage taken from Zombies',
         '25% Increased total Carry Weight', 'Immunity to Shambler Clouds', '+10HP to Bandages')
    I = lambda iid, name, grp, kg, text, icon=None, **k: dict(id=iid, kind='item', name=name, grp=grp, kg=kg, text=text, icon=icon, **k)
    items = [
        I('bandage', 'Bandage', 'Meds', .35, 'Heals 25 HP. Skilled Medic scales it, Herbal Remedy adds 10.', 'AES_Bandages', heal=25),
        I('medkit', 'Medkit', 'Meds', 1.0, 'Heals 100 HP. Skilled Medic scales it.', 'AES_MedKit', heal=100),
        I('phalanx-pills', 'Phalanx Pills', 'Meds', .35, 'About 5s to use, 3 doses. Each dose resets the infection clock to the start, minus the incubation.', 'AES_Pills'),
        I('gene-therapy', 'Gene Therapy', 'Meds', 1.0, 'Single use. 3.5s to draw blood, 30s to synthesize, 5s to inject. Immune until the match ends, and it can go in a teammate instead.', 'AES_GeneTherapy'),
        I('revive-syringe', 'Revive Syringe', 'Meds', .5, 'Revive yourself while downed.'),
        I('medical-crate', 'Medical Crate', 'Meds', 2.0, 'Holds 1 Medkit, 2 Phalanx Pills and 4 Bandages when placed.'),
        I('mass-casualty-kit', 'Mass Casualty Kit', 'Meds', None, 'Pre-1.0 shop item with no 1.0 price listed.'),
        I('m67-frag', 'M67 Frag', 'Explosive', .5, '180 stability, 750 radius, 3.5s fuse. Its damage value was removed in 1.2: the sheet reads the 350 minimum radius as the kill zone, with limb loss and knockdowns beyond it.', 'AES_Grenade_M67', stab=180, radius=750, minRadius=350, noise='Explosion'),
        I('pipe-bomb', 'Pipe Bomb', 'Explosive', .5, '120 damage, 250 stability, 650 radius, 5s fuse. While the fuse burns it pulses a critical-event noise that pulls zombies to it.', 'AES_Pipebomb', dmg=120, stab=250, radius=650, minRadius=200, noise='Pipe Bomb'),
        I('molotov', 'Molotov', 'Explosive', .5, 'Ground fire for 15s, burning lingers 5s after that. Does nothing to Firefighter zombies.', 'AES_Molotov', stab=40, radius=200),
        I('ied', 'Proximity IED', 'Explosive', .5, '120 damage, 300 stability, 600 radius when triggered. 120 and 200 stability, 450 radius if shot.', 'AES_IED', dmg=120, stab=300, radius=600, minRadius=200, noise='Explosion'),
        I('radio', 'Deployable Radio', 'Deployable', .75, 'Pulls up to 10 zombies for 30s through walls within 20m. A critical event, so they drop what they were doing.', noise='Deployable Radio'),
        I('ammo-crate', 'Ammo Crate', 'Deployable', 2.0, 'Holds 12 randomized ammo when placed.'),
        I('worklight', 'Deployable Worklight', 'Deployable', None, 'A placeable light.'),
        I('barricade', 'Barricade Stack', 'Deployable', None, 'Five boards. Builder cuts their weight, the Nailer cuts the time.'),
        I('battery', 'Flashlight Battery', 'Deployable', None, 'Longer Battery cuts how fast it drains.', 'AES_Battery'),
        I('rescue-beacon', 'Rescue Beacon', 'Deployable', None, 'Costs 2,000 credits and 1 merit. Retiring a responder without having used one is worth 250 XP.'),
        I('nailer', 'Nailer', 'Passive', .5, 'Barricades go up 300% faster.'),
        I('ranger-boots', 'Ranger Boots', 'Passive', .5, '50% less noise from all movement.'),
        I('adrenaline-shot', 'Adrenaline Shot', 'Passive', .5, '25% more total stamina.'),
        I('body-armor', 'Body Armor', 'Passive', .5, '25% less damage from zombie swipes.'),
        I('satchel', 'Satchel', 'Passive', .5, '25% more carry weight.'),
        I('herbal-remedy', 'Herbal Remedy', 'Passive', .5, 'Bandages heal 10 more. Retirement rank 5.'),
        I('running-shoes', 'Running Shoes', 'Passive', .5, 'Sprint multiplier goes from 1.9x to 2.0x. Retirement rank 9.'),
        I('weapon-sling', 'Weapon Sling', 'Passive', .5, 'Swapping weapons is 50% faster. Retirement rank 13.'),
        I('n95-mask', 'N95 Mask', 'Passive', .5, 'Immune to Shambler gas clouds. Retirement rank 17.'),
    ]
    for it in items:
        it['shop'] = shop.get('item:' + it['id'])
    return items


ATT_ICON = {'Suppressor L/S': 'IA_MZL_L_Suppressor', 'Compensator L/S': 'IA_MZL_L_Compensator', 'Muzzle Brake L/S': 'IA_MZL_L_Brake_01A',
            'Shotgun Choke': 'IA_MZL_L_ShotgunChoke_01A', 'ACOG/Combat Optic': 'IA_SIGHT_ACOG', 'Holographic Optic / Micro Reflex Sight': 'IA_SIGHT_Holo',
            'Hunting Scope': 'IA_SIGHT_Scope', 'Long Gun Flashlight': 'IA_RAIL_L_Light', 'Large Laser': 'IA_RAIL_L_Laser', 'Small Laser': 'IA_RAIL_S_Laser'}


def parse_map_links(html_text):
    """Home links each map to its objective and critical supply pages in a second workbook."""
    links = {}
    for m in re.finditer(r'<a [^>]*href="([^"]+)"[^>]*>(.*?)</a>', html_text):
        label = re.sub('<[^>]+>', '', m.group(2)).strip()
        hit = re.fullmatch(r'(Powerplant|Pottsville|Lewiston|Broadway|Hospital|Raven Rock) (Objectives|Critical Supply)', label)
        if not hit:
            continue
        q = urllib.parse.parse_qs(urllib.parse.urlparse(html.unescape(m.group(1))).query)['q'][0]
        mid = {'Powerplant': 'power-plant', 'Hospital': 'beaulieu'}.get(hit.group(1), slug(hit.group(1)))
        links.setdefault(mid, {})['obj' if hit.group(2) == 'Objectives' else 'crit'] = q
    return links


# Which guns take what, from the Fandom weapons page (CC-BY-SA), captured for the old site.
ATT_FITS = {
    'suppressor-l-s': ['m9a3', 'm1911a1', 'mp5a4', 'rochester-1873', 'hunter-85', 'm14-battle-rifle', 'm7a1', 'mc-15', 'gruber-ranch'],
    'holographic-optic-micro-reflex-sight': ['m9a3', 'm1911a1', 'mp5a4', 'rochester-1873', 'm7a1', 'mc-15', 'm590a1'],
    'acog-combat-optic': ['mp5a4', 'rochester-1873', 'm7a1', 'mc-15', 'm590a1'],
    'hunting-scope': ['mp5a4', 'rochester-1873', 'm7a1', 'mc-15', 'm590a1'],
    'long-gun-flashlight': ['m7a1', 'mc-15', 'gruber-ranch'],
}


def build(tabs, raw, home_html):
    guns = parse_guns(tabs['guns'])
    melee, unarmed = parse_melee(tabs['melee'])
    perks = parse_perks(tabs['perks'])
    profs = parse_professions(tabs['professions'], perks)
    shop = parse_economy(tabs['economy'])
    for w in guns:
        w['shop'] = shop.get('gun:' + w['id'])
    for w in melee:
        w['shop'] = shop.get('melee:' + w['id'])
    zombies = parse_zombies(tabs['zombies'])
    zombies += curated_zombies(raw, zombies)
    atts = parse_attachments(tabs['mechanics'])
    for a in atts:
        a['icon'] = ATT_ICON.get(a['name'])
        a['fits'] = ATT_FITS.get(a['id'])
    ammo = {}
    for g in guns:
        a = ammo.setdefault(g['ammo'], {'id': slug(g['ammo']), 'kind': 'ammo', 'name': g['ammo'], 'roundKg': g['roundKg'], 'guns': []})
        a['guns'].append(g['id'])
    AMMO_ICON = {'12ga Shell': 'ammo_12gaShells', '9mm': 'ammo_9mm', '.357 Magnum': 'ammo_357Mag', '.45 ACP': 'ammo_45ACP',
                 '5.56 NATO': 'ammo_556NATO', '6.8x51mm': 'ammo_68x51mm', '.308WIN': 'ammo_308Win'}
    links = parse_map_links(home_html)
    assert set(links) == {'power-plant', 'pottsville', 'lewiston', 'broadway', 'beaulieu', 'raven-rock'} and all('crit' in v for v in links.values()), links  # Hospital and Raven Rock have no objective link on Home yet
    for a in ammo.values():
        a['icon'] = AMMO_ICON.get(a['name'])
        a['shop'] = shop.get('ammo:' + a['id'])
    hints, tips = parse_tips(tabs['tips'])
    need(raw, 'home', 'Created by:,@SchwarzFenrir', 'Zeyev - Doc/Steam Formatting', 'SupremeSecretMan - Professions', 'Braks - Photographer/Misc')
    ver = re.search(r"Game version ([\d.]+)", raw['home']).group(1)
    upd = re.search(r'Last Updated: ([A-Za-z]+ \d+, \d+)', raw['home']).group(1)
    active = re.search(r'Active Events: ([^"\n]+)', raw['home'])
    files_mut = json.load(open(os.path.join(ROOT, 'data/stats/stats.json'), encoding='utf8'))['zombies']['Zomb_Adult_MUT']['stats']

    intel = {
        'meta': {'gameVersion': ver, 'sheetUpdated': upd, 'built': datetime.date.today().isoformat(),
                 'activeEvent': active.group(1).strip() if active else None},
        'source': {
            'url': BASE + '/pubhtml', 'gids': {k: v for k, v in TABS.items()},
            'steamGuide': 'https://steamcommunity.com/sharedfiles/filedetails/?id=3484193973',
            'discord': 'https://discord.gg/nmrih',
            'lore': 'https://docs.google.com/presentation/d/e/2PACX-1vRp043WS4oVGd9WM0gGiRHLTHgb49avo5Rwq2BAXGytZfqYdQTPer_h3CrSMz7fpn8bpjqiK0u0xtgw/pub',
            'ost': 'https://www.youtube.com/playlist?list=PLQ__MN6g9s_8Yr1f0Y1JMa42YsJplkCik',
            'radio': 'https://www.youtube.com/playlist?list=PLQ__MN6g9s__GnswTY9oZJHQA3oyttqJw',
            'objectives': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTUJnpzmDhfAnMImSg-9AfXu8hBYfbWNhthSbOsUvbp9yrWGRxGg1Uo0oVLubOE_SAQX_t8T-uS9cDZ/pubhtml',
            'author': '@SchwarzFenrir',
            'credits': [['Zeyev', 'Doc and Steam formatting'], ['SupremeSecretMan', 'Professions'], ['可萝贝', 'EXP table'], ['Braks', 'Photographer, misc, Lore Compendium']],
            'tiers': [['100+', ['SimpleSage']], ['30+', ['Braks']], ['10+', ['NAV', 'quavert9111', 'Ika', 'TS']],
                      ['5+', ['sELenEzI', 'Staircase', 'paperman834', 'Mystic_argonian82']]],
            'plea': next(r[0] for r in tabs['changelog'] if r[0].startswith('**')).strip('* '),
        },
        'zombies': zombies,
        'mutated': {'hp': files_mut['Health.MaxHealth'], 'speed': files_mut['Movement.MovementSpeed'], 'basic': files_mut['Zombie.MeleeDamage_Basic'],
                    'heavy': files_mut['Zombie.MeleeDamage_Heavy'], 'lunge': files_mut['Zombie.MeleeDamage_Lunge'], 'grabDmg': files_mut['Zombie.GrabPeriodicDamage']},
        'mapLinks': links, 'guns': guns, 'melee': melee, 'unarmed': unarmed, 'perks': perks, 'professions': profs,
        'items': curated_items(raw, shop), 'ammo': list(ammo.values()), 'attachments': atts, 'maps': parse_maps(tabs['maps']),
        'spawning': parse_spawning(tabs['spawning']), 'stimuli': parse_stimuli(tabs['stimuli']), 'infection': parse_infection(tabs['infection']),
        'difficulty': curated_difficulty(raw), 'player': curated_player(raw), 'mechanics': curated_mechanics(raw),
        'exp': parse_exp(tabs['exp']), 'unlocks': parse_unlocks(tabs['unlocks']), 'retirement': parse_retirement(tabs['retirement']),
        'events': parse_events(tabs['events']), 'weekly': parse_weekly(tabs['weekly']), 'timeline': parse_timeline(tabs['misc']),
        'extracts': parse_extracts(tabs['extracts']), 'hints': hints, 'tips': tips,
        'changelog': parse_changelog(tabs['changelog']),
    }
    check(intel)
    return intel


def check(x):
    """Values read by eye from the live sheet on 2026-10-31. A miss means a parser drifted."""
    by = lambda seq: {i['id']: i for i in seq}
    g, m, z, p = by(x['guns']), by(x['melee']), by(x['zombies']), by(x['perks'])
    assert len(x['guns']) == 15 and len(x['melee']) == 19, (len(x['guns']), len(x['melee']))
    assert g['m7a1']['dmg'] == 40 and g['m7a1']['head'] == 150 and g['m7a1']['pen'] == 3 and g['m7a1']['magN'] == 21
    assert g['fierra-db12']['pellets'] == 10 and g['fierra-db12']['magN'] == 2 and g['fierra-db12']['ammo'] == '12ga Shell'
    assert g['hunter-85']['stab'] == 80 and g['hunter-85']['roundKg'] == 0.04 and g['hunter-85']['kg'] == 2.25
    assert m['fire-axe']['charged'] == {'dmg': 65, 'head': 100, 'limb': 100, 'stab': 20, 'cost': 13, 'perHit': 5}
    assert m['sledge-hammer']['charged']['stab'] == 100 and m['sledge-hammer']['light']['perHit'] == 3 and m['sledge-hammer']['kg'] == 3.0
    assert m['kitchen-knife']['range'] == 160 and m['kitchen-knife']['throw']['dmg'] == 35
    assert x['unarmed']['kick'] == {'cost': 50, 'stab': 100, 'targets': 3, 'range': 200}
    assert z['walker']['hp'] == 100 and z['prime']['hp'] == 130 and z['shambler']['hp'] == 70 and z['prime-runner']['hp'] == 120
    assert z['runner']['speed'] == 400 and z['runner']['speedVar'] == [10, 0] and z['shambler']['lunge'] == 40 and 'lunge' in z['shambler']['disabled']
    assert 'grab' in z['runner']['disabled'] and z['walker']['disabled'] == [] and z['crawler']['speed'] == 95
    assert p['steel-chamber']['expertLvl'] == 44 and p['sturdy-body']['expertLvl'] == 100 and p['berserker']['retire'] == 15
    assert 'averaging' not in p and 'teddy-bear' not in p and 'guts' not in p
    assert len(x['professions']) == 29, len(x['professions'])
    mp = by(x['maps'])
    assert len(x['maps']) == 11 and mp['power-plant']['creditsCrit']['nightmare'] == 6240 and mp['power-plant']['crit'] == 8
    assert mp['power-plant']['exp']['nightmare'] == 15600 and mp['flooded']['credits']['hard'] == 600 and mp['raven-rock']['crit'] == 3
    s = x['spawning']
    assert s['cap']['nightmare'][7] == 80 and s['weights']['nightmare']['Walker Prime'][4] == 59.0
    assert s['elite']['Runner Prime']['hard'] == [1, 1, 1, 1, 2, 2, 2, 2] and s['cooldown']['Walker Prime']['nightmare'][0] == 2
    st = by([dict(i, id=i['name']) for i in x['stimuli']])
    assert st['CarAlarm']['radius'] == 75 and st['Gunshot_Silenced']['radius'] == 10 and st['Gunshot']['occluded'] == 15 and len(x['stimuli']) == 20
    i = x['infection']
    assert [40, 16.25] in i['swipe'] and [60, 0.0] in i['swipe'] and [100, 0.0] in i['swipe'] and [10, 50.0] in i['swipe']
    assert [80, 5.0] in i['gas'] and [30, 50.0] in i['gas'] and i['timeline'][-1] == {'t': 330, 'label': 'Death & Reanimation'}
    assert x['exp']['account'][0] == 1200 and x['exp']['account'][98] == 15000 and x['exp']['character'][98] == 7000
    assert x['retirement'][0]['reward'] == 'Additional Loadout Slot' and len(x['retirement']) == 20
    assert x['weekly'][0]['task'] == 'Extract on any difficulty' and x['weekly'][0]['t'] == [3, 6, 10]
    assert x['timeline'][0]['map'] == 'CRC TRAINING CAMP' and any(t.get('redacted') for t in x['timeline'])
    assert len(x['extracts']['power-plant']) == 7 and len(x['extracts']['lewiston']) == 3 and len(x['extracts']['beaulieu']) == 1
    assert len(x['hints']) >= 30 and len(x['tips']) >= 10 and len(x['changelog']) > 200
    assert len(x['attachments']) == 10, [a['name'] for a in x['attachments']]
    assert x['events'][0]['bonus'][0] == {'x': 2.0, 'what': 'Responder EXP'}, x['events'][0]


def main():
    cache = sys.argv[sys.argv.index('--cache') + 1] if '--cache' in sys.argv else None
    tabs, raw, home_html = load(cache)
    intel = build(tabs, raw, home_html)
    out = os.path.join(ROOT, 'site', 'intel.js')
    with open(out, 'w', encoding='utf8') as f:
        f.write('window.INTEL=' + json.dumps(intel, ensure_ascii=False, separators=(',', ':')) + ';\n')
    print(f'{out}: {os.path.getsize(out) // 1024} KB, sheet updated {intel["meta"]["sheetUpdated"]}, game {intel["meta"]["gameVersion"]}')


if __name__ == '__main__':
    main()
