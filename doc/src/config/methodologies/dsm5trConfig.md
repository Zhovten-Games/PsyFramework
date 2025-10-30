# dsm5trConfig.js

`dsm5trConfig` packages the DSM-5-TR content for Ukrainian users. It mirrors the same structure as other methodology configs: category definitions, multilingual question phrasing, and diagnostic label metadata. The configuration lets the application present DSM-aligned screenings without altering service or UI logic.

Every category now exposes a `guidance` map with English and Ukrainian narratives distilled from the DSM-specific "Triggers, Fears, and Irritants" documentation. This keeps psychoeducational context alongside structured questions so the presentation layer can surface practical aftercare notes once results are computed.
