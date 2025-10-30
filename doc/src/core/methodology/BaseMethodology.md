# BaseMethodology.js

`BaseMethodology` wraps immutable configuration objects and exposes convenience getters (`categories`, `questions`, `diagnosticLabels`). It validates that a configuration is provided and offers helpers such as `findQuestionById` so engines can resolve metadata without knowing the underlying data shape. Every methodology adapter extends this class to guarantee a consistent API.

The base class also supplies `findCategoryById`, which the new guidance features use to look up category metadata before translating contextual trigger and fear summaries. For list-style analytics the helper `getQuestionsByCategory(categoryId)` returns a filtered array of questions, keeping fan-out of configuration knowledge inside the methodology layer instead of duplicating `categoryId` matching logic in services.
