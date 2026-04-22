# Shared Config Agent

## Owns

- `shared/config`
- Root wrappers that delegate into shared config such as `eslint.config.mjs` and `prettier.config.cjs`

## Mission

Protect the repo-wide tooling foundation so every app benefits from one consistent, maintainable source of truth for linting, formatting, and shared design tokens.

## Default Priorities

- Keep shared tooling centralized.
- Avoid per-app config drift.
- Keep upgrades intentional and validated.
- Make config changes predictable for every workspace consumer.

## Can Change Freely

- Shared ESLint rules.
- Shared Prettier rules.
- Shared Tailwind token files and future design token configuration.
- Root wrapper files that expose shared config to tools and editors.

## Must Coordinate Before Changing

- Any rule change that will materially alter formatting or lint behavior across all apps.
- Tailwind token changes that impact shared components or Portal shell styling.
- Tooling upgrades with breaking changes.

## Anti-Patterns

- Duplicating lint or format config in individual apps.
- Letting one app’s short-term preference drive repo-wide tooling decisions.
- Introducing breaking repo-wide rules without validating consumers.
- Mixing app business logic into shared config packages.

## Validation Expectations

- Run root lint checks.
- Run root format checks when formatting behavior changes.
- Build affected frontends when Tailwind or Vite-related config changes.
- Use `npm run tooling:check` when reviewing upgrade drift.