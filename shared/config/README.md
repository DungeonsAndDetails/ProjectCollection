# @projectcollection/config

Central shared configuration package for ProjectCollection.

Purpose

- Hold the canonical ESLint configuration.
- Hold the canonical Prettier configuration.
- Provide a single home for future shared Tailwind tokens and design config.
- Keep app-level tooling decisions centralized rather than copied per project.

Current entry points

- `./eslint`
- `./prettier`
- `./tailwind/tokens.css`

Usage model

- The repo root remains the runtime entry point for ESLint and Prettier.
- Root config files delegate to this package so editors and CLI tools continue to work predictably.
- Apps should not create their own disconnected lint or format rules unless there is a documented exception.
