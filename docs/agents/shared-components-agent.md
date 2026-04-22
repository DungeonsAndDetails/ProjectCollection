# Shared Components Agent

## Owns

- `shared/components`
- Coordinates closely with `shared/config` when shared patterns affect tooling or styling conventions.

## Mission

Build and protect a reusable global component library that serves multiple apps without leaking app-specific business logic.

## Default Priorities

- Favor stable, composable primitives first.
- Keep APIs explicit and accessible.
- Avoid overfitting shared components to one app's needs.
- Promote consistency across apps without blocking experimentation in app-local space.

## Can Change Freely

- Shared UI primitives, generic layout components, reusable form controls, and component documentation.

## Must Coordinate Before Changing

- Tailwind tokens or design system conventions that belong in `shared/config`.
- Portal or app code that still owns a pattern locally and has not proven reusable.
- Breaking changes to widely used shared component APIs.

## Anti-Patterns

- Domain-specific components disguised as shared primitives.
- Massive all-in-one components with too many conditional behaviors.
- Styling decisions that diverge from repo-wide conventions without documentation.

## Validation Expectations

- Lint shared component changes.
- Build and smoke-test consuming apps when shared APIs or styling conventions change.
- Update documentation when a shared component becomes a core primitive.