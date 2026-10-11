# Project instructions (paste into the ChatGPT project)

## Project
Name: **Mercari Plus**.
Developer: **KamiyaRei**.
Current working release: **1.0** (the existing build, renamed and renumbered without functional changes).
A Tampermonkey userscript for Mercari Japan (https://jp.mercari.com/) that improves browsing for a
buyer who hunts for items. Today it does one thing: hides auction listings and keeps only
fixed-price items. The scope will grow (see Roadmap), so keep the code modular enough to add
features without rewriting. Later it may be packaged as a browser extension (Manifest V3) and shared.
The tool is unofficial and must never look like an official Mercari product.

## About the user
- Talk to me in Russian, casual tone.
- Everything inside code is English only: comments, UI text, dialogs, variable names, file names.
- I use Mercari mainly as a buyer/hunter, not as a reseller.
- I can use DevTools (Inspect, Console) when you ask, so ask me instead of guessing.

## Repository
- `mercari-plus.user.js`: the script (single file, ready to paste into Tampermonkey)
- `README.md`, `CHANGELOG.md`, `LICENSE` (MIT), `NOTICE` (Material Symbols icon, Apache 2.0)
- `docs/PROJECT_INSTRUCTIONS.md`: this file. Keep it updated when decisions change.
Work on the latest version in the repo. Pull before editing.

## Versioning
- Current version: **1.0** (header `@version`, README, CHANGELOG must match).
- Every update adds 0.1 to the minor number: 1.0 -> 1.1 -> 1.2 ... 1.9 -> 1.10 (compare segment by
  segment, as Tampermonkey does). Only change the major number or jump to a specific version when
  I explicitly say so.
- Future functional updates: bump `@version`, add a CHANGELOG entry (date + short bullets), commit as
  `vX.Y: short summary`.

## Hard rules
1. Preserve working functionality first. Never rewrite the whole script for a small change.
2. Explain what each change improves, briefly.
3. Do not invent DOM selectors. If you need new DOM knowledge, give me a precise DevTools Console
   command or ask me to Inspect an element and paste the result.
4. Always deliver the full ready-to-paste script, not fragments (also commit it if you have repo access).
5. Watch performance: no repeated full-document scans, no polling intervals, batch DOM work.
6. Must survive Mercari updates: SPA navigation, infinite scroll, dynamically added tiles, reused DOM nodes.
7. Never hide regular fixed-price items.
8. If unsure how Mercari behaves, give a diagnostic Console command first, then change code.
9. Do not treat console errors as script bugs without evidence (see Known noise).

## Mercari DOM facts (verified on the real site)
- Item card: `li` > ... > `a[data-testid="item-tile"]` with `href="/item/m..."`.
- Hide the closest parent: `tile.closest('li')`.
- Auction tile text contains `現在 ¥ 3,500`. Fixed-price tile shows just `¥ 4,000`.
- Auction detection regex: `/現在\s*[¥￥]/`.
- The old selector `li[data-testid="item-cell"]` does NOT exist anymore. Do not use it.
- Mercari is a React SPA: infinite scroll, History API navigation, DOM nodes get reused for other items.

## Current architecture (v1.0)
- A tile is marked by setting `data-mha-auction="1"` on its `li`. A CSS rule
  `html.mha-on li[data-mha-auction="1"]{display:none!important}` hides it. The toggle is one class on `<html>`.
- Tiles are re-checked when their text or `href` changes (cache: `tile._mhaText`, `tile._mhaCard`).
- One MutationObserver (childList, subtree, characterData, href attribute), batched with requestAnimationFrame.
- History API hooks (`pushState`, `replaceState`, `popstate`) trigger a full rescan after 300 ms.
- On/off state in `localStorage` key `mha_hide_auctions`.
- Floating button `#mha-toggle`, round 44px, Material Symbols "gavel" icon inline as SVG.
  ON (hiding): red circle, white icon. OFF (showing): faded circle and icon (opacity 0.25), badge stays
  fully opaque so the count remains readable. No strike-through on the icon (removed on purpose).
  Position and colors are constants at the top of the script.
- `@grant none`. Internal prefix `mha-` is kept for continuity.

## Known noise (not our bugs)
- `ERR_BLOCKED_BY_CLIENT` on `https://api.mercari.jp/client_events/v2/event`: ad blocker blocking analytics.
- Occasional 404s from Mercari's own requests.

## Safety guardrails (Mercari terms and account risk)
- Keep the tool display-only: it may change how the page looks in the user's own browser.
- Do NOT add: background crawling, extra requests to Mercari, polling the site, auto-buying,
  sniping, auto-messaging or anything that acts like a bot. Mercari watches for suspicious activity.
- Any history or price tracking must only record items the user actually opened or saw on screen.
- The tool is named "Mercari Plus". Clearly describe it as unofficial and do not use the Mercari logo or imply affiliation with Mercari.
- Before publishing or sharing, remind me to re-read the current Mercari terms of use.

## Roadmap (do in this order unless I say otherwise)
Needs only what we already know (no Inspect needed):
1. NEW / viewed marks: remember item IDs from `href`, mark unseen tiles NEW and dim opened ones.
2. Price change marks: for items seen before, show a small marker when the price differs (e.g. down by 500).
3. Stats panel for visible (non-auction) results: min / median / max price.
4. Hotkey to toggle (e.g. Alt+A) and a Tampermonkey menu entry (note: needs a `@grant`, which moves the
   script into the sandbox, so History API hooks must be re-checked).
Needs Inspect first (ask me, do not guess):
5. Keyword blacklist for titles (ジャンク, まとめ売り, etc.).
6. Hide promoted / PR tiles if they look different from normal ones.
7. Denser grid / compact mode.
8. Item page: highlight seller rating and low review count.
Later:
9. Package as a Manifest V3 extension (content script + `chrome.storage` + popup), publish
   (Greasy Fork first, then browser stores). Use the established Mercari Plus name and clearly identify it as unofficial.

## Open questions
- None currently. The project name is Mercari Plus; the developer is KamiyaRei.
