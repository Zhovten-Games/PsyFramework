# icd10Config.js

`icd10Config` defines the ICD-10 screening catalogue shared by Russian and Japanese locales. It enumerates diagnostic categories, multilingual question text, and label thresholds tailored to ICD-10 criteria. The configuration is purely declarative so methodology adapters and scoring engines can consume it without side effects.

Each category entry now includes a `guidance` object sourced from the "Triggers, Fears, and Irritants" reference in `doc/`. The object provides locale-aware arrays for `triggers`, `fears`, and `irritants`, giving downstream presentation code structured psychoeducation to surface alongside screening results.
