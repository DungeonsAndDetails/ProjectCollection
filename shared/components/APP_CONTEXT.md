# Shared Components Context

## Purpose

`shared/components` is the global reusable component library for ProjectCollection.

## Current Scope

- Early-stage shared UI package.
- Initial component export surface exists.
- Long-term target is a stable, accessible primitive library used by Portal and product apps.

## Library Direction

- Start with primitives.
- Grow into composed generic patterns only after reuse is proven.
- Stay domain-neutral.
- Let active project, test, and exploratory frontend work reveal which components deserve promotion.
- Prefer readable, easily extensible component APIs before building richer data-driven or theme-driven abstractions.

## Core Categories

- Buttons
- Inputs
- Cards
- Layout primitives
- Feedback states
- Navigation-adjacent UI when generic enough

## Constraints

- No app-specific business logic.
- No Project1- or Project2-specific naming.
- Coordinate styling tokens with `shared/config`.

## Active Decisions

- Accessibility and composability are higher priority than rapid component volume.
- Shared components should live in flat package-root folders such as `shared/components/Button/`.
- Shared component styles should use SCSS entry files such as `style.scss` instead of plain CSS files.
- The shared library should be shaped by proven reuse from app work, not by speculative front-end abstraction.
- Database-driven configuration and deeper theme-driven behavior are later concerns and should build on a readable base component system.

## Open Questions

- Should component documentation live alongside components or in a separate docs surface?
- When should Storybook or an equivalent viewer be introduced?
