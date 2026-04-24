---
description: 'Use when working on shared/components. Covers global component library structure, component API design, accessibility, and promotion rules for reusable UI.'
name: 'Shared Components Overlay'
applyTo: 'shared/components/**'
---

# Shared Components Overlay

- `shared/components` is the reusable global component library.
- Favor primitives, accessibility, clear APIs, and composability.
- Do not let app-specific workflows or language leak into shared component APIs.
- Coordinate shared tokens and styling conventions with `shared/config`.

## Read First

- `shared/components/APP_CONTEXT.md`
- `shared/components/TODO.md`

## Validation

- Lint shared component changes.
- Smoke-test consuming frontends when shared APIs or styling change.
