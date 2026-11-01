# Pilot

Introduction and planning sheet for `apps/Pilot` (formerly `apps/Project1`, renamed 2026-09-14 — see the Decision Log in [`../../docs/target-architecture.md`](../../docs/target-architecture.md)).

## What Pilot Is

Pilot is an experimental workspace, not a product app. It exists to try things out — UI ideas, interaction patterns, small tools, throwaway prototypes — with no obligation that anything built here ships or lasts. It's also where new shared-component and shared-utility candidates get proven out with a real (if small) consumer before being promoted into `shared/components` or `shared/config`, instead of those packages growing speculative code nobody's actually used yet.

Nothing here is assumed permanent. An experiment either:

- gets promoted (a component/hook/utility moves to `shared/` once it's proven and, per the promotion rule in the root `CLAUDE.md`, reused by a second consumer),
- stays local to Pilot as a working example/reference, or
- gets deleted once it's answered its question.

All three outcomes are fine. The point is exploring, not accumulating.

## Ground Rules

- **Same repo conventions as every other app** — Pilot doesn't get a pass on `CLAUDE.md` (functional components, PropTypes, named exports for non-components, arrow-function-const, the standard `src/{app,pages,features,styles}` folder shape, etc. — already adopted here, see Current State). Experimental scope, not experimental code quality.
- **This file is an index, not the writeup.** Log every experiment as one row in the table below, kept short enough to skim. The actual reasoning goes in exactly one other place — see `target-architecture.md`'s **Documentation Conventions** section for the full rule (repo-wide/architecture-level decision → its Decision Log; app-specific operational detail → a dedicated `.md` here, e.g. `GOOGLE_OAUTH_SETUP.md`) — and the row links to whichever applies. That section is also where this pattern itself is defined, in case it needs to be replicated for another app.
- **Promotion is deliberate, not automatic.** Apps never import from each other, so nothing outside Pilot can reach into it directly — a second app has to actually want something Pilot built before it's worth moving to `shared/`. Don't promote pre-emptively.

## Current State

Frontend now follows the standardized `src/{app,pages,features,styles}` shape (first Pilot page to move past the single-file placeholder) and renders a working login screen. Backend has real auth routes behind it — this is the first app in the repo with actual authentication.

|          |                                                                                                                                                                                                                                         |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Frontend | React 19 + Vite, port 5173. `pages/LoginPage.jsx` + `features/auth/` (Google Identity Services button, `AuthProvider`/`useAuthContext`, `authApi.js`).                                                                                  |
| Backend  | Express, port 5100. Connects to MongoDB via Mongoose on boot. `POST /api/auth/google`, `GET /api/auth/me`, `POST /api/auth/logout` — full layered shape (config/models/services/validators/middleware/controllers/routes) now in place. |

Google sign-in needs a real OAuth Client ID to actually authenticate — see [`GOOGLE_OAUTH_SETUP.md`](./GOOGLE_OAUTH_SETUP.md). Until that's pasted into both `.env` files, the page renders correctly (verified in a real browser) but Google's script rejects the placeholder client ID.

## Experiment Log

| Date       | Experiment                             | What / Why                                                                                                                                                                                                                                                                                                                                                                                                              | Status                                                                                                                                                                                                            |
| ---------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-09-14 | Mongoose connection dry run            | Re-provisioned the Atlas cluster and proved out the `config/env.js` (zod) + `config/db.js` (Mongoose) connection pattern here first, low-stakes, before rolling it out to Portal/Project2. `/api/health` now reports live `db` status.                                                                                                                                                                                  | Kept as repo-wide connection pattern (see `target-architecture.md` Decision Log, 2026-09-14) — this isn't a throwaway, it's the actual first working DB plumbing.                                                 |
| 2026-09-14 | Google sign-in + server sessions       | Built a full "Sign in with Google" flow: Google Identity Services ID-token flow client-side, `google-auth-library` verification + `express-session`/`connect-mongo` server-side sessions backend-side, a `User` model with a `role` field for future permissions. Deliberately sign-in-only for now (no client secret, no Gmail scopes) — see `GOOGLE_OAUTH_SETUP.md`'s migration notes for what full OAuth adds later. | Kept as the repo's first real auth implementation — candidate to replicate on Portal once proven out further here (see `target-architecture.md` Decision Log and Cross-App Auth/Session section).                 |
| 2026-09-14 | Test coverage + Playwright boilerplate | Retrofitted Vitest + `supertest` onto the new auth routes (split `server.js` into `src/app.js`/`server.js` so tests don't need a real DB; Google/Mongo calls mocked at the service boundary). Also stood up Playwright repo-wide (root install/config, `e2e/<area>/*.spec.js`) with one example spec each for `shared/components` (Storybook) and Pilot's login page.                                                   | Both kept as the repo's first backend-route tests and first E2E setup — see `target-architecture.md` Decision Log. Intentionally boilerplate-sized (2 E2E specs, not broad coverage) — expand as real flows land. |

## Open Questions

- Real Google Cloud credentials not created yet — blocks actually testing a live sign-in (page renders, but the flow can't complete against a placeholder client ID).
- No authorization/permissions layer yet beyond the `role` field on `User` — `requireAuth` exists (session check), but there's no `requireRole`-style guard since nothing needs gating yet. Add one when a real protected route shows up.
- Whether/when to replicate this pattern on Portal, and whether that means Portal gets its own independent Google sign-in or the two apps should share one session (the "Cross-App Auth/Session" question in `target-architecture.md` — still open).
