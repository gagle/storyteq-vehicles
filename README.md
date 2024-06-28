# storyteq-vehicle

## Start the application

Run `npm start` to start the development server.

## Build for production

Run `npx nx build storyteq-vehicle` to build the application. The build artifacts are stored in the `dist/` folder.

## Running tasks

It's recommended to globally install `nx`, otherwise prefix any `nx` command with `npx`, eg. `npm nx ...`.

To execute tasks with Nx use the following syntax:

```bash
nx <target> <project> <...options>
```

Example:

```bash
nx run vehicle-api:test
```

You can also run multiple targets:

```bash
nx run-many -t <target1> <target2>
```

Example:

```bash
nx run-many -t test lint type-check
```

..or add `-p` to filter specific projects

```bash
nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

## Implementation notes

Tech stack:

- Nx: Monorepo architecture.
- Angular 18: esbuild (`@angular-devkit/build-angular:browser-esbuild`).
- Elf: Redux store. From the creator of the Akita redux store and lots of other libraries (@ngneat).
- Prettier: Code formatting.
- Jest, ts-mockery: Unit testing. I also like to use ng-mocks to simplify and implement more complex unit tests but I haven't used it for this project.
- Husky, lint-staged, markdownlint-cli, eslint: Linting.
- Cypress. E2E testing but I didn't implement any E2E test for this project.
- GitHub Actions workflows: I didn't implement any pull request workflow for this project but I started and proposed a way to solve the deployment of the app with multiple possible configs depending on the environment (`env.dev.js` and `env.prod.js` files).

Project structure scaffolded with Nx and configured with some extra setup boilerplate code for a better scaling of libs (avoid setup code repetition).

Angular is configured to be as strict as possible. Used signals, without modules and every component with OnPush change detection strategy.

Style files organized as modular and centralized as possible. Used mixins to avoid styles duplications for everything (fonts, typography, breakpoints, colors).

Unit-tested some components, services and util files.

The only major domain (`vehicle`) has been architected and inside of it there are some subdomains. The idea is to re-use this pattern for every major domain:

- `api`: For storing any service (including the http service) that can be re-used inside of the major domain or outside of it.
- `feature`: For storing any components bound to the routing (that the app may depend on them). Inside of it we typically find the `feature-shell` subdomain.
- `models`. Only for model files (interfaces, types, maybe some constants).
- `routing`. Any routing-related file.
- `shared`. Any component or even services more near to the UI than to the http layer and can be shared to other major domains.
- `state`. For storing the query and store services. Instead of directly expose lib-specific methods to the whole project, the query and store services wrap the specific redux store, in this case Elf.
- `util`. For utility functions and constants. Was not needed for this project.

The idea of this structure is to give appropriate tags to each Nx project and later write a good set of eslint rules (`@nx/enforce-module-boundaries`) to restrict the importing of sub-domains where they shouldn't to avoid cyclic dependencies, but I didn't have enough time to configure them.
