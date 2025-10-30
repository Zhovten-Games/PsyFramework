# MethodologyProvider

The `MethodologyProvider` is an application-layer service that adapts configuration data into usable methodology instances for the domain layer. It consumes a configuration resolver function supplied by outer adapters so the application layer remains decoupled from infrastructure concerns.

## Responsibilities

- Resolve methodology configuration objects through an injected resolver function.
- Instantiate `ConfigMethodology` objects on demand.
- Cache constructed methodologies so presentation components can request them repeatedly without reconstructing them.

## Key Methods

- `getByLanguage(language: string): ConfigMethodology | null` – Returns a cached methodology instance for the requested language, or `null` if no configuration exists.
- `clearCache(): void` – Clears the internal cache. Useful for test isolation.

## Dependencies

- `ConfigMethodology` from the core layer to encapsulate methodology behaviour.
- A resolver function supplied by adapters (e.g. `getMethodologyConfigByLanguage`) to keep configuration data as the single source of truth without creating a direct dependency on the configuration module.
