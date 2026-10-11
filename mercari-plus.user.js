// ==UserScript==
// @name         Mercari Plus
// @namespace    rei-mercari
// @version      1.2
// @description  Mercari Plus: an unofficial browsing tool for Mercari Japan that hides auction listings, with a compact on-page toggle button and counter
// @author       KamiyaRei
// @match        https://jp.mercari.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/KamiyaRei/mercari-plus/main/mercari-plus.user.js
// @downloadURL  https://raw.githubusercontent.com/KamiyaRei/mercari-plus/main/mercari-plus.user.js
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    const DEBUG = false;
    const STORAGE_KEY = 'mha_hide_auctions';
    const TILE_SELECTOR = 'a[data-testid="item-tile"], a[data-testid="thumbnail-link"]';
    const AUCTION_RE = /現在\s*[¥￥]/;
    const HIDDEN_ATTR = 'data-mha-auction';
    const ROOT_CLASS = 'mha-on';

    // Button position (px from the viewport edges)
    const BOTTOM_OFFSET = 96;
    const RIGHT_OFFSET = 20;

    // Colors: ON (auctions hidden)
    const COLOR_ACTIVE_BG = '#ff333f';
    const COLOR_ACTIVE_ICON = '#ffffff';

    // Colors: OFF (auctions shown), muted look
    const OFF_OPACITY = 0.25;            // fade of the circle and the icon
    const COLOR_OFF_ICON = '#a3a3ab';
    const COLOR_OFF_BORDER = '#dedee2';
    const COLOR_OFF_BADGE_BG = '#6b6b73'; // badge stays fully opaque to stay readable
    const COLOR_OFF_BADGE_TEXT = '#ffffff';

    function log(...args) {
        if (DEBUG) console.log('[Mercari Plus]', ...args);
    }

    // ---------- State (persisted) ----------

    function loadState() {
        try {
            const v = localStorage.getItem(STORAGE_KEY);
            return v === null ? true : v === '1';
        } catch (e) {
            return true;
        }
    }

    function saveState(value) {
        try {
            localStorage.setItem(STORAGE_KEY, value ? '1' : '0');
        } catch (e) { /* ignore */ }
    }

    let hideEnabled = loadState();

    // ---------- CSS ----------

    const style = document.createElement('style');
    style.textContent = `
        html.${ROOT_CLASS} li[${HIDDEN_ATTR}="1"] { display: none !important; }

        #mha-toggle {
            position: fixed;
            right: ${RIGHT_OFFSET}px;
            bottom: ${BOTTOM_OFFSET}px;
            z-index: 2147483647;
            width: 44px;
            height: 44px;
            padding: 0;
            margin: 0;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: transform 0.15s ease, box-shadow 0.15s ease,
                        background 0.15s ease, border-color 0.15s ease;
            -webkit-tap-highlight-color: transparent;
        }
        #mha-toggle:hover { transform: scale(1.08); }
        #mha-toggle:active { transform: scale(0.96); }

        /* Material Symbols icons are filled shapes */
        #mha-toggle svg {
            width: 24px;
            height: 24px;
            fill: currentColor;
            pointer-events: none;
            transition: opacity 0.15s ease;
        }

        /* ON: auctions hidden */
        #mha-toggle.mha-hiding {
            background: ${COLOR_ACTIVE_BG};
            color: ${COLOR_ACTIVE_ICON};
            border: none;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.22);
        }
        #mha-toggle.mha-hiding:hover {
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.28);
        }

        /* OFF: auctions shown. The fade is applied to the circle and icon only,
           not to the whole button, so the badge stays readable. */
        #mha-toggle.mha-showing {
            background: rgba(255, 255, 255, ${OFF_OPACITY});
            color: ${COLOR_OFF_ICON};
            border: 1px solid rgba(222, 222, 226, ${OFF_OPACITY});
            box-shadow: 0 1px 4px rgba(0, 0, 0, ${(0.08 * OFF_OPACITY).toFixed(3)});
        }
        #mha-toggle.mha-showing svg { opacity: ${OFF_OPACITY}; }

        #mha-toggle.mha-showing:hover {
            background: #ffffff;
            border-color: ${COLOR_OFF_BORDER};
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
        }
        #mha-toggle.mha-showing:hover svg { opacity: 1; }

        #mha-toggle .mha-badge {
            position: absolute;
            top: -4px;
            right: -4px;
            min-width: 18px;
            height: 18px;
            padding: 0 5px;
            box-sizing: border-box;
            border-radius: 9px;
            font: 700 11px/18px -apple-system, "Segoe UI", Roboto, sans-serif;
            text-align: center;
            pointer-events: none;
        }
        #mha-toggle.mha-hiding .mha-badge {
            background: #fff;
            color: ${COLOR_ACTIVE_BG};
            box-shadow: 0 0 0 1.5px ${COLOR_ACTIVE_BG};
        }
        #mha-toggle.mha-showing .mha-badge {
            background: ${COLOR_OFF_BADGE_BG};
            color: ${COLOR_OFF_BADGE_TEXT};
            box-shadow: 0 0 0 1.5px #fff;
        }
    `;
    document.head.appendChild(style);

    function applyRootClass() {
        document.documentElement.classList.toggle(ROOT_CLASS, hideEnabled);
    }

    // ---------- Button ----------

    let button = null;
    let badge = null;

    function createButton() {
        button = document.createElement('button');
        button.id = 'mha-toggle';
        button.type = 'button';

        // Material Symbols Outlined "gavel" (FILL 0, wght 400, opsz 24), Apache 2.0
        button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" aria-hidden="true">
                <path d="M160-120v-80h480v80H160Zm226-194L160-540l84-86 228 226-86 86Zm254-254L414-796l86-84 226 226-86 86Zm184 408L302-682l56-56 522 522-56 56Z"/>
            </svg>
            <span class="mha-badge">0</span>
        `;
        badge = button.querySelector('.mha-badge');

        button.addEventListener('click', () => {
            hideEnabled = !hideEnabled;
            saveState(hideEnabled);
            applyRootClass();
            updateButton();
            log('Toggled. Hide enabled:', hideEnabled);
        });
    }

    function ensureButton() {
        if (!document.body) return;

        if (!button) createButton();

        // Re-attach if the SPA removed it
        if (!button.isConnected) {
            document.body.appendChild(button);
        }
    }

    function countAuctions() {
        return document.querySelectorAll(`li[${HIDDEN_ATTR}="1"]`).length;
    }

    function updateButton() {
        ensureButton();
        if (!button) return;

        const count = countAuctions();
        const label = hideEnabled
            ? `Auctions hidden: ${count}. Click to show`
            : `Auctions shown: ${count}. Click to hide`;

        button.classList.toggle('mha-hiding', hideEnabled);
        button.classList.toggle('mha-showing', !hideEnabled);
        button.title = label;
        button.setAttribute('aria-label', label);
        badge.textContent = count > 99 ? '99+' : String(count);
    }

    // ---------- Tile processing ----------

    function processTile(tile) {
        const text = (tile.textContent || '').replace(/\s+/g, ' ').trim();

        // Not rendered yet, check again on the next mutation
        if (!text) return;

        const card = tile.closest('li');
        if (!card) return;

        // Skip only if neither the content nor the card changed
        if (tile._mhaText === text && tile._mhaCard === card) return;

        tile._mhaText = text;
        tile._mhaCard = card;

        const isAuction = AUCTION_RE.test(text);

        if (isAuction) {
            if (card.getAttribute(HIDDEN_ATTR) !== '1') {
                card.setAttribute(HIDDEN_ATTR, '1');
                log('Marked auction:', tile.href, text);
            }
        } else if (card.hasAttribute(HIDDEN_ATTR)) {
            // DOM reuse: this card now holds a fixed-price item
            card.removeAttribute(HIDDEN_ATTR);
            log('Unmarked (now fixed price):', tile.href);
        }
    }

    function scan(root) {
        if (!root || root.nodeType !== 1) return;

        if (root.matches(TILE_SELECTOR)) processTile(root);

        root.querySelectorAll(TILE_SELECTOR).forEach(processTile);
    }

    // ---------- Batched scheduling ----------

    const pending = new Set();
    let fullScanRequested = false;
    let scheduled = false;

    function schedule() {
        if (scheduled) return;
        scheduled = true;
        requestAnimationFrame(flush);
    }

    function flush() {
        scheduled = false;

        if (fullScanRequested) {
            fullScanRequested = false;
            pending.clear();
            scan(document.body);
        } else {
            pending.forEach(scan);
            pending.clear();
        }

        updateButton();
    }

    function requestFullScan() {
        fullScanRequested = true;
        schedule();
    }

    // ---------- Observer ----------

    function enqueueFromNode(node) {
        const el = node.nodeType === 1 ? node : node.parentElement;
        if (!el) return;

        // Change happened inside an existing tile (text swapped by React)
        const tile = el.closest(TILE_SELECTOR);
        if (tile) pending.add(tile);
    }

    const observer = new MutationObserver(mutations => {
        for (const m of mutations) {
            // Ignore our own button
            if (button && button.contains(m.target)) continue;

            if (m.type === 'childList') {
                for (const node of m.addedNodes) {
                    if (node.nodeType === 1 && node !== button) pending.add(node);
                }
                enqueueFromNode(m.target);
            } else if (m.type === 'characterData') {
                enqueueFromNode(m.target);
            } else if (m.type === 'attributes') {
                enqueueFromNode(m.target);
            }
        }

        if (pending.size) schedule();
    });

    // ---------- SPA navigation ----------

    function hookHistory() {
        ['pushState', 'replaceState'].forEach(name => {
            const original = history[name];
            history[name] = function () {
                const result = original.apply(this, arguments);
                log('History', name, location.href);
                setTimeout(requestFullScan, 300);
                return result;
            };
        });

        window.addEventListener('popstate', () => {
            log('popstate', location.href);
            setTimeout(requestFullScan, 300);
        });
    }

    // ---------- Init ----------

    applyRootClass();
    ensureButton();
    requestFullScan();

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: ['href']
    });

    hookHistory();

    log('Script loaded, hide enabled:', hideEnabled);
})();
