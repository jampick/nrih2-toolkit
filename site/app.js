(function () {
  const D = window.NMRIH2;
  const S = D.sections;

  const TABS = [
    ["skills", "Skills"],
    ["firearms", "Firearms"],
    ["melee", "Melee"],
    ["throwables", "Throwables"],
    ["consumables", "Consumables"],
    ["gear", "Gear"],
    ["attachments", "Attachments"],
    ["recipes", "Recipes"],
    ["zombies", "Zombies"],
    ["challenges", "Challenges"],
  ];

  let active = "skills";
  let filters = {};   // facet field -> selected value
  let query = "";

  const $ = (id) => document.getElementById(id);
  const grid = $("grid"), tabsEl = $("tabs"), filtersEl = $("filters");

  // ---- stats banner --------------------------------------------------------
  // Spooky header hero: a random in-game map loading-screen behind a dark wash.
  if (D.flavor && D.flavor.length) {
    const pick = D.flavor[Math.floor(Math.random() * D.flavor.length)];
    const hdr = document.querySelector("header");
    if (hdr) hdr.style.backgroundImage =
      "linear-gradient(180deg, rgba(13,15,18,.74), rgba(13,15,18,.93)), url('" + pick + "')";
  }

  const banner = $("statsBanner");
  const si = D.statsInfo || {};
  if (D.hasStats) {
    banner.className = "banner ok";
    banner.innerHTML =
      "<strong>Real in-game numbers.</strong> Weapon, melee, throwable, item and zombie stats" +
      (si.withStats ? " (" + si.withStats + " entries)" : "") +
      " are read straight from the game's own data-table assets " +
      '<span class="badge stat">from files</span>. Skill effects and Expert unlock levels' +
      (si.wikiSkills ? " (" + si.wikiSkills + " skills)" : "") +
      ' are community-sourced <span class="badge wiki">from wiki</span> &mdash; their magnitudes ' +
      "live in Blueprint effects a foreign mappings file can't decode.";
  } else {
    banner.className = "banner";
    banner.innerHTML =
      "<strong>Preview build.</strong> Every item, skill and enemy is listed by name; numeric stats pending.";
  }

  // ---- tabs ----------------------------------------------------------------
  TABS.forEach(([key, label]) => {
    const arr = S[key] || [];
    const b = document.createElement("button");
    b.className = "tab" + (key === active ? " active" : "");
    b.innerHTML = label + '<span class="n">' + arr.length + "</span>";
    b.onclick = () => { active = key; filters = {}; query = ""; $("search").value = ""; render(); };
    b.dataset.key = key;
    tabsEl.appendChild(b);
  });

  $("search").addEventListener("input", (e) => { query = e.target.value.toLowerCase().trim(); paint(); });

  // Expand/collapse the full attribute list on a card.
  grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".showall");
    if (!btn) return;
    const panel = btn.nextElementSibling;
    const open = panel.classList.toggle("hidden") === false;
    btn.textContent = open ? "Hide attributes"
      : "Show all " + panel.querySelectorAll("div").length + " attributes";
  });

  // Facets per tab: each is a [field, label] pair; a chip group renders for any
  // facet with 2+ distinct values in the current tab's rows.
  const FACETS = {
    firearms: [["category", "Type"], ["caliber", "Ammo"]],
    melee: [["rarity", "Rarity"]],
  };
  const GUNTYPE_ORDER = ["Handgun", "SMG", "Shotgun", "Rifle", "Sniper"];

  function facetsFor(key) {
    const arr = S[key] || [];
    const out = [];
    (FACETS[key] || [["category", "Category"]]).forEach(([field, label]) => {
      const set = new Set();
      arr.forEach((x) => { if (x[field]) set.add(x[field]); });
      let values = [...set].sort();
      if (field === "category" && key === "firearms")
        values = GUNTYPE_ORDER.filter((v) => set.has(v));
      if (values.length > 1) out.push({ field, label, values });
    });
    return out;
  }

  function render() {
    document.querySelectorAll(".tab").forEach((t) =>
      t.classList.toggle("active", t.dataset.key === active));
    // filter chip groups
    filtersEl.innerHTML = "";
    facetsFor(active).forEach(({ field, label, values }) => {
      const group = document.createElement("div");
      group.className = "fgroup";
      const lab = document.createElement("span");
      lab.className = "flabel";
      lab.textContent = label;
      group.appendChild(lab);
      const mk = (text, val) => {
        const c = document.createElement("button");
        c.className = "chip" + ((filters[field] ?? null) === val ? " active" : "");
        c.textContent = text;
        c.onclick = () => {
          filters[field] = (filters[field] === val ? null : val);
          render();
        };
        group.appendChild(c);
      };
      mk("All", null);
      values.forEach((v) => mk(v, v));
      filtersEl.appendChild(group);
    });
    paint();
  }

  function paint() {
    const arr = S[active] || [];
    let rows = arr.filter((x) => {
      for (const [field, val] of Object.entries(filters))
        if (val && x[field] !== val) return false;
      if (query && !((x.name || "").toLowerCase().includes(query) ||
                     (x.raw || "").toLowerCase().includes(query) ||
                     (x.caliber || "").toLowerCase().includes(query) ||
                     (x.category || "").toLowerCase().includes(query))) return false;
      return true;
    });
    rows.sort((a, b) => a.name.localeCompare(b.name));
    $("count").textContent = rows.length + " of " + arr.length;
    grid.innerHTML = "";
    $("empty").classList.toggle("hidden", rows.length > 0);
    const frag = document.createDocumentFragment();
    rows.forEach((x) => frag.appendChild(card(x)));
    grid.appendChild(frag);
  }

  function statRows(obj) {
    let h = "";
    for (const [k, v] of Object.entries(obj))
      h += "<div><span class='k'>" + esc(k) + "</span><span>" + esc(String(v)) + "</span></div>";
    return h;
  }

  // "Zombie math" — shots/swings to drop each zombie type, from real decoded HP.
  function zmathBlock(z) {
    let h = '<div class="zmath">';
    h += '<div class="zhead">☠ ' + esc(z.title) +
         '<span class="zlegend">💀 head · 🎯 body</span></div>';
    if (z.note) h += '<div class="znote">' + esc(z.note) + "</div>";
    z.rows.forEach((r) => {
      h += '<div class="zrow' + (r.head === 1 ? " onetap" : "") + '">' +
           '<span class="zname">' + esc(r.label) + ' <em>' + esc(r.hp) + ' HP</em></span>' +
           '<span class="zn zh">💀 ' + (r.head == null ? "—" : r.head) + "</span>" +
           '<span class="zn">🎯 ' + r.body + "</span></div>";
    });
    if (z.onetap) h += '<div class="ztap">💀 ' + esc(z.onetap) + "</div>";
    return h + "</div>";
  }

  function card(x) {
    const el = document.createElement("article");
    el.className = "card";
    let h = "";
    if (x.img) h += '<div class="thumb"><img loading="lazy" src="' + esc(x.img) + '" alt="' + esc(x.name) + '"></div>';
    h += "<h3>" + esc(x.name) + "</h3>";
    const badges = [];
    if (x.category) badges.push('<span class="badge cat">' + esc(x.category) + "</span>");
    if (x.rarity) badges.push('<span class="badge rare">' + esc(x.rarity) + "</span>");
    if (x.hasUltimate) badges.push('<span class="badge ult">Ultimate</span>');
    if (x.statSource === "files") badges.push('<span class="badge stat" title="Decoded from the game\'s data-table assets">from files</span>');
    else if (x.statSource === "fandom") badges.push('<span class="badge wiki" title="Community-sourced from the Fandom wiki (CC-BY-SA)">from wiki</span>');
    if (badges.length) h += '<div class="badges">' + badges.join("") + "</div>";

    if (x.caliber) {
      h += '<div class="ammo">';
      if (x.ammoIcon) h += '<img class="ammoicn" loading="lazy" src="' + esc(x.ammoIcon) + '" alt="">';
      h += '<span class="ammolabel">Ammo</span><span class="ammoval">' + esc(x.caliber) + "</span></div>";
    }

    const primary = x.stats || {};
    const all = x.allStats || {};
    if (Object.keys(primary).length) {
      h += '<div class="stats">' + statRows(primary) + "</div>";
      if (x.zmath) h += zmathBlock(x.zmath);
      const extra = Object.keys(all).length - Object.keys(primary).length;
      if (extra > 0) {
        h += '<button class="showall" type="button">Show all ' + Object.keys(all).length + " attributes</button>";
        h += '<div class="stats allstats hidden">' + statRows(all) + "</div>";
      }
    } else if (x.statsExpected) {
      h += '<div class="pending">No dedicated stat table in this build</div>';
    }
    el.innerHTML = h;
    return el;
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  }

  const m = D.meta || {};
  $("metaline").textContent =
    (m.game || "") + " — " + (m.engine || "") + " — " +
    Object.values(m.counts || {}).reduce((a, b) => a + b, 0) + " data assets catalogued.";
  const ss = $("statsSource");
  if (ss && si.filesDecoder)
    ss.textContent = "Weapon/zombie numbers decoded with " + si.filesDecoder +
      " (the game's own values).";
  const wa = $("wikiAttribution");
  if (wa && si.wikiAttribution)
    wa.innerHTML = "Skill effects: " + esc(si.wikiAttribution);

  render();
})();
