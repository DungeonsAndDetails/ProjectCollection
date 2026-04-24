---
description: 'Use when working on any app frontend in apps/*/frontend. Covers shared React, Vite, Tailwind, structure, state, validation, and organization rules.'
name: 'Frontend Base'
applyTo: 'apps/*/frontend/**'
---

# Frontend Base

- Treat this as the shared baseline for all app frontends.
- Use React 19, Vite, Tailwind, and the shared root tooling configuration.
- Prefer feature-oriented organization over file-type sprawl.
- Keep data fetching out of arbitrary UI files; use feature-level API helpers or hooks.
- Keep shell concerns out of product apps unless explicitly defined by that app.
- Move reusable UI patterns toward `shared/components` only after they are stable and truly multi-app.

## Structure

- Preferred folders inside `src/`:
  - `app/`
  - `features/`
  - `components/`
  - `hooks/`
  - `lib/`
  - `pages/`
  - `styles/`

## Validation

- Lint the touched app.
- Build the touched frontend when behavior or styling changes.
