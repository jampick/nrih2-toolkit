// Kill Chain page. One state object drives every panel, so a choice anywhere changes the numbers everywhere.
(function () {
  const X = window.INTEL, E = window.ENGINE;
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const by = (a, id) => a.find(x => x.id === id);
  const fmt = n => Number(n).toLocaleString('en-US');
  const r1 = n => Math.round(n * 10) / 10;
  const img = n => n ? (n.startsWith('zomb_') ? `img/${n}.jpg` : `img/${n}.png`) : '';
  const WEAPONS = X.guns.concat(X.melee);
  const DIFFS = ['beginner', 'normal', 'hard', 'nightmare'];
  const DSHORT = { beginner: 'Beg', normal: 'Nrm', hard: 'Hrd', nightmare: 'Nmr' };
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const S = {
    diff: 'normal', squad: 4, threat: 5, t: 'walker', w: 'mc-15', zone: 'head', mode: 'charged', down: false, filter: 'all',
    perks: {}, items: {}, prof: null, lvl: 100, map: 'power-plant', part: 'head', walls: false, suppress: false, plant: false,
    hp: 55, stam: 40, pills: false, more: false,
  };
  const SHARE = ['diff', 'squad', 'threat', 't', 'w', 'zone', 'mode', 'filter', 'lvl', 'map', 'prof'];

  function readHash() {
    const h = new URLSearchParams(location.hash.slice(1));
    SHARE.forEach(k => { if (h.has(k)) S[k] = /^(squad|threat|lvl)$/.test(k) ? +h.get(k) : h.get(k); });
    if (h.get('down') === '1') S.down = true;
    (h.get('perks') || '').split(',').filter(Boolean).forEach(p => { const [id, l] = p.split(':'); if (by(X.perks, id)) S.perks[id] = +l || 1; });
    (h.get('items') || '').split(',').filter(Boolean).forEach(i => { if (by(X.items, i)) S.items[i] = 1; });
    if (!DIFFS.includes(S.diff)) S.diff = 'normal';
    if (!by(X.zombies, S.t)) S.t = 'walker';
    if (!by(WEAPONS, S.w)) S.w = 'mc-15';
    if (!by(X.maps, S.map)) S.map = 'power-plant';
    S.squad = Math.min(8, Math.max(1, S.squad || 4));
    if (!E.LEVELS.includes(S.threat)) S.threat = 5;
    S.lvl = Math.min(100, Math.max(1, S.lvl || 100));
  }
  function shareUrl() {
    const h = new URLSearchParams();
    SHARE.forEach(k => { if (S[k] !== null && S[k] !== '') h.set(k, S[k]); });
    if (S.down) h.set('down', '1');
    const p = Object.entries(S.perks).map(([k, v]) => `${k}:${v}`).join(',');
    if (p) h.set('perks', p);
    const i = Object.keys(S.items).join(',');
    if (i) h.set('items', i);
    return location.origin + location.pathname + '#' + h.toString();
  }

  const target = () => by(X.zombies, S.t);
  const weapon = () => by(WEAPONS, S.w);
  const ctx = (o = {}) => ({ zone: S.zone, mode: S.mode, down: S.down, ...o });
  const srcA = (tab, label) => `<a href="${X.source.url}#gid=${X.source.gids[tab]}" target="_blank" rel="noopener">${esc(label)} &#8599;</a>`;
  const src = (...tabs) => `<div class="src"><span>SRC: NMRiH2 Info Compendium</span>${tabs.map(t => srcA(t[0], t[1])).join('')}</div>`;
  const ent = (kind, id, label) => `<button class="ent" data-a="ent" data-v="${kind}:${id}">${esc(label)}</button>`;
  const head = (no, kick, title) => `<div class="stage-head"><div class="stage-no" aria-hidden="true">${no}</div><div class="kick">${esc(kick)}</div><h2>${esc(title)}</h2></div>`;
  const locked = o => o.shop && o.shop.lvl != null && o.shop.lvl > S.lvl;
  const heat = h => h === Infinity ? '#332624' : h <= 1 ? '#3fe0c0' : h === 2 ? '#a7d98a' : h === 3 ? '#ffb224' : h <= 5 ? '#ff7a2e' : h <= 9 ? '#e0301e' : '#7a1a12';
  const heatText = h => (h === Infinity || h > 5) ? '#fff' : '#120604';

  // ---- hero, with the credit up front ------------------------------------------------------
  function activeEvent() {
    const e = X.events[0];
    if (!e) return null;
    const when = s => { const m = s.match(/^(\w+)\.? (\d+) (\d+)PM EDT/); return m && new Date(`${m[1].slice(0, 3)} ${m[2]} 2026 ${+m[3] === 12 ? 12 : +m[3] + 12}:00 GMT-0400`); };
    const a = when(e.start), b = when(e.end), now = new Date();
    return a && b && now >= a && now < b ? { ...e, ends: b } : null;
  }
  function renderHero() {
    const ev = activeEvent();
    $('#hero').innerHTML = `
      <div class="hero-art" style="background-image:url(img/zomb_walker.jpg)"></div><div class="hero-tint"></div><div class="hero-fade"></div>
      <svg class="hero-reticle" viewBox="0 0 200 200" fill="none" stroke="#ff3322" aria-hidden="true">
        <path d="M6 40V6h34M160 6h34v34M194 160v34h-34M40 194H6v-34" stroke-width="2"/>
        <circle cx="100" cy="100" r="52" stroke-width="1" stroke-dasharray="3 5"/><path d="M100 36v30M100 134v30M36 100h30M134 100h30" stroke-width="1"/><circle cx="100" cy="100" r="2" fill="#ff3322"/>
      </svg>
      <div class="hero-top"><span><span class="rec">&#9679;</span> UNOFFICIAL FAN SITE</span><span>GAME ${esc(X.meta.gameVersion)}<br>DATA ${esc(X.meta.sheetUpdated.toUpperCase())}</span></div>
      <div class="hero-body">
        ${ev ? `<div class="event">LIVE: ${ev.bonus.map(b => `${b.x}x ${esc(b.what)}`).join(' + ')} until ${esc(ev.end)}</div>` : ''}
        <h1>Kill<br><span>Chain</span></h1>
        <p class="hero-sub">Know what's hunting you.<br>Know what stops it.</p>
        <div class="hero-credit">Nearly every game number here starts in the <strong>NMRiH2 Info Compendium</strong>, built and maintained by <strong>@SchwarzFenrir</strong> with help from the community. This page is a different way to read their work. It doesn't replace it.</div>
        <div class="hero-cta"><a class="btn" href="#contact">Start the chain</a><a class="btn teal" href="${X.source.url}" target="_blank" rel="noopener">Read the source &#8599;</a></div>
      </div>`;
  }

  // ---- sitrep bar --------------------------------------------------------------------------
  function renderSitrep() {
    const open = $('#sitMoreBox')?.classList.contains('open');
    $('#sitrep').innerHTML = `
      <div class="seg" role="group" aria-label="Difficulty">${DIFFS.map(d => `<button data-a="diff" data-v="${d}" aria-pressed="${S.diff === d}" title="${X.difficulty[d].name}">${DSHORT[d]}</button>`).join('')}</div>
      <div class="sit-right"><button class="icon-btn" id="sitMore" data-a="sitmore" aria-expanded="${!!open}" aria-controls="sitMoreBox">${S.squad}P T${S.threat} &#9662;</button><button class="icon-btn" data-a="query" aria-label="Search everything">FIND</button><button class="icon-btn" data-a="share" aria-label="Copy a link to this setup">LINK</button></div>
      <div class="sit-more ${open ? 'open' : ''}" id="sitMoreBox">
        <div class="step" role="group" aria-label="Squad size"><button data-a="squad" data-v="-1" aria-label="Fewer players">&minus;</button><output>${S.squad} PLAYER${S.squad > 1 ? 'S' : ''}</output><button data-a="squad" data-v="1" aria-label="More players">+</button></div>
        <div class="step" role="group" aria-label="Threat level"><button data-a="threat" data-v="-1" aria-label="Lower threat">&minus;</button><output>THREAT ${S.threat}</output><button data-a="threat" data-v="1" aria-label="Higher threat">+</button></div>
      </div>`;
  }
  const CHAIN = [['contact', '01', 'Contact'], ['lock', '02', 'Lock'], ['kill', '03', 'Kill'], ['noise', '04', 'Noise'], ['survive', '05', 'Survive'], ['build', '06', 'Build'], ['extract', '07', 'Extract'], ['intel', '08', 'Intel'], ['source', 'SRC', 'Source']];
  function renderChain() {
    $('#chain').innerHTML = `<ol>${CHAIN.map(c => `<li><a href="#${c[0]}" data-sec="${c[0]}"><small>${c[1]}</small>${c[2]}</a></li>`).join('')}</ol>`;
  }

  // ---- 01 contact ---------------------------------------------------------------------------
  const ARCH_COL = { Walker: '#c6281a', Shambler: '#c9d84a', Runner: '#ffb224', 'Walker Prime': '#ff4a3a', 'Runner Prime': '#fff1e0' };
  function renderContact() {
    const f = E.forecast(S), D = X.difficulty[S.diff];
    const armored = D.armored === 'None' ? 'No armored zombies on Beginner.' : `Armored spawn rates ${D.armored} on ${D.name}.`;
    const danger = f.rows.filter(r => r.id !== 'walker').reduce((s, r) => s + r.share, 0);
    $('#contact').innerHTML = head('01', 'WHAT IS COMING', 'Contact') + `
      <p class="lede">On ${D.name} with ${S.squad} player${S.squad > 1 ? 's' : ''} at threat ${S.threat}, one location holds up to <strong>${f.cap} zombies</strong> and <strong>${Math.round(danger * 100)}%</strong> of spawn picks are not plain Walkers. Noise won't add to that number, it only pulls in what's already there. Tap a contact to lock it.</p>
      <div class="contact-wrap">
        <div class="radar-box"><canvas id="radar" width="720" height="720" role="img" aria-label="Radar showing a snapshot of ${f.cap} zombies by type"></canvas><div class="radar-cap"><b>${f.cap}</b>LOCATION CAP <span class="calc">CALC mix</span></div></div>
        <div>
          <div class="arch">${f.rows.map(r => `<button class="arch-row" data-a="target" data-v="${r.id}" aria-pressed="${S.t === r.id}">
              <span class="arch-dot" style="background:${ARCH_COL[r.key]}"></span><span class="arch-name">${esc(r.key)}</span><span class="arch-pct">${Math.round(r.share * 100)}%</span>
              <span class="arch-bar"><i style="width:${r.share * 100}%;background:${ARCH_COL[r.key]}"></i></span>
              <span class="arch-meta">${r.lim !== null ? `Max ${r.lim} alive` : r.key === 'Walker' ? 'Fills the rest' : 'No alive limit listed'}${r.cd !== null ? ` / back in ${r.cd}s` : ''}</span></button>`).join('')}</div>
          <div class="diffline" style="margin-top:12px">
            <div class="tile"><b class="r">x${D.taken}</b><span>Damage you take</span></div>
            <div class="tile"><b class="${D.ammoPickup ? 'r' : ''}">${D.ammoPickup ? '-' + D.ammoPickup + '%' : 'Full'}</b><span>Ammo pickups</span></div>
            <div class="tile"><b>${esc(D.foundAmmo)}</b><span>Ammo in found guns</span></div>
            <div class="tile"><b>${esc(D.prime)}</b><span>Prime spawns</span></div>
            <div class="tile"><b>${esc(D.respawn)}</b><span>Respawn</span></div>
            <div class="tile"><b class="g">x${D.cr}</b><span>Credits</span></div>
          </div>
          ${D.gun > 1 ? `<p class="note" style="margin-top:8px">Beginner also hands you ${Math.round((D.gun - 1) * 100)}% more gun damage and ${Math.round((D.melee - 1) * 100)}% more melee damage. It's already in the numbers below.</p>` : ''}
        </div>
      </div>
      <div class="sect-l" style="margin-top:18px">Special infected</div>
      <p class="note">${armored}</p>
      <div class="roster">${X.zombies.filter(z => !f.rows.some(r => r.id === z.id)).map(z => `<button data-a="target" data-v="${z.id}" aria-pressed="${S.t === z.id}"><b>${esc(z.name)}</b><span>${z.helmet ? `${z.id === 'riot-shield' ? 'Shield' : 'Helmet'} ${z.helmet} HP, pen ${z.helmetPen}` : `Speed ${z.speed}`}</span></button>`).join('')}
        <button class="redacted" data-a="ent" data-v="mutated:x"><b>&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;</b><span>Unconfirmed. Game files only.</span></button></div>
      ${src(['spawning', 'Spawning Parameters'], ['difficulty', 'Difficulty'], ['zombies', 'Zombies'])}`;
    initRadar(f);
  }
  let blips = [], sweep = 0, radarSig = '';
  function initRadar(f) {
    const sig = f.rows.map(r => r.alive).join();
    if (sig !== radarSig) {
      radarSig = sig;
      blips = [];
      f.rows.forEach(r => { for (let i = 0; i < r.alive; i++) { const a = Math.random() * 6.283, d = .22 + Math.sqrt(Math.random()) * .72; blips.push({ a, d, c: ARCH_COL[r.key], fast: /Runner/.test(r.key) ? 1.8 : r.key === 'Shambler' ? .5 : 1, seen: Math.random() * 6.283 }); } });
    }
    if (reduced) drawRadar(0);
  }
  function drawRadar(dt) {
    const cv = $('#radar');
    if (!cv) return;
    const c = cv.getContext('2d'), n = cv.width, m = n / 2;
    sweep = (sweep + dt * .0011) % 6.283;
    c.fillStyle = '#060202'; c.fillRect(0, 0, n, n);
    c.strokeStyle = 'rgba(255,51,34,.28)'; c.lineWidth = 1.5;
    [.25, .5, .75, .98].forEach(k => { c.beginPath(); c.arc(m, m, m * k, 0, 6.283); c.stroke(); });
    c.beginPath(); c.moveTo(m, 0); c.lineTo(m, n); c.moveTo(0, m); c.lineTo(n, m); c.stroke();
    for (let i = 0; i < 26; i++) {
      c.beginPath(); c.moveTo(m, m); c.arc(m, m, m * .98, sweep - (i + 1) * .035, sweep - i * .035);
      c.fillStyle = `rgba(255,51,34,${.22 * (1 - i / 26)})`; c.fill();
    }
    c.strokeStyle = 'rgba(255,241,224,.8)'; c.beginPath(); c.moveTo(m, m); c.lineTo(m + Math.cos(sweep) * m * .98, m + Math.sin(sweep) * m * .98); c.stroke();
    blips.forEach(b => {
      b.d -= dt * 0.0000085 * b.fast;
      if (b.d < .1) { b.d = .95; b.a = Math.random() * 6.283; }
      const lag = ((sweep - b.a) % 6.283 + 6.283) % 6.283;
      const glow = reduced ? .9 : Math.max(.16, 1 - lag / 5);
      c.globalAlpha = glow; c.fillStyle = b.c;
      c.beginPath(); c.arc(m + Math.cos(b.a) * b.d * m * .98, m + Math.sin(b.a) * b.d * m * .98, 7, 0, 6.283); c.fill();
      c.globalAlpha = 1;
    });
    c.fillStyle = '#3fe0c0'; c.beginPath(); c.moveTo(m, m - 12); c.lineTo(m + 10, m + 9); c.lineTo(m - 10, m + 9); c.closePath(); c.fill();
  }

  // ---- 02 lock ------------------------------------------------------------------------------
  const FIELD = {
    walker: 'The bulk of every horde. You can walk away from one, which stops mattering once there are thirty.',
    prime: "Coated and darkened with blood, with lower, guttural noises that set it apart from a Walker. Those extra 30 HP are what break most one-tap guns.",
    runner: 'Listen for the scream and the footsteps. An idle one holds a power stance you can spot from a distance. Its grab is currently disabled.',
    shambler: 'If it finishes its scream, a Runner spawns. The gas cloud from its body can infect you at full HP, and zombies walking through the gas pick up doubled infection chances. Its lunge and grab are currently disabled.',
    'prime-runner': 'Runner speed with a Prime paint job. Grab is currently disabled.',
    crawler: "What's left after you take a leg. It keeps the stats of whatever it was, with new speed and reach. The sheet recommends against making these: since the Early Access buffs they can be worse than Walkers.",
    'runner-crawler': 'A legless Runner. Twice the speed of a normal Crawler.',
  };
  const ZONES = [
    ['head', 'M100 8l15 6 5 17-5 17-15 6-15-6-5-17 5-17z'],
    ['chest', 'M72 62h56l8 22-6 66H70l-6-66z'],
    ['upperArmL', 'M60 64l9 2-5 54-17 0z'], ['upperArmR', 'M140 64l-9 2 5 54 17 0z'],
    ['lowerArmL', 'M46 124h17l-7 54H41z'], ['lowerArmR', 'M154 124h-17l7 54h15z'],
    ['handL', 'M40 182h16l-2 24H37z'], ['handR', 'M160 182h-16l2 24h17z'],
    ['upperLegL', 'M70 154h28l-2 88H72z'], ['upperLegR', 'M130 154h-28l2 88h24z'],
    ['lowerLegL', 'M72 246h24l-2 96H76z'], ['lowerLegR', 'M128 246h-24l2 96h18z'],
    ['footL', 'M76 346h18l1 22H64z'], ['footR', 'M124 346h-18l-1 22h31z'],
  ];
  const PART_INFO = {
    upperArm: ['Upper arm', 'upperArm'], lowerArm: ['Lower arm', 'lowerArm'], hand: ['Hand', 'hand'],
    upperLeg: ['Upper leg', 'upperLeg'], lowerLeg: ['Lower leg', 'lowerLeg'], foot: ['Foot', 'foot'],
  };
  function partRead(part, z, w) {
    const L = X.mechanics.limbs;
    if (part === 'head' || part === 'chest') {
      const r = E.strike(w, z, S, ctx({ zone: part === 'head' ? 'head' : 'body' }));
      return { h: r.hits, title: part === 'head' ? 'Head' : 'Chest and body', line: `${r.hits === Infinity ? 'No damage' : `${r.hits} hit${r.hits > 1 ? 's' : ''} to kill at ${r1(r.per)} per hit`}${r.strip ? `, including about ${r.strip} to strip the ${z.id === 'riot-shield' ? 'shield' : 'helmet'}` : ''}.${part === 'chest' ? ' Breaking the chest (60) only interrupts, it changes nothing else.' : ''}` };
    }
    const base = part.replace(/[LR]$/, '');
    let hp = L[base];
    if (base === 'lowerLeg' && ['shambler', 'prime', 'prime-runner'].includes(z.id)) hp = 60;
    const h = E.limbHits(w, hp, S, ctx());
    const isArm = /Arm|hand/.test(base);
    return {
      h, title: PART_INFO[base][0], line: h === Infinity
        ? `${hp} limb HP. ${esc(w.name)} is blunt enough to do 1 limb damage here, so don't try.`
        : `${hp} limb HP, ${h} hit${h > 1 ? 's' : ''} to take it off. ${isArm ? 'Lose an arm, lose that attack. Both arms and it cannot attack at all.' : 'Lose a leg and it becomes a Crawler, which is often worse.'} Limb damage travels up the limb, never down.`
    };
  }
  function bodySvg(z, w) {
    return `<svg class="body-svg" viewBox="20 0 160 376" role="img" aria-label="Body map with hits by part">${ZONES.map(([p, d]) => {
      const h = partRead(p, z, w).h;
      return `<path class="bp" d="${d}" fill="${heat(h)}" data-a="part" data-v="${p}" ${S.part === p ? 'stroke="#fff1e0" stroke-width="2"' : ''}/>`;
    }).join('')}${z.helmet && z.id !== 'riot-shield' ? '<path d="M82 22l18-14 18 14-2 8H84z" fill="none" stroke="#ffb224" stroke-width="2.5" pointer-events="none"/>' : ''}${z.id === 'riot-shield' ? '<path d="M24 92h28v130H24z" fill="rgba(255,178,36,.25)" stroke="#ffb224" stroke-width="2" pointer-events="none"/>' : ''}</svg>`;
  }
  const SILHOUETTE = `<svg class="noimg" viewBox="20 0 160 376" aria-hidden="true">${ZONES.map(([, d]) => `<path d="${d}" fill="#3a0d08" stroke="#ff3322" stroke-width=".8"/>`).join('')}</svg>`;
  function renderLock() {
    const z = target(), w = weapon(), me = E.you(S), D = X.difficulty[S.diff], B = E.beating(z, S);
    const pr = partRead(S.part, z, w);
    const atk = [['Basic', z.basic, ''], [z.heavyMulti ? 'Heavy multi' : 'Heavy', z.heavy, ''], ['Lunge', z.lunge, z.disabled.includes('lunge') ? 'off' : ''], ['Grab tick', z.grabDmg, z.disabled.includes('grab') ? 'off' : '']];
    const lo = z.speed * (1 - z.speedVar[0] / 100), hi = z.speed * (1 + z.speedVar[1] / 100);
    const caught = lo > me.sprint ? 'It outruns you every time.' : hi > me.sprint ? `It rolled ${lo} to ${hi} on spawn. Your ${me.sprint} sprint only beats the slow rolls${me.sprintMult < 2 ? ', and Running Shoes only get you to 400' : ''}.` : hi > me.walk ? `You out-sprint it, for ${Math.round(me.sprintSecs)}s of stamina. Walking, you don't.` : "You can walk away from this one.";
    const scale = 420;
    const fieldNote = z.note || FIELD[z.id] || '';
    $('#lock').innerHTML = head('02', 'WHAT YOU ARE LOOKING AT', 'Lock') + `
      <div class="lock-grid">
        <div>
          <div class="scope">
            ${z.art ? `<img src="${img(z.art)}" alt="${esc(z.name)}"><div class="tint"></div>` : SILHOUETTE}
            <svg class="brackets" viewBox="0 0 400 300" preserveAspectRatio="none" fill="none" stroke="#ff3322" stroke-width="2" aria-hidden="true"><path d="M90 40V20h20M290 20h20v20M310 260v20h-20M110 280H90v-20"/></svg>
            ${reduced ? '' : '<div class="scan"></div>'}
            <div class="hud tl">TARGET ACQUIRED<br>CLASS: ${z.armored ? 'ARMORED' : 'INFECTED'}<br>${z.alias ? `AKA ${esc(z.alias.toUpperCase())}` : ''}</div>
            <div class="hud tr">HP ${z.hp}<br>SPD ${z.speed}${z.helmet ? `<br>${z.id === 'riot-shield' ? 'SHIELD' : 'HELMET'} ${z.helmet}` : ''}</div>
            <div class="hud bl"><h3>${esc(z.name)}</h3></div>
          </div>
          <p class="note" style="margin-top:8px">${esc(fieldNote)}${z.inherited ? ' The sheet lists armor rules for this type and no separate stat block, so its base numbers are shown as a Walker\'s.' : ''}${z.inheritedFrom ? ` HP and damage shown are a ${esc(z.inheritedFrom)}'s. It keeps whatever it had before.` : ''}</p>
        </div>
        <div class="panel">
          <h3>Where to hit it <small>with ${esc(w.name)}</small></h3>
          <div class="body-wrap">${bodySvg(z, w)}
            <div class="zone-read" aria-live="polite"><b>${esc(pr.title)}</b><p style="font-size:13px;margin-top:4px">${pr.line}</p>
              <p class="note">${w.kind === 'gun' ? 'Tap a body part. Colour shows hits needed.' : `Using ${S.mode} attacks. Tap a body part.`}</p>
              <div class="legend"><span><i style="background:${heat(1)}"></i>1</span><span><i style="background:${heat(2)}"></i>2</span><span><i style="background:${heat(3)}"></i>3</span><span><i style="background:${heat(5)}"></i>4-5</span><span><i style="background:${heat(9)}"></i>6-9</span><span><i style="background:${heat(10)}"></i>10+</span><span><i style="background:${heat(Infinity)}"></i>no</span></div>
            </div></div>
        </div>
      </div>
      <div class="grid2" style="margin-top:12px">
        <div class="panel"><h3>What it does to you <small>${D.name}</small></h3>
          ${atk.map(([n, v, off]) => { const d = E.hitDamage(v, S); return `<div class="attack ${off}"><span>${n}${off ? ' (off)' : ''}</span><div class="bar"><i style="width:${Math.min(100, d / me.hp * 100)}%"></i></div><span style="text-align:right">${r1(d)}</span></div>`; }).join('')}
          ${B.hits ? `<p class="lede" style="margin:10px 0 4px"><strong>${B.hits} basic hits</strong> and you're down. ${B.firstRoll ? `Infection starts rolling on hit ${B.firstRoll}, and by the last hit you're <strong>${Math.round(B.infected)}%</strong> likely to be carrying it.` : 'Your perks keep infection from rolling at all before you go down.'} <span class="calc">CALC</span></p>
          <div class="hitstrip" aria-label="Your HP after each hit">${B.steps.slice(0, 12).map(s => `<span style="border-color:${s.chance > 0 ? 'var(--red)' : 'var(--line2)'}"><b style="color:${s.hp <= 0 ? 'var(--red)' : s.gated ? 'var(--amber)' : 'var(--teal)'}">${s.hp <= 0 ? 'DOWN' : Math.round(s.hp)}</b>${s.gated ? 'gate' : s.chance > 0 ? r1(s.chance) + '%' : 'safe'}</span>`).join('')}</div>
          <p class="note">HP after each hit, with the infection roll for that hit. "Gate" is the one free save when a hit overshoots your HP. It comes back at about 75% health.</p>` : ''}
          ${z.disabled.includes('grab') ? '' : `<p class="note warn">Grabbed at ${X.player.grabBite}% stamina or less means an instant bite and infection, whatever your HP. So does failing the grab minigame.</p>`}
        </div>
        <div class="panel you"><h3>Can you run? <small>game units</small></h3>
          <div class="speed" aria-hidden="true">
            <div style="top:0"><span class="b" style="width:${Math.min(70, me.sprint / scale * 70)}%;background:var(--teal)"></span>Your sprint ${me.sprint}</div>
            <div style="top:22px"><span class="b" style="width:${me.walk / scale * 70}%;background:var(--teal2)"></span>Your walk ${me.walk}</div>
            <div style="top:44px"><span class="b" style="width:${hi / scale * 70}%;background:var(--red)"></span>${esc(z.name)} ${lo === hi ? hi : `${lo}-${hi}`}</div>
          </div>
          <p>${caught}</p>
          <p class="note">Stability decides whether it keeps swinging while you work. What your hit does: <span class="hl g">${E.stabEffect(E.stability(w, z, S, ctx())).name}</span> at ${r1(E.stability(w, z, S, ctx()))} stability from ${esc(w.name)}. A kick is 100 stability for 50 stamina. Shoves and kicks both give i-frames.</p>
        </div>
      </div>
      ${src(['zombies', 'Zombies'], ['mechanics', 'Mechanics'], ['infection', 'Infection'], ['professions', 'Player stats'])}`;
  }

  // ---- 03 kill board ------------------------------------------------------------------------
  function renderKill() {
    const z = target(), w = weapon();
    const list = S.filter === 'gun' ? X.guns : S.filter === 'melee' ? X.melee : WEAPONS;
    const rows = E.board(z, S, ctx(), list);
    const shown = S.more ? rows : rows.slice(0, 10);
    const guns1 = E.board(z, S, ctx(), X.guns).filter(r => r.r.hits === 1).length;
    const bestM = E.board(z, S, ctx(), X.melee)[0];
    const zoneWord = S.zone === 'head' ? 'head' : 'body';
    const verdict = guns1 ? `<em>${guns1} of ${X.guns.length} guns</em> drop a ${esc(z.name)} with one ${zoneWord} hit.` : `<em>No gun</em> one-taps a ${esc(z.name)} to the ${zoneWord}. Bring more rounds.`;
    const hasLocked = rows.some(r => locked(r.w));
    $('#kill').innerHTML = head('03', 'WHAT PUTS IT DOWN', 'Kill') + `
      <p class="verdict">${verdict}<br>Best melee: <em>${esc(bestM.w.name)}</em>, ${bestM.r.hits} swing${bestM.r.hits > 1 ? 's' : ''}.</p>
      <div class="ctrls">
        <div><span class="ctrl-l">AIM</span><div class="seg teal">${['head', 'body'].map(v => `<button data-a="zone" data-v="${v}" aria-pressed="${S.zone === v}">${v}</button>`).join('')}</div></div>
        <div><span class="ctrl-l">MELEE ATTACK</span><div class="seg teal">${['light', 'strong', 'charged'].map(v => `<button data-a="mode" data-v="${v}" aria-pressed="${S.mode === v}">${v}</button>`).join('')}</div></div>
        <div><span class="ctrl-l">SHOW</span><div class="seg teal">${[['all', 'All'], ['gun', 'Guns'], ['melee', 'Melee']].map(([v, l]) => `<button data-a="filter" data-v="${v}" aria-pressed="${S.filter === v}">${l}</button>`).join('')}</div></div>
        <div><span class="ctrl-l">IF KICKED FIRST</span><button class="toggle" data-a="down" aria-pressed="${S.down}">Knocked down: x2</button></div>
      </div>
      <div class="board">${shown.map(({ w: x, r }) => {
        const pips = Math.min(r.hits === Infinity ? 0 : r.hits, 24);
        const lk = locked(x);
        return `<button class="row ${lk ? 'locked' : ''}" data-a="weapon" data-v="${x.id}" aria-pressed="${S.w === x.id}">
          <img class="ico" src="${img(x.icon)}" alt="" loading="lazy">
          <span><span class="nm">${esc(x.name)}</span><span class="sub">${x.kind === 'gun'
            ? `${esc(x.cls)} / ${r1(r.per)} per shot${r.blocked ? ' / <span class="warn">helmet blocks</span>' : ''} / ${r.killsPerMag} kill${r.killsPerMag === 1 ? '' : 's'} per mag`
            : `${r1(r.per)} per swing / ${Math.round(r.stamina)} stamina per kill / ${r.killsPerBar} kill${r.killsPerBar === 1 ? '' : 's'} per bar`}${lk ? ` / unlocks at ${x.shop.lvl}` : ''}</span></span>
          <span class="res ${r.hits === 1 ? 'k1' : ''}">${r.hits === Infinity ? 'X' : r.hits}<small>${x.kind === 'gun' ? 'SHOTS' : 'SWINGS'}</small></span>
          <span class="pips" aria-hidden="true">${Array.from({ length: pips }, (_, i) => `<i class="pip ${i < r.strip ? 's' : ''}"></i>`).join('')}${r.hits > 24 && r.hits !== Infinity ? '<i class="pip more">+</i>' : ''}</span></button>`;
      }).join('')}</div>
      ${rows.length > 10 ? `<button class="more-btn" data-a="more">${S.more ? 'Show top 10' : `Show all ${rows.length}`}</button>` : ''}
      <p class="note" style="margin-top:8px">${hasLocked ? `Greyed rows are above your account level (${S.lvl}, set it in Build). ` : ''}Assumes every pellet lands and no range falloff. Amber pips are estimated hits to strip a helmet or shield. <span class="calc">CALC</span> See the assumptions under Source.</p>
      <div id="wpnPanel"></div>
      <div class="sect-l" style="margin-top:18px">When one target isn't the problem</div>
      <div class="area">${X.items.filter(i => i.grp === 'Explosive').map(i => `<button data-a="ent" data-v="item:${i.id}"><img class="ico" src="${img(i.icon)}" alt="" loading="lazy"><b>${esc(i.name)}</b><span>${i.dmg ? `${i.dmg} dmg / ` : ''}${i.stab} stability / ${i.radius} radius${z.fireImmune && i.id === 'molotov' ? ' / <span class="warn">target is immune</span>' : ''}</span></button>`).join('')}</div>
      ${src(['guns', 'Guns'], ['melee', 'Melee'], ['other', 'Throwables and meds'], ['mechanics', 'Damage formula'])}`;
    renderWeaponPanel();
    renderDock();
  }
  function weeklyFor(w) {
    const key = w.kind === 'melee' ? (w.blade ? 'Bladed' : 'Blunt') : w.cls === 'Shotgun' ? 'Shotgun' : w.cls === 'Handgun' ? 'Pistol' : /Rifle/.test(w.cls) ? 'Rifle' : null;
    return X.weekly.filter(t => key && t.task.includes(`any ${key}`));
  }
  function logFor(name) {
    const alias = { 'M590A1': ['590A1', 'M590'], 'X12 Super': ['RX12', 'X12'], M9A3: ['M9A1', 'M9A3'], 'M1911A1': ['M1911', '1911'], MP5A4: ['MP5'], 'MC-15': ['MC15', 'MC-15'], M7A1: ['M7'], 'Fierra DB12': ['DT11', 'Fierra', 'Double Barrel'], 'Rochester 1873': ['Rochester', 'Winchester'], 'M14 Battle Rifle': ['M14'], 'Sledge Hammer': ['Sledge'], Treetrimmer: ['Tree Trimmer', 'Treetrimmer'], 'Proximity IED': ['IED'], 'M67 Frag': ['M67'], 'Pipe (Small)': ['Small Pipe'], 'Pipe (Large)': ['Long Pipe', 'Large Pipe'], 'Wrench (Small)': ['Small Wrench', 'Adjustable Wrench'], 'Wrench (Large)': ['Large Wrench'] }[name] || [name];
    return X.changelog.filter(c => alias.some(a => (c.s || '').toLowerCase().includes(a.toLowerCase()))).slice(0, 6);
  }
  function weaponFacts(w) {
    const atts = X.attachments.filter(a => a.fits && a.fits.includes(w.id));
    const ammo = w.kind === 'gun' ? X.ammo.find(a => a.name === w.ammo) : null;
    const perks = E.perksFor(w);
    return { atts, ammo, perks };
  }
  function shopLine(o) {
    if (!o.shop) return '';
    if (o.shop.cr == null) return 'No 1.0 shop price listed on the sheet.';
    return `${fmt(o.shop.cr)} credits${o.shop.merits ? ` + ${o.shop.merits} merit` : ''}${o.shop.lvl ? `, account level ${o.shop.lvl}` : ', from the start'}.`;
  }
  function renderWeaponPanel() {
    const w = weapon(), box = $('#wpnPanel');
    if (!box) return;
    const f = weaponFacts(w), lines = X.zombies.map(z => {
      const a = E.strike(w, z, S, ctx({ zone: 'head' })), b = E.strike(w, z, S, ctx({ zone: 'body' }));
      return `<tr class="${z.id === S.t ? 'sel' : ''}"><td><button class="ent" data-a="target" data-v="${z.id}">${esc(z.name)}</button></td><td><span class="heat" style="background:${heat(a.hits)};color:${heatText(a.hits)}">${a.hits === Infinity ? 'X' : (a.strip ? '&asymp;' : '') + a.hits}</span></td><td><span class="heat" style="background:${heat(b.hits)};color:${heatText(b.hits)}">${b.hits === Infinity ? 'X' : (b.strip ? '&asymp;' : '') + b.hits}</span></td><td style="font-size:12px">${E.stabEffect(a.stab).name}</td></tr>`;
    }).join('');
    const m = w.kind === 'melee' ? w[S.mode] : null;
    const tiles = w.kind === 'gun'
      ? [[w.dmg + (w.pellets > 1 ? `x${w.pellets}` : ''), 'Body'], [w.head + (w.pellets > 1 ? `x${w.pellets}` : ''), 'Head'], [w.limb, 'Limb'], [w.stab, 'Stability'], [E.strike(w, target(), S, ctx()).pen, 'Penetration'], [w.mag, 'Magazine'], [`${Math.round(E.range(w, S))}m`, 'Range'], [`${w.kg}kg`, 'Weight']]
      : [[m.dmg, `Body (${S.mode})`], [m.head, 'Head'], [m.limb, 'Limb'], [m.stab, 'Stability'], [`${m.cost}+${m.perHit}`, 'Stamina + per hit'], [Math.round(E.range(w, S)), 'Reach'], [w.throw.dmg, 'Throw dmg'], [`${w.kg}kg`, 'Weight']];
    box.innerHTML = `<div class="panel you" style="margin-top:14px">
      <div class="wpn-head"><img class="ico" src="${img(w.icon)}" alt=""><div><div class="kick" style="color:var(--teal)">YOUR WEAPON / ${esc(w.cls.toUpperCase())}</div><h3>${esc(w.name)}</h3><p class="note" style="margin:6px 0 0">${esc(shopLine(w))}${f.ammo ? ` ${ent('ammo', f.ammo.id, f.ammo.name)}, ${r1(f.ammo.roundKg * 1000)}g a round.` : ''} ${w.kind === 'gun' ? `Heard at ${w.sound}m.` : 'No noise entry for swings.'}</p></div></div>
      <div class="tiles" style="margin:10px 0">${tiles.map(([v, l]) => `<div class="tile"><b>${esc(v)}</b><span>${esc(l)}</span></div>`).join('')}</div>
      <div class="grid2">
        <div class="scroll-x"><table class="matrix"><thead><tr><th>Against</th><th>Head</th><th>Body</th><th>One hit does</th></tr></thead><tbody>${lines}</tbody></table></div>
        <div>
          ${f.perks.length ? `<div class="sect-l">Perks that change it</div><div class="chips">${f.perks.map(p => perkChip(p)).join('')}</div>` : ''}
          ${f.atts.length ? `<div class="sect-l">Takes</div><div class="chips">${f.atts.map(a => `<button class="chip" data-a="ent" data-v="attachment:${a.id}">${a.icon ? `<img class="ico" src="${img(a.icon)}" alt="">` : ''}${esc(a.name)}</button>`).join('')}</div><p class="note" style="margin-top:4px">Fit list from the Fandom wiki (CC-BY-SA).</p>` : ''}
          ${weeklyFor(w).length ? `<div class="sect-l">Counts toward weekly</div><p class="note">${weeklyFor(w).map(t => `${esc(t.task)}: ${t.t.join(' / ')}`).join('<br>')}</p>` : ''}
          ${logFor(w.name).length ? `<div class="sect-l">Recent changes</div><p class="note">${logFor(w.name).map(c => `${esc(c.u.split(' ')[0])}: ${esc(c.c)}`).join('<br>')}</p>` : ''}
        </div>
      </div></div>`;
  }
  function perkChip(p) {
    const l = E.lvl(S, p.id), fx = E.FX[p.id];
    return `<button class="chip ${l === 1 ? 'on' : l === 2 ? 'on2' : ''}" data-a="perk" data-v="${p.id}" title="${esc(l === 2 ? p.expert : p.base)}">${p.icon ? `<img class="ico" src="${img(p.icon)}" alt="">` : ''}${esc(p.name)}${l === 2 ? ' EX' : ''}${fx ? ` <span style="font-size:11px;opacity:.75">${esc(fx.label)}</span>` : ''}</button>`;
  }

  // ---- 04 noise -----------------------------------------------------------------------------
  const SOUND_NAMES = { ThrownItemLanded: 'Thrown item lands', Gunshot_Silenced: 'Suppressed shot', Explosion: 'Explosion', 'Pipe Bomb': 'Pipe bomb fuse', 'Deployable Radio': 'Radio', 'Zombie_Shriek (Shambler)': 'Shambler shriek', AirDrop: 'Airdrop', CarAlarm: 'Car alarm', AlarmBox_Alarm: 'Alarm box', Footstep_Crouch: 'Crouch step', Footstep_Walk: 'Walking', Footstep_Sprint: 'Sprinting', Gunshot: 'Unsuppressed shot' };
  function soundRows() {
    const me = E.you(S), w = weapon();
    const stim = n => X.stimuli.find(s => s.name === n);
    const steps = ['Crouch', 'Walk', 'Sprint'].map(k => { const s = stim(`Footstep_${k}${S.plant ? '_PowerPlant' : ''}`), r = stim(`Footstep_${k}`); return { name: SOUND_NAMES[r.name], radius: s.radius * me.noiseMove, occluded: s.occluded, los: s.los, life: s.life, you: true }; });
    const shot = w.kind === 'gun' ? (S.suppress ? stim('Gunshot_Silenced') : stim('Gunshot')) : null;
    const yours = shot ? [{ name: `${w.name}${S.suppress ? ' suppressed' : ''}`, radius: shot.radius, occluded: shot.occluded, los: shot.los, life: shot.life, you: true, gun: true }] : [];
    const world = ['CarAlarm', 'AlarmBox_Alarm', 'Explosion', 'AirDrop', 'Zombie_Shriek (Shambler)', 'Pipe Bomb', 'Deployable Radio', 'ThrownItemLanded'].map(n => { const s = stim(n); return { ...s, name: SOUND_NAMES[n] }; });
    return { rows: [...yours, ...steps, ...world].map(r => ({ ...r, reach: S.walls && r.los ? r.occluded : r.radius })) };
  }
  function renderNoise() {
    const { rows } = soundRows(), w = weapon(), me = E.you(S);
    const max = 75, R = v => 8 + Math.sqrt(v / max) * 182;
    const fits = X.attachments[0].fits?.includes(w.id);
    const main = rows[0];
    const summary = w.kind === 'gun'
      ? `Your <strong>${esc(w.name)}</strong> reaches <strong>${main.reach}m</strong> ${S.walls ? 'through walls' : 'in the open'}${S.suppress ? ' with the can on' : ''}. ${main.reach === 0 ? 'Behind a wall, nothing hears it.' : ''}${!S.suppress && fits ? ' A suppressor takes the open radius to 10m and the wall radius to zero.' : !S.suppress ? ' The wiki lists no suppressor for this one.' : ''}`
      : `<strong>${esc(w.name)}</strong> has no noise entry on the sheet, so the loudest thing about you is your feet: <strong>${r1(rows[2].reach)}m</strong> sprinting.`;
    $('#noise').innerHTML = head('04', 'WHO HEARS YOU', 'Noise') + `
      <p class="lede">${summary} Noise doesn't spawn more zombies, it pulls in the idle ones already placed nearby.</p>
      <div class="ctrls">
        <button class="toggle" data-a="walls" aria-pressed="${S.walls}">Wall in the way</button>
        ${w.kind === 'gun' ? `<button class="toggle" data-a="suppress" aria-pressed="${S.suppress}">Suppressor</button>` : ''}
        <button class="toggle" data-a="plant" aria-pressed="${S.plant}">Power Plant floors</button>
        <button class="toggle" data-a="item" data-v="ranger-boots" aria-pressed="${!!S.items['ranger-boots']}">Ranger Boots</button>
        <button class="toggle" data-a="perk" data-v="quiet-steps" aria-pressed="${!!S.perks['quiet-steps']}">Quiet Steps${S.perks['quiet-steps'] === 2 ? ' EX' : ''}</button>
      </div>
      <div class="noise-grid">
        <svg class="sonar" viewBox="0 0 400 400" role="img" aria-label="Noise rings around you"><g fill="none" stroke="rgba(255,51,34,.25)">${[10, 20, 45, 75].map(v => `<circle cx="200" cy="200" r="${R(v)}"/>`).join('')}</g>
          ${[10, 20, 45, 75].map(v => `<text x="204" y="${200 - R(v) + 12}" fill="#75675c" font-family="Mono,monospace" font-size="11">${v}m</text>`).join('')}
          ${rows.filter(r => r.you && r.reach > 0).map((r, i) => `<circle cx="200" cy="200" r="${R(r.reach)}" fill="${r.gun ? 'rgba(63,224,192,.1)' : 'rgba(63,224,192,.05)'}" stroke="#3fe0c0" stroke-width="${r.gun ? 2 : 1}" ${r.gun ? '' : 'stroke-dasharray="3 3"'}/>`).join('')}
          ${rows.filter(r => !r.you && r.reach > 0).map((r, i) => { const a = i * 1.15 + .4, x = 200 + Math.cos(a) * R(r.reach), y = 200 + Math.sin(a) * R(r.reach); return `<circle cx="${x}" cy="${y}" r="4" fill="#ff3322"/><text x="${x + (x > 280 ? -6 : 6)}" y="${y + 4}" text-anchor="${x > 280 ? 'end' : 'start'}" fill="#ecdfcc" font-family="Mono,monospace" font-size="11">${esc(r.name)}</text>`; }).join('')}
          <path d="M200 190l8 16h-16z" fill="#3fe0c0"/></svg>
        <div class="panel">${rows.map(r => `<div class="sound ${r.you ? 'hit' : ''}"><span>${esc(r.name)}${r.life ? `<small> ${r.life}s</small>` : ''}</span><div class="bar"><i style="width:${r.reach / max * 100}%"></i></div><span style="text-align:right">${r1(r.reach)}m</span></div>`).join('')}
          <p class="note" style="margin-top:8px">Most gunfire and footsteps need a clear line to the zombie, so a wall drops them to their occluded radius. Alarms, airdrops, shrieks and Power Plant footsteps ignore walls. ${ent('item', 'radio', 'Radios')} and ${ent('item', 'pipe-bomb', 'pipe bombs')} are critical events: anything in range drops what it's doing and goes. The radio pulls up to 10.</p>
          <p class="note">Footstep rings scale with your boots and perks here <span class="calc">CALC</span>. Current multiplier: ${r1(me.noiseMove * 100)}%.</p></div>
      </div>
      ${src(['stimuli', 'Stimuli'], ['mechanics', 'Attachments'], ['passives', 'Passive Items'])}`;
  }

  // ---- 05 survive ---------------------------------------------------------------------------
  function renderSurvive() {
    $('#survive').innerHTML = head('05', 'HOW IT ENDS', 'Survive') + `
      <div class="grid2">
        <div class="panel you"><h3>You, right now</h3>
          <div class="sliders you-range">
            <label>HP <input type="range" min="1" max="100" value="${S.hp}" data-i="hp" aria-label="Current HP percent"><output id="oHp">${S.hp}%</output></label>
            <label>Stamina <input type="range" min="0" max="100" value="${S.stam}" data-i="stam" aria-label="Current stamina percent"><output id="oStam">${S.stam}%</output></label>
          </div><div id="svNow"></div>
        </div>
        <div class="panel"><h3>Odds per hit <small>by your HP</small></h3><div id="svChart"></div></div>
      </div>
      <div class="panel" style="margin-top:12px"><h3>The clock <small>once you're bitten</small></h3><div id="svClock"></div></div>
      <div class="grid2">
        <div class="panel you"><h3>What buys you time</h3><div class="steps" style="grid-template-columns:1fr">
          ${['phalanx-pills', 'gene-therapy', 'bandage', 'medkit', 'revive-syringe'].map(id => { const i = by(X.items, id); return `<div class="med">${ent('item', id, i.name)} <span class="note">${i.kg ? i.kg + 'kg' : ''}</span><br><span style="font-size:13px">${esc(i.text)}</span></div>`; }).join('')}
          <div class="med"><span style="color:var(--teal)">A bullet</span><br><span style="font-size:13px">The game's own hint: always keep one round. You stop the clock and don't get up as one of them.</span></div>
        </div></div>
        <div class="panel"><h3>When you go down</h3><ul class="list">
          <li><span class="hl">${Math.round(E.you(S).downTime)}s</span> on the downed timer${S.perks.limbo ? ' with Limbo' : ''}. Getting hit also burns it, and zombies do double damage to your downed health.</li>
          <li>A revive takes 5s, and starting one stops the damage and pauses the timer. ${ent('perk', 'stayin-alive', "Stayin' Alive")} cuts the time.</li>
          <li>You get up at <span class="hl g">30% HP</span> with 5s of invulnerability. 30% is deep in the infection zone, so heal fast.</li>
          <li>No limit on revives. Critical supplies shatter the moment you go down, so hand them off if you're shaky. The bonus pays everyone.</li>
        </ul></div>
      </div>
      ${src(['infection', 'Infection'], ['mechanics', 'Reviving and health gate'], ['other', 'Meds'], ['tips', 'Tips'])}`;
    renderSurviveOut();
    renderClock();
  }
  function renderSurviveOut() {
    const o = $('#svNow');
    if (!o) return;
    const swipe = E.infectSwipe(S.hp, S), gas = E.infectGas(S.hp, S), me = E.you(S), biteZone = S.stam <= X.player.grabBite;
    const hp = me.hp * S.hp / 100, z = target(), hits = E.hitDamage(z.basic, S), left = Math.max(1, Math.ceil(hp / hits));
    o.innerHTML = `<div class="tiles" style="margin-top:10px">
        <div class="tile"><b class="${swipe > 0 ? 'r' : 'g'}">${r1(swipe)}%</b><span>Infection per swipe</span></div>
        <div class="tile"><b class="${gas > 0 ? 'a' : 'g'}">${me.gasImmune ? 'IMMUNE' : r1(gas) + '%'}</b><span>Infection in gas</span></div>
        <div class="tile"><b class="${biteZone ? 'r' : 'g'}">${biteZone ? 'BITE' : 'STRUGGLE'}</b><span>If grabbed</span></div>
        <div class="tile"><b>${left}</b><span>${esc(z.name)} hits left</span></div>
      </div>
      <p class="note" style="margin-top:8px">${S.hp > 60 ? 'Above 60% HP swipes cannot infect you. Only gas can.' : S.hp <= 20 ? `Critical health. ${E.lvl(S, 'adrenaline-rush') ? 'Adrenaline Rush is cutting your melee stamina.' : ''} A zombie that walked through gas doubles these odds.` : 'Below 60% every swipe rolls for infection. A zombie that walked through gas doubles the odds.'} ${me.immunity ? `Acquired Immunity takes a flat ${me.immunity} points off.` : ''}</p>`;
    const c = $('#svChart');
    const W = 420, H = 190, px = v => 34 + (100 - v) / 100 * (W - 44), py = v => 12 + (50 - v) / 50 * (H - 40);
    const line = fn => Array.from({ length: 51 }, (_, i) => { const v = 100 - i * 2; return `${i ? 'L' : 'M'}${px(v).toFixed(1)} ${py(fn(v)).toFixed(1)}`; }).join('');
    const none = { ...S, perks: {}, items: {} };
    c.innerHTML = `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Infection chance per hit by HP">
      ${[0, 25, 50].map(v => `<line x1="34" x2="${W - 10}" y1="${py(v)}" y2="${py(v)}" stroke="#3a1a14"/><text x="4" y="${py(v) + 4}">${v}%</text>`).join('')}
      ${[100, 75, 50, 25, 0].map(v => `<text x="${px(v) - 8}" y="${H - 10}">${v}</text>`).join('')}
      <rect x="${px(60)}" y="12" width="1" height="${H - 40}" fill="#ff3322" opacity=".5"/>
      ${me.immunity ? `<path d="${line(v => E.infectSwipe(v, none))}" fill="none" stroke="#ff3322" opacity=".35" stroke-dasharray="3 3"/>` : ''}
      <path d="${line(v => me.gasImmune ? 0 : E.infectGas(v, S))}" fill="none" stroke="#c9d84a" stroke-width="2"/>
      <path d="${line(v => E.infectSwipe(v, S))}" fill="none" stroke="#ff3322" stroke-width="2.5"/>
      <line x1="${px(S.hp)}" x2="${px(S.hp)}" y1="12" y2="${H - 28}" stroke="#3fe0c0" stroke-width="2"/>
      <circle cx="${px(S.hp)}" cy="${py(E.infectSwipe(S.hp, S))}" r="4.5" fill="#3fe0c0"/>
    </svg><div class="legend"><span><i style="background:#ff3322"></i>Zombie swipe</span><span><i style="background:#c9d84a"></i>Shambler gas</span><span><i style="background:#3fe0c0"></i>You</span></div>`;
  }
  let clockT = null, clockNow = 0, clockTimer = 0;
  function renderClock() {
    const box = $('#svClock');
    if (!box) return;
    const tl = S.pills ? X.infection.pillsTimeline : X.infection.timeline;
    const total = tl[tl.length - 1].t, pc = t => t / total * 100;
    const mm = t => `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`;
    const named = tl.filter(e => !/RecurringAudioCue/.test(e.label) && e.t > 0);
    const cues = tl.filter(e => /RecurringAudioCue/.test(e.label));
    const LBL = { InfectionStart: 'Fully infected', InfectionHalfwayPoint: 'Halfway', 'Veins begin creeping in around the screen.': 'Veins', InfectionNearDeath: 'Near death', 'Death & Reanimation': 'Dead' };
    box.innerHTML = `<div class="ctrls"><div class="seg teal"><button data-a="pills" data-v="0" aria-pressed="${!S.pills}">First bite</button><button data-a="pills" data-v="1" aria-pressed="${S.pills}">After pills</button></div><button class="toggle" data-a="clockplay">${clockT ? 'Stop' : 'Run it at 10x'}</button><output id="clockOut" class="note">${mm(Math.round(clockNow))}</output></div>
      <div class="clock">${S.pills ? '' : `<div class="incub" style="width:${pc(30)}%"></div>`}
        ${cues.map(e => `<div class="tick cue" style="left:${pc(e.t)}%"></div>`).join('')}
        ${named.map(e => `<div class="tick" style="left:${pc(e.t)}%"></div>`).join('')}
        <div class="now" id="clockNow" style="left:${pc(clockNow)}%"></div></div>
      <ol class="marks">${named.map(e => `<li><b>${mm(e.t)}</b> ${esc(LBL[e.label] || e.label)}</li>`).join('')}</ol>
      <p class="note">${S.pills ? 'A dose of Phalanx Pills restarts the clock and skips the incubation, so you get 5:00 again, up to 3 doses. Each small tick is the recurring audio cue.' : "You won't know for the first 30 seconds unless your character coughs, then a sound confirms it. Each small tick is the recurring audio cue. Take pills when you first see veins and you waste the least."} @Braks has a <a href="${X.source.url}#gid=${X.source.gids.infection}" target="_blank" rel="noopener">video breakdown linked on the Infection tab</a>.</p>`;
  }
  function clockToggle() {
    if (clockT) { cancelAnimationFrame(clockT); clockT = null; renderClock(); return; }
    const tl = S.pills ? X.infection.pillsTimeline : X.infection.timeline, total = tl[tl.length - 1].t;
    clockNow = 0; clockTimer = performance.now();
    const tick = t => {
      clockNow = Math.min(total, (t - clockTimer) / 100);
      const n = $('#clockNow'), o = $('#clockOut');
      if (n) n.style.left = clockNow / total * 100 + '%';
      if (o) o.textContent = `${Math.floor(clockNow / 60)}:${String(Math.floor(clockNow % 60)).padStart(2, '0')}`;
      if (clockNow < total) clockT = requestAnimationFrame(tick); else { clockT = null; renderClock(); }
    };
    clockT = requestAnimationFrame(tick);
    renderClock();
  }

  // ---- 06 build -----------------------------------------------------------------------------
  const PERK_GROUPS = [
    ['Kills faster', p => !p.retire && p.types.some(t => /Damage|Melee|Weapon/.test(t)) && !/Utility/.test(p.types.join())],
    ['Keeps you alive', p => !p.retire && p.types[0] === 'Health'],
    ['Stamina', p => !p.retire && p.types[0] === 'Stamina'],
    ['Logistics', p => !p.retire && p.types.some(t => /Utility/.test(t)) && p.types[0] !== 'Health'],
    ['Retirement', p => p.retire],
  ];
  function renderBuild() {
    const seen = new Set();
    const groups = PERK_GROUPS.map(([label, fn]) => { const ps = X.perks.filter(p => !seen.has(p.id) && fn(p)); ps.forEach(p => seen.add(p.id)); return [label, ps]; });
    const passives = X.items.filter(i => i.grp === 'Passive');
    $('#build').innerHTML = head('06', 'WHAT YOU BRING', 'Build') + `
      <p class="lede">Everything above already reads this panel. Pick a profession or set perks by hand, then scroll back up: the kill board, noise rings and infection odds have moved.</p>
      <div id="buildNow"></div>
      <div class="panel you"><h3>Starting profession</h3><div class="prof">${X.professions.map(p => `<button data-a="prof" data-v="${p.id}" aria-pressed="${S.prof === p.id}">${esc(p.name)}</button>`).join('')}</div>
        ${S.prof ? `<p class="note" style="margin:8px 0 0">${esc(by(X.professions, S.prof).name)} starts with ${by(X.professions, S.prof).perks.map(id => ent('perk', id, by(X.perks, id).name)).join(' and ')}.</p>` : ''}</div>
      <div class="panel"><h3>Perks <small>tap: off, base, expert</small></h3>
        ${groups.map(([label, ps]) => ps.length ? `<div class="sect-l">${label}</div><div class="perks">${ps.map(perkCard).join('')}</div>` : '').join('')}
        <div class="ctrls" style="margin:12px 0 0"><button class="toggle" data-a="clearbuild">Clear build</button></div></div>
      <div class="panel"><h3>Passive items <small>they don't stack</small></h3><div class="chips">${passives.map(i => `<button class="chip ${S.items[i.id] ? 'on' : ''} ${locked(i) ? 'locked' : ''}" data-a="item" data-v="${i.id}" title="${esc(i.text)}">${esc(i.name)}</button>`).join('')}</div></div>
      <div class="panel"><h3>Account level</h3><div class="sliders"><label>Level <input type="range" min="1" max="100" value="${S.lvl}" data-i="lvl" aria-label="Account level"><output id="oLvl">${S.lvl}</output></label></div><div id="lvlOut"></div></div>
      <div class="panel"><h3>Retirement <small>1,500 XP a rank, 20 ranks</small></h3>
        <div class="track">${X.retirement.map(r => `<button class="${/Perk/.test(r.type) ? 'perkr' : /Cosmetic/.test(r.type) ? 'cos' : ''}" ${/Perk/.test(r.type) ? `data-a="ent" data-v="perk:${esc(r.reward.replace(' + Expert', '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, ''))}"` : /Loadout Item/.test(r.type) ? `data-a="ent" data-v="item:${esc(r.reward.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}"` : ''}><b>${r.rank}</b>${esc(r.reward)}</button>`).join('')}</div>
        <p class="note" style="margin:6px 0 0">Retiring pays out: 250 XP at level 100 plus 2 per level above it, 250 for never using a Rescue Beacon, 10, 25 or 50 per bronze, silver or gold medal, and 10 per Expert perk on that responder.</p></div>
      ${src(['perks', 'Perks'], ['professions', 'Professions'], ['passives', 'Passive Items'], ['unlocks', 'Unlocks'], ['retirement', 'Retirement'], ['exp', 'EXP'])}`;
    renderBuildNow();
    renderLvl();
  }
  function perkCard(p) {
    const l = E.lvl(S, p.id);
    return `<div style="position:relative"><button class="perk l${l}" style="width:100%" data-a="perk" data-v="${p.id}" aria-label="${esc(p.name)}, ${['off', 'base', 'expert'][l]}">${p.icon ? `<img class="ico" src="${img(p.icon)}" alt="" loading="lazy">` : '<span class="noic"></span>'}<span>${esc(p.name)}<small>${l === 0 ? (p.retire ? `Retire rank ${p.retire}` : p.expertLvl ? `Expert at ${p.expertLvl}` : '') : l === 1 ? 'BASE' : 'EXPERT'}</small></span></button>
      <button data-a="ent" data-v="perk:${p.id}" aria-label="About ${esc(p.name)}" style="position:absolute;right:0;top:0;width:26px;height:26px;font-size:12px;color:var(--faint)">i</button></div>`;
  }
  function renderBuildNow() {
    const b = $('#buildNow');
    if (!b) return;
    const me = E.you(S), base = E.you({ ...S, perks: {}, items: {} }), z = target();
    const d = (now, was, unit = '') => { const delta = Math.round((now - was) * 10) / 10; return delta ? (delta > 0 ? '+' : '') + delta + unit : ''; };
    const swipe = E.hitDamage(z.basic, S);
    b.innerHTML = `<div class="tiles" style="margin-bottom:12px">
      <div class="tile delta"><b class="g" data-d="${d(me.hp, base.hp)}">${Math.round(me.hp)}</b><span>Max HP</span></div>
      <div class="tile delta"><b class="g" data-d="${d(me.stamina, base.stamina)}">${Math.round(me.stamina)}</b><span>Max stamina</span></div>
      <div class="tile delta"><b class="g" data-d="${d(me.sprint, base.sprint)}">${me.sprint}</b><span>Sprint speed</span></div>
      <div class="tile"><b class="r">${r1(swipe)}</b><span>${esc(z.name)} swipe on you</span></div>
      <div class="tile"><b class="g">${Math.round(me.healBandage)}</b><span>Bandage heals</span></div>
      <div class="tile"><b class="g">${Math.round(me.sprintSecs)}s</b><span>Sprint from full</span></div>
    </div>`;
  }
  function renderLvl() {
    const o = $('#lvlOut');
    if (!o) return;
    const open = (a) => a.filter(x => !locked(x)).length;
    const nexts = [];
    for (let l = S.lvl + 1; l <= 100 && nexts.length < 6; l++) {
      (X.unlocks[l] || []).forEach(g => nexts.push(`<span class="hl g">${l}</span> ${esc(g)}`));
      X.perks.filter(p => p.expertLvl === l).forEach(p => nexts.push(`<span class="hl g">${l}</span> ${esc(p.name)} Expert`));
    }
    const need = X.exp.account[S.lvl - 1];
    const map = by(X.maps, S.map), runXp = map.exp[S.diff];
    o.innerHTML = `<div class="tiles" style="margin:8px 0"><div class="tile"><b>${open(X.guns)}/${X.guns.length}</b><span>Guns open</span></div><div class="tile"><b>${open(X.melee)}/${X.melee.length}</b><span>Melee open</span></div><div class="tile"><b>${X.perks.filter(p => p.expertLvl && p.expertLvl <= S.lvl).length}</b><span>Expert perks open</span></div>
      ${need ? `<div class="tile"><b>${Math.ceil(need / runXp)}</b><span>${esc(map.name)} runs to level ${S.lvl + 1} on ${X.difficulty[S.diff].name}</span></div>` : ''}</div>
      ${nexts.length ? `<p style="font-size:13px;margin:0">Next up: ${nexts.slice(0, 6).join(' &nbsp; ')}</p>` : '<p class="note" style="margin:0">Everything on the unlock list is open. Levels go to 1000, and the sheet says you earn nothing past 100.</p>'}`;
  }

  // ---- 07 extract ---------------------------------------------------------------------------
  function renderExtract() {
    const m = by(X.maps, S.map), D = X.difficulty[S.diff], ev = activeEvent();
    const crX = ev ? (ev.bonus.find(b => /Credits/.test(b.what)) || {}).x || 1 : 1, xpX = ev ? (ev.bonus.find(b => /EXP/.test(b.what)) || {}).x || 1 : 1;
    const cr = o => (o.crit ? o.creditsCrit[S.diff] : o.credits[S.diff]) * crX;
    const maps = X.maps.slice().sort((a, b) => cr(b) - cr(a));
    const top = cr(maps[0]);
    const L = X.mapLinks[m.id] || {}, hatches = X.extracts[m.id.replace('-2', '')] || [];
    $('#extract').innerHTML = head('07', 'GET OUT AND GET PAID', 'Extract') + `
      <p class="lede">Spawns don't run out, so the kill count was never the point. Getting out is. The best-paying run on ${D.name} is <strong>${esc(maps[0].name)}, ${fmt(top)} credits</strong> with every critical supply${ev ? ', event bonus included' : ''}. Die and you lose your loadout and the team's supply credits.</p>
      <div class="mapstrip">${X.maps.map(o => `<button data-a="map" data-v="${o.id}" aria-pressed="${S.map === o.id}">${o.art ? `<img src="img/flavor/${o.art}.jpg" alt="" loading="lazy">` : ''}<small>${o.mode === 'survival' ? 'HOLDOUT' : 'OBJECTIVE'}</small><span>${esc(o.name)}</span></button>`).join('')}</div>
      <div class="grid2">
        <div class="panel you"><h3>${esc(m.name)} <small>${D.name}${ev ? ', event on' : ''}</small></h3>
          <div class="tiles"><div class="tile"><b class="g">${fmt(cr(m))}</b><span>Credits${m.crit ? ` with ${m.crit} critical supplies` : ''}</span></div><div class="tile"><b>${fmt(m.credits[S.diff] * crX)}</b><span>Credits, supplies only</span></div><div class="tile"><b>${fmt(m.exp[S.diff])}</b><span>Account XP, full clear</span></div><div class="tile"><b>${fmt(m.charExp[S.diff] * xpX)}</b><span>Responder XP before pickups</span></div></div>
          <div class="sect-l">Objectives <small class="note">XP on Normal</small></div>
          <p style="font-size:13px;margin-bottom:6px">${m.objectives.map(o => `${esc(o.name)}${o.xp ? ` <span style="color:var(--dim)">${o.xp}</span>` : ''}`).join(' / ')}</p>
          ${L.obj || L.crit ? `<p style="font-size:13px;margin:0">${L.obj ? `<a href="${L.obj}" target="_blank" rel="noopener">Objective walkthrough &#8599;</a> &nbsp;` : ''}${L.crit ? `<a href="${L.crit}" target="_blank" rel="noopener">Critical supply locations &#8599;</a>` : ''}</p>` : ''}
        </div>
        <div class="panel"><h3>Credit board <small>${D.name}</small></h3><div class="bars">${maps.map(o => `<button class="bar-r ${o.id === S.map ? 'on' : ''}" data-a="map" data-v="${o.id}"><span>${esc(o.name)}</span><div class="bar"><i style="width:${cr(o) / top * 100}%"></i><u style="width:${o.credits[S.diff] * crX / top * 100}%"></u></div><span style="text-align:right">${fmt(cr(o))}</span></button>`).join('')}</div>
          <p class="note" style="margin-top:8px">Bright bar is regular supplies, dim is what critical supplies add.</p></div>
      </div>
      <div class="grid2" style="margin-top:12px">
        <div class="panel"><h3>Early extract hatches <small>${esc(m.name)}</small></h3>
          ${hatches.length ? `<ol style="margin:0;padding-left:20px;font-size:13px">${hatches.map(h => `<li style="padding:3px 0">${esc(h)}</li>`).join('')}</ol>` : `<p class="note">${m.mode === 'survival' ? 'None listed for holdout maps.' : m.id === 'raven-rock' ? 'The sheet counts 3 hatches here but has no descriptions yet.' : 'None listed.'}</p>`}
          <p class="note" style="margin-top:8px">They open at 8 minutes, or once 3 players are left. Open it, climb down, shut the door, wait 10s. Early extract forfeits credits and responder XP. @Braks's photos of every hatch are on the ${srcA('extracts', 'Early Extracts tab')}.</p>
        </div>
        <div class="panel"><h3>How the money works</h3><ul class="list">
          <li>Small 2, medium 5, large 10, critical 300 credits. Critical supplies sit outside the map cap and pay the whole team.</li>
          <li>Past the cap, supplies still earn responder XP: 10, 25, 50, or 1,500 for a critical, before difficulty. Keep picking them up.</li>
          <li>Fail to extract and you only get credits for what you personally carried.</li>
          <li>Account XP always pays out, dead or alive.</li>
        </ul></div>
      </div>
      <details class="panel" style="margin-top:12px"><summary style="cursor:pointer;font:800 24px var(--cond);text-transform:uppercase">Weekly assignments</summary><div class="scroll-x" style="margin-top:8px"><table class="matrix"><thead><tr><th>Task</th><th>T1</th><th>T2</th><th>T3</th></tr></thead><tbody>${X.weekly.map(t => `<tr><td>${esc(t.task)}</td>${t.t.map(n => `<td>${n}</td>`).join('')}</tr>`).join('')}</tbody></table></div></details>
      ${src(['maps', 'Map Rewards'], ['extracts', 'Early Extracts'], ['difficulty', 'Difficulty'], ['economy', 'Economy'], ['weekly', 'Weekly Assignment'], ['events', 'Events'])}`;
  }

  // ---- 08 intel -----------------------------------------------------------------------------
  const ODD = [
    'While you hold a charged melee attack you cannot be grabbed. An old bug, and it still works as of the sheet\'s last check.',
    'Every zombie takes 1.5x stability damage during the hands-up grab windup, so that is the moment to swing. Testing credit on the sheet goes to Turadon.',
    'National Guard lose their stability resistance in that same animation, and all of their damage resistance while knocked down.',
    'The weakened state ends the moment a zombie starts to get up, not when it stands.',
    'If a zombie takes no stability damage for 2.5 seconds, its stability bar drains to zero in about a second.',
    'Shambler and Prime lower legs are 60 HP, not 70. The sheet flags the Prime value as a possible oversight.',
    'Blades chew through barricades thanks to a hidden damage bonus. A single kick destroys a locked wooden door.',
  ];
  let hintI = Math.floor(Math.random() * X.hints.length), logQ = '';
  function renderIntel() {
    const up = X.changelog.reduce((a, c) => { (a[c.u] = a[c.u] || []).push(c); return a; }, {});
    $('#intel').innerHTML = head('08', 'WHAT THE FIELD KNOWS', 'Intel') + `
      <div class="term" aria-live="off"><span class="pr">CRC&gt;</span> <span id="hint"></span></div>
      <div class="grid2" style="margin-top:12px">
        <div class="panel"><h3>Outbreak timeline <small>days since</small></h3><ol class="tl">${X.timeline.map(t => t.redacted ? `<li><span class="x">&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;</span></li>` : `<li><b><span class="day">D${t.day}</span>${esc(t.map)}</b><br>${esc(t.date)}, ${esc(t.time)}<br><span class="note">${esc(t.where)}</span></li>`).join('')}</ol>
          <p class="note">@Braks keeps a full <a href="${X.source.lore}" target="_blank" rel="noopener">Lore Compendium &#8599;</a>.</p></div>
        <div><div class="panel"><h3>Things worth knowing</h3><ul class="list">${ODD.map(o => `<li>${esc(o)}</li>`).join('')}</ul></div>
          <div class="panel"><h3>Player tips <small>from the sheet</small></h3><ul class="list">${X.tips.map(t => `<li>${esc(t)}</li>`).join('')}</ul></div></div>
      </div>
      <div class="panel" style="margin-top:12px"><h3>Patch log <small>${Object.keys(up).length} updates since 1.0</small></h3><input class="search-in" id="logQ" type="search" placeholder="Filter: runner, shotgun, IED" aria-label="Filter the patch log" value="${esc(logQ)}"><div class="log" id="logOut"></div></div>
      ${src(['misc', 'Map timeline'], ['tips', 'Tips'], ['mechanics', 'Oddities'], ['changelog', 'Full changelog'], ['audio', 'Soundtrack'])}`;
    renderHint(); renderLog();
  }
  function renderHint() { const h = $('#hint'); if (h) h.textContent = X.hints[hintI % X.hints.length]; }
  function renderLog() {
    const o = $('#logOut');
    if (!o) return;
    const q = logQ.trim().toLowerCase();
    const rows = X.changelog.filter(c => !q || `${c.s} ${c.c}`.toLowerCase().includes(q)).filter(c => c.c.length > 1).slice(0, 160);
    let last = '';
    o.innerHTML = rows.map(c => { const h = c.u !== last ? `<h4 style="font-size:20px;color:var(--red);margin:10px 0 2px">${esc(c.u)}</h4>` : ''; last = c.u; return `${h}<div>${c.s ? `<b>${esc(c.s)}</b> ` : ''}${esc(c.c)}</div>`; }).join('') || '<p class="note">Nothing in the 1.x log. The older log is on the sheet.</p>';
  }

  // ---- source -------------------------------------------------------------------------------
  const TAB_LABELS = { perks: 'Perks', professions: 'Professions', exp: 'EXP', maps: 'Map Rewards', difficulty: 'Difficulty', mechanics: 'Mechanics', passives: 'Passive Items', guns: 'Guns', melee: 'Melee', other: 'Other', economy: 'Economy', weekly: 'Weekly Assignment', retirement: 'Retirement', zombies: 'Zombies', infection: 'Infection', spawning: 'Spawning Parameters', stimuli: 'Stimuli', unlocks: 'Unlocks', misc: 'Misc', tips: 'Tips', audio: 'Audio', extracts: 'Early Extracts', events: 'Events', changelog: 'Patch Changelogs' };
  function renderSource() {
    const s = X.source;
    $('#source').innerHTML = head('SRC', 'WHO DID THE WORK', 'Source') + `
      <div class="src-hero">
        <h3>${esc(s.author)} built this.</h3>
        <p>Almost every game number on this page was dug out, tested and written down in the <a href="${s.url}" target="_blank" rel="noopener">NMRiH2 Info Compendium</a>, a 26-tab sheet ${esc(s.author)} keeps current patch after patch. Things like which zombie hears what, how infection rolls, and how perks add up exist in one readable place because of that work. Kill Chain only rearranges it. We're fans and this site isn't endorsed by or affiliated with ${esc(s.author)}.</p>
        <blockquote>${esc(s.plea)}<br><span class="note">${esc(s.author)}, on the changelog tab</span></blockquote>
        <div class="hero-cta"><a class="btn teal" href="${s.url}" target="_blank" rel="noopener">Open the Compendium &#8599;</a><a class="btn teal" href="${s.steamGuide}" target="_blank" rel="noopener">Steam guide version &#8599;</a><a class="btn teal" href="${s.discord}" target="_blank" rel="noopener">NMRiH Discord &#8599;</a></div>
        <p class="note" style="margin:12px 0 0">Our snapshot: sheet updated ${esc(X.meta.sheetUpdated)}, game ${esc(X.meta.gameVersion)}, pulled ${esc(X.meta.built)}. The sheet moves faster than this page, so trust it over us.</p>
      </div>
      <div class="grid2">
        <div class="panel you"><h3>Credited on the sheet</h3><div class="people" style="margin-bottom:10px">${s.credits.map(([n, w]) => `<span><b>${esc(n)}</b>: ${esc(w)}</span>`).join('')}</div>
          <div class="sect-l">Also honored on its home page</div>${s.tiers.map(([t, ns]) => `<p style="font-size:13px;margin:0 0 4px"><span class="tag g">${esc(t)}</span>${ns.map(esc).join(', ')}</p>`).join('')}
          <p class="note" style="margin-top:8px">Tiers shown as the sheet lists them. The Mechanics tab also thanks Turadon for testing.</p></div>
        <div class="panel"><h3>Go to the source</h3><div class="tabgrid">${Object.entries(TAB_LABELS).map(([k, l]) => `<a href="${s.url}#gid=${s.gids[k]}" target="_blank" rel="noopener">${esc(l)} &#8599;</a>`).join('')}<a href="${s.lore}" target="_blank" rel="noopener">Lore Compendium &#8599;</a><a href="${s.objectives}" target="_blank" rel="noopener">Map objectives &#8599;</a><a href="${s.ost}" target="_blank" rel="noopener">OST playlist &#8599;</a><a href="${s.radio}" target="_blank" rel="noopener">Radio songs &#8599;</a></div></div>
      </div>
      <div class="grid2" style="margin-top:12px">
        <div class="panel"><h3>What this site calculates <span class="calc">CALC</span></h3><p class="note">Anything marked CALC is our arithmetic on top of the sheet. If it's wrong, that's on us, not on the sheet.</p><ul class="list">
          <li>Shots and swings assume every pellet lands, with no range or penetration falloff. The sheet's falloff data is in graphs we don't model.</li>
          <li>Helmets and shields: a gun with enough penetration goes straight through. Otherwise we estimate the hits to break it from raw damage, then count the kill. The real order may differ.</li>
          <li>Damage perks apply to body and head hits. Limb perks apply to limb hits. Pellet perks can land on fractions (11.5 pellets).</li>
          <li>National Guard, Riot Police, Shield, Firefighter and Construction show Walker base stats, since the sheet lists only their armor rules.</li>
          <li>Infection odds between the listed HP points are straight lines. Rolls use your HP after the hit lands. Gas-aura doubling isn't shown.</li>
          <li>The radar normalizes spawn weights, caps elites at their alive limits and fills the rest with Walkers. It's a picture of the mix, not a simulation.</li>
          <li>Boots and Quiet Steps shrink footstep rings by their listed percent. Stamina per kill ignores regen.</li>
        </ul></div>
        <div class="panel"><h3>Other sources and corrections</h3><ul class="list">
          <li>Icons and map art come from the game's own files. The game and its art belong to its developers. This is a free, unofficial fan project.</li>
          <li>Zombie art and attachment fit lists come from the <a href="https://no-more-room-in-hell-two.fandom.com/" target="_blank" rel="noopener">NMRiH2 Fandom wiki</a> (CC-BY-SA).</li>
          <li>The ${'&#9608;'.repeat(6)} contact's stats are read directly from the game files.</li>
          <li><strong style="font-weight:400;color:var(--hot)">Wrong game data?</strong> It may be fixed on the sheet already. If not, the sheet's author welcomes DMs on Discord.</li>
          <li><strong style="font-weight:400;color:var(--hot)">Wrong math or a broken page?</strong> That's ours: <a href="https://github.com/jampick/nrih2-toolkit/issues" target="_blank" rel="noopener">GitHub issues</a>. Please don't send our bugs to the sheet's author.</li>
        </ul></div>
      </div>`;
    $('#foot').innerHTML = `Kill Chain is an unofficial fan project for No More Room in Hell 2. Game data: <a href="${s.url}" target="_blank" rel="noopener">NMRiH2 Info Compendium</a> by ${esc(s.author)}. <a href="https://github.com/jampick/nrih2-toolkit" target="_blank" rel="noopener">Site code on GitHub</a>.`;
  }

  // ---- dock ---------------------------------------------------------------------------------
  function renderDock() {
    const z = target(), w = weapon(), r = E.strike(w, z, S, ctx());
    $('#dock').innerHTML = `<button class="t" data-a="goto" data-v="lock"><small>TARGET</small><b>${esc(z.name)}</b></button>
      <button class="r" data-a="goto" data-v="kill" aria-label="${r.hits} ${S.zone} hits to kill"><span>${r.hits === Infinity ? 'X' : (r.strip ? '&asymp;' : '') + r.hits}</span><small>${S.zone.toUpperCase()} ${w.kind === 'gun' ? 'SHOTS' : 'HITS'}</small></button>
      <button class="w" data-a="goto" data-v="kill"><small>WEAPON</small><b>${esc(w.name)}</b></button>`;
  }

  // ---- dossier: follow any item to everything it touches ------------------------------------
  function dossier(kind, id) {
    const box = $('#dossier');
    let html = '';
    const sec = (t, b) => b ? `<section><h4>${esc(t)}</h4>${b}</section>` : '';
    if (kind === 'perk') {
      const p = by(X.perks, id);
      if (!p) return;
      const profs = X.professions.filter(x => x.perks.includes(id));
      const ws = E.weaponsFor(id), z = target(), rankRow = X.retirement.find(r => r.reward.startsWith(p.name));
      const lvl = E.lvl(S, id);
      const compare = w => { const a = E.strike(w, z, { ...S, perks: { ...S.perks, [id]: 0 } }, ctx()), b = E.strike(w, z, { ...S, perks: { ...S.perks, [id]: 2 } }, ctx()); return a.hits !== b.hits ? `${esc(w.name)}: ${a.hits} to ${b.hits}` : null; };
      const changes = ws.map(compare).filter(Boolean);
      html = `<div class="kind">PERK${p.retire ? ' / RETIREMENT' : ''}</div><h3 id="dossierTitle">${esc(p.name)}</h3>${p.icon ? `<img class="big ico" src="${img(p.icon)}" alt="">` : ''}<p>${esc(p.blurb)}</p>
        <div class="tiles"><div class="tile"><span>BASE</span>${esc(p.base)}</div><div class="tile"><span>EXPERT ${p.expertLvl ? `AT ACCOUNT ${p.expertLvl}` : p.retire ? `AT RETIREMENT ${p.retire}` : ''}</span>${esc(p.expert)}</div></div>
        <div class="ctrls" style="margin-top:10px"><button class="toggle" data-a="perk" data-v="${id}" aria-pressed="${!!lvl}">${['Add to build', 'In build: base. Tap for expert', 'In build: expert. Tap to remove'][lvl]}</button></div>
        ${sec('Starts with it', profs.map(x => ent('prof', x.id, x.name)).join(', '))}
        ${sec('Changes these weapons', ws.length ? `<div class="chips">${ws.map(w => `<button class="chip" data-a="weapon" data-v="${w.id}"><img class="ico" src="${img(w.icon)}" alt="">${esc(w.name)}</button>`).join('')}</div>` : '')}
        ${changes.length ? sec(`Expert vs ${z.name}, ${S.zone}`, `<p>${changes.join('<br>')} <span class="calc">CALC</span></p>`) : ''}
        ${rankRow ? sec('How to get it', `<p>Retirement rank ${rankRow.rank} (${fmt(rankRow.xp)} XP).</p>`) : ''}`;
    } else if (kind === 'prof') {
      const p = by(X.professions, id);
      html = `<div class="kind">PROFESSION</div><h3 id="dossierTitle">${esc(p.name)}</h3><div class="chips">${p.perks.map(i => perkChip(by(X.perks, i))).join('')}</div><div class="ctrls" style="margin-top:10px"><button class="toggle" data-a="prof" data-v="${id}" aria-pressed="${S.prof === id}">Use these perks</button></div>`;
    } else if (kind === 'item') {
      const i = by(X.items, id);
      if (!i) return;
      const log = logFor(i.name);
      const perk = { barricade: 'builder', battery: 'longer-battery', bandage: 'skilled-medic', medkit: 'skilled-medic', 'phalanx-pills': 'resident-genes', 'gene-therapy': 'resident-genes', 'm67-frag': 'grenadier', 'pipe-bomb': 'grenadier', molotov: 'grenadier', ied: 'grenadier', radio: 'grenadier' }[id];
      html = `<div class="kind">${esc(i.grp.toUpperCase())}</div><h3 id="dossierTitle">${esc(i.name)}</h3>${i.icon ? `<img class="big ico" src="${img(i.icon)}" alt="">` : ''}<p>${esc(i.text)}</p>
        <p class="note">${i.kg ? `${i.kg}kg. ` : ''}${esc(shopLine(i))}</p>
        ${i.grp === 'Passive' ? `<div class="ctrls"><button class="toggle" data-a="item" data-v="${id}" aria-pressed="${!!S.items[id]}">${S.items[id] ? 'In build' : 'Add to build'}</button></div>` : ''}
        ${perk ? sec('Pairs with', `<div class="chips">${perkChip(by(X.perks, perk))}</div>`) : ''}
        ${log.length ? sec('Recent changes', `<p class="note">${log.map(c => `${esc(c.u.split(' ')[0])}: ${esc(c.c)}`).join('<br>')}</p>`) : ''}`;
    } else if (kind === 'ammo') {
      const a = by(X.ammo, id);
      const guns = a.guns.map(g => by(X.guns, g));
      html = `<div class="kind">AMMO</div><h3 id="dossierTitle">${esc(a.name)}</h3>${a.icon ? `<img class="big ico" src="${img(a.icon)}" alt="">` : ''}<p>${r1(a.roundKg * 1000)}g a round. ${a.shop ? esc(shopLine(a)) : ''} ${ent('perk', 'vulture', 'Vulture')} lightens it, ${ent('perk', 'scavenger', 'Scavenger')} finds more.</p>
        ${sec('Fires from', `<div class="chips">${guns.map(w => `<button class="chip" data-a="weapon" data-v="${w.id}"><img class="ico" src="${img(w.icon)}" alt="">${esc(w.name)}</button>`).join('')}</div>`)}`;
    } else if (kind === 'attachment') {
      const a = by(X.attachments, id);
      html = `<div class="kind">ATTACHMENT / ${esc(a.slot.toUpperCase())}</div><h3 id="dossierTitle">${esc(a.name)}</h3>${a.icon ? `<img class="big ico" src="${img(a.icon)}" alt="">` : ''}
        ${sec('Recoil', a.recoil.map(esc).join('<br>'))}${sec('Spread', a.spread.map(esc).join('<br>'))}${sec('Other', a.other.map(esc).join('<br>'))}
        ${a.fits ? sec('Fits (Fandom wiki)', `<div class="chips">${a.fits.map(g => { const w = by(X.guns, g); return `<button class="chip" data-a="weapon" data-v="${g}"><img class="ico" src="${img(w.icon)}" alt="">${esc(w.name)}</button>`; }).join('')}</div>`) : ''}
        <p class="note" style="margin-top:8px">Below 1.0x is better for recoil and spread.</p>`;
    } else if (kind === 'map') {
      S.map = id; renderExtract(); closeDossier(); $('#extract').scrollIntoView(); return;
    } else if (kind === 'mutated') {
      const m = X.mutated;
      html = `<div class="kind" style="color:var(--amber)">UNCONFIRMED CONTACT</div><h3 id="dossierTitle">&#9608;&#9608;&#9608;&#9608; Mutated</h3>
        <p>An asset named <code>Zomb_Adult_MUT</code> sits in the game files with its own stat table. It isn't in the Compendium or the spawn tables, so it may not be in the game at all.</p>
        <div class="tiles"><div class="tile"><b class="r">${m.hp}</b><span>HP</span></div><div class="tile"><b class="r">${m.speed}</b><span>Speed</span></div><div class="tile"><b class="r">${m.basic}</b><span>Basic</span></div><div class="tile"><b class="r">${m.heavy}</b><span>Heavy</span></div><div class="tile"><b class="r">${m.lunge}</b><span>Lunge</span></div><div class="tile"><b class="r">${m.grabDmg}</b><span>Grab tick</span></div></div>
        <p class="note" style="margin-top:10px">Read from the game files, not the sheet. No armor or behavior data.</p>`;
    } else if (kind === 'zombie') { setTarget(id); return; } else if (kind === 'gun' || kind === 'melee') { S.w = id; renderAll(); $('#kill').scrollIntoView(); closeDossier(); return; } else return;
    box.innerHTML = `<button class="close" data-a="closedossier" aria-label="Close">X</button>${html}`;
    box.hidden = false; $('#scrim').hidden = false;
    box.querySelector('.close').focus();
  }
  function closeDossier() { $('#dossier').hidden = true; $('#scrim').hidden = true; }

  // ---- find anywhere ------------------------------------------------------------------------
  const INDEX = [
    ...X.zombies.map(z => ({ k: 'THREAT', t: z.name, s: z.alias || z.note || '', go: `zombie:${z.id}` })),
    ...X.guns.map(w => ({ k: 'GUN', t: w.name, s: `${w.cls}, ${w.ammo}`, go: `gun:${w.id}` })),
    ...X.melee.map(w => ({ k: 'MELEE', t: w.name, s: w.cls, go: `melee:${w.id}` })),
    ...X.perks.map(p => ({ k: 'PERK', t: p.name, s: p.blurb, go: `perk:${p.id}` })),
    ...X.professions.map(p => ({ k: 'CLASS', t: p.name, s: p.perks.map(i => by(X.perks, i).name).join(', '), go: `prof:${p.id}` })),
    ...X.items.map(i => ({ k: i.grp.toUpperCase().slice(0, 7), t: i.name, s: i.text, go: `item:${i.id}` })),
    ...X.ammo.map(a => ({ k: 'AMMO', t: a.name, s: `${a.guns.length} guns`, go: `ammo:${a.id}` })),
    ...X.attachments.map(a => ({ k: 'ATTACH', t: a.name, s: a.slot, go: `attachment:${a.id}` })),
    ...X.maps.map(m => ({ k: 'MAP', t: m.name, s: m.objectives.map(o => o.name).join(', '), go: `map:${m.id}` })),
    ...X.tips.map(t => ({ k: 'TIP', t, s: '', go: 'sec:intel' })),
    ...X.hints.map(t => ({ k: 'HINT', t, s: '', go: 'sec:intel' })),
  ];
  function openQuery() {
    const q = $('#query');
    q.hidden = false;
    q.innerHTML = `<div class="q-top"><input class="search-in" id="qIn" type="search" placeholder="Search zombies, guns, perks, maps, tips" aria-label="Search everything" autocomplete="off"><button class="icon-btn" data-a="closequery" aria-label="Close search">X</button></div><div class="q-res" id="qRes"></div>`;
    $('#qIn').focus();
    runQuery('');
  }
  function runQuery(v) {
    const n = v.trim().toLowerCase();
    const out = !n ? INDEX.filter(i => ['THREAT', 'MAP'].includes(i.k)) : INDEX.map(i => { const a = i.t.toLowerCase(), b = i.s.toLowerCase(); return { i, s: a.startsWith(n) ? 3 : a.includes(n) ? 2 : b.includes(n) ? 1 : 0 }; }).filter(x => x.s).sort((a, b) => b.s - a.s).map(x => x.i);
    $('#qRes').innerHTML = out.slice(0, 50).map(i => `<button data-a="pick" data-v="${esc(i.go)}"><small>${esc(i.k)}</small><span>${esc(i.t.length > 110 ? i.t.slice(0, 110) + '...' : i.t)}${i.s ? `<em>${esc(i.s.length > 90 ? i.s.slice(0, 90) + '...' : i.s)}</em>` : ''}</span></button>`).join('') || '<p class="note">No match. The Compendium may have it.</p>';
  }

  // ---- wiring -------------------------------------------------------------------------------
  function setTarget(id) { S.t = id; S.part = 'head'; renderAll(); closeDossier(); $('#query').hidden = true; $('#lock').scrollIntoView(); }
  function renderAll() {
    const keep = document.activeElement && document.activeElement.dataset ? [document.activeElement.dataset.a, document.activeElement.dataset.v] : null;
    renderSitrep(); renderContact(); renderLock(); renderKill(); renderNoise(); renderSurvive(); renderBuild(); renderExtract();
    if (keep && keep[0]) { const n = document.querySelector(`[data-a="${keep[0]}"]${keep[1] ? `[data-v="${CSS.escape(keep[1])}"]` : ''}`); if (n) n.focus({ preventScroll: true }); }
    history.replaceState(null, '', shareUrl());
  }
  function toast(t) { const n = document.createElement('div'); n.className = 'toast'; n.textContent = t; document.body.appendChild(n); setTimeout(() => n.remove(), 1800); }
  const ACT = {
    diff: v => { S.diff = v; },
    squad: v => { S.squad = Math.min(8, Math.max(1, S.squad + +v)); },
    threat: v => { const i = E.LEVELS.indexOf(S.threat) + +v; S.threat = E.LEVELS[Math.min(4, Math.max(0, i))]; },
    target: v => { setTarget(v); return false; },
    weapon: v => { S.w = v; S.suppress = false; closeDossier(); },
    zone: v => { S.zone = v; }, mode: v => { S.mode = v; }, filter: v => { S.filter = v; S.more = false; }, down: () => { S.down = !S.down; },
    more: () => { S.more = !S.more; }, part: v => { S.part = v; }, walls: () => { S.walls = !S.walls; }, suppress: () => { S.suppress = !S.suppress; }, plant: () => { S.plant = !S.plant; },
    perk: v => {
      const p = by(X.perks, v), l = E.lvl(S, v), expertOpen = !p.expertLvl || p.expertLvl <= S.lvl;
      const next = l === 0 ? 1 : l === 1 && expertOpen ? 2 : 0;
      if (next) S.perks[v] = next; else delete S.perks[v];
      S.prof = null;
      if (!$('#dossier').hidden) dossier('perk', v);
    },
    item: v => { if (S.items[v]) delete S.items[v]; else S.items[v] = 1; if (!$('#dossier').hidden) dossier('item', v); },
    prof: v => {
      if (S.prof === v) { S.prof = null; S.perks = {}; } else { S.prof = v; S.perks = {}; by(X.professions, v).perks.forEach(p => { S.perks[p] = 1; }); }
    },
    clearbuild: () => { S.perks = {}; S.items = {}; S.prof = null; },
    map: v => { S.map = v; },
    pills: v => { S.pills = v === '1'; if (clockT) { cancelAnimationFrame(clockT); clockT = null; } clockNow = 0; renderClock(); return false; },
    clockplay: () => { clockToggle(); return false; },
    sitmore: () => { const b = $('#sitMoreBox'); b.classList.toggle('open'); $('#sitMore').setAttribute('aria-expanded', b.classList.contains('open')); return false; },
    query: () => { openQuery(); return false; },
    closequery: () => { $('#query').hidden = true; return false; },
    closedossier: () => { closeDossier(); return false; },
    goto: v => { $('#' + v).scrollIntoView(); return false; },
    ent: v => { const i = v.indexOf(':'); dossier(v.slice(0, i), v.slice(i + 1)); return false; },
    pick: v => { $('#query').hidden = true; const i = v.indexOf(':'), k = v.slice(0, i), id = v.slice(i + 1); if (k === 'sec') $('#' + id).scrollIntoView(); else dossier(k, id); return false; },
    share: () => {
      const u = shareUrl();
      (navigator.clipboard ? navigator.clipboard.writeText(u) : Promise.reject()).then(() => toast('Link to this setup copied'), () => { prompt('Copy this link', u); });
      return false;
    },
  };
  document.addEventListener('click', e => {
    if (e.target.id === 'scrim') return closeDossier();
    const n = e.target.closest('[data-a]');
    if (!n) return;
    const f = ACT[n.dataset.a];
    if (f && f(n.dataset.v) !== false) renderAll();
  });
  document.addEventListener('input', e => {
    const k = e.target.dataset && e.target.dataset.i;
    if (k) {
      S[k] = +e.target.value;
      if (k === 'hp') { $('#oHp').textContent = S.hp + '%'; renderSurviveOut(); }
      if (k === 'stam') { $('#oStam').textContent = S.stam + '%'; renderSurviveOut(); }
      if (k === 'lvl') { $('#oLvl').textContent = S.lvl; renderLvl(); renderKill(); history.replaceState(null, '', shareUrl()); }
    }
    if (e.target.id === 'qIn') runQuery(e.target.value);
    if (e.target.id === 'logQ') { logQ = e.target.value; renderLog(); }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeDossier(); $('#query').hidden = true; }
    if (e.key === '/' && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); openQuery(); }
  });

  function boot() {
    const b = $('#boot');
    let seen = true;
    try { seen = sessionStorage.getItem('kc-boot') === '1'; sessionStorage.setItem('kc-boot', '1'); } catch (_) { seen = true; }
    if (seen || reduced || linkedIn) { b.remove(); return; }
    const lines = ['CRC FIELD TERMINAL / UNOFFICIAL BUILD', '', 'LOADING FIELD DATA', `  NMRiH2 Info Compendium ... <b>OK</b>`, `  compiled by <b>${esc(X.source.author)}</b> and contributors`, `  game ${esc(X.meta.gameVersion)} / sheet ${esc(X.meta.sheetUpdated)}`, '', `${X.zombies.length} THREATS / ${WEAPONS.length} WEAPONS / ${X.perks.length} PERKS`, '', 'NPV LAMBDA: ACTIVE', 'STAY QUIET. KEEP ONE ROUND.'];
    let i = 0;
    const end = () => { b.classList.add('gone'); setTimeout(() => b.remove(), 300); };
    b.addEventListener('click', end);
    const t = setInterval(() => { if (i >= lines.length) { clearInterval(t); setTimeout(end, 500); return; } b.innerHTML += lines[i++] + '\n'; }, 95);
  }

  const linkedIn = location.hash.length > 1;  // shared links skip the boot text
  readHash();
  renderHero(); renderChain(); renderIntel(); renderSource(); renderAll(); boot();
  if (!reduced) {
    let last = performance.now();
    const loop = t => { const dt = Math.min(60, t - last); last = t; const cv = $('#radar'); if (cv) { const r = cv.getBoundingClientRect(); if (r.bottom > 0 && r.top < innerHeight) drawRadar(dt); } requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
    setInterval(() => { hintI++; renderHint(); }, 7000);
  } else drawRadar(0);
  if ('IntersectionObserver' in window) {
    const links = [...document.querySelectorAll('#chain a')];
    const io = new IntersectionObserver(es => {
      es.forEach(en => { if (en.isIntersecting) { const idx = links.findIndex(a => a.dataset.sec === en.target.id); links.forEach((a, i) => { a.classList.toggle('on', i === idx); a.classList.toggle('done', i < idx); }); } });
    }, { rootMargin: '-35% 0px -60% 0px' });
    CHAIN.forEach(c => io.observe($('#' + c[0])));
  }
})();
