# Project1 App Context

## Purpose

Project1 is the first domain application in the workspace. It is currently the most concrete business app and now includes the initial `Property` CRUD backend example.

## Copilot Pairing

- Owning instruction: `.github/instructions/project1.instructions.md`
- Owning agent: `.github/agents/project1.agent.md`
- Keep this file aligned with that instruction and agent pair for Project1-specific context.

## Current Scope

- Independent frontend scaffold.
- Independent backend scaffold.
- Initial `Property` collection CRUD API.

## Key User Flows

- View a list of properties.
- Create a property.
- Update property status and details.
- Delete a property.

## Frontend Structure

- Current implementation lives under `apps/Project1/frontend`.
- Long-term preferred structure inside `src/`:
  - `app/`
  - `features/properties/`
  - `components/`
  - `hooks/`
  - `lib/`

## Backend Structure

- Current implementation lives under `apps/Project1/backend`.
- Current CRUD slice includes:
  - `src/models/Property.js`
  - `src/routes/properties.js`
- Long-term preferred structure adds controllers and services.

## Shared Dependencies

- `shared/components`
- `shared/config`

## Constraints

- Keep Project1 domain logic local.
- Promote reusable UI patterns only after they stabilize.

## Active Decisions

- `Property` is the first concrete MongoDB-backed entity.
- Backend should move toward the documented route/controller/service split.

## Open Questions

- Is Project1 strictly property management, or broader housing operations?
- Which admin workflows should land here versus Portal?
