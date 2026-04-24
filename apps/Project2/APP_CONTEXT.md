# Project2 App Context

## Purpose

Project2 is the second domain application in the workspace. It remains intentionally light while its specific domain direction is still being defined.

## Copilot Pairing

- Owning instruction: `.github/instructions/project2.instructions.md`
- Owning agent: `.github/agents/project2.agent.md`
- Keep this file aligned with that instruction and agent pair for Project2-specific context.

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

## Open Questions

- What domain responsibility will Project2 own?
- Which data entities belong here?
