/* ================================================================
   THEME MANAGER
   Single source of truth for Light/Dark theme selection across the
   entire STU Inter-Institutional Agreement Management System
   (Dashboard, Statistics, Partner Map, Communication, and any page
   added in the future).

   HOW TO USE ON A PAGE
   ---------------------------------------------------------------
   1. Load this script as early as possible — before the <style>
      block and before <body> — so the saved/system theme is applied
      before anything paints (no flash of the wrong theme):

        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="theme.js"></script>
          ...
        </head>

      Just loading the script is enough: it applies the correct
      `data-theme` attribute on <html> immediately, on its own.

   2. Wire up the page's toggle button once, from that page's own
      script, after the button exists in the DOM:

        ThemeManager.initToggle('themeToggle', {
          sun:  ICONS.sun,
          moon: ICONS.moon
        });

      Pass a 3rd argument if the page needs to react whenever the
      theme changes (e.g. re-rendering a chart or swapping a map
      tile layer):

        ThemeManager.initToggle('themeToggle', { sun, moon }, function(theme){
          renderAllCharts(window.__lastComputed);
        });

   RULES THIS FILE ENFORCES
   ---------------------------------------------------------------
   - `prefers-color-scheme` is consulted ONLY when nothing has been
     saved yet in localStorage. Once a user picks a theme, that
     choice always wins — it is never silently overridden again.
   - Every explicit selection (initial pick or toggle) is written to
     localStorage immediately, so it survives refreshes, new tabs,
     and closing/reopening the browser.
   ================================================================ */
(function (window, document) {
  'use strict';

  var STORAGE_KEY = 'theme';
  var LIGHT = 'light';
  var DARK = 'dark';

  function normalize(theme) {
    return theme === DARK ? DARK : LIGHT;
  }

  function systemPrefersDark() {
    try {
      return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    } catch (e) {
      return false;
    }
  }

  function readStoredTheme() {
    try {
      var saved = window.localStorage.getItem(STORAGE_KEY);
      return (saved === LIGHT || saved === DARK) ? saved : null;
    } catch (e) {
      // localStorage can throw in some privacy modes — degrade gracefully.
      return null;
    }
  }

  function writeStoredTheme(theme) {
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* non-fatal: theme still applies for this page view */
    }
  }

  function initialTheme() {
    var saved = readStoredTheme();
    if (saved) return saved;
    // No saved preference yet — fall back to system preference,
    // but do NOT persist it. It's a default, not a choice.
    return systemPrefersDark() ? DARK : LIGHT;
  }

  function applyTheme(theme, silent) {
    theme = normalize(theme);
    document.documentElement.setAttribute('data-theme', theme);
    if (!silent) {
      try {
        document.dispatchEvent(new CustomEvent('themechange', { detail: { theme: theme } }));
      } catch (e) { /* ignore in environments without CustomEvent */ }
    }
    return theme;
  }

  function getTheme() {
    return normalize(document.documentElement.getAttribute('data-theme'));
  }

  function setTheme(theme) {
    theme = applyTheme(theme);
    writeStoredTheme(theme);
    return theme;
  }

  function toggleTheme() {
    return setTheme(getTheme() === DARK ? LIGHT : DARK);
  }

  // Apply immediately, before first paint. This is the whole
  // flash-of-wrong-theme fix: it runs the instant this file is
  // parsed, which is why it must be loaded early in <head>.
  applyTheme(initialTheme(), true);

  // Keep every open tab/page in sync: if the theme is changed in
  // another tab, reflect it here too (icons, charts, tiles, etc.)
  // without writing back to storage again.
  window.addEventListener('storage', function (e) {
    if (e.key === STORAGE_KEY && (e.newValue === LIGHT || e.newValue === DARK)) {
      applyTheme(e.newValue);
    }
  });

  /**
   * Wires a theme-toggle button: click => flip theme, update
   * `data-theme`, persist to localStorage, repaint the icon, and
   * (optionally) notify the page so it can react to the change.
   *
   * @param {string|HTMLElement} buttonOrId  Button element or its id.
   * @param {{sun:string, moon:string}} [icons]  Inline SVG markup for
   *        each state. Omit if the page paints its own icon.
   * @param {function(string)} [onChange]  Called with the new theme
   *        ('light'|'dark') any time the theme changes — from this
   *        button, or synced in from another tab.
   * @returns {function():void} the icon-paint function, for manual reuse.
   */
  function initToggle(buttonOrId, icons, onChange) {
    var btn = typeof buttonOrId === 'string' ? document.getElementById(buttonOrId) : buttonOrId;
    if (!btn) return function () {};

    function paint() {
      if (icons && icons.sun && icons.moon) {
        btn.innerHTML = getTheme() === DARK ? icons.sun : icons.moon;
      }
    }

    btn.addEventListener('click', function () {
      toggleTheme();
    });

    document.addEventListener('themechange', function (e) {
      paint();
      if (typeof onChange === 'function') onChange(e.detail.theme);
    });

    paint();
    return paint;
  }

  window.ThemeManager = {
    STORAGE_KEY: STORAGE_KEY,
    getTheme: getTheme,
    setTheme: setTheme,
    toggleTheme: toggleTheme,
    initToggle: initToggle
  };
})(window, document);