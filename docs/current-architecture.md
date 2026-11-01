# Current Architecture (As-Built)

This document describes ProjectCollection exactly as it exists in the repo today. It is descriptive, not aspirational — if something below looks unfinished, that's intentional; it's here so we know what we're actually starting from.

For where we're intentionally headed, see [target-architecture.md](./target-architecture.md). That file is the living direction doc; this one gets refreshed periodically to stay honest about current state.

_Last verified: 2026-09-14 (Project1 renamed to Pilot and scoped as an experimental workspace; Pilot's backend re-provisioned the Atlas cluster and connected via Mongoose; Pilot then built the repo's first real authentication — "Sign in with Google" plus server-side sessions and a `User`/role model; Project2 remains a blank scaffold; a documentation audit the same day also caught and fixed a few places where this file had drifted from itself and from `CLAUDE.md`/`README.md` — see the Decision Log)._

## 1. Repo Shape

ProjectCollection is a single npm-workspaces monorepo — no Turborepo, Nx, or Lerna. The root `package.json` lists every app's `frontend`/`backend` folder plus `shared/config` and `shared/components` as workspaces, so `npm install` at the root links everything and hoists shared deps. There is a single root `package-lock.json`; no app keeps its own separate lockfile.

```text
apps/
  Portal/     (frontend + backend) — hosting shell
  Pilot/      (frontend + backend) — experimental workspace, see apps/Pilot/PLANNING.md
  Project2/   (frontend + backend) — blank scaffold, reserved for future scope
shared/
  components/ — shared React UI package (@projectcollection/component-lib)
  config/     — shared ESLint/Prettier/Tailwind-tokens package (@projectcollection/config)
docs/         — this doc + target-architecture.md
scripts/      — dev orchestration helpers
```

Dev orchestration is `concurrently` running each app's `dev` script in parallel (`npm run dev:all`), preceded by `scripts/clear-dev-ports.sh` to free previously-bound ports. There is no Docker, no reverse proxy, no process manager — everything runs as plain local Node processes on fixed ports.

| App      | Frontend port | Backend port |
| -------- | ------------- | ------------ |
| Portal   | 5172          | 4999         |
| Pilot    | 5173          | 5100         |
| Project2 | 5174          | 3001         |

## 2. Apps Overview

| App          | Purpose                                                                                              | Frontend                                 | Backend                               |
| ------------ | ---------------------------------------------------------------------------------------------------- | ---------------------------------------- | ------------------------------------- |
| **Portal**   | Hosting shell: nav, theming, app registry, (fake) auth UI                                            | React 19 + Vite + React Router           | Express, health + session stub, no DB |
| **Pilot**    | Experimental workspace for exploring ideas, components, and utilities — see `apps/Pilot/PLANNING.md` | React 19 + Vite, single placeholder page | Express, health-check stub, no DB     |
| **Project2** | Blank scaffold — reserved for future scope                                                           | React 19 + Vite, single placeholder page | Express, health-check stub, no DB     |

Project1 and Project2 were originally reset to a blank state deliberately (an earlier property-listing prototype and a real-time multiplayer game prototype were removed) so future work would start clean, and so the shared component library gets built from real, deliberate needs rather than inherited from whatever a prototype happened to need. Project1 has since been renamed to **Pilot** and given a committed direction — an experimental workspace for exploring ideas, components, and utilities (see `apps/Pilot/PLANNING.md` and the Decision Log in `target-architecture.md`); Project2 remains an unscoped blank scaffold. An earlier fourth app, **Emerge** (authenticated intake/payment prototype), was removed from the repo entirely — it and everything wired to it (workspace entries, dev scripts, ports, Portal routing, the Portal↔hosted-app theme-bridge lib) are gone. It remains recoverable from git history if ever needed.

Each app's frontend and backend are independently runnable — none of them import from another app's source. The only cross-app code paths are the two `shared/*` packages.

## 3. The Hosting Model, As It Actually Works

Portal is the shell, and there is currently a single hosting pattern, not two — this section previously described a now-removed dedicated-per-app-route pattern; that's gone, and the below is what actually exists:

- Portal has one route (`/`, `router.jsx`) rendering `ShellLayout` → `HomePage` → `AppPreview`. `ShellLayout` owns a `TabSwitcher` in the header that picks an `activeApp` and passes it down via router `Outlet` context.
- `AppPreview` renders the active app **live in an iframe** (`src={activeApp.frontendUrl}`) inside a shared `Panel`, with `Link` buttons ("Open standalone", "API health") out to the app's own dev URL. This is real, working runtime embedding — just simple (no shared state, no theming handoff, no message-passing into the frame).
- `apps/Portal/frontend/src/features/shell/data/microfrontends.js` is a **hardcoded array** of `{ key, name, description, frontendUrl, backendUrl }` — the app registry both of the above read from. There's no dynamic discovery; adding an app means editing this file.

So "hosting" today is: one iframe preview, switched via tabs, chrome'd with shared `Panel`/`Link` components. Not full micro-frontend composition (shared auth, shared router, cross-frame state) — that's still ahead of us.

There is currently no cross-app theme bridging. An earlier version of this had a query-param + `postMessage` theme handoff (`themeBridge.js` in Portal, consumed only by Emerge's frontend) — it was removed along with Emerge since it had no remaining consumer. If/when we want hosted apps to inherit Portal's theme, that mechanism will need to be rebuilt against whichever app(s) we decide should consume it.

## 4. Auth, As It Actually Works

- Portal's home page (`HomePage.jsx`) has sign-in/sign-up UI, but auth state is **local component state only** — `isAuthenticated` lives in `useState`, there's no token, no persisted session, no call to a real auth endpoint.
- Portal's backend (`apps/Portal/backend/server.js`) has exactly two routes: `/api/health` and `/api/session`, and `/api/session` returns a **hardcoded static payload** (`{ isAuthenticated: false, role: 'owner', primaryTheme: 'daylight' }`) regardless of any request state.
- Project2's backend has no auth at all right now (no routes beyond `/api/health`).
- **Pilot has the repo's first real authentication**, sign-in-only for now: "Sign in with Google" via Google Identity Services. The frontend (`features/auth/`) renders Google's own button, gets back a signed ID token, and posts it to the backend. The backend (`googleAuth.service.js`) verifies that token with `google-auth-library`, upserts a `User` document (`googleId`/`email`/`name`/`picture`/`role`, role defaulting to `member`), and starts a server-side session (`express-session` + `connect-mongo`, httpOnly cookie, session payload is just the user id — `requireAuth` re-fetches the user from Mongo on every request rather than trusting a cached role, so a role change or account removal takes effect immediately). Routes: `POST /api/auth/google`, `GET /api/auth/me`, `POST /api/auth/logout`. No authorization/permissions layer beyond the `role` field exists yet — nothing currently gates on it. See `apps/Pilot/GOOGLE_OAUTH_SETUP.md` for the Google Cloud Console side and `apps/Pilot/PLANNING.md` for status (a real Client ID hasn't been provisioned yet, so the flow can't fully complete yet, though the page itself is verified working).
- Portal and Project2 still have no cross-app session, and Pilot's session doesn't reach Portal either — each app's auth (real or stubbed) is fully independent right now. (Emerge previously had a real JWT + bcrypt backend auth stack; it was removed along with the rest of Emerge.)

## 5. Shared Packages

### `shared/components` (`@projectcollection/component-lib`)

- Flat package-root layout: one folder per primitive (e.g. `Button/`), each with `index.js` (component) + `style.scss` (styles). Public surface re-exported from `shared/components/index.js`.
- **Currently contains exactly one component: `Button`.** The "reusable component library" goal is real intent, not yet realized in breadth. This is the next thing to deliberately build out now that the rest of the repo is a clean slate.

### `shared/config` (`@projectcollection/config`)

- Canonical ESLint flat config (`eslint/index.mjs`) — root `eslint.config.mjs` just re-exports it. Same pattern for Prettier (`prettier/index.cjs`).
- `tailwind/tokens.css` — a small set of CSS custom properties (`--pc-color-brand-*`, `--pc-radius-*`) meant as shared design tokens. Not currently imported/consumed by any app — it exists but isn't wired in yet.

### Styling — still two unreconciled systems

- Every `apps/*/frontend` uses **Tailwind CSS 4** (via `@tailwindcss/vite`) for layout/spacing/typography.
- The one existing shared component (`Button`) uses **SCSS**, not Tailwind classes.
- This split predates the cleanup and wasn't part of it — still an open decision, tracked in `target-architecture.md`.

## 6. Backend Architecture — Mostly Still Uniform, Pilot Now the Exception

Portal and Project2 backends are still the reset-state minimal shape: an Express app with CORS, JSON body parsing, and a single `/api/health` route, no database connection, no models, no routes beyond health.

Pilot's backend is the first to move past that, and now has the full layered folder shape from `CLAUDE.md` (`config/routes/controllers/services/models/middleware/validators`):

- `config/env.js` — dotenv + zod-validated `PORT`/`MONGODB_URI`/`GOOGLE_CLIENT_ID`/`SESSION_SECRET`/`CORS_ORIGIN`, fails fast on missing/malformed config.
- `config/db.js` / `config/session.js` — `connectDB()` wrapping `mongoose.connect`; `express-session` configured with a `connect-mongo` store (sessions collection lives in the same `pilot` Atlas database).
- `models/User.js` — the first Mongoose model in the repo.
- `services/`, `validators/`, `middleware/` (`asyncHandler`, `errorHandler`, `requireAuth`), `controllers/`, `routes/` — all wired per `CLAUDE.md`'s conventions: every async handler wrapped in `asyncHandler`, one centralized `errorHandler` constructing the `{ error: { message, code } }` envelope, zod validators in `validators/`.
- `/api/health` reports live Mongo connection state (`db: "connected" | "connecting" | "disconnected" | "disconnecting"`) alongside the stub payload; real routes now exist under `/api/auth/*` (see §4).

There is currently no shared backend package (no shared API client, no shared request/response schema, no shared auth middleware) — each backend still bootstraps Express independently.

## 7. Tooling & Dev Workflow

- Node 22 pinned via `.nvmrc` (`22.16.0`) and `engines.node: "22.x"` (aligned across every app after the cleanup — Project2 previously specified `>=18`).
- Single root ESLint flat config and Prettier config, both delegating to `shared/config`, run via root `npm run lint` / `npm run format`.
- `npm run tooling:check` — checks a fixed allowlist of frontend tooling packages (`eslint`, `vite`, `tailwindcss`, etc.) for drift via `npm outdated`.
- No CI configuration exists (no `.github/workflows`) — linting/formatting/tests are all run locally, on demand, right now.
- Three test setups exist, all local-only: `shared/components` (Vitest + React Testing Library, jsdom — `npm run test:components`), `apps/Pilot/backend` (Vitest + `supertest`, no real DB/network — `npm run test:pilot-backend`), and a root-level Playwright end-to-end suite (`npm run test:e2e`) under `e2e/` covering a real-browser smoke test each for `shared/components` (via Storybook) and Pilot's login page. No other `apps/*` frontend or backend has tests yet.
- A single root `package-lock.json` is authoritative; stray per-app lockfiles (found under `apps/Project1`, before it was renamed to `apps/Pilot`) were removed as stale leftovers from before those apps joined the workspace.
- Build output (`dist/`) is correctly gitignored; local `dist/` folders present on disk are just build artifacts, not tracked. Playwright's own output (`test-results/`, `playwright-report/`) is gitignored the same way.

## 8. Documentation System (Current)

- `README.md` — quick start, ports, install/run instructions.
- `docs/current-architecture.md` — this file.
- `docs/target-architecture.md` — living direction doc, updated as decisions are made. Now also carries a "Documentation Conventions" section formalizing the per-app pattern below.
- `shared/components/README.md`, `shared/config/README.md` — package-level usage notes.
- `apps/Pilot/PLANNING.md` — the first per-app planning doc: intro, ground rules, current state, and an Experiment Log table (one row per unit of work, linking out to wherever the full reasoning lives). `apps/Pilot/GOOGLE_OAUTH_SETUP.md` is a dedicated doc for one experiment's external-setup detail (Google Cloud Console steps) — too procedural/app-specific for the repo-wide docs, too long-lived to leave in commit history alone. Any app can get its own `PLANNING.md` once it has real in-flight work; see target-architecture.md's Documentation Conventions section for the reusable pattern.

The previous multi-layer documentation cascade (root `ARCHITECTURE.md` index, `.github/copilot-instructions.md`, `.github/instructions/*`, `.github/agents/*`, `docs/agents/*`, per-area `APP_CONTEXT.md`/`COPILOT_MAP.md`) was retired before this cleanup and remains recoverable from git history.

## 9. Known Gaps (Honest List)

1. Portal's iframe hosting model is real but still simple — no shared state, no theming handoff, no message-passing into the frame. Full micro-frontend composition is still ahead of us.
2. No cross-app theme bridging exists right now (the one working example was tied to the now-removed Emerge app).
3. No cross-app auth/session — Pilot has real single-app authentication now (see §4), but it doesn't reach Portal, and Portal/Project2 still have no auth at all beyond Portal's static stub.
4. `shared/components` has one component; the shared library is a stated goal, not yet a built asset — this is the next deliberate build target.
5. Two unreconciled styling systems (Tailwind in apps, SCSS in the one shared component) and an unused design-token source in `shared/config`.
6. No CI anywhere in the repo. Test coverage itself is now real but narrow — `shared/components` (Vitest, every component), one backend (`Pilot`), and two Playwright smoke tests; most of the repo (Portal, Project2, and Pilot's own frontend beyond the two E2E specs) still has none.
7. Project2 is still intentionally blank — no committed direction yet for what it will become. Pilot now has one (see `apps/Pilot/PLANNING.md`).
