# LanguageCatalog

## Purpose

`LanguageCatalog` exposes the set of supported application languages to presentation adapters without leaking configuration details. It centralises language availability checks so UI code can treat the application layer as the single entry point for methodology discovery. Supported languages are supplied explicitly during construction so the service stays agnostic of the configuration module.

## Responsibilities

- Copy the provided language codes into an internal array to decouple callers from shared mutable state.
- Provide a `list()` method that returns a defensive copy for rendering dropdowns or other selectors.
- Provide an `isSupported(code)` guard that gracefully rejects falsy inputs before checking membership.

## Interactions

- Receives language codes from an adapter (e.g. `supportedLanguages` in `config/methodologyRegistry.js`) during construction.
- Consumed by `ScreeningApp` to populate selectors and validate user input prior to loading a methodology.
