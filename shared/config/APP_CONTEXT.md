# Shared Config Context

## Purpose

`shared/config` is the canonical source of truth for repo-wide tooling, linting, formatting, and future design tokens.

## Copilot Pairing

- Owning instruction: `.github/instructions/shared-config.instructions.md`
- Owning agent: `.github/agents/shared-config.agent.md`
- Keep this file aligned with that instruction and agent pair for shared tooling context.

## Current Scope

- Shared ESLint configuration.
- Shared Prettier configuration.
- Shared Tailwind token starter file.
- Root wrapper compatibility for tools and editors.

## Consumers

- Portal frontend and backend.
- Project1 frontend and backend.
- Project2 frontend and backend.
- Shared component library.

## Constraints

- Do not let apps drift into separate local tooling rules.
- Treat changes here as repo-wide changes.

## Active Decisions

- Root wrappers remain in place for compatibility.
- Tooling upgrades should be explicit and validated.

## Open Questions

- When should Tailwind tokens expand into a fuller design-token system?
- Should shared config eventually expose typed helper packages beyond lint and formatting?
