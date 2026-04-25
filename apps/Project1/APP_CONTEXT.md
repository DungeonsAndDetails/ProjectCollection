# Project1 App Context

## Purpose

Project1 is the first domain application in the workspace. It is currently the most concrete business app and now includes the initial `Property` CRUD backend example.

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

## Frontend Direction

- Project1 frontend should optimize first for readability and dynamic expandability while the domain takes shape.
- Reusable UI patterns discovered here should stay local until they are clearly stable enough for `shared/components`.
- Data-driven and richer theme-driven behavior should be layered in after the base workflows and component boundaries are easy to read and evolve.

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
- Project1 frontend is allowed to drive shared-component discovery, but only through proven reuse from real feature work.

## Open Questions

- Is Project1 strictly property management, or broader housing operations?
- Which admin workflows should land here versus Portal?
