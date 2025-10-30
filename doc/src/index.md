# person module

The `person` sub-application hosts a browser-based mental health screening tool that loads modular diagnostic methodologies and renders a multilingual questionnaire. Documentation for every source file lives in the subdirectories below.

- [`application/services`](application/services/) – Scoring algorithms and insight builders.
- [`core/methodology`](core/methodology/) – Methodology abstractions exposing question metadata.
- [`config`](config/) – Static data describing each supported methodology.
- [`i18n`](i18n/) – Translation tables and runtime translator utility.
- [`presentation`](presentation/) – UI components and bootstrap script.
