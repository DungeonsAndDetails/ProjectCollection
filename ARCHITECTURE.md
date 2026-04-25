# Architecture Index

This file is the top-level map for how ProjectCollection keeps architecture, agent behavior, and app context aligned.

## Layers

1. Global architecture baseline
   - `docs/architecture-guidelines.md`
2. Repo-wide Copilot baseline
   - `.github/copilot-instructions.md`
3. Cascading file instructions
   - `.github/instructions/frontend-base.instructions.md`
   - `.github/instructions/backend-base.instructions.md`
   - `.github/instructions/portal.instructions.md`
   - `.github/instructions/project1.instructions.md`
   - `.github/instructions/project2.instructions.md`
   - `.github/instructions/shared-components.instructions.md`
   - `.github/instructions/shared-config.instructions.md`
4. Optional area-specific custom agents
   - `.github/agents/*.agent.md`
5. Per-area living context
   - `COPILOT_MAP.md`
   - `APP_CONTEXT.md`

Each area's `COPILOT_MAP.md` is the local pairing point for the instruction and agent that govern that area.

## Why This Structure Exists

- Global rules stay concise and stable.
- File-type base rules apply consistently across frontends and backends.
- Area overlays capture what is unique to Portal, Project1, Project2, shared components, and shared config.
- App state, goals, open questions, and upcoming work stay in living context files instead of bloating always-on instructions.
- The actual discoverable instruction and agent files stay in `.github`, while their pairing is made explicit next to each area through `COPILOT_MAP.md`.

## Current Areas

- `apps/Portal`
- `apps/Project1`
- `apps/Project2`
- `shared/components`
- `shared/config`

## Usage Pattern

- Read the global architecture guide first.
- Let the `.github` cascade apply the correct file-level instructions.
- Use the local `COPILOT_MAP.md` first to find the owning instruction and agent.
- Use the matching `APP_CONTEXT.md` before making significant area changes.
- Use custom agents when you want an explicit area-specific operating mode.

## Shared Components Shape

- Keep `shared/components` flat at the package root rather than nesting primitives under `src/components`.
- Give each shared primitive its own folder, such as `shared/components/Button/`.
- Use `index.js` as the component entry file and `style.scss` as the component stylesheet inside each primitive folder.
- Re-export the public surface from `shared/components/index.js`.
