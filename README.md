# ProjectCollection

This workspace contains multiple MERN projects and a shared component library.

Structure

- MainDirectory (this folder)
  - Project1
    - frontend (React + Vite)
    - backend (Node + Express + Mongoose)
  - Project2
    - frontend
    - backend
  - componentLib (React component library)

Quick start

1. For each frontend/backend run:

   - cd into the folder (for example `Project1/frontend`) and run `npm install`.
   - Start frontend: `npm run dev` (Vite).
   - Start backend: `npm run dev` (nodemon) or `npm start`.

2. Set environment variable `MONGO_URI` in `backend/.env` files or use a local MongoDB at the default URI.

Notes

- This scaffold provides minimal, working starter files. Install dependencies and adapt code, ports and envs to your needs.
