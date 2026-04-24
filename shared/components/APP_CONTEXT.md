# Shared Components Context

## Purpose

`shared/components` is the global reusable component library for ProjectCollection.

## Copilot Pairing

- Owning instruction: `.github/instructions/shared-components.instructions.md`
- Owning agent: `.github/agents/shared-components.agent.md`
- Keep this file aligned with that instruction and agent pair for shared component context.

## Current Scope

- Early-stage shared UI package.
- Initial component export surface exists.
- Long-term target is a stable, accessible primitive library used by Portal and product apps.

## Library Direction

- Start with primitives.
- Grow into composed generic patterns only after reuse is proven.
- Stay domain-neutral.

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

## Open Questions

- Should component documentation live alongside components or in a separate docs surface?
- When should Storybook or an equivalent viewer be introduced?
