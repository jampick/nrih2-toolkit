# Kill Chain: NMRiH2 field terminal

An unofficial player tool for **No More Room in Hell 2**. Pick a zombie and the page shows what kills it, what it does to you, who hears your shot, how long you have once you're bitten, and what the run pays. It's one page with one shared state, so changing your difficulty, target, weapon or perks changes the numbers in every panel.

Live: https://jampick.github.io/nrih2-toolkit/

## Where the data comes from

Nearly every game number comes from the **[NMRiH2 Info Compendium](https://docs.google.com/spreadsheets/d/e/2PACX-1vRYRiLDS0qkszc2GgVRzTiNy46i-JaatWB2qbgsufwzwpCbyZCBqcaQ3avoYnLEAiif-ZYJLD-OD5rW/pubhtml)**, built and maintained by **@SchwarzFenrir**, with credited help from Zeyev, SupremeSecretMan, 可萝贝, Braks and the people listed on the sheet's home tab. That sheet is the work. This site is another way to read it and isn't endorsed by or affiliated with its author. If the two disagree, trust the sheet.

Every panel on the site links back to the tab it came from. The Source section at the bottom lists the credits and everything the site calculates on its own.

Smaller sources: icons and map art are decoded from the game's files, zombie art and attachment fit lists come from the [Fandom wiki](https://no-more-room-in-hell-two.fandom.com/) (CC-BY-SA), and the unconfirmed Mutated stats are from the game's curve tables. The fonts are Saira Extra Condensed and Share Tech Mono, under the OFL.

Bugs in the math or the page are mine, so please [file them here](https://github.com/jampick/nrih2-toolkit/issues) and don't send them to the sheet's author.

## How it's built

There's no framework and no build step for the page itself.

```
site/
  index.html, style.css   The page
  app.js                  Rendering and state
  engine.js               The math, as pure functions over INTEL
  intel.js                Generated from the sheet. Don't edit by hand
tools/
  build_intel.py          Sheet -> site/intel.js
  test_engine.js          Kill math checked against worked examples from the sheet
```

To refresh after the sheet changes:

```
python tools/build_intel.py
node tools/test_engine.js
```

`build_intel.py` fails instead of guessing. It checks parsed values against ones I read off the sheet by eye, and the hand-curated rules (difficulty, armor, player stats, items) each cite the sheet text they came from. If the sheet changes that text, the build stops and asks for a recheck, and some of those checks will need updating when a patch changes the numbers. The raw CSVs aren't committed, only the facts the site uses.

To run it locally: `cd site && python -m http.server 8791`.

Pushing to `main` runs the tests and deploys `site/` to GitHub Pages.

## Reading the game files

The older tools (`tools/extractor`, `build_stats.py`, `decode_images.py` and friends) pull icons and curve tables from the local install. `WIP.md` has the details, including why the pipeline stays away from anything that touches the anti-cheat. The site only needs them for art and the Mutated stats now.

## Known limits

Hit counts assume every pellet lands, with no range or penetration falloff. Armored zombies show Walker base stats because the sheet lists only their armor rules. Helmet stripping is an estimate. The full list is on the page.
