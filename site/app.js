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
  let filter = null;
  let query = "";

  const $ = (id) => document.getElementById(id);
  const grid = $("grid"), tabsEl = $("tabs"), filtersEl = $("filters");

  // ---- stats banner --------------------------------------------------------
  const banner = $("statsBanner");
  const si = D.statsInfo || {};
  if (D.hasStats) {
    banner.className = "banner ok";
    banner.innerHTML =
      "<strong>Real in-game numbers.</strong> Weapon, melee, throwable, item and zombie stats" +
      (si.withStats ? " (" + si.withStats + " entries)" : "") +
      " are read straight from the game's own data-table assets. " +
      "Skills are listed by name &mdash; their magnitudes live in Blueprint effects that a foreign " +
      "mappings file can't decode yet.";
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
    b.onclick = () => { active = key; filter = null; query = ""; $("search").value = ""; render(); };
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

  function categoriesFor(key) {
    const arr = S[key] || [];
    const field = key === "melee" ? "rarity" : "category";
    const set = new Set();
    arr.forEach((x) => { if (x[field]) set.add(x[field]); });
    return { field, values: [...set].sort() };
  }

  function render() {
    document.querySelectorAll(".tab").forEach((t) =>
      t.classList.toggle("active", t.dataset.key === active));
    // filter chips
    filtersEl.innerHTML = "";
    const { field, values } = categoriesFor(active);
    if (values.length > 1) {
      const mk = (label, val) => {
        const c = document.createElement("button");
        c.className = "chip" + ((filter === val) ? " active" : "");
        c.textContent = label;
        c.onclick = () => { filter = (filter === val ? null : val); paint(); };
        filtersEl.appendChild(c);
      };
      mk("All", null);
      values.forEach((v) => mk(v, v));
    }
    filtersEl.dataset.field = field;
    paint();
  }

  function paint() {
    const arr = S[active] || [];
    const field = filtersEl.dataset.field;
    let rows = arr.filter((x) => {
      if (filter && x[field] !== filter) return false;
      if (query && !((x.name || "").toLowerCase().includes(query) ||
                     (x.raw || "").toLowerCase().includes(query))) return false;
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

  function card(x) {
    const el = document.createElement("article");
    el.className = "card";
    let h = "<h3>" + esc(x.name) + "</h3>";
    const badges = [];
    if (x.category) badges.push('<span class="badge cat">' + esc(x.category) + "</span>");
    if (x.rarity) badges.push('<span class="badge rare">' + esc(x.rarity) + "</span>");
    if (x.hasUltimate) badges.push('<span class="badge ult">Ultimate</span>');
    if (x.statSource === "files") badges.push('<span class="badge stat" title="Decoded from the game\'s data-table assets">from files</span>');
    if (badges.length) h += '<div class="badges">' + badges.join("") + "</div>";

    const primary = x.stats || {};
    const all = x.allStats || {};
    if (Object.keys(primary).length) {
      h += '<div class="stats">' + statRows(primary) + "</div>";
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
    ss.textContent = "Numbers decoded with " + si.filesDecoder +
      ". Curve-table stats are the game's own values; skill magnitudes pending.";

  render();
})();
