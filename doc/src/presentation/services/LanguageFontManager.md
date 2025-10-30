# LanguageFontManager

`LanguageFontManager` keeps the typography swap logic outside of `ScreeningApp`. It reads the declarative mapping from `languageFontConfig`, removes the previously applied modifier class from `<body>`, and applies the locale-specific one (currently only Japanese) without touching background colours or other layout tokens. The manager caches the active class to avoid redundant DOM operations when the user reselects the same language.
