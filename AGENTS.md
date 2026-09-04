# AGENTS.md

## Repo structure

pnpm monorepo with Angular 22 app + shared libs.

```
apps/starter/  → Angular app (ng serve, ng build, ng test)
libs/
  platform/    → runtime integrations
  shared/      → reusable cross-domain vocabulary (model, ui-*, util-*)
```

**Entry point**: `apps/starter/src/main.ts` → `App` component.

## Commands

Run from repo root unless noted. Angular CLI lives in `apps/starter/`.

| Task       | Command                                    | Notes                                    |
| ---------- | ------------------------------------------ | ---------------------------------------- |
| Install    | `pnpm install`                             | Root-level                               |
| Dev server | `pnpm start` or `ng serve` in apps/starter |                                          |
| Build      | `pnpm build`                               |                                          |
| Test       | `pnpm test`                                | Vitest via Angular CLI                   |
| CI tests   | `pnpm test:ci`                             | Single-run Vitest via Angular CLI        |
| Verify     | `pnpm verify`                               | Sheriff module boundaries                |
| Typecheck  | `pnpm typecheck`                            | TypeScript without emitting              |
| Lint       | `pnpm eslint .`                            | From root, uses sheriff + angular-eslint |
| Format     | `pnpm format`                              |                                          |
| Generate   | `ng generate component <name>`             | In apps/starter                          |

The root scripts delegate application commands to `apps/starter`. CI should run
`pnpm verify`, `pnpm lint`, `pnpm test:ci` and `pnpm typecheck` in that order.

## Architecture rules (Sheriff)

`sheriff.config.ts` enforces layer dependencies:

- `feature` → may use ui, data, domain-logic, util, platform
- `ui` → may use domain-logic, util, platform
- `data` → may use domain-logic, util, platform
- `domain-logic` → may use util only
- `util` → no dependencies
- `platform` → may use util only
- `model` → no dependencies
- `shared-ui` → may use model and util
- Domains may depend on same domain or shared

### Shared UI promotion

A component belongs in `shared/ui-base` only after it is used by two different
domains. Before that, keep it in the domain where it was created. Promote by
proven reuse, never by anticipation.

**Path aliases** (defined in `tsconfig.base.json`):

- `@starter/shared/*` → `./libs/shared/*`
- `@starter/platform/*` → `./libs/platform/*`

## Code conventions

- Angular standalone components (no NgModules)
- Signals API preferred (`signal()`, `computed()`)
- TypeScript 6, strict mode, `noUncheckedIndexedAccess`, `verbatimModuleSyntax`
- ESM (`"type": "module"`) everywhere
- Tailwind CSS v4 (imported via `@import 'tailwindcss'` in styles.css)
- Prettier: 100 chars, single quotes, angular parser for HTML

## Gotchas

- Apps have their own `node_modules/` and `dist/` — do not symlink or copy
- `tsconfig.json` at root only covers `libs/**/*.ts` and `sheriff.config.js`, not app code
- ESLint uses `projectService: true` — ensure new files are included in tsconfig
- `dist/` and `.angular/` are gitignored but exist in apps/starter
