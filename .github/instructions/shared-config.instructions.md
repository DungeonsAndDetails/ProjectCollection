---
description: 'Use when working on shared/config or root lint, format, Vite, Tailwind, and tooling wrapper files. Covers repo-wide config ownership and upgrade discipline.'
name: 'Shared Config Overlay'
applyTo: 'shared/config/**, eslint.config.mjs, prettier.config.cjs, .vscode/settings.json'
---

# Shared Config Overlay

- `shared/config` is the canonical home for shared lint, format, and future design-token configuration.
- Avoid per-app config drift.
- Treat changes here as repo-wide behavior changes.
- Keep root wrapper files thin and delegating.

## Read First

- `shared/config/APP_CONTEXT.md`
- `shared/config/TODO.md`

## Validation

- Run `npm run lint` for lint rule changes.
- Run `npm run format:check` for formatting changes.
- Run affected frontend builds when Vite, Tailwind, or token changes are involved.
- Run `npm run tooling:check` when evaluating upgrade drift.
