---
description: 'Use when working on apps/Project2. Covers Project2 domain ownership, local architecture, feature organization, and integration boundaries.'
name: 'Project2 Overlay'
applyTo: 'apps/Project2/**'
---

# Project2 Overlay

- Project2 owns its domain workflows and should remain independently runnable.
- Keep Project2 business logic local.
- Promote only proven reusable UI into `shared/components`.
- Do not couple Project2 internals to Project1 or Portal implementation details.

## Read First

- `apps/Project2/APP_CONTEXT.md`
- `apps/Project2/TODO.md`

## Validation

- Lint Project2 changes.
- Build Project2 frontend when UI changes.
- Validate backend behavior when routes, models, or services change.
