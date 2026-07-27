# shared/components

Simple React component library for shared UI components across projects.

Structure

- Keep the package root flat.
- Give each shared primitive its own folder at the package root.
- Use `index.jsx` for the component entry and `style.scss` for the component stylesheet.
  (Must be `.jsx`, not `.js` — the installed Vite/`@vitejs/plugin-react` toolchain only
  parses JSX in files with a `.jsx`/`.tsx` extension.)
- Add a `<ComponentName>.test.jsx` alongside the component covering its user-facing behavior.

Example:

```text
shared/components/
	Button/
		index.jsx
		Button.test.jsx
		style.scss
	index.js
```

Components

- `Button` — clickable action trigger
- `Input` — single-line text field
- `Card` — bordered content container with an optional title
- `Badge` — small inline status label (`neutral` / `success` / `warning` / `danger`)
- `Alert` — dismissible status message banner
- `Spinner` — loading indicator
- `Container` — max-width page layout wrapper
- `Link` — styled anchor (auto-sets `rel="noreferrer"` for `target="_blank"`)

How to use

- Import locally: `import { Button } from '../../shared/components'` during development.
- Add a proper build step (rollup / tsc) and publish to npm or use as a local package for production use.

Testing

- Run once: `npm run test --workspace shared/components`
- Watch mode: `npm run test:watch --workspace shared/components`
- Coverage: `npm run test:coverage --workspace shared/components`
- Tests use Vitest + React Testing Library (`test/setup.js` wires up jest-dom matchers and
  DOM cleanup between tests). Prefer testing what a consumer would observe — rendered output,
  attributes, and interactions — over internal implementation details.
