# ConfigMethodology.js

`ConfigMethodology` is the concrete adapter used in production. It inherits base validation and augments the API with translation helpers (`translateCategoryName`, `translateLabelName`, `translateQuestionText`) that pick locale-specific strings with graceful fallbacks. The class decouples multilingual rendering from raw configuration data so the UI can stay language-agnostic.

It also exposes `getCategoryGuidance` and `translateCategoryGuidance`, which surface the new psychoeducational guidance arrays defined per category. Presentation components rely on those helpers to retrieve locale-specific trigger, fear, and irritant summaries after scoring is complete.
