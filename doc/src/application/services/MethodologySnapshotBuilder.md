# MethodologySnapshotBuilder.js

`MethodologySnapshotBuilder` is an application-layer adapter that transforms a methodology instance into presentation-friendly snapshots. Given a locale it resolves translated category names, diagnostic label names, per-category guidance, and enriches question records with their localised category labels.

The builder returns plain data structures (`questions`, `categories`, `categoryNameById`, `guidanceByCategory`, `labelNameById`) so UI components can render without reaching into core objects. This keeps the presentation port free from domain-specific collections while still respecting the single source of truth defined by the methodology configuration.
