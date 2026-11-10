<pre>
╔═════════════════════════════════════════════════════════════════════════════╗
║                          INTERDEAD :: REPOSITORIES                          ║
╠═════════════════════════════════════════════════════════════════════════════╣
║                                                                             ║
║ ○ <a href="https://github.com/Zhovten-Games/InterDeadReferenceLibrary">InterDead Reference Library (public)</a>                                      ║
║   Public reference library: research, engineering standards and notes.      ║
║   Materials are prepared for reuse outside the private workspace.           ║
║                                                                             ║
║ ○ <a href="https://github.com/Zhovten-Games/InterDeadProto">InterDeadProto (NOIR)</a>                                                     ║
║   Narrative interface prototype: Nectosphere-Oriented Interface Relay.      ║
║   A browser application with its own verified distribution pipeline.        ║
║                                                                             ║
║ ○ <a href="https://github.com/Zhovten-Games/InterDeadIT">InterDeadIT (website / entry point)</a>                                       ║
║   The public website: localized articles, artifacts and project entry.      ║
║   Connects visitors with InterDead and the shared web-side services.        ║
║                                                                             ║
║ ○ <a href="https://github.com/Zhovten-Games/InterDeadCore">InterDeadCore (identity + EFBD)</a>                                           ║
║   Shared identity, EFBD scoring and interface contracts for the web.        ║
║   Published packages are consumed by the website and related tools.         ║
║                                                                             ║
║ > <a href="https://github.com/Zhovten-Games/PsyFramework">PsyFramework (research / tooling)</a>                                         ║
║   Configurable research and scoring tools supporting the project.           ║
║   Browser presentation and methodology data retain separate roles.          ║
║                                                                             ║
║ ○ <a href="https://github.com/Zhovten-Games/InterDead">InterDead (private game repository)</a>                                       ║
║   Portable C++20 narrative core, playable projections and Workshop.         ║
║   Private production sources retain their own publication boundary.         ║
║                                                                             ║
║ ○ <a href="https://github.com/Zhovten-Games/SPIDER">SPIDER (methodology / contracts)</a>                                          ║
║   Literary pseudocode for attributed intent and consistent projections.     ║
║   Public contracts connect the method with reviewed project examples.       ║
║                                                                             ║
╠═════════════════════════════════════════════════════════════════════════════╣
║                                PSYFRAMEWORK                                 ║
╠═════════════════════════════════════════════════════════════════════════════╣
║ PsyFramework is a configurable browser research prototype supporting        ║
║ InterDead. Methodology definitions, scoring services and presentation       ║
║ components remain separate. Its outputs serve the project’s research and    ║
║ entertainment context.                                                      ║
║                                                                             ║
╠═════════════════════════════════════════════════════════════════════════════╣
║                ECHO OF AN UNFADING MEMORY  /  INTERDEAD WIKI                ║
║                                                                             ║
║ <a href="https://interdead.zhovten.games/about/">ABOUT (EN)</a>                          <a href="https://interdead.fandom.com/wiki/InterDead_Wiki">WIKI (EN)</a>                               ║
║ <a href="https://interdead.zhovten.games/ru/about/">ABOUT (RU)</a>                          <a href="https://interdead.fandom.com/ru/wiki/Interdead_%D0%92%D0%B8%D0%BA%D0%B8">WIKI (RU)</a>                               ║
║ <a href="https://interdead.zhovten.games/uk/about/">ABOUT (UK)</a>                          <a href="https://interdead.fandom.com/uk/wiki/Main_Page">WIKI (UK)</a>                               ║
║ <a href="https://interdead.zhovten.games/ja/about/">ABOUT (JA)</a>                          <a href="https://interdead.fandom.com/ja/wiki/InterDead_Wiki">WIKI (JA)</a>                               ║
║                                                                             ║
╠═════════════════════════════════════════════════════════════════════════════╣
║                                   CONTACT                                   ║
║ <a href="https://www.linkedin.com/company/zhovten-games/">Zhovten Games — LinkedIn</a>                                                    ║
╚═════════════════════════════════════════════════════════════════════════════╝
</pre>

# PsyFramework

Configurable browser research and scoring prototype.

[Governance](governance/README.md)

## Screening flow cheat sheet

The screening UI routes each locale to its diagnostic edition (RU/JA → ICD-10, EN → ICD-11, UK → DSM-5-TR), scores labels with the
weighted two-core-minimum formula, and surfaces guidance (triggers, fears, irritants) for any category that records a “yes”.
Read the extended walkthrough in [Home](https://github.com/Zhovten-Games/PsyFramework/wiki).

## What is ICD?

The International Classification of Diseases (ICD) is the global diagnostic standard maintained by the World Health Organization to classify health conditions and related signs, symptoms, and external causes. It enables consistent clinical documentation, epidemiological tracking, and research across countries. Read more in the official English Wikipedia article: https://en.wikipedia.org/wiki/International_Classification_of_Diseases.

## Project Disclaimer

### English (EN)
> [!WARNING]
> This project is created to develop the core of a horror game and is intended for research and entertainment purposes only.  
> It is not a medical, psychotherapeutic, or diagnostic tool.

### Русский (RU)
> [!WARNING]
> Этот проект создан для разработки ядра хоррор-игры и носит исключительно исследовательско-развлекательный характер.  
> Он не является медицинским, психотерапевтическим или диагностическим инструментом.

### Українська (UK)
> [!WARNING]
> Цей проєкт створено для розробки ядра горор-гри і має виключно дослідницько-розважальний характер.  
> Він не є медичним, психотерапевтичним чи діагностичним інструментом.

### 日本語 (JA)
> [!WARNING]
> 本プロジェクトはホラーゲームのコア開発を目的としており、研究および娯楽のみを目的としています。  
> 医療、心理療法、または診断のためのツールではありません。

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

</details>

## Verification

Run `node tools/warden.mjs` with Node 24.19 or later. The check validates the adopted profile and exercises the production scoring services against the declared methodology cases. The browser application uses native ES modules and requires no product build step.
