---
description: 'Use when working on apps/Portal. Covers portal shell structure, architecture, app hosting, auth entry flow, navigation, and theme ownership.'
name: 'Portal Overlay'
applyTo: 'apps/Portal/**'
---

# Portal Overlay

- Portal is the shell, not the domain implementation.
- Portal owns auth entry flow, shell layout, theme switching, app registry, navigation, and hosted app experience.
- Do not move Project1 or Project2 business rules into Portal.
- Reusable shell UI can graduate into `shared/components` when it becomes generic enough.

## Read First

- `apps/Portal/APP_CONTEXT.md`
- `apps/Portal/TODO.md`

## Validation

- Lint Portal changes.
- Build Portal frontend when UI or navigation changes.
- Verify hosted-app behavior when shell routing or embedded app handling changes.
