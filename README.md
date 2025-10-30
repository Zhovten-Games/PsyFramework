## Screening flow cheat sheet

The screening UI routes each locale to its diagnostic edition (RU/JA → ICD-10, EN → ICD-11, UK → DSM-5-TR), scores labels with the
weighted two-core-minimum formula, and surfaces guidance (triggers, fears, irritants) for any category that records a “yes”.
Read the extended walkthrough in [[Home]].

## What is ICD?

The International Classification of Diseases (ICD) is the global diagnostic standard maintained by the World Health Organization to classify health conditions and related signs, symptoms, and external causes. It enables consistent clinical documentation, epidemiological tracking, and research across countries. Read more in the official English Wikipedia article: https://en.wikipedia.org/wiki/International_Classification_of_Diseases.

<details open>
<summary>English Version</summary>

## Getting Started

1. **Architecture** – Hexagonal-inspired layering with clear `core`, `application`, `config`, `i18n`, and `presentation` boundaries inside `src/`.
2. **Methodologies**:
   - **Object-Oriented**: services and UI widgets extend base abstractions (`BaseScoreEngine`, `BaseComponent`).
   - **BEM Methodology**: follow BEM naming in `styles.css` and any new presentation markup.
   - Prefer modifier classes (e.g. `question-card--core`) instead of boolean attributes to toggle UI states.
3. The browser bootstrap lives in `presentation/main.js`; load `index.html` directly in a modern browser to run the app.
4. Internationalised strings belong to `i18n/translations.js`; use the translator service for all user-facing copy.
5. Add documentation for every new file or module under `/doc/`.
6. Follow the development **Ideals** (see below) before shipping enhancements or refactors.
7. Runtime assumptions:
   - The screening tool is a pure browser experience with no build tooling.
   - All logic is shipped as native ES modules referenced via `<script type="module">`.

## Methodologies

This screening app provides switchable diagnostic methodologies:

- **ICD-10** – Russian and Japanese locales share the ICD-10 configuration (`config/methodologies/icd10Config.js`).
- **ICD-11** – English locale loads the ICD-11-specific question and label set (`icd11Config.js`).
- **DSM-5-TR** – Ukrainian locale uses the DSM-5-TR configuration (`dsm5trConfig.js`).

Each configuration feeds the `ConfigMethodology` adapter, which exposes categories, questions, and diagnostic labels to the scoring engines.

## Ideals

Our refined development **Ideals** keep the experience maintainable and clinically transparent:

- **Single Source of Truth**: Methodology definitions live in `config/methodologies/`; never duplicate question text or diagnostic labels in services or presentation code.
- **Config-Driven Behaviour**: Scoring engines rely only on the methodology interface (categories, questions, labels). Any new algorithm must consume the same contract.
- **Locale Safety**: Always call `Translator.t(key)` for UI strings and provide fallbacks when adding new locales.
- **Declarative UI**: Presentation components rebuild from state (`ScreeningApp.render`) rather than mutating DOM nodes directly.
- **Extensible Engines**: Extend `BaseScoreEngine` for new diagnostic scoring strategies; do not inline calculations in components.
- **Separation of Concerns**: Keep domain logic in `core/` and `application/`; presentation code may only orchestrate rendering and delegate logic to services.
- **Transparent Diagnostics**: When adding thresholds or multipliers, document them in the wiki and surface the calculations in result cards.
- **No Side Effects in Config**: Configuration modules export plain data objects; avoid performing I/O or DOM work during import.

## Project Structure

- `index.html` – Mounting point that loads `src/presentation/main.js`.
- `styles.css` – BEM-styled theme shared across presentation components.
- `src/` – Modular source arranged by hexagonal layer.
- `doc/` – Product documentation (classification references, logs, briefs).
- `wiki/` – Technical notes for every source file in this sub-application.
</details>