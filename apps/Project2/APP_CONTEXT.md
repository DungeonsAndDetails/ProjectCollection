# Project2 App Context

## Purpose

Project2 is the second domain application in the workspace. It remains intentionally light while its specific domain direction is still being defined.

## Current Scope

- Independent frontend scaffold.
- Independent backend scaffold.
- No committed domain model yet.

## Key User Flows

- Current state is exploratory and not yet feature-complete.

## Frontend Structure

- Current implementation lives under `apps/Project2/frontend`.
- Long-term preferred structure inside `src/`:
  - `app/`
  - `features/`
  - `components/`
  - `hooks/`
  - `lib/`

## Frontend Direction

- Project2 should remain a flexible exploratory frontend with readable code and easy expansion as its domain becomes clearer.
- Experimental UI patterns can start here, but only proven reusable patterns should graduate into `shared/components`.
- Database-driven and stronger theme-driven experiences are later concerns and should build on a simple, adaptable frontend base.

## Backend Structure

- Current implementation lives under `apps/Project2/backend`.
- Current backend exposes health only.
- Long-term preferred structure should follow the shared backend base.

## Shared Dependencies

- `shared/components`
- `shared/config`

## Constraints

- Keep Project2 independent from Portal domain logic.
- Avoid inventing shared components from Project2 until its domain stabilizes.

## Active Decisions

- Project2 remains a scaffold pending domain clarification.
- Project2 can be used as an exploratory surface for frontend ideas so long as those ideas do not bypass readability or clear ownership.

## Open Questions

- What domain responsibility will Project2 own?
- Which data entities belong here?
