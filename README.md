# React Native Ts Expo Boilerplate

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Description

**React Native Ts Expo Boilerplate** is a production-ready starting point for building cross-platform mobile applications with React Native, TypeScript, and Expo. It is not a UI kit or a framework — it is the foundation you clone once and stop rebuilding from scratch on every new project.

**The problem it solves:** every React Native + Expo + TypeScript project starts with the same repetitive decisions — how to structure folders, how to wire up file-based routing, where to put types, how to handle shared state without overengineering, how to manage environment variables safely, how to set up linting and formatting so they actually block bad code before it reaches the repo, and how to configure Jest so tests actually run in a React Native environment. This boilerplate answers all of those decisions upfront, with a consistent and lightweight architecture that scales to real applications without introducing unnecessary complexity.

**What it includes:**

- **Expo SDK 54 + React Native 0.81** — managed workflow with `expo-router` as the routing engine. File-based routing means adding a new screen is as simple as adding a file to the `app/` directory.
- **React 19 + TypeScript 5** — strict typing enforced throughout; no `any`, explicit return types required, consistent type imports, and `exactOptionalPropertyTypes` enabled.
- **expo-router v6** with file-based navigation. Includes a configurable 404 / redirect behavior driven by an environment variable — set `EXPO_PUBLIC_REDIRECT_IF_ROUTE_NOT_EXISTS=true` to silently redirect unmatched routes to home, or `false` to show a proper Not Found screen.
- **Context + Provider + custom hook pattern** for shared state — demonstrated with a counter feature that shows how to scope a provider to a single route, enforce provider usage at the type level, and expose a clean hook API without prop-drilling.
- **Service layer** — plain async modules that wrap `fetch`, throw typed errors on non-ok responses, and keep all API communication out of components. Base URL driven by an environment variable.
- **Centralized type system** — all TypeScript interfaces live in `src/types/`, split by concern (props, app models, hooks, env variables). Environment variables are parsed and typed once in `src/constants/envs.ts`; raw `process.env` access does not spread across the codebase.
- **Theme system** — a two-layer style architecture: `src/styles/colors.ts` holds the raw color palette, `src/styles/theme.ts` exposes semantic tokens (`theme.colors.primary`, `theme.spacing.lg`, `theme.typography.sizes.xxl`, `theme.radius.md`). Changing the primary color of the entire app means editing one value.
- **Jest 29 + Testing Library** — configured with `jest-expo` preset, `transformIgnorePatterns` set up correctly for React Native's node_modules, path aliases working in tests, and coverage threshold enforced at 70% across branches, functions, lines, and statements.
- **ESLint + Prettier + Husky + lint-staged** — pre-commit hooks block commits with linting errors and auto-format staged files. TypeScript-aware ESLint rules with `strictTypeChecked` and `stylisticTypeChecked` enabled.
- **`expo-doctor` passing 17/17 checks** — dependency tree is clean and aligned with the installed SDK.

**How to use it:**

1. Clone the repository and install dependencies (see [Getting Started](#getting-started)).
2. Rename the project in `package.json`, `app.json` (`name`, `slug`, `scheme`).
3. Set your environment variables following [`.env.example`](#env-keys).
4. Replace the template screens, components, services, and contexts in `src/` with your own domain logic — the folder structure, routing setup, type conventions, and tooling stay exactly as they are.

## Technologies Used

1. React Native
2. TypeScript
3. Expo SDK 54
4. expo-router

## Libraries Used

### Dependencies

```
"expo": "~54.0.0"
"expo-constants": "~18.0.13"
"expo-linking": "~8.0.12"
"expo-router": "~6.0.23"
"expo-status-bar": "~3.0.9"
"react": "19.1.0"
"react-native": "0.81.5"
"react-native-safe-area-context": "~5.6.0"
"react-native-screens": "~4.16.0"
```

### DevDependencies

```
"@babel/core": "^7.20.0"
"@eslint/js": "^9.0.0"
"@testing-library/react-native": "^12.1.2"
"@types/jest": "~29.5.14"
"@types/node": "^22.0.0"
"@types/react": "~19.1.10"
"babel-plugin-module-resolver": "^5.0.2"
"babel-preset-expo": "~54.0.1"
"eslint": "^9.0.0"
"eslint-config-prettier": "^9.0.0"
"eslint-plugin-prettier": "^5.5.5"
"eslint-plugin-react-hooks": "^5.0.0"
"globals": "^15.0.0"
"husky": "^9.0.0"
"jest": "~29.7.0"
"jest-expo": "~54.0.0"
"lint-staged": "^15.0.0"
"prettier": "^3.0.0"
"react-test-renderer": "19.1.0"
"typescript": "^5.2.2"
"typescript-eslint": "^8.0.0"
```

## Getting Started

With the stack and dependencies clear, these are the steps to get the app running locally.

1. Clone the repository.
2. Navigate to the project folder.
3. Copy the environment file: `cp .env.example .env` and fill in the values — see [Env Keys](#env-keys) for what each variable does.
4. Install dependencies: `npm install` (this also wires up the Husky pre-commit hook automatically).
5. Start the Expo dev server: `npm run start`.

Install **Expo Go** on your device ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779)) and scan the QR code that appears in the terminal.

### Other dev commands

| Command                      | Description                          |
| ---------------------------- | ------------------------------------ |
| `npm run start`              | Start Expo dev server (clears cache) |
| `npm run android`            | Open on Android emulator/device      |
| `npm run android:run`        | Build and run native Android         |
| `npm run android:run:device` | Build and run on specific device     |
| `npm run ios`                | Open on iOS simulator/device         |
| `npm run web`                | Open in browser                      |
| `npm run prebuild`           | Generate native Android/iOS folders  |
| `npm run typecheck`          | Run TypeScript type checking         |

### Pre-Commit for Development

The project enforces code quality through automatic pre-commit hooks. **Husky** runs **lint-staged** on every commit to lint and format only the staged files, blocking the commit if anything fails. The hook is wired automatically when you run `npm install` (via Husky's `prepare` script).

**ESLint** — TypeScript-aware with `strictTypeChecked` and `stylisticTypeChecked` enabled:

- Explicit return types required
- No `any` type allowed
- Consistent type imports
- No unused variables

**Prettier** — automatic code formatting:

- 2 spaces indentation
- Semicolons required
- Double quotes
- Trailing commas (ES5)

**lint-staged** is configured to run ESLint on staged `.ts` / `.tsx` files and Prettier on staged `.ts` / `.tsx` / `.json` / `.md` files.

| Command                | Description                      |
| ---------------------- | -------------------------------- |
| `npm run lint`         | Check for linting errors         |
| `npm run lint:fix`     | Fix linting errors               |
| `npm run lint:all`     | Fix linting errors (src + tests) |
| `npm run format`       | Format code with Prettier        |
| `npm run format:check` | Check code formatting            |
| `npm run format:all`   | Format code (src + app + tests)  |

## Env Keys

The app reads environment variables from `.env`, copied from `.env.example` during setup. All variables are parsed and typed once in `src/constants/envs.ts`, so the rest of the codebase never touches `process.env` directly.

| Key                                        | Description                                                                        |
| ------------------------------------------ | ---------------------------------------------------------------------------------- |
| `EXPO_PUBLIC_REDIRECT_IF_ROUTE_NOT_EXISTS` | If `true`, redirects to home when route doesn't exist. If `false`, shows 404 page. |
| `EXPO_PUBLIC_TEMPLATE_API_URL`             | Users API base URL.                                                                |

```bash
EXPO_PUBLIC_REDIRECT_IF_ROUTE_NOT_EXISTS=false
EXPO_PUBLIC_TEMPLATE_API_URL=https://jsonplaceholder.typicode.com
```

> Note: variables defined in `.env` are **not** automatically picked up by EAS cloud builds — they only apply locally. See [Environment Variables in EAS Builds](#environment-variables-in-eas-builds) for how to register them for production.

## Project Structure

```
react-native-ts-expo-boilerplate/
├── __tests__/                      # Test suite
│   ├── __mocks__/                  # Shared mock data and module mocks
│   ├── components/                 # Tests for reusable components
│   ├── constants/                  # Tests for constants
│   ├── screens/                    # Tests for screen components
│   ├── services/                   # Tests for service modules
│   └── jest.setup.ts               # Jest global setup
├── app/                            # expo-router file-based routes
│   ├── _layout.tsx                 # Root layout (StatusBar, global providers)
│   ├── +not-found.tsx              # 404 / redirect handler
│   ├── index.tsx                   # Home screen route "/"
│   ├── about.tsx                   # About screen route "/about"
│   ├── context.tsx                 # Context screen "/context" (CounterProvider scoped here)
│   ├── users.tsx                   # Users screen route "/users"
│   └── product/
│       └── [id].tsx                # Dynamic product route "/product/:id"
├── assets/                         # Static assets (icon, splash, fonts, images)
│   ├── icon.png
│   ├── splash.png
│   ├── adaptive-icon.png
│   └── favicon.png
├── src/
│   ├── components/                 # Reusable UI components
│   │   ├── Action/                 # Pressable button component
│   │   ├── Link/                   # expo-router Link wrapper component
│   │   └── UserCard/               # User profile card component
│   ├── constants/                  # App-wide constant values
│   │   └── envs.ts                 # Environment variable constants
│   ├── contexts/                   # React context definitions and providers
│   │   └── CounterContext/         # Counter state context
│   ├── hooks/                      # Custom React hooks
│   │   └── useCounterContext.ts    # Hook to consume CounterContext
│   ├── screens/                    # Screen components (imported by app/ routes)
│   │   ├── AboutScreen/
│   │   ├── ContextScreen/
│   │   ├── HomeScreen/
│   │   ├── NotFoundScreen/
│   │   ├── ProductScreen/
│   │   └── UsersScreen/
│   ├── services/                   # API communication layer
│   │   └── userService.ts          # User resource API calls
│   ├── styles/                     # Theme and design tokens
│   │   ├── colors.ts               # Raw color palette
│   │   └── theme.ts                # Semantic design tokens
│   └── types/                      # TypeScript type definitions
│       ├── app.ts                  # Domain model types
│       ├── envs.ts                 # Env variable types
│       ├── hooks.ts                # Hook return types
│       └── props.ts                # Component prop types
├── .env.example                    # Example environment variables
├── app.json                        # Expo app configuration
├── babel.config.js                 # Babel configuration
├── eslint.config.js                # ESLint flat config
├── jest.config.js                  # Jest configuration
├── tsconfig.json                   # TypeScript project references
├── tsconfig.app.json               # TypeScript config for src/ and app/
├── tsconfig.base.json              # Base TypeScript compiler options
└── tsconfig.test.json              # TypeScript config for tests
```

| Folder / File        | Description                                                         |
| -------------------- | ------------------------------------------------------------------- |
| `app/`               | expo-router file-based routes — thin layer, imports from `src/`     |
| `app/_layout.tsx`    | Root layout wrapping all routes (StatusBar, global providers)       |
| `app/+not-found.tsx` | Catches unmatched routes — redirects or shows 404 based on env var  |
| `assets/`            | Static assets referenced in `app.json` (icon, splash, fonts)        |
| `src/components/`    | Presentational components reused across screens                     |
| `src/constants/`     | Centralized constants — env vars parsed and typed once              |
| `src/contexts/`      | React Context definitions and their Provider components             |
| `src/hooks/`         | Custom hooks that encapsulate context consumption or reusable logic |
| `src/screens/`       | One folder per screen; each contains a `.tsx` with its StyleSheet   |
| `src/services/`      | `fetch`-based API modules, one per resource                         |
| `src/styles/`        | Two-layer theme system: raw color palette + semantic tokens         |
| `src/types/`         | TypeScript interfaces and types, split by concern                   |

## Architecture & Design Patterns

The folder structure above is the skeleton — these are the design decisions that hold it together.

### Routing Layer vs. Logic Layer separation

The `app/` directory is intentionally thin. Every file in it does one thing: export a screen component (or a screen wrapped in its scoped provider). All business logic, state, and UI lives in `src/`. This separation means the routing layer can be restructured without touching any screen logic, and every screen in `src/` can be tested in isolation without a router.

```
app/context.tsx          ← mounts the provider and renders the screen
src/screens/ContextScreen/ContextScreen.tsx  ← owns all logic and UI
```

### File-based routing (expo-router)

Navigation structure is defined by the file system. Adding a screen means adding a file — no central router config to maintain. Dynamic segments use the `[param]` filename convention (`product/[id].tsx`). Route groups and nested layouts are expressed through folders, keeping navigation intent visible at a glance.

### Context + Provider + custom hook pattern

Shared state is managed with React Context, scoped as narrowly as possible. The provider is mounted at the route level (`app/context.tsx`), not at the root, so it only exists while that route is active. The context value is never consumed directly — a dedicated custom hook (`useCounterContext`) wraps `useContext`, validates that the consumer is inside the provider, and exposes a clean API. Components never import the context object itself.

```
CounterContext      ← defines the context and its shape
CounterProvider     ← owns the state and exposes actions
useCounterContext   ← the only way consumers access the context
```

### Service layer

API communication is fully isolated in `src/services/`. Service modules are plain async functions — no classes, no singletons, no global state. They receive inputs, call `fetch`, validate the response, and return typed data. Components call services; services never know about components. The base URL is injected through the env constant, so services never reference `process.env` directly.

### Two-layer theme system

Styles follow a token architecture with two distinct layers. The first layer (`colors.ts`) defines the raw palette as named values. The second layer (`theme.ts`) maps those values to semantic roles (`primary`, `text.secondary`, `status.error`). Components always import from `theme`, never from `colors`. This means the entire visual identity of the app can be changed by editing the palette, and semantic meaning is never coupled to a specific hex value.

### Centralized environment variables

Raw `process.env` access is confined to a single file (`src/constants/envs.ts`). It parses, casts, and exports a typed `envs` object. The rest of the codebase imports from `envs`, not from `process.env`. This makes environment variable usage searchable, typed, and easy to mock in tests.

### TypeScript strictness as a guardrail

The tsconfig enables `strict`, `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`, `noImplicitReturns`, and `noImplicitOverride`. These are not style preferences — they are compile-time guarantees. Explicit return types on all functions, type-only imports, and no `any` are enforced by ESLint rules on top of the compiler. Errors surface at development time, not at runtime on a device.

## Testing

The project uses **Jest 29** + **@testing-library/react-native**, configured with the `jest-expo` preset, `transformIgnorePatterns` adjusted for React Native's `node_modules`, path aliases working in tests, and a coverage threshold enforced at 70% across branches, functions, lines, and statements.

1. Navigate to the project folder.
2. Run the test suite with the command that fits your workflow:

| Command                 | Description                    |
| ----------------------- | ------------------------------ |
| `npm run test`          | Run tests once                 |
| `npm run test:watch`    | Run tests in watch mode        |
| `npm run test:coverage` | Run tests with coverage report |

A coverage report under 70% will fail the run, so it doubles as a regression gate before shipping a build.

## Security Audit

Before producing a release build, audit dependencies and the project configuration.

### npm audit

Check for known vulnerabilities in dependencies:

```bash
npm audit
```

See [Known Issues](#known-issues) for the current state of `npm audit` on this project — some warnings are expected and explained there.

### Expo Doctor

Run a full health check on the project (dependency versions, SDK compatibility, configuration):

```bash
npm run doctor
```

A clean `expo-doctor` run is the signal that the dependency tree is aligned with the installed SDK and safe to build.

## Build

Once tests pass and the audit is clean, the next step is producing a native binary. This boilerplate ships with an `eas.json` configured for **Expo Application Services (EAS) Build**, the official Expo cloud build service for producing native iOS and Android binaries without requiring a local Mac or Xcode.

### Prerequisites

1. Install EAS CLI globally:
   ```bash
   npm install -g eas-cli
   ```
2. Create a free account at [expo.dev](https://expo.dev) and log in:
   ```bash
   eas login
   ```
3. In `app.json`, set a unique `bundleIdentifier` (iOS) and `package` (Android) for your app:
   ```json
   {
     "expo": {
       "ios": {
         "bundleIdentifier": "com.yourcompany.yourapp",
         "supportsTablet": true
       },
       "android": {
         "package": "com.yourcompany.yourapp",
         "adaptiveIcon": { "...": "..." }
       }
     }
   }
   ```
4. Link your local project to EAS (run once per project):
   ```bash
   eas build:configure
   ```

### Build Profiles

| Profile       | Purpose                                     | Distribution                 |
| ------------- | ------------------------------------------- | ---------------------------- |
| `development` | Development build with `expo-dev-client`    | Internal (device / emulator) |
| `preview`     | Functional build for QA and manual testing  | Internal (APK / Ad Hoc IPA)  |
| `production`  | Store-ready binary, auto-increments version | App Store / Play Store       |

### Build Commands

```bash
# Android APK for internal testing
eas build --profile preview --platform android

# iOS build for internal testing
eas build --profile preview --platform ios

# Production build for both platforms
eas build --profile production --platform all
```

### Environment Variables in EAS Builds

Variables defined locally in `.env` (see [Env Keys](#env-keys)) are **not** automatically available during EAS cloud builds. Register them via the EAS dashboard or CLI:

```bash
eas env:create --scope project --name EXPO_PUBLIC_TEMPLATE_API_URL --value https://api.yourapp.com
eas env:create --scope project --name EXPO_PUBLIC_REDIRECT_IF_ROUTE_NOT_EXISTS --value false
```

Non-sensitive values can alternatively be inlined directly in `eas.json` under each build profile using the `env` key:

```json
{
  "build": {
    "production": {
      "autoIncrement": true,
      "env": {
        "EXPO_PUBLIC_REDIRECT_IF_ROUTE_NOT_EXISTS": "false"
      }
    }
  }
}
```

## Production

Final checklist for shipping to the stores. Each step assumes the previous sections are already done — this is just the order to execute them in.

1. **Tests pass** — see [Testing](#testing). Run `npm run test:coverage` and verify the 70% threshold is met.
2. **Audit clean** — see [Security Audit](#security-audit). Run `npm audit` and `npm run doctor`. Acknowledge any open items in [Known Issues](#known-issues).
3. **Production env vars registered in EAS** — see [Environment Variables in EAS Builds](#environment-variables-in-eas-builds). Make sure `EXPO_PUBLIC_TEMPLATE_API_URL` and `EXPO_PUBLIC_REDIRECT_IF_ROUTE_NOT_EXISTS` point to your real production backend, not the local `.env` defaults.
4. **Production build** — see [Build Commands](#build-commands). Run `eas build --profile production --platform all`.
5. **Submit to stores**:

   ```bash
   # Submit to Google Play Store
   eas submit --profile production --platform android

   # Submit to Apple App Store
   eas submit --profile production --platform ios
   ```

   For Android, you need a [Google Play service account JSON key](https://github.com/expo/fyi/blob/main/creating-google-service-account.md) — set its path in `eas.json` under `submit.production.android.serviceAccountKeyPath`. For iOS, EAS authenticates with your Apple Developer account interactively on first submit.

## Known Issues

### npm audit reports 18 vulnerabilities (4 low, 14 moderate)

Running `npm audit` reports vulnerabilities in `@tootallnate/once`, `postcss`, and `uuid`. All of them are transitive dependencies of Expo's internal toolchain — specifically `jest-expo`, `@expo/cli`, `@expo/metro-config`, and `@expo/config-plugins`. None of these packages are included in the app bundle delivered to end users; they run exclusively on the developer's machine during build and test.

The suggested fix (`npm audit fix --force`) would downgrade `expo` to v49 and `jest-expo` to v47, both of which are incompatible with the current SDK. Do not run it.

This is a known limitation of the Expo ecosystem tracked upstream. The vulnerabilities will be resolved when Expo updates its internal dependencies. No action is required on the project side.

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/react-native-ts-expo-boilerplate`](https://www.diegolibonati.com.ar/#/project/react-native-ts-expo-boilerplate)
