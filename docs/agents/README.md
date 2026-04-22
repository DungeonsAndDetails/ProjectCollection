# Area Agent Profiles

These files define a practical repo-level ownership model for AI-assisted work.

Intent

- Give each major area a primary agent profile.
- Keep local decisions aligned with the global architecture guide.
- Reduce random cross-cutting edits and accidental coupling.

How to use this pattern

- Start with `docs/architecture-guidelines.md` as the global baseline.
- Then load the area-specific agent file for the part of the repo being changed.
- If a change touches multiple areas, the owning agents should coordinate through shared boundaries, not by reaching into each other's internals casually.

Current agent profiles

- `portal-agent.md`
- `project1-agent.md`
- `project2-agent.md`
- `shared-config-agent.md`
- `shared-components-agent.md`

Editor prompt files

- Reusable VS Code prompt files can live in the user prompt folder and mirror these area profiles.
- Those prompt files should load the global architecture guide first, then apply the local agent rules for the owned area.

Recommended agent contract

- Honor the global architecture guide first.
- Protect the owned area from unrelated changes.
- Escalate reusable patterns into shared packages.
- Prefer small, validated, local edits.
- Document changes to local conventions when the area evolves.
