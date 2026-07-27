# Target Architecture (Where We're Headed)

This is the living direction doc for ProjectCollection. Unlike [current-architecture.md](./current-architecture.md), which is a snapshot of what exists, this file is a running record of decisions about what we _want_ — updated incrementally as direction gets set, not written once and frozen.

How this doc works going forward:

- Each section below either states a settled decision (with the reasoning behind it) or is marked **Undecided** as a placeholder for a topic we haven't discussed yet.
- New decisions get added to the **Decision Log** at the bottom with a date, so we can trace when and why direction changed.
- When a decision here gets implemented, `current-architecture.md` should be updated to reflect it — the two files should never quietly drift apart.

## Foundational Goals

These were established at the start of this doc and anchor everything else:

1. **One hosting app for everything.** `apps/Portal` is the single site users land on; it hosts/surfaces all other apps rather than each app being its own separately-navigated destination. This is the reason a shell app exists at all instead of N unrelated apps.
2. **Partition apps, but share a growing component library.** Each app under `apps/` stays independently ownable and buildable (own domain logic, own backend, own release surface), while `shared/components` is deliberately built up over time into a reusable UI foundation that every app — current and future — draws from. The partitioning and the sharing are both intentional; neither should erode the other (apps shouldn't reach into each other's internals, and reusable UI shouldn't stay siloed in one app because promoting it felt like too much effort).

Everything else in this document is in service of those two goals.

## Hosting Model

**Undecided.** Current state is a placeholder, not a decision — and it's inconsistent with itself: Portal's home page does a live (untheme'd) iframe preview, while its dedicated per-app routes just link out (see current-architecture.md §3). Open question: should hosted apps be embedded at runtime everywhere (iframe, module federation, something else), or is link-out actually fine long-term? Whichever we pick, it should be the one pattern used everywhere in Portal, not both. This materially affects the theme-bridge and auth work below, so it's worth deciding early.

## Shared Component Library

**Partially decided.** Confirmed direction: flat package-root layout (`shared/components/<Primitive>/`), one folder per primitive, `index.jsx` + stylesheet + `<Name>.test.jsx` + `<Name>.stories.jsx` per folder, public surface re-exported from the package root. Promote patterns into the shared package only once proven reusable across at least two apps — don't move code there just to declutter one app. (Testing via Vitest + React Testing Library and component-by-component Storybook stories are also settled now — see `shared/components/README.md`.)

**Undecided:** styling system for shared components (see below — SCSS vs. Tailwind needs resolving before the library grows much further, since every new primitive currently has to pick one).

## Styling System

**Undecided.** Currently split three ways (Tailwind in apps, SCSS in the one shared `Button`, unused CSS-variable tokens in `shared/config`). This needs a single answer before the component library scales past one primitive, or every new component re-opens the question.

## Backend Standards

**Decided.** ES modules (all three backends converted from CommonJS on 2026-07-27), layered folder shape (`config/controllers/services/models/middleware/validators/routes`), `zod` for request validation, an `asyncHandler` wrapper + centralized error middleware for async errors, and a consistent `{ data }` / `{ error: { message, code } }` response envelope on every route. MongoDB/Mongoose is the database engine — the hosted instance is currently disabled (paused to save cost) and needs re-provisioning before any backend can actually connect; treat this as a decision made ahead of implementation, not something in place today. Vitest + `supertest` is required for new routes going forward. Full detail lives in the root `CLAUDE.md`, not here — this section just records that the decision was made and why.

All three backends are still bare `/api/health` stubs as of this decision — nothing above has been retrofitted onto them yet; it applies going forward as real routes get built.

## Cross-App Auth / Session

**Undecided.** Open question carried forward from Portal's earlier notes: does Portal own a real session/identity that child apps consume, or does each app keep independent auth? This is a prerequisite for any real "single site" experience beyond shared chrome.

## Testing & CI

**Undecided.** No tests, no CI currently exist anywhere in the repo. Not yet discussed what the bar should be.

## What Doesn't Belong Here

To keep this doc from sprawling back into the old prescriptive style-guide format: line-level conventions (naming, file layout minutiae, lint rules) belong in code/config, not prose here. This doc is for architecture-level decisions — the kind that are expensive to reverse or that affect more than one app — not a restatement of what ESLint already enforces.

## Decision Log

- **2026-07-19** — Retired the old documentation cascade (`ARCHITECTURE.md`, `.github/copilot-instructions.md`, `.github/instructions/*`, `.github/agents/*`, `docs/agents/*`, per-area `APP_CONTEXT.md`/`COPILOT_MAP.md`). Replaced with this two-file pair: `current-architecture.md` (as-built) and `target-architecture.md` (this file). Reasoning: the old system had accumulated faster than it was being kept accurate, and `docs/architecture-guidelines.md` had drifted into asserting things as standard that weren't actually true anywhere in the codebase. Starting over with a smaller, honestly-maintained pair.
- **2026-07-19** — Deleted `apps/Emerge` entirely (auth/submissions/payment prototype) and reset `apps/Project1` and `apps/Project2` to blank scaffolds — frontends down to a single placeholder page, backends down to a bare `/api/health` stub, all experimentation-era domain code (property listings, the real-time multiplayer game, file-backed profile stores, Emerge's auth stack) removed. Reasoning: that code was experimentation, not committed direction, and its presence made the repo read as more decided than it actually was. Starting the component-library work from a genuinely clean state rather than retrofitting it onto three inconsistent prototypes. Everything removed is recoverable from git history.
- **2026-07-27** — Settled on MongoDB/Mongoose as the database standard for real backend work. The actual hosted instance is currently disabled to save cost and will need re-provisioning before it's usable — this decision is ahead of implementation, not a description of something already wired up. Backend folder shape (controllers/services/models/etc.) remains undecided.
- **2026-07-27** — Added a Claude Code agent-file layer: root `CLAUDE.md` (workspace layout, commands, hard conventions — points to this doc pair rather than restating them), nested pointer `CLAUDE.md` files in `shared/components` and `shared/config` (each just directs to that package's own README rather than duplicating it), and a `component-scaffolder` subagent (`.claude/agents/component-scaffolder.md`) for the recurring "add N new shared components" task. Deliberately kept thin and pointer-based rather than restating architecture narrative, given the lesson from the 2026-07-19 doc-cascade retirement above.
- **2026-07-27** — Settled a full JS/MERN style guideline into `CLAUDE.md`: functional components only (no class components; `react-error-boundary` for the one case React requires a class), PropTypes required on every component with reusable shapes centralized in `shared/components/propTypes/`, React Context + hooks for cross-component state (no Redux/Zustand), native `fetch` for data fetching, arrow-function-const for every function (components, hooks, utilities, backend code alike), named exports for all non-component files, `import/order` enforced via `eslint-plugin-import` (installed at repo root, `warn` severity, auto-fixable), and a standardized `features/<domain>/{components,data,hooks}` + `pages/` folder shape across all three frontend apps. Backend Standards (folder shape, validation, error handling, response envelope, ESM) captured above. Plain JavaScript stays the language choice — no TypeScript adoption at this time.
