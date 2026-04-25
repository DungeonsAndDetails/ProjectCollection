# Portal App Context

## Purpose

Portal is the primary shell app for the workspace. It owns auth entry flow, theming, top-level navigation, and the hosted micro-frontend experience for child apps.

## Current Scope

- Shell landing experience.
- Theme switching.
- App hosting and navigation for Project1 and Project2.
- Placeholder session flow.

## Key User Flows

- User arrives at Portal and signs in.
- User chooses a theme and navigates between hosted apps.
- User launches or previews Project1 and Project2 from the shell.

## Frontend Structure

- Current implementation lives under `apps/Portal/frontend`.
- Long-term preferred structure inside `src/`:
  - `app/`
  - `features/shell/`
  - `features/auth/`
  - `features/navigation/`
  - `components/`
  - `lib/`

## Frontend Direction

- Portal frontend work should stay readable and easy to extend before adding heavier configuration layers.
- Shell UI patterns should mature locally first, then move into `shared/components` only when reuse is proven across apps.
- Theme-driven and database-driven shell behavior should be added later on top of a stable, readable shell architecture.

## Backend Structure

- Current implementation lives under `apps/Portal/backend`.
- Long-term preferred structure:
  - `src/config/`
  - `src/routes/`
  - `src/controllers/`
  - `src/services/`
  - `src/middleware/`

## Shared Dependencies

- `shared/components`
- `shared/config`

## Constraints

- Portal must not absorb Project1 or Project2 domain rules.
- Portal should remain the shell, not the product domain app.

## Active Decisions

- Hosted-app behavior currently favors shell-first composition.
- Shared tooling and styling standards are centralized.
- Portal should demonstrate clean shell patterns that can support future product, test, and exploratory frontends without structural churn.

## Open Questions

- Will hosted apps remain iframe-style, or move to true runtime micro-frontends?
- What session/auth provider will own real login state?
