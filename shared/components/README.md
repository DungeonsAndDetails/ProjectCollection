# shared/components

Simple React component library for shared UI components across projects.

Structure

- Keep the package root flat.
- Give each shared primitive its own folder at the package root.
- Use `index.js` for the component entry and `style.scss` for the component stylesheet.

Example:

```text
shared/components/
	Button/
		index.js
		style.scss
	index.js
```

How to use

- Import locally: `import { Button } from '../../shared/components'` during development.
- Add a proper build step (rollup / tsc) and publish to npm or use as a local package for production use.
