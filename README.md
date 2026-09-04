# Angular Starter Workspace

Boilerplate for Angular projects in a pnpm monorepo, with vertical domain architecture, strict TypeScript, Sheriff module boundaries, ESLint, Vitest and Tailwind CSS.

## Architecture

```text
apps/
  starter/                  # Angular application and product composition
libs/
  <domain>/                 # product's vertical domain
    domain-logic/           # pure rules, without Angular
    data/                   # data access and external effects
    feature-*/               # screens and orchestration
    ui-*/                    # domain-specific presentation
    util-*/                  # stateless helpers
  platform/                 # cross-cutting capabilities with state or effects
  shared/
    model/                  # shared vocabulary
    ui-base/                # components promoted through proven reuse
    util-*/                 # shared stateless utilities
```

The domain is the first boundary. Technical layers live inside it. `platform` contains cross-cutting capabilities such as session, HTTP and configuration; `shared` contains stateless vocabulary such as models, visual components and formatters.

Components should only be promoted to `shared/ui-base` after they are used by two different domains. Before that, they remain in the domain where they were created.

Dependency rules are checked by Sheriff in [sheriff.config.ts](sheriff.config.ts). The application is the composition point; libraries do not depend on it.

## Getting Started

```bash
pnpm install
pnpm start
```

The application is available at `http://localhost:4200/`.

## Commands

```bash
pnpm verify       # architecture boundaries
pnpm lint         # ESLint and angular-eslint
pnpm test:ci      # single-run tests
pnpm typecheck    # TypeScript without emitting files
pnpm build        # production build
pnpm format       # formatting
```

The CI sequence is `verify`, `lint`, `test:ci` and `typecheck`, in that order.

## Creating a Domain

Add the domain under `libs/<domain>` and create only the layers it needs. Do not pre-create features, shared components or platform abstractions without a concrete need.

### `index.ts` as a Module Boundary

An `index.ts` is not merely a convenience file for shortening imports. It marks
the public boundary of a module: everything inside the folder is encapsulated,
and `index.ts` becomes the only entry point for external consumers.

Use a barrel when a folder has an API that needs to be consumed by another layer
or domain. Export only public symbols and keep implementation details out of it:

```text
libs/orders/domain-logic/
  calculate-total.ts
  index.ts                  # exports only the public API
```

```ts
// libs/orders/domain-logic/index.ts

export { calculateTotal } from "./calculate-total";
```

Consumers should import from the module:

```ts
import { calculateTotal } from "@starter/orders/domain-logic";
```

Avoid importing an internal file directly:

```ts
import { calculateTotal } from "@starter/orders/domain-logic/calculate-total";
```

This deep import breaks encapsulation, couples the consumer to the folder's
internal organization and prevents the implementation from being reorganized
without spreading changes across the project. Sheriff checks this boundary and
points to the barrel when an internal import is accessed from outside.

Also, do not automatically create `index.ts` in every folder. A barrel in every
directory turns every file into a supposed public boundary, increases the
number of re-exports and makes the concept lose its meaning. Create one only in
modules with a stable public API, such as `shared/model`, `platform/session` or
a domain layer consumed by another part of the application.

See [apps/starter/README.md](apps/starter/README.md) for details about the Angular application.

## Articles That Inspired This Template

This template was inspired by Van Ortega's series _Como eu configuro um projeto greenfield em Angular_:

1. [Part 1: structure, TypeScript and the three axes](https://medium.com/@ortegavan/como-eu-configuro-um-projeto-greenfield-em-angular-parte-1-0b2142436c8f)
2. [Part 2: Sheriff and enforceable architecture](https://medium.com/@ortegavan/como-eu-configuro-um-projeto-greenfield-em-angular-parte-2-03b918a8d914)
3. [Part 3: the first Angular application](https://medium.com/@ortegavan/como-eu-configuro-um-projeto-greenfield-em-angular-parte-3-74b1e26c6f35)

This repository adapts the articles' decisions into a neutral boilerplate without a specific product domain.

## License

This project is available under the [MIT license](LICENSE).
