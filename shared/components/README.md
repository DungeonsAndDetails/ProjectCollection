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
- `Select` — native dropdown choice input
- `Checkbox` — single checkbox with an optional label
- `Card` — bordered content container with an optional title
- `Badge` — small inline status label (`neutral` / `success` / `warning` / `danger`)
- `Alert` — dismissible status message banner
- `Modal` — dialog overlay (closes on backdrop click, close button, or Escape)
- `Spinner` — loading indicator
- `Container` — max-width page layout wrapper
- `Link` — styled anchor, `variant="text"` (default) or `variant="button"` (auto-sets `rel="noreferrer"` for `target="_blank"`)
- `RadioGroup` — accessible pill-styled radio button group

Layout components (same flat structure, same rules — just app-shell-shaped rather than content-shaped):

- `PageShell` — full-height themed page wrapper (backdrop + frame), applies a resolved theme's CSS custom properties
- `AppHeader` — floating header bar chrome with a kicker/title and a trailing slot for controls
- `TabSwitcher` — pill-tab switcher (`role="tablist"`)
- `Panel` — framed section with a tag/title/actions header and a flexible body; the general-purpose shape behind things like Portal's app preview

Theming

- `shared/components/theme` is the canonical theme system: a catalog of themes (each with light/dark token
  sets) plus `resolveThemeState(themeKey, colorMode)`, which returns `--pc-theme-*` CSS custom properties.
  Wrap a page in `PageShell` with a resolved theme to apply them; everything under it inherits via normal
  CSS cascade.
- Every component's `style.scss` reads colors through `var(--pc-theme-x, <fallback>)`, never a bare hex
  value — the fallback keeps the component looking right with no theme wrapper present (e.g. in isolation),
  while the CSS variable lets it pick up whatever theme an ancestor applies.
- Semantic status tokens (`--pc-theme-success-bg` / `-text`, `-warning-*`, `-danger-*`, `-info-*`) exist
  specifically for status-flavored components like `Badge` and `Alert`.

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
