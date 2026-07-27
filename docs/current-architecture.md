# Current Architecture (As-Built)

This document describes ProjectCollection exactly as it exists in the repo today. It is descriptive, not aspirational — if something below looks unfinished, that's intentional; it's here so we know what we're actually starting from.

For where we're intentionally headed, see [target-architecture.md](./target-architecture.md). That file is the living direction doc; this one gets refreshed periodically to stay honest about current state.

_Last verified: 2026-07-19 (post cleanup: Emerge removed, Project1/Project2 reset to blank scaffolds)._

## 1. Repo Shape

ProjectCollection is a single npm-workspaces monorepo — no Turborepo, Nx, or Lerna. The root `package.json` lists every app's `frontend`/`backend` folder plus `shared/config` and `shared/components` as workspaces, so `npm install` at the root links everything and hoists shared deps. There is a single root `package-lock.json`; no app keeps its own separate lockfile.

```text
apps/
  Portal/     (frontend + backend) — hosting shell
  Project1/   (frontend + backend) — blank scaffold, reserved for future scope
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
| Project1 | 5173          | 5100         |
| Project2 | 5174          | 3001         |

## 2. Apps Overview

| App          | Purpose                                                   | Frontend                                 | Backend                               |
| ------------ | --------------------------------------------------------- | ---------------------------------------- | ------------------------------------- |
| **Portal**   | Hosting shell: nav, theming, app registry, (fake) auth UI | React 19 + Vite + React Router           | Express, health + session stub, no DB |
| **Project1** | Blank scaffold — reserved for future scope                | React 19 + Vite, single placeholder page | Express, health-check stub, no DB     |
| **Project2** | Blank scaffold — reserved for future scope                | React 19 + Vite, single placeholder page | Express, health-check stub, no DB     |

Project1 and Project2 were reset to this blank state deliberately (an earlier property-listing prototype and a real-time multiplayer game prototype were removed) so future work starts clean, and so the shared component library gets built from real, deliberate needs rather than inherited from whatever a prototype happened to need. An earlier fourth app, **Emerge** (authenticated intake/payment prototype), was removed from the repo entirely — it and everything wired to it (workspace entries, dev scripts, ports, Portal routing, the Portal↔hosted-app theme-bridge lib) are gone. It remains recoverable from git history if ever needed.

Each app's frontend and backend are independently runnable — none of them import from another app's source. The only cross-app code paths are the two `shared/*` packages.

## 3. The Hosting Model, As It Actually Works

Portal is the shell. What "hosting" currently means, concretely, and it's genuinely a mix of two different patterns depending on where in Portal you are:

- **Portal's home page (`HomePage.jsx` → `LearningPanel.jsx`)** has a "demo switcher" in the header that picks an `activeApp`, and the home page renders that app **live in an iframe** (`src={activeApp.frontendUrl}`). This is real, working runtime embedding — just simple (no shared state, no theming handoff, no message-passing into the frame).
- **Portal's dedicated per-app routes** (`/apps/project1`, `/apps/project2`, rendered by `Project1Page.jsx` / `Project2Page.jsx`) are different: they render a summary "launch card" with an `<a target="_blank">` link out to the child app's own dev URL. No iframe here — this is link-out, not embedding.
- `apps/Portal/frontend/src/features/shell/data/microfrontends.js` is a **hardcoded array** of `{ key, name, portalPath, frontendUrl, backendUrl, description }` — the app registry both of the above read from. There's no dynamic discovery; adding an app means editing this file plus the router.

So "hosting" today is: a live (untheme'd) iframe preview on the home page, plus static launch cards on dedicated routes. Neither is full micro-frontend composition (shared auth, shared router, cross-frame state) — that's still ahead of us.

There is currently no cross-app theme bridging. An earlier version of this had a query-param + `postMessage` theme handoff (`themeBridge.js` in Portal, consumed only by Emerge's frontend) — it was removed along with Emerge since it had no remaining consumer. If/when we want hosted apps to inherit Portal's theme, that mechanism will need to be rebuilt against whichever app(s) we decide should consume it.

## 4. Auth, As It Actually Works

- Portal's home page (`HomePage.jsx`) has sign-in/sign-up UI, but auth state is **local component state only** — `isAuthenticated` lives in `useState`, there's no token, no persisted session, no call to a real auth endpoint.
- Portal's backend (`apps/Portal/backend/server.js`) has exactly two routes: `/api/health` and `/api/session`, and `/api/session` returns a **hardcoded static payload** (`{ isAuthenticated: false, role: 'owner', primaryTheme: 'daylight' }`) regardless of any request state.
- Project1 and Project2 backends have no auth at all right now (they have no routes beyond `/api/health`).
- There is no real authentication anywhere in the repo currently, and no cross-app session. (Emerge previously had a real JWT + bcrypt backend auth stack; it was removed along with the rest of Emerge.)

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

## 6. Backend Architecture — Now Deliberately Uniform

All three backends are currently the same minimal shape on purpose: an Express app with CORS, JSON body parsing, and a single `/api/health` route, no database connection, no models, no routes beyond health. This is a reset state, not a final architecture — see `target-architecture.md` for what backend structure new/real work should follow once that's decided.

There is currently no shared backend package (no shared API client, no shared request/response schema, no shared auth middleware) — each backend still bootstraps Express independently, even though right now they're identical in shape.

## 7. Tooling & Dev Workflow

- Node 22 pinned via `.nvmrc` (`22.16.0`) and `engines.node: "22.x"` (aligned across every app after the cleanup — Project2 previously specified `>=18`).
- Single root ESLint flat config and Prettier config, both delegating to `shared/config`, run via root `npm run lint` / `npm run format`.
- `npm run tooling:check` — checks a fixed allowlist of frontend tooling packages (`eslint`, `vite`, `tailwindcss`, etc.) for drift via `npm outdated`.
- No CI configuration exists (no `.github/workflows`) — linting/formatting/tests are local-only right now.
- No test files exist anywhere in the repo (no `*.test.*` / `*.spec.*`).
- A single root `package-lock.json` is authoritative; stray per-app lockfiles (found under `apps/Project1`) were removed as stale leftovers from before those apps joined the workspace.
- Build output (`dist/`) is correctly gitignored; local `dist/` folders present on disk are just build artifacts, not tracked.

## 8. Documentation System (Current)

- `README.md` — quick start, ports, install/run instructions.
- `docs/current-architecture.md` — this file.
- `docs/target-architecture.md` — living direction doc, updated as decisions are made.
- `shared/components/README.md`, `shared/config/README.md` — package-level usage notes.

The previous multi-layer documentation cascade (root `ARCHITECTURE.md` index, `.github/copilot-instructions.md`, `.github/instructions/*`, `.github/agents/*`, `docs/agents/*`, per-area `APP_CONTEXT.md`/`COPILOT_MAP.md`) was retired before this cleanup and remains recoverable from git history.

## 9. Known Gaps (Honest List)

1. Portal's iframe preview (home page) and its launch cards (per-app routes) are two different, uncoordinated hosting patterns — worth deciding on one model.
2. No cross-app theme bridging exists right now (the one working example was tied to the now-removed Emerge app).
3. No real cross-app auth/session; no app currently has any auth at all.
4. `shared/components` has one component; the shared library is a stated goal, not yet a built asset — this is the next deliberate build target.
5. Two unreconciled styling systems (Tailwind in apps, SCSS in the one shared component) and an unused design-token source in `shared/config`.
6. No tests, no CI, anywhere in the repo.
7. Project1 and Project2 are intentionally blank right now — there's no committed direction yet for what either app will actually become.
