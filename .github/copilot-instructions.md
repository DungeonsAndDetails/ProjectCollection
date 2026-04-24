# ProjectCollection Copilot Instructions

Use this file as the project-wide baseline for all tasks in this repository.

## Architecture

- This repo is a multi-app MERN workspace with a Portal shell in `apps/Portal`, product apps in `apps/Project1` and `apps/Project2`, shared UI in `shared/components`, and shared tooling in `shared/config`.
- Portal owns shell concerns such as auth entry flow, theming, navigation, and app hosting.
- Product apps own domain workflows and should remain independently runnable.
- Shared packages must stay domain-neutral.

## Source Of Truth

- Read `docs/architecture-guidelines.md` for the detailed architecture baseline.
- Use `.github/instructions/*.instructions.md` for area-specific and file-type-specific guidance.
- Treat each area's `APP_CONTEXT.md` as the local anchor that sits alongside the code and points to its owning instruction and agent.
- Use each area's `APP_CONTEXT.md` and `TODO.md` for current state, goals, and near-term work.

## Build And Validation

- Install dependencies from repo root with `npm install`.
- Root validation commands:
  - `npm run lint`
  - `npm run format:check`
  - `npm run tooling:check`
- Run focused app builds or backend validation after changes to the touched area.

## Conventions

- Prefer small, local edits in the owning area before widening scope.
- Escalate reusable patterns into `shared/components` or `shared/config` instead of copying them between apps.
- Keep auth, shell, and cross-app concerns in Portal rather than leaking them into product apps.
- Keep product-specific business logic out of shared packages.
