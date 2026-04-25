# Architecture And Code Structure Guidelines

This document defines the default engineering standards for ProjectCollection.
Use it as the baseline unless a project has a strong, documented reason to differ.

## Goals

- Build a robust reusable global component library that can serve all current and future apps.
- Learn by building real projects without sacrificing shared engineering standards.
- Keep all apps runnable together in one local workspace.
- Keep every app predictable to navigate and maintain.
- Keep shared concerns centralized and domain concerns local.
- Make Portal the host shell for navigation, theming, authentication flow, and app discovery.
- Keep child apps independently runnable and deployable.
- Favor simple patterns that scale before adding framework-heavy abstractions.

## Repository Intent

Current workspace shape:

- `apps/Portal`
  - Primary shell application.
  - Owns login experience, shell layout, theme switching, top-level navigation, and app hosting.
- `apps/Project1`
  - Independent product app with its own frontend and backend.
- `apps/Project2`
  - Independent product app with its own frontend and backend.
- `shared/config`
  - Canonical home for shared ESLint, Prettier, and future Tailwind or design tokens.
- `shared/components`
  - Shared UI primitives and reusable presentation components.

## Core Principles

1. Keep ownership clear.
   Portal owns shell concerns. Product apps own business workflows.
2. Prefer composition over coupling.
   Apps should not directly depend on each other’s internal code.
3. Keep boundaries explicit.
   Shared code goes in `shared`, not copied between apps.
4. Validate at the edges.
   Frontend input, API requests, and database writes all need validation.
5. Optimize for readability first.
   Clear code and structure beat clever abstractions.
6. Build small surfaces with strong conventions.
   Consistency is more valuable than local preference.

## Shared Standards

- Use the shared config package in `shared/config` as the canonical source of truth.
- Keep `eslint.config.mjs` and `prettier.config.cjs` as root entrypoints that delegate to `shared/config`.
- Use Tailwind CSS for app styling by default.
- Keep formatting, linting, and shared tooling current as part of normal repo maintenance.
- Keep environment-specific values in `.env` files, never hardcoded secrets.
- Prefer named exports for utilities and hooks; default exports are acceptable for React page components when that is already the local pattern.
- Keep files focused. One file should usually have one primary responsibility.
- Keep discoverable Copilot instruction and agent files in `.github`, and use each area's `COPILOT_MAP.md` as the local pairing point for the files that represent that area.

## Component Library Strategy

The long-term goal is not just to have shared components, but to build a reusable global UI foundation.

`shared/components` should evolve into:

- Stable UI primitives.
- Shared layout building blocks.
- Shared form controls.
- Shared feedback states such as alerts, empty states, loaders, and modals.
- Shared accessibility-first interaction patterns.

Build the shared library in layers:

1. Primitives
   Buttons, inputs, labels, cards, stacks, text, badges.
2. Composed patterns
   Search bars, filter panels, dialogs, tables, navigation shells.
3. Product-ready templates
   Reusable domain-neutral screens and layout shells.

Rules for growing the library:

- Start local when a pattern is still unstable.
- Promote to `shared/components` only after the pattern proves reusable.
- Do not move code into `shared/components` just to reduce lines in an app.
- Let project, test, and exploratory app work drive what gets promoted into the shared library.
- Prefer accessibility, API clarity, and composability over visual cleverness.
- Shared components should be documented once they become core building blocks.
- Avoid baking one app's domain language into shared component names.
- Keep the package layout flat at the `shared/components` root.
- Prefer one folder per shared primitive, for example `shared/components/Button/`.
- Use `index.js` for the component entry and `style.scss` for the component stylesheet inside each primitive folder.
- Re-export the package API from `shared/components/index.js`.

## Micro Frontend Guidance

Portal is the shell, not the domain implementation.

Portal should own:

- Authentication entry flow.
- Theme selection and shared shell chrome.
- Global navigation.
- App registry and discovery.
- Cross-app layout and access control.

Child apps should own:

- Domain routes.
- Domain state.
- Domain API calls.
- Domain business rules.
- Domain-specific UI.

Avoid these patterns:

- Importing business logic from one app directly into another app.
- Sharing app-local hooks, stores, or route internals across apps.
- Letting Portal absorb domain logic from Project1 or Project2.

Preferred sharing patterns:

- Shared components in `shared/components`.
- Shared config and tooling in `shared/config`, with root entrypoint wrappers where tools expect them.
- Shared API contracts or typed schemas in a dedicated shared package if needed later.

## Area Agent Model

Each major repo area should have an owning agent profile.

That agent should:

- Treat the global architecture guide as the baseline authority.
- Apply stricter local guidance for the owned area.
- Prefer changes inside its own boundary before reaching across repo boundaries.
- Escalate shared concerns into `shared/config` or `shared/components` rather than duplicating local fixes.

Each area agent should define:

- Scope of ownership.
- What it is allowed to change freely.
- What it must coordinate before changing.
- Local validation expectations.
- Anti-patterns for that area.

Recommended starting agents for this repo:

- Portal agent.
- Project1 agent.
- Project2 agent.
- Shared components agent.
- Shared config agent.

## Frontend Architecture Guidelines

### Frontend Stack

- React 19.
- Vite.
- Tailwind CSS.
- Shared ESLint and Prettier configuration.

### Frontend Direction

- Build the frontend surfaces through real project work, including product, test, and exploratory apps.
- Use that work to discover reusable UI patterns, then promote those patterns into `shared/components` once reuse is proven.
- Optimize first for readability, maintainability, and dynamic expandability rather than early data-driven abstraction.
- Treat database-driven behavior and richer theme-driven systems as a later layer that should sit on top of a readable base architecture.
- Keep early frontend decisions simple enough that database-backed configuration and stronger theming can be introduced without structural rework.

### Recommended Frontend Folder Shape

Inside each `apps/*/frontend/src`:

- `app/`
  - App bootstrap, providers, router, high-level shell wiring.
- `features/`
  - Domain features grouped by capability, not by file type.
- `components/`
  - App-local reusable components.
- `hooks/`
  - App-local hooks.
- `lib/`
  - Utilities, helpers, API client setup.
- `pages/`
  - Route-level page components.
- `styles/`
  - Optional style entrypoints, theme tokens, or app-level CSS.

Example:

```text
src/
  app/
  features/
    leases/
      api/
      components/
      hooks/
      pages/
      utils/
  components/
  hooks/
  lib/
  pages/
  main.jsx
```

### React Best Practices

- Prefer functional components and hooks.
- Favor code that is easy to read and easy to extend before introducing heavier architectural indirection.
- Keep components small and purpose-specific.
- Move non-UI logic into hooks or service helpers when components become too dense.
- Avoid prop drilling across many levels; use context only for true cross-tree concerns.
- Keep server data separate from UI-only state.
- Do not put everything in one global store by default.
- Prefer controlled forms when validation and submission behavior matter.
- Use route-level splitting or lazy loading when screens become large.
- Keep side effects in hooks and isolate them clearly.
- Do not fetch directly in many scattered components if the same data is shared broadly; centralize via feature-level data hooks.

### State Management Guidance

Use the simplest tool that fits the scope:

- Local component state for local UI.
- Context for cross-cutting shell concerns like auth session, theme, or current workspace.
- Feature-specific hooks for domain behavior.
- Introduce a dedicated client-state library only when state complexity clearly justifies it.

Avoid:

- Huge top-level contexts with many unrelated values.
- Business logic embedded inside JSX trees.
- Reusable hooks that secretly depend on one app’s internal route structure.

### React Component Conventions

- One component per file for non-trivial components.
- Name components with PascalCase.
- Name hooks with `use` prefix.
- Co-locate test files with the feature or component they cover.
- Keep presentational components as dumb as possible.
- Prefer explicit props over large opaque config objects.
- Prefer composition-friendly component APIs over deeply nested boolean prop matrices.
- When a component is meant to become shared, design for sensible defaults and controlled extensibility.

### Tailwind Guidance

- Use Tailwind for layout, spacing, typography, and common component styling.
- Keep repeated class groups behind shared components or utility helpers when repetition becomes noisy.
- Use semantic component names, not styling-driven filenames.
- Avoid massive unreadable class strings in deeply complex components.
- Keep design tokens consistent across apps.
- Do not over-design theme systems early; grow toward stronger theme-driven experiences after the base UI patterns and data flows are stable.
- If themes grow, centralize shared tokens in a dedicated shared design package or CSS variable layer.
- Prefer shared utility patterns and component abstractions once the same Tailwind class groups repeat across apps.

### Frontend API Layer Guidelines

- Do not scatter `fetch` calls across arbitrary UI files.
- Centralize API calls in feature-level API modules or a shared client wrapper.
- Normalize error handling.
- Keep API base URLs configurable.
- Prefer explicit request and response shapes.
- Log server errors in development but do not expose sensitive backend details to users.

### Frontend Performance Guidelines

- Optimize only after identifying real bottlenecks.
- Avoid premature memoization.
- Use `useDeferredValue`, transitions, or lazy loading when rendering pressure or navigation latency justifies it.
- Keep large lists virtualized if they become heavy.
- Prevent unnecessary rerenders by controlling state ownership carefully.

### Frontend Testing Guidelines

- Test user behavior, not internal implementation details.
- Add tests for critical flows: auth, navigation, form validation, and high-value domain actions.
- Prefer integration-style component tests for feature flows.
- Mock network boundaries, not everything else.

## Backend Architecture Guidelines

### Backend Stack

- Node.js.
- Express.
- MongoDB with Mongoose.

### Recommended Backend Folder Shape

Inside each `apps/*/backend`:

- `src/config/`
  - Environment loading, database setup, app config.
- `src/routes/`
  - Route registration only.
- `src/controllers/`
  - HTTP-layer request handling.
- `src/services/`
  - Business logic.
- `src/models/`
  - Mongoose schemas and models.
- `src/middleware/`
  - Auth, validation, error handling, logging.
- `src/validators/`
  - Request validation schemas.
- `src/utils/`
  - Shared backend helpers.

Example:

```text
backend/
  src/
    config/
    controllers/
    middleware/
    models/
    routes/
    services/
    validators/
    app.js
    server.js
```

### Express Best Practices

- Keep route files thin.
- Keep controllers thin.
- Put business logic in services.
- Centralize error handling in middleware.
- Validate every external input before business logic runs.
- Return consistent response shapes.
- Use proper HTTP status codes.
- Do not mix database logic directly into route files.
- Do not swallow async errors.

### API Design Guidelines

- Use resource-oriented route naming.
- Keep naming predictable and pluralized where appropriate.
- Version APIs when breaking changes become necessary.
- Make error payloads consistent.
- Include machine-readable error codes for important domain failures.
- Keep controller logic focused on request parsing and response mapping.

### Backend Security Basics

- Never trust client input.
- Validate and sanitize request data.
- Use `helmet`, rate limiting, and CORS controls when the app matures beyond the scaffold.
- Keep secrets in environment variables.
- Never log secrets, tokens, or raw credentials.
- Enforce auth and authorization separately.
- Check access at the resource boundary, not just at login.

### Logging And Observability

- Use structured logs when possible.
- Include request identifiers when debugging distributed flows.
- Log failures with enough context to diagnose them.
- Keep logs actionable and avoid noisy duplicate logging.
- Add health endpoints for each backend service.

### Backend Testing Guidelines

- Add route-level tests for critical endpoints.
- Add service tests for important business rules.
- Prefer integration tests for request, middleware, and database interaction together.
- Keep test data realistic and isolated.

## MongoDB And Mongoose Guidelines

### Schema Design Principles

- Model around query patterns, not around SQL habits.
- Use embedding when data is naturally bounded and read together.
- Use references when data grows independently or is shared widely.
- Avoid unbounded arrays in documents.
- Keep documents focused on a clear aggregate.

### Mongoose Best Practices

- Define schemas explicitly.
- Add schema validation for required fields, enums, ranges, and formats.
- Use timestamps on most business entities.
- Create indexes deliberately based on actual query patterns.
- Use `.lean()` for read-heavy endpoints that do not need full Mongoose documents.
- Avoid autopopulate-style hidden work by default.
- Prefer explicit population only where it is needed.

### Data Access Patterns

- Keep query logic close to services or dedicated repository modules.
- Avoid repeating the same query fragments everywhere.
- Limit returned fields when full documents are unnecessary.
- Paginate list endpoints.
- Use transactions only when real multi-document consistency requires them.

### MongoDB Performance Basics

- Add indexes for high-value filters and sorts.
- Review slow query patterns before scaling hardware.
- Avoid regex-heavy patterns on large unindexed fields.
- Avoid large document growth over time without lifecycle planning.

## Shared Components Guidelines

`shared/components` should contain:

- UI primitives.
- Generic reusable layout pieces.
- Reusable form controls.
- Shared presentation helpers.

`shared/components` should not contain:

- App-specific business rules.
- App-specific route knowledge.
- App-specific API logic.
- Domain code that only one app actually needs.

Rules for shared components:

- Keep APIs small and explicit.
- Support composition.
- Avoid hardcoded app assumptions.
- Prefer accessibility by default.
- Document usage once components grow in complexity.
- Prefer stable, low-level building blocks before adding highly opinionated composite widgets.
- Treat breaking changes in shared components with the same caution as breaking API changes.

## Tooling Maintenance Policy

Keeping ESLint and Prettier current is a standing engineering responsibility, not a one-time setup task.

Default policy:

- Keep the root ESLint and Prettier configuration as the single source of truth.
- Review outdated linting, formatting, and core frontend tooling regularly.
- Prefer upgrading minor and patch versions early rather than letting drift accumulate.
- Treat major-version upgrades as explicit repo maintenance work with validation.
- After tooling upgrades, rerun linting, formatting checks, and frontend builds.

Tooling that should stay current on purpose:

- `eslint`
- `@eslint/js`
- `eslint-plugin-react`
- `eslint-plugin-react-hooks`
- `eslint-plugin-react-refresh`
- `prettier`
- `prettier-plugin-tailwindcss`
- `tailwindcss`
- `@tailwindcss/vite`
- `vite`
- `@vitejs/plugin-react`

Upgrade rules:

- Do not let one app invent its own lint or formatting rules unless there is a documented exception.
- Do not pin stale versions forever just because they currently work.
- Do not adopt brand-new tooling changes blindly; validate them against the whole workspace.
- If a formatting or linting rule causes friction repeatedly, fix the rule or document the exception instead of ignoring it ad hoc.

Suggested maintenance rhythm:

- Check tooling drift at least once per month during active development.
- Check again before starting a major new project in `apps/`.
- Check again before introducing a new shared package or major styling pattern.

## Naming Conventions

- Components: `PascalCase`
- Hooks: `useSomething`
- Helpers and utilities: `camelCase`
- Files: match the exported symbol when practical.
- Routes, services, and controllers: use descriptive domain names.
- Environment variables: `UPPER_SNAKE_CASE`

## Environment And Config Guidelines

- Keep `.env.example` files current.
- Fail fast when required environment variables are missing.
- Centralize config parsing rather than reading `process.env` throughout the codebase.
- Separate configuration from business logic.

## Error Handling Guidelines

- Throw domain-meaningful errors in services.
- Map errors to HTTP responses in controllers or centralized error middleware.
- Keep user-facing messages safe and concise.
- Log deeper internal details only on the server side.

## Code Review Checklist

Before merging, ask:

- Is responsibility in the right layer?
- Is the code easy to follow?
- Are inputs validated?
- Are errors handled consistently?
- Is shared code truly shared, or should it stay local?
- Does this add coupling between apps?
- Are tests needed for the changed behavior?
- Does the naming make sense without extra explanation?

## What To Avoid

- God components.
- God services.
- Direct app-to-app imports.
- Massive utility folders with no boundaries.
- Hidden side effects.
- Repeated API call logic across multiple screens.
- Database queries inside controllers unless the app is still in a trivial prototype state.
- Styling systems that drift per app without a documented reason.

## Default Decision Rules

When in doubt:

- Put shell concerns in Portal.
- Put domain concerns in the owning app.
- Put generic UI in `shared/components`.
- Put business logic in backend services.
- Put schema rules in Mongoose models and request rules in validators.
- Prefer the simpler abstraction until complexity proves it insufficient.

## Future Additions To Expect

As the repo grows, these will likely become necessary:

- Shared design tokens package.
- Shared API client package.
- Shared schema package for request and response contracts.
- Testing standards document.
- CI and deployment standards document.
- Authentication and authorization design document.

This file should evolve with the codebase. If a new pattern becomes standard, document it here before it spreads informally.
