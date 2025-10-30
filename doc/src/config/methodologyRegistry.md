# methodologyRegistry.js

`methodologyRegistry` wires locale codes to concrete `ConfigMethodology` instances. It imports each methodology configuration, instantiates the adapter once per supported language, and exports both the lookup helper (`getMethodologyByLanguage`) and the `supportedLanguages` array used by the UI. This registry is the only place that knows which locales map to which diagnostic frameworks.
