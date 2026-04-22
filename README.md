# ProjectCollection

This workspace contains multiple MERN projects and a shared component library.

Structure

- MainDirectory (this folder)
  - apps
    - Portal
      - frontend (primary shell for login, theming, navigation)
      - backend (session and shell services)
    - Project1
      - frontend (React + Vite)
      - backend (Node + Express + Mongoose)
    - Project2
      - frontend
      - backend
  - shared
    - components (React component library)

Recommended versions

- Node.js: 22.16.0 (current Node 22 LTS in this workspace)
- npm: 11+
- React: 19.1.0

Quick start

1. Install everything once from the repo root with `npm install`.
2. Run every frontend and backend together with `npm run dev:all`.
3. Or use the bash helper: `./scripts/dev-all.sh`.

Ports

- Portal frontend: 5172
- Portal backend: 4999
- Project1 frontend: 5173
- Project1 backend: 5000
- Project2 frontend: 5174
- Project2 backend: 5001

Micro frontend shell

- `apps/Portal/frontend` is the host shell and primary entrypoint.
- It owns shell-level concerns such as login UX, theming, and navigation into each child app.
- Child apps remain independently runnable under `apps/Project1` and `apps/Project2`.

Environment

- Set `MONGO_URI` in each backend `.env` file or use the local defaults in the example files.

Notes

- This scaffold provides minimal, working starter files. Install dependencies and adapt code, ports and envs to your needs.
