# ProjectCollection

npm-workspaces monorepo, MERN stack (MongoDB, Express, React, Node). `apps/Portal` is the single hosting shell; child apps under `apps/` stay independently runnable. `shared/components` and `shared/config` are the only cross-app code paths — apps never import from each other.

Read `docs/current-architecture.md` (as-built snapshot) and `docs/target-architecture.md` (direction decisions + Decision Log) before making any architecture-level change. Don't restate their content here — when a direction decision is made, add it to `target-architecture.md`'s Decision Log; when it's actually implemented, refresh `current-architecture.md` to match. The two docs should never quietly drift apart from each other or from reality.

Everything below this point is settled convention, not aspiration — follow it for all new code. Where it says something isn't built yet, that's the honest current state, not permission to skip the convention once you do build it.

## Workspace layout

- `apps/Portal` — hosting shell. Frontend: React 19 + Vite + React Router. Backend: Express, session stub, no DB yet.
- `apps/Project1`, `apps/Project2` — blank scaffolds, reserved for future scope. Frontend: React 19 + Vite. Backend: Express `/api/health` stub only.
- `shared/components` (`@projectcollection/component-lib`) — shared React UI primitives. See its own `CLAUDE.md` / `README.md` before touching it.
- `shared/config` (`@projectcollection/config`) — shared ESLint/Prettier/Tailwind-token config. See its own `CLAUDE.md` / `README.md` before touching it.

## Commands

- Install once, from repo root: `npm install` (single root lockfile — never install inside an individual app/package).
- Everything at once: `npm run dev:all` (also clears known dev ports first). Opens Portal in a browser automatically; Storybook does not.
- Individual dev servers: `npm run dev:portal:frontend`, `dev:portal:backend`, `dev:project1:frontend`, `dev:project1:backend`, `dev:project2:frontend`, `dev:project2:backend`, `dev:components` (Storybook, port 6006).
- Lint: `npm run lint` / `npm run lint:fix` (root ESLint config delegates to `shared/config`).
- Format: `npm run format` / `npm run format:check`.
- Component library tests: `npm run test:components` / `test:components:watch`.
- Component library Storybook build: `npm run build:components`.

## Cross-cutting

- **Node**: pinned to 22.x (`.nvmrc`, `engines.node` in every package.json) — keep new packages aligned.
- **Language**: plain JavaScript everywhere, deliberately no TypeScript. Revisit only if the codebase/team outgrows what PropTypes + tests + code review catch.
- **Every function is an arrow function assigned to `const`** — components, hooks, plain utilities, backend controllers/services alike. No `function` declarations, no `function` expressions.
- Prefer `async`/`await` over `.then()`/`.catch()` chains.
- **Exports**: components keep the existing default-export convention (`export default Button;`). Every other file — utilities, hooks, backend controllers/services/models/validators — uses **named exports**, not default.
- **Import order** is enforced automatically by `eslint-plugin-import`'s `import/order` rule (external packages, then internal/relative, alphabetized within each group) — don't hand-order imports, let `npm run lint:fix` handle it.
- **Comments**: minimal. Only write one when the *why* is genuinely non-obvious (a hidden constraint, a workaround, a subtle invariant) — never restate what a well-named identifier already says. No docstring blocks.
- No CI exists yet (no `.github/workflows`). Linting, formatting, and tests are local-only.

## Frontend (React)

### Components

- **Always functional components — no class components.** The one case React itself still requires a class (error boundaries) should use `react-error-boundary` rather than a hand-written class component.
- Definition style is enforced by ESLint (`react/function-component-definition`): arrow function assigned to `const`.
- Destructure props inline in the signature with defaults where applicable (e.g. `className = ""`, `variant = "neutral"`) — see `Button` in `shared/components` as the reference shape. No prop-spreading/rest props on shared-library components; app-local components may accept rest props only when genuinely passing through to a native element.
- **PropTypes are required on every component's props** (plain JS, no TS, so this is the runtime/documentation safety net). Common reusable shapes (`childrenPropType`, `classNamePropType`, etc.) live in `shared/components/propTypes/` and are re-exported from the package root (`@projectcollection/component-lib`) — import and reuse them instead of redefining `PropTypes.node`/`PropTypes.string` inline in every component. Add a new shared shape there when a second component needs it, rather than duplicating.
- `shared/components` has two categories of component, both following the same flat-folder/four-file shape: content components (`Button`, `Input`, `Select`, `Checkbox`, `Card`, `Modal`, etc.) and layout components (`PageShell`, `AppHeader`, `TabSwitcher`, `Panel`) — the latter are app-shell-shaped rather than content-shaped, but follow identical rules (PropTypes, tests, stories, theme-aware styling).
- Prefer composing existing components over hand-rolled markup in app code (e.g. Portal's `AppPreview` uses `Panel` + `Link` rather than its own card/header/link CSS). If app code finds itself re-implementing something a shared component already does, use the shared component — or extend it — rather than duplicating.

### Theming

- `shared/components/theme` is the canonical theme system — a catalog of themes (each with light/dark token sets) plus `resolveThemeState(themeKey, colorMode)`, which resolves to `--pc-theme-*` CSS custom properties. `PageShell` applies them to the DOM; everything nested under it inherits via normal CSS cascade. Any app wanting themed chrome wraps its root in `PageShell` with a resolved theme — don't build a second theme-resolution mechanism.
- **Every component's `style.scss` must read colors through `var(--pc-theme-x, <fallback>)`, never a bare hex/rgba value.** The fallback keeps the component looking correct with no theme wrapper present (e.g. in isolation or in a consuming app that hasn't opted in yet); the CSS variable lets it pick up whatever theme an ancestor applies. This is what makes "theming reflects throughout" actually true instead of aspirational.
- Semantic status tokens (`--pc-theme-success-bg`/`-text`, `-warning-*`, `-danger-*`, `-info-*`) exist specifically for status-flavored components (`Badge`, `Alert`) — add a new semantic pair there rather than inventing a one-off token for a single component.
- Cross-app theme propagation (e.g. into embedded/iframed child apps) is intentionally unsolved right now — components just need to be theme-*ready* (CSS-variable-driven), not theme-*owning*.

### State management

- Local state: `useState` / `useReducer`.
- State shared across components: React Context + a custom `useXContext` hook wrapping `useContext`. No Redux/Zustand/other state library — revisit only if a specific app's actual state complexity demands it.

### Data fetching

- Native `fetch`. Wrap repeated fetch/error/JSON-parsing boilerplate in a small shared helper once it's genuinely repetitive, rather than reaching for axios/React Query preemptively.

### Custom hooks

- Name every custom hook `useXxx`.
- Co-locate a hook with the feature that uses it (`features/<domain>/hooks/useX.js`) — same promotion rule as components: it only moves to `shared/components` once it's genuinely reused across ≥ 2 apps (see `target-architecture.md`).

### App folder structure (standardized across Portal, Project1, Project2)

```text
src/
  app/                 # router, top-level layout/shell wiring
  pages/               # route-level components
  features/
    <domain>/
      components/
      data/
      hooks/
  styles/
```

Portal already follows this shape. Project1 and Project2 adopt it as they move past their current blank-scaffold state — don't invent a different layout per app.

## Backend (Express)

- ES modules (`import`/`export`, `"type": "module"` in `package.json`) — same module system as the rest of the repo. All three backends were converted from CommonJS to ESM as part of settling this convention; no `require()`/`module.exports` in new backend code.

### Folder shape (layered by role)

```text
backend/
  src/
    config/          # env loading/validation, DB connection setup
    routes/
    controllers/
    services/
    models/
    middleware/
    validators/      # zod schemas
```

Every backend adopts this once it has real routes beyond the current `/api/health` stub — this resolves the "Backend Standards" question that was open in `target-architecture.md`.

### Validation

- `zod` for request validation (body/query/params). Schemas live in `validators/`, one file per resource, imported into the route or controller that uses them. Reuse a base schema across create/update variants (`.partial()`, `.pick()`, etc.) rather than duplicating field definitions.
- Once a backend has real env vars beyond `PORT`, validate `process.env` at startup with a zod schema in `config/` — fail fast on missing/malformed config instead of failing later on first use.

### Async errors

- Every async route handler is wrapped in a shared `asyncHandler` utility (`middleware/asyncHandler.js`) that forwards thrown/rejected errors to `next()`. No manual `try/catch` in route handlers or controllers for the sole purpose of forwarding to `next(err)`.
- One centralized error-handling middleware (`middleware/errorHandler.js`) formats every error response (see API response shape below). Controllers and services throw — they never construct an error response themselves.

### API response shape

Consistent envelope, every route, every app:

- Success: `{ "data": <resource or array> }`
- Error: `{ "error": { "message": "...", "code": "SOME_CODE" } }` — `code` is a short machine-readable string (e.g. `NOT_FOUND`, `VALIDATION_ERROR`), not an HTTP status number; the HTTP status itself carries that. Only the centralized error middleware constructs this shape — nowhere else should.

### Database

- MongoDB via Mongoose is the settled standard (see `target-architecture.md` Decision Log). Models live in `models/`, one file per collection, schema + model defined together in the same file.
- **The hosted Mongo instance is currently disabled** (paused to save cost) and needs re-provisioning before any backend can actually connect. Don't assume a live DB connection exists, and check `target-architecture.md`'s Decision Log for current status before adding DB-dependent code to a backend.

### Testing

- Vitest + `supertest`, matching the frontend's Vitest standard — one test runner across the whole repo. Required for new backend routes going forward. Not yet retrofitted onto the current `/api/health` stubs, since there's nothing behind them yet worth testing.

## Testing (frontend)

- Vitest + React Testing Library for `shared/components` (jsdom, jest-dom matchers, auto cleanup via `test/setup.js`). Test behavior a consumer would observe — rendered output, attributes, interactions — not internals.
- No test files exist yet for any `apps/*` frontend.
