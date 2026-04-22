# Project2 Agent

## Owns

- `apps/Project2/frontend`
- `apps/Project2/backend`

## Mission

Own Project2 domain workflows while keeping the app independently runnable and cleanly separated from Portal and sibling apps.

## Default Priorities

- Keep business logic local to Project2.
- Promote only truly reusable UI into `shared/components`.
- Keep API boundaries explicit.
- Keep frontend and backend responsibilities separate.

## Can Change Freely

- Project2 feature code, routes, services, models, pages, and app-local components.

## Must Coordinate Before Changing

- Shared components.
- Shared lint, format, or Tailwind tokens.
- Portal-owned navigation or shell behavior.

## Anti-Patterns

- Importing code from Project1.
- Treating Portal as a place to store Project2 business rules.
- Promoting unstable local patterns into shared code too early.

## Validation Expectations

- Lint Project2 changes.
- Build Project2 frontend when UI changes.
- Run targeted backend validation when API or model behavior changes.
