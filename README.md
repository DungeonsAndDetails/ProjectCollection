# ProjectCollection

This workspace contains multiple MERN projects and a shared component library.

Structure

- MainDirectory (this folder)
  - apps
    - Portal
      - frontend (primary shell for login, theming, navigation)
      - backend (session and shell services)
    - Project1
      - frontend (React + Vite) — blank, reserved for future scope
      - backend (Node + Express) — health-check stub only
    - Project2
      - frontend (React + Vite) — blank, reserved for future scope
      - backend (Node + Express) — health-check stub only
  - shared
    - components (React component library)

Recommended versions

- Node.js: 22.16.0 (current Node 22 LTS in this workspace)
- npm: 11+
- React: 19.1.0
- Tailwind CSS: 4.x

Quick start

1. Install everything once from the repo root with `npm install`.
2. Run every frontend and backend together with `npm run dev:all`.
3. Or use the bash helper: `./scripts/dev-all.sh`.
4. Lint all apps with `npm run lint`.
5. Format the repo with `npm run format`.
6. Check shared tooling drift with `npm run tooling:check`.

Ports

- Portal frontend: 5172
- Portal backend: 4999
- Project1 frontend: 5173
- Project1 backend: 5100
- Project2 frontend: 5174
- Project2 backend: 3001

Micro frontend shell

- `apps/Portal/frontend` is the host shell and primary entrypoint.
- It owns shell-level concerns such as login UX, theming, and navigation into each child app.
- Child apps remain independently runnable under `apps/Project1` and `apps/Project2`. Both are currently blank scaffolds reserved for future scope.

Shared frontend tooling

- Tailwind is available in every frontend app under `apps/*/frontend`.
- A single shared ESLint config lives at `eslint.config.mjs` in the repo root.
- A single shared Prettier config lives at `prettier.config.cjs` in the repo root.
- Each app can run `npm run lint` or `npm run format` locally and it will resolve the shared root config automatically.
- Shared UI primitives in `shared/components` use flat package-root folders such as `shared/components/Button/` with `index.js` and `style.scss`.

MongoDB MCP

- Workspace MCP settings live in `.vscode/settings.json` for this repo.
- This repo enables MongoDB MCP auto-start and keeps MCP in read-only mode at the workspace level.
- MongoDB MCP uses the active connection from the MongoDB VS Code extension.
- Atlas admin tools require user-level service account credentials in `%APPDATA%/Code/User/settings.json`, not workspace settings.
- Recommended user-level keys:
  - `mdb.mcp.apiClientId`
  - `mdb.mcp.apiClientSecret`
- Recommended Atlas setup:
  - Create a MongoDB Atlas service account.
  - Grant only the minimum roles needed.
  - Add your current IP to the Atlas API access list.
  - Paste the generated client ID and client secret into your user settings.
- After updating credentials, reload VS Code or restart the MongoDB MCP server.

Documentation

- Current, as-built architecture lives in `docs/current-architecture.md`.
- Where we're intentionally headed lives in `docs/target-architecture.md` — a living doc updated as direction decisions get made.

Environment

- Each backend reads its own `.env` file; see each app's `.env.example` for the current variables (currently just `PORT`).

Notes

- This scaffold provides minimal, working starter files. Install dependencies and adapt code, ports and envs to your needs.
