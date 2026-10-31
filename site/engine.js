// Kill Chain math. Pure functions over window.INTEL, shared by the page and tools/test_engine.js.
// Formulas follow the compendium's Mechanics tab. Where the sheet leaves a gap, the assumption
// is listed on the page under "What this site calculates".
(function (root) {
  const X = root.INTEL;
  const LEVELS = [1, 3, 5, 7, 10];
  const lvl = (st, id) => (st.perks && st.perks[id]) || 0;
  const pick = (st, id, pair) => { const l = lvl(st, id); return l ? pair[l - 1] : 0; };
  const has = (st, id) => !!(st.items && st.items[id]);
  const isGun = w => w.kind === 'gun';

  // ---- what each perk does to the numbers ------------------------------------------------
  const FX = {
    'steel-chamber': { on: w => w.cls === 'Heavy Rifle', dmg: [.15, .30], label: 'damage' },
    headblown: { on: w => w.cls === 'Handgun', head: [.2, .3], label: 'headshot damage' },
    wicked: { on: w => w.cls === 'Handgun', limb: [.1, .2], label: 'limb damage' },
    overkill: { on: w => w.cls === 'Shotgun', pellets: [.15, .3], label: 'pellets' },
    mohawk: { on: w => w.cls === 'Rifle', pen: [1, 2], label: 'penetration' },
    'penetrating-shot': { on: w => w.cls === 'Heavy Rifle', pen: [1, 1], label: 'penetration' },
    hitman: { on: w => w.kind === 'melee' && !w.two, dmg: [.15, .3], stamina: [.15, .15], label: 'damage, costs stamina' },
    butcher: { on: w => w.kind === 'melee', limb: [.2, .4], label: 'limb damage' },
    'hard-blow': { on: w => w.kind === 'melee' && w.two, stab: [.15, .3], modes: ['light', 'strong'], label: 'stability' },
    headhunter: { on: w => w.kind === 'melee', head: [.1, .2], label: 'headshot damage' },
    rush: { on: w => w.kind === 'melee' && w.two, stamina: [-.1, -.3], modes: ['charged'], label: 'charged stamina cost' },
    'eagle-eye': { on: w => w.cls === 'Heavy Rifle', range: [.4, .8], label: 'range' },
    icarus: { on: w => w.cls === 'Shotgun', range: [.3, .5], label: 'range' },
    winged: { on: w => w.cls === 'SMG', range: [.25, .5], label: 'range' },
    'handgun-reloading': { on: w => w.cls === 'Handgun', label: 'reload speed' },
    'rifle-reloading': { on: w => ['Rifle', 'Heavy Rifle', 'SMG'].includes(w.cls), label: 'reload speed' },
    'shotgun-reloading': { on: w => w.cls === 'Shotgun', label: 'reload speed' },
    'locked-on': { on: w => w.cls === 'SMG', label: 'less recoil' },
    'steady-shot': { on: w => w.cls === 'Rifle', label: 'less recoil' },
    'steady-hand': { on: w => w.cls === 'Handgun', label: 'less spread' },
    'tight-shot': { on: w => w.cls === 'Shotgun', label: 'less spread' },
    hellfire: { on: w => w.cls === 'Rifle', label: 'hipfire spread' },
    berserker: { on: w => w.kind === 'melee', label: 'stamina back on kill' },
  };
  const pool = (st, w, key, mode) => {
    let sum = 0;
    for (const id in FX) {
      const f = FX[id];
      if (f[key] && f.on(w) && (!f.modes || !mode || f.modes.includes(mode))) sum += pick(st, id, f[key]);
    }
    return sum;
  };
  const perksFor = w => X.perks.filter(p => FX[p.id] && FX[p.id].on(w));
  const weaponsFor = id => FX[id] ? X.guns.concat(X.melee).filter(FX[id].on) : [];

  // ---- you ---------------------------------------------------------------------------------
  function you(st) {
    const P = X.player;
    const hpMult = 1 + pick(st, 'thick-skin', [.1, .2]) + pick(st, 'deprived', [.1, .2]) + pick(st, 'mule', [-.15, -.05]);
    const staMult = 1 + pick(st, 'athlete', [.1, .2]) + pick(st, 'caravan', [-.15, -.1]) + (has(st, 'adrenaline-shot') ? .25 : 0);
    const sprintMult = P.sprint + (has(st, 'running-shoes') ? .1 : 0);
    const drain = P.drain * (1 - pick(st, 'marathon-runner', [.15, .3]));
    return {
      hp: P.hp * hpMult, stamina: P.stamina * staMult, walk: P.speed, sprint: P.speed * sprintMult, sprintMult,
      sprintSecs: P.stamina * staMult / drain, drain,
      resist: has(st, 'body-armor') ? .25 : 0,
      mitigate: pick(st, 'sturdy-body', [.1, .2]),
      immunity: pick(st, 'acquired-immunity', [10, 20]),
      gasImmune: has(st, 'n95-mask'),
      noiseMove: 1 - pick(st, 'quiet-steps', [.1, .2]) - (has(st, 'ranger-boots') ? .5 : 0),
      healBandage: (25 + (has(st, 'herbal-remedy') ? 10 : 0)) * (1 + pick(st, 'skilled-medic', [.5, 1])),
      healMedkit: 100 * (1 + pick(st, 'skilled-medic', [.5, 1])),
      downTime: P.downTimer * (1 + pick(st, 'limbo', [.15, .3])),
      kgBonus: pick(st, 'mule', [1, 2]) + pick(st, 'caravan', [2, 3]) - pick(st, 'deprived', [2, 2]),
    };
  }

  // ---- weapon -> zombie ---------------------------------------------------------------------
  const zoneKey = { head: 'head', body: 'dmg', limb: 'limb' };

  function rawHit(w, zone, st, ctx) {
    const D = X.difficulty[st.diff];
    const mode = ctx.mode || 'charged';
    if (isGun(w)) {
      const base = w[zoneKey[zone]] || 0;
      const add = pool(st, w, 'dmg') * (zone === 'limb' ? 0 : 1) + (zone === 'head' ? pool(st, w, 'head') : 0) + (zone === 'limb' ? pool(st, w, 'limb') : 0);
      const dm = zone === 'head' ? D.gunHead : zone === 'limb' ? D.gunLimb : D.gun;
      const pellets = w.pellets * (1 + pool(st, w, 'pellets'));
      return base * pellets * (1 + add) * dm;
    }
    const base = w[mode][zoneKey[zone]] || 0;
    const add = (zone === 'limb' ? pool(st, w, 'limb') : pool(st, w, 'dmg')) + (zone === 'head' ? pool(st, w, 'head') : 0);
    return base * (1 + add) * D.melee;
  }

  // Multiplier the zombie applies to a hit. National Guard head math follows the Oddities note:
  // a small wrench headshot goes from 20 to 80 on a knocked-down NG (x2 head, x2 weakened).
  function taken(z, w, zone, down) {
    let m = 1;
    if (z.bodyRes) {
      if (zone === 'head') m *= z.headTaken;
      if (!down) m *= z.bodyRes;
    }
    if (z.vestRes && isGun(w) && zone === 'body') m *= z.vestRes;
    if (down) m *= 2;
    return m;
  }

  function strike(w, z, st, ctx) {
    const zone = ctx.zone || 'head', down = !!ctx.down;
    const raw = rawHit(w, zone, st, ctx);
    const per = raw * taken(z, w, zone, down);
    const pen = isGun(w) ? w.pen + pool(st, w, 'pen') : 0;
    let strip = 0, blocked = false;
    const barrier = z.helmet && (zone === 'head' || z.id === 'riot-shield');
    if (barrier && pen < z.helmetPen) {
      blocked = true;
      const hitsDmg = rawHit(w, zone === 'body' ? 'body' : 'head', st, ctx);
      strip = hitsDmg > 0 ? Math.ceil(z.helmet / hitsDmg) : Infinity;
    }
    const kill = per > 0 ? Math.ceil(z.hp / per - 1e-9) : Infinity;
    const hits = kill + strip;
    const out = { per, kill, strip, hits, pen, blocked, stab: stability(w, z, st, ctx), range: range(w, st) };
    if (isGun(w)) {
      out.roundsKg = hits * w.roundKg;
      out.killsPerMag = Math.floor(w.magN / hits);
    } else {
      const m = w[ctx.mode || 'charged'];
      const swing = m.cost * (1 + pool(st, w, 'stamina', ctx.mode || 'charged')) + m.perHit;
      out.swing = swing;
      out.stamina = swing * hits;
      out.killsPerBar = Math.floor(you(st).stamina / out.stamina);
    }
    return out;
  }

  function stability(w, z, st, ctx) {
    const mode = ctx.mode || 'charged';
    const raw = isGun(w) ? w.stab : w[mode].stab * (1 + pool(st, w, 'stab', mode));
    let m = 1;
    if (z.stabRes) m *= z.stabRes;
    if (z.stabResGun && isGun(w)) m *= z.stabResGun;
    if (ctx.down) m *= 2;
    return raw * m;
  }
  const stabEffect = v => X.mechanics.stability.slice().reverse().find(s => v >= s.min);
  const range = (w, st) => w.range * (1 + pool(st, w, 'range'));

  function limbHits(w, part, st, ctx) {
    const raw = rawHit(w, 'limb', st, ctx);
    return raw > 1 * (X.difficulty[st.diff].melee) ? Math.ceil(part / (raw * (ctx.down ? 2 : 1))) : Infinity;
  }

  // Sort key for the kill board. Ties go to the cheaper option: lighter ammo or less stamina.
  function board(z, st, ctx, list) {
    return list.map(w => ({ w, r: strike(w, z, st, ctx) })).sort((a, b) =>
      a.r.hits - b.r.hits || (a.r.stamina ?? a.r.roundsKg * 100) - (b.r.stamina ?? b.r.roundsKg * 100) || a.w.name.localeCompare(b.w.name));
  }

  // ---- zombie -> you ------------------------------------------------------------------------
  const hitDamage = (base, st) => base * X.difficulty[st.diff].taken * (1 - you(st).resist) * (1 - you(st).mitigate);

  function chance(table, hpPct) {
    if (hpPct <= table[0][0]) return table[0][1];
    for (let i = 1; i < table.length; i++) {
      if (hpPct <= table[i][0]) {
        const [a, ca] = table[i - 1], [b, cb] = table[i];
        return ca + (cb - ca) * (hpPct - a) / (b - a);
      }
    }
    return table[table.length - 1][1];
  }
  const infectSwipe = (hpPct, st) => Math.max(0, chance(X.infection.swipe, hpPct) - you(st).immunity);
  const infectGas = (hpPct, st) => you(st).gasImmune ? 0 : Math.max(0, chance(X.infection.gas, hpPct) - you(st).immunity);

  // Walks a full-health responder through repeated basic hits. Health gating per Mechanics:
  // the first hit that would overshoot your remaining HP leaves you at 1 instead.
  function beating(z, st, base) {
    const me = you(st);
    const dmg = hitDamage(base ?? z.basic, st);
    const steps = [];
    let hp = me.hp, gate = true, clean = 1, n = 0;
    while (hp > 0 && n < 60 && dmg > 0) {
      n++;
      let gated = false;
      if (dmg > hp && gate && hp > 1) { hp = 1; gate = false; gated = true; } else hp -= dmg;
      hp = Math.max(hp, 0);
      const pct = hp / me.hp * 100;
      const c = hp > 0 ? infectSwipe(pct, st) : 0;
      clean *= 1 - c / 100;
      steps.push({ n, hp, pct, chance: c, infected: (1 - clean) * 100, gated });
    }
    return { dmg, steps, hits: steps.length, firstRoll: (steps.find(s => s.chance > 0) || {}).n || null, infected: steps.length ? steps[steps.length - 1].infected : 0 };
  }

  // ---- contact forecast ---------------------------------------------------------------------
  const ARCH = [
    { key: 'Walker', id: 'walker' }, { key: 'Shambler', id: 'shambler' }, { key: 'Runner', id: 'runner' },
    { key: 'Walker Prime', id: 'prime', elite: null, cd: 'Walker Prime' }, { key: 'Runner Prime', id: 'prime-runner' },
  ];
  function forecast(st) {
    const S = X.spawning, i = LEVELS.indexOf(st.threat), p = st.squad - 1;
    const w = S.weights[st.diff];
    const total = ARCH.reduce((s, a) => s + (w[a.key] ? w[a.key][i] : 0), 0);
    const cap = S.cap[st.diff][p];
    const rows = ARCH.map(a => {
      const share = (w[a.key][i] || 0) / total;
      const lim = S.elite[a.key] ? S.elite[a.key][st.diff][p] : null;
      const cd = a.key === 'Walker' ? null : (a.key === 'Walker Prime' ? S.cooldown['Walker Prime'] : S.cooldown['Runner, Shambler, Runner Prime'])[st.diff][p];
      let alive = Math.round(cap * share);
      if (lim !== null) alive = Math.min(alive, lim);
      return { ...a, share, lim, cd, alive, weight: w[a.key][i] };
    });
    rows[0].alive = Math.max(0, cap - rows.slice(1).reduce((s, r) => s + r.alive, 0));
    return { cap, rows };
  }

  root.ENGINE = { LEVELS, FX, you, strike, stability, stabEffect, range, limbHits, board, hitDamage, chance, infectSwipe, infectGas, beating, forecast, perksFor, weaponsFor, pick, lvl, has, pool };
})(typeof window !== 'undefined' ? window : globalThis);
