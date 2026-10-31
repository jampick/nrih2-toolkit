// node tools/test_engine.js  Checks the kill math against worked examples on the compendium's own pages.
global.window = globalThis;
require('../site/intel.js');
require('../site/engine.js');
const assert = require('assert');
const E = window.ENGINE, X = window.INTEL;
const by = (a, id) => a.find(x => x.id === id);
const z = id => by(X.zombies, id), g = id => by(X.guns, id), m = id => by(X.melee, id);
const st = (o = {}) => ({ diff: 'normal', squad: 1, threat: 1, perks: {}, items: {}, ...o });

// Guns tab: 1911 headshot 100 kills a 100 HP Walker, MC-15 headshot 130 kills a 130 HP Prime.
assert.equal(E.strike(g('m1911a1'), z('walker'), st(), { zone: 'head' }).hits, 1);
assert.equal(E.strike(g('mc-15'), z('prime'), st(), { zone: 'head' }).hits, 1);
assert.equal(E.strike(g('gruber-mkvii'), z('walker'), st(), { zone: 'head' }).hits, 3);
// Shotgun damage is per pellet: 17 x 10 pellets body, one shell kills a Walker.
assert.equal(E.strike(g('m590a1'), z('walker'), st(), { zone: 'body' }).per, 170);
// Multiplicative perks add before multiplying (Perks tab: +30% and +20% = 1.5x).
assert.ok(Math.abs(E.strike(g('m7a1'), z('walker'), st(), { zone: 'body' }).per - 40) < 1e-9);
assert.ok(Math.abs(E.strike(g('hunter-85'), z('walker'), st({ perks: { 'steel-chamber': 2 } }), { zone: 'body' }).per - 45.5) < 1e-9);
// Overkill Expert: 13 pellets.
assert.equal(Math.round(E.strike(g('m590a1'), z('walker'), st({ perks: { overkill: 2 } }), { zone: 'body' }).per), 221);
// Beginner buffs from the Difficulty tab.
assert.equal(E.strike(g('m7a1'), z('walker'), st({ diff: 'beginner' }), { zone: 'body' }).per, 80);
assert.ok(Math.abs(E.strike(m('fire-axe'), z('walker'), st({ diff: 'beginner' }), { zone: 'body', mode: 'light' }).per - 50.05) < 1e-9);
// Mechanics, Oddities: small wrench light head 20 on National Guard, 20 standing, 80 knocked down.
assert.equal(E.strike(m('wrench-small'), z('national-guard'), st(), { zone: 'head', mode: 'light' }).per, 20);
assert.equal(E.strike(m('wrench-small'), z('national-guard'), st(), { zone: 'head', mode: 'light', down: true }).per, 80);
// NG body takes half, knocked down the resistance goes and x2 applies.
assert.equal(E.strike(g('m7a1'), z('national-guard'), st(), { zone: 'body' }).per, 20);
assert.equal(E.strike(g('m7a1'), z('national-guard'), st(), { zone: 'body', down: true }).per, 80);
// Riot vest only stops gunshots.
assert.equal(E.strike(g('m7a1'), z('riot-police'), st(), { zone: 'body' }).per, 20);
assert.equal(E.strike(m('fire-axe'), z('riot-police'), st(), { zone: 'body', mode: 'light' }).per, 35);
// Helmets: M7A1 pen 3 goes through NG (needs 3), M9A3 pen 0 has to strip it.
assert.equal(E.strike(g('m7a1'), z('national-guard'), st(), { zone: 'head' }).blocked, false);
assert.equal(E.strike(g('m9a3'), z('national-guard'), st(), { zone: 'head' }).blocked, true);
assert.equal(E.strike(g('m9a3'), z('national-guard'), st({ perks: {} }), { zone: 'head' }).strip, 2);
// Mohawk Expert gives the MC-15 pen 4.
assert.equal(E.strike(g('mc-15'), z('walker'), st({ perks: { mohawk: 2 } }), { zone: 'head' }).pen, 4);
// Mechanics: 15 base cost + 5 per target hit. Fire axe charged is 13 + 5.
assert.equal(E.strike(m('fire-axe'), z('walker'), st(), { zone: 'body', mode: 'charged' }).swing, 18);
assert.equal(E.strike(m('sledge-hammer'), z('walker'), st(), { zone: 'head', mode: 'charged' }).swing, 18);
// Sledge charged stability 100 = knockdown. Halved on National Guard = stagger.
assert.equal(E.stabEffect(E.stability(m('sledge-hammer'), z('walker'), st(), { mode: 'charged' })).name, 'Knockdown');
assert.equal(E.stabEffect(E.stability(m('sledge-hammer'), z('national-guard'), st(), { mode: 'charged' })).name, 'Stagger');
// Infection tables, including Acquired Immunity's flat subtraction against the sheet's own table.
assert.equal(E.infectSwipe(100, st()), 0);
assert.equal(E.infectSwipe(60, st()), 0);
assert.equal(E.infectSwipe(50, st()), 5);
assert.equal(E.infectSwipe(40, st()), 16.25);
assert.equal(E.infectSwipe(5, st()), 50);
assert.equal(E.infectSwipe(40, st({ perks: { 'acquired-immunity': 1 } })), 6.25);
assert.equal(E.infectSwipe(30, st({ perks: { 'acquired-immunity': 2 } })), 7.5);
assert.equal(E.infectSwipe(40, st({ perks: { 'acquired-immunity': 2 } })), 0);
assert.equal(E.infectGas(90, st()), 5);
assert.equal(E.infectGas(70, st({ perks: { 'acquired-immunity': 1 } })), 4);
assert.equal(E.infectGas(30, st({ items: { 'n95-mask': 1 } })), 0);
// Player damage formula: Resistance and Mitigation multiply. Nightmare Walker 20 -> 30.
assert.equal(E.hitDamage(20, st({ diff: 'nightmare' })), 30);
assert.ok(Math.abs(E.hitDamage(20, st({ diff: 'nightmare', items: { 'body-armor': 1 }, perks: { 'sturdy-body': 2 } })) - 18) < 1e-9);
// Health gate: Nightmare Walker hits for 30: 70, 40, 10, gate to 1, then down on hit 5.
const nm = E.beating(z('walker'), st({ diff: 'nightmare' }));
assert.deepEqual(nm.steps.map(s => s.hp), [70, 40, 10, 1, 0]);
assert.equal(nm.steps[3].gated, true);
// Normal Walker hits for 20 and lands exactly on 0 with no overshoot, so the gate never fires.
assert.deepEqual(E.beating(z('walker'), st()).steps.map(s => s.hp), [80, 60, 40, 20, 0]);
// Forecast keeps elites inside their limits and fills the location cap.
const f = E.forecast(st({ diff: 'nightmare', squad: 4, threat: 10 }));
assert.equal(f.rows.reduce((s, r) => s + r.alive, 0), f.cap);
assert.equal(f.rows.find(r => r.key === 'Runner').alive <= 3, true);
assert.ok(Math.abs(f.rows.reduce((s, r) => s + r.share, 0) - 1) < 1e-9);
// Sprint: 200 x 1.9 = 380, shoes = 400. Runner tops out at 400.
assert.equal(E.you(st()).sprint, 380);
assert.equal(E.you(st({ items: { 'running-shoes': 1 } })).sprint, 400);
assert.equal(E.you(st()).sprintSecs, 20);
// Crawlers inherit their parent's HP and damage, every target can be killed by every weapon.
assert.equal(z('crawler').hp, 100);
assert.equal(z('runner-crawler').basic, 20);
for (const zz of X.zombies) for (const w of X.guns.concat(X.melee)) for (const zone of ['head', 'body']) {
  const r = E.strike(w, zz, st(), { zone, mode: 'light' });
  assert.ok(r.hits >= 1 && Number.isFinite(r.hits), `${w.name} vs ${zz.name} ${zone}: ${r.hits}`);
}
console.log('engine: all checks pass');
