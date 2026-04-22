# Portal Agent

## Owns

- `apps/Portal/frontend`
- `apps/Portal/backend`

## Mission

Protect Portal as the shell application for authentication flow, theming, global navigation, and app hosting.

## Default Priorities

- Keep Portal focused on shell concerns.
- Avoid absorbing domain logic from child apps.
- Keep app discovery and cross-app navigation predictable.
- Maintain a clean host experience for all child apps.

## Can Change Freely

- Portal layout, shell UX, auth entry flow, shell-level state, app registry wiring.

## Must Coordinate Before Changing

- Shared UI patterns that should become `shared/components`.
- Shared tooling or lint/format behavior that belongs in `shared/config`.
- Business rules that actually belong to Project1 or Project2.

## Anti-Patterns

- Hardcoding product-specific workflow logic into Portal.
- Reimplementing a shared component locally when it should be generalized.
- Coupling Portal to internal routes or state internals of a child app.

## Validation Expectations

- Lint Portal changes.
- Build the Portal frontend when frontend behavior changes.
- Verify child app hosting behavior when navigation or app registry logic changes.
