# Changelog

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
