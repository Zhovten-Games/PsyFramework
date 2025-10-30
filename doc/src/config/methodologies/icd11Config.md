# icd11Config.js

`icd11Config` captures the ICD-11 dataset used for English screening sessions. It provides localized strings, category groupings, question impact markers, and diagnostic label thresholds consistent with the ICD-11 clinical guidelines. Engines rely on this configuration to calculate weighted scores and populate label metadata.

The configuration also attaches a `guidance` block to every category. Guidance entries bundle trigger avoidance notes, common fears, and other irritants in both English and Russian, enabling the presentation layer to render contextual care advice that mirrors the curated document in `doc/Triggers, Fears, and Irritants…`.
