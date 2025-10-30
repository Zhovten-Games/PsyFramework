# translations.js

`translations` exports the multilingual string table for the UI and a `Translator` helper. The module stores per-locale dictionaries for headings, buttons, badges, and result copy, then falls back to English when keys are missing. Components instantiate `Translator` to switch locales dynamically without reloading the page.
