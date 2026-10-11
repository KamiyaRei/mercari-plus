# Changelog

## 1.3 — 2026-10-11 (Asia/Tokyo)

- Link item-tile and thumbnail-link cards by item ID using an in-memory index.
- Hide all copies after a positive auction text match, regardless of arrival order; missing text never cancels confirmation.
- Recompute marks on href/text/card reuse and clean up removed cards, supporting reinsertion.
- Keep evidence only for the page lifetime, with no polling, extra requests, React internals, or persisted item history.
- Preserve the toggle, counter, localStorage preference, CSS switching, update URLs, and SPA MutationObserver/rAF handling.

## 1.2 — 2026-10-11

- Fix auction hiding in search results by supporting `thumbnail-link` cards alongside `item-tile` cards.
- Preserve existing auction detection, toggle, counter, and dynamic update behavior.

## 1.1 — 2026-10-11

- Add explicit GitHub `@updateURL` and `@downloadURL` metadata for Tampermonkey updates.
- Document update behavior and migration from manually installed version 1.0.
- Keep auction filtering and all runtime behavior unchanged.

## 1.0 — 2026-10-11

Initial repository import of the existing working userscript. No functional changes.

- Hide auction listings with a floating toggle and auction counter.
- Persist the toggle preference in localStorage.
- Handle dynamic listing updates and SPA navigation.
- Adopt the Mercari Plus name and version 1.0.
- Add English and Japanese documentation, development instructions, and license notices.
