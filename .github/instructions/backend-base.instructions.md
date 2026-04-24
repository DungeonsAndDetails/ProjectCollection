---
description: 'Use when working on any app backend in apps/*/backend. Covers shared Node, Express, MongoDB, route layering, validation, and service organization rules.'
name: 'Backend Base'
applyTo: 'apps/*/backend/**'
---

# Backend Base

- Treat this as the shared baseline for all app backends.
- Use Express and MongoDB with Mongoose.
- Keep routes thin, controllers thin, and business logic outside route registration.
- Validate request input before business logic.
- Keep environment parsing centralized.
- Use health routes and predictable response shapes.

## Preferred Structure

- `src/config/`
- `src/routes/`
- `src/controllers/`
- `src/services/`
- `src/models/`
- `src/middleware/`
- `src/validators/`

## Validation

- Lint the touched backend.
- Run focused runtime or API validation when routes, models, or services change.
