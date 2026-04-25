---
description: "Use when working on apps/Project1. Covers Project1 domain ownership, local architecture, feature organization, and integration boundaries."
name: "Project1 Overlay"
applyTo: "apps/Project1/**"
---

# Project1 Overlay

- Project1 owns its domain workflows and should remain independently runnable.
- Keep Project1 business logic local.
- Promote only proven reusable UI into `shared/components`.
- Do not couple Project1 internals to Project2 or Portal implementation details.

## Read First

- `apps/Project1/APP_CONTEXT.md`

## Validation

- Lint Project1 changes.
- Build Project1 frontend when UI changes.
- Validate backend behavior when routes, models, or services change.
