# Angular Starter

Angular 22 application that serves as the boilerplate's composition point. It
uses standalone components, signals, Tailwind CSS and Vitest. The monorepo's
overall architecture is documented in the [root README](../../README.md).

## Development

Run commands from the repository root:

```bash
pnpm install
pnpm start
```

The application is available at `http://localhost:4200/` and reloads
automatically during development.

## Local Commands

```bash
pnpm --filter starter build
pnpm --filter starter test
pnpm --filter starter exec ng test --watch=false
```

Workspace verification commands can also be run from the root:

```bash
pnpm verify
pnpm lint
pnpm test:ci
pnpm typecheck
```

## Entry Points

- `src/main.ts`: bootstraps the application with `bootstrapApplication`.
- `src/app/app.config.ts`: registers global providers.
- `src/app/app.routes.ts`: declares application routes.
- `src/app/app.ts`: root component and shell composition.
- `src/app/app.html`: root shell template.
- `src/styles.css`: global styles and Tailwind CSS import.

The initial shell contains only the `router-outlet`. Add product composition in
features and register its routes in `src/app/app.routes.ts`.

## Generating Code

Run schematics from this directory or use the pnpm filter:

```bash
cd apps/starter
pnpm exec ng generate component features/example
```

Keep business-specific code in `libs/<domain>` and use the application to
compose domains. Do not put business rules in `src/app`.

## Testing

Unit tests live close to the code and use Vitest through the Angular CLI. For a
single run, use `pnpm test:ci` from the root. The `pnpm test` command runs in
watch mode for development.
