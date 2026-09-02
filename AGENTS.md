# AGENTS.md

## Repo structure

pnpm monorepo with Angular 22 app + shared libs.

```
apps/agenda/   → Angular app (ng serve, ng build, ng test)
libs/
  event/       → domain-logic (e.g. calculateSchedules)
  platform/    → session service
  shared/      → models (Event, User)
```

**Entry point**: `apps/agenda/src/main.ts` → `App` component.

## Commands

Run from repo root unless noted. Angular CLI lives in `apps/agenda/`.

| Task | Command | Notes |
|------|---------|-------|
| Install | `pnpm install` | Root-level |
| Dev server | `pnpm --filter agenda start` or `ng serve` in apps/agenda | |
| Build | `pnpm --filter agenda build` | |
| Test | `pnpm --filter agenda test` | Vitest via Angular CLI |
| Lint | `pnpm eslint .` | From root, uses sheriff + angular-eslint |
| Format | `pnpm prettier --write .` | In apps/agenda (has .prettierrc) |
| Generate | `ng generate component <name>` | In apps/agenda |

**No root-level test script** — root `test` is a placeholder. Always run test in `apps/agenda`.

## Architecture rules (Sheriff)

`sheriff.config.ts` enforces layer dependencies:

- `feature` → may use ui, data, domain-logic, util, platform
- `ui` → may use domain-logic, util, platform
- `data` → may use domain-logic, util, platform
- `domain-logic` → may use util only
- `util` → no dependencies
- `platform` → may use util only
- Domains may depend on same domain or shared

**Path aliases** (defined in `tsconfig.base.json`):
- `@agenda/shared/*` → `./libs/shared/*`
- `@agenda/platform/*` → `./libs/platform/*`

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
- `dist/` and `.angular/` are gitignored but exist in apps/agenda
