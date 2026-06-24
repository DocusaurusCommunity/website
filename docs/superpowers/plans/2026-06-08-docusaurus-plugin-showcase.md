# `@homotechsual/docusaurus-plugin-showcase` Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone Docusaurus plugin that registers a swizzleable showcase page, loads items from consumer-provided YAML files at build time, and ships a pre-built plugins-directory preset.

**Architecture:** Single npm package (`@homotechsual/docusaurus-plugin-showcase`). Plugin lifecycle in `src/plugin.ts` uses `loadContent` (Node-side YAML loading + AJV validation) and `contentLoaded` (route registration with serialised data). Theme components live under `src/theme/` and are registered via `getThemePath()` for swizzling. A `pluginsPreset` export in `src/presets/plugins.ts` pre-wires all tags, statuses, and schema path for the Docusaurus community plugin directory use-case. Icons are inline SVG components copied from Heroicons (MIT).

**Tech Stack:** TypeScript 6 (NodeNext ESM), React 18, Docusaurus 3.x plugin API, `js-yaml`, `ajv`, `react-popper`, `@popperjs/core`, `clsx`, `glob`, `vitest`, Yarn 4, GitHub Actions (OIDC trusted publish)

---

## File Map

```text
J:\Projects\docusaurus-showcase\
├── .github/workflows/
│   ├── ci.yml
│   └── publish.yml
├── schema/
│   ├── showcase/1.0.0.json
│   └── plugins-preset/1.0.0.json
├── scripts/
│   └── copy-assets.mjs
├── src/
│   ├── core/
│   │   ├── types.ts          — ShowcaseItem, TagDef, StatusDef, PluginOptions
│   │   └── utils.ts          — sortBy, toggleListItem (pure, no Docusaurus dep)
│   ├── icons/
│   │   ├── CircleCheck.tsx   — Heroicons solid check-circle SVG
│   │   ├── CircleMinus.tsx   — Heroicons solid minus-circle SVG
│   │   ├── CircleX.tsx       — Heroicons solid x-circle SVG
│   │   ├── Docusaurus.tsx    — Docusaurus dinosaur SVG (Apache 2.0)
│   │   ├── Heart.tsx         — Heroicons solid heart SVG
│   │   └── PlusSquare.tsx    — Heroicons solid plus-circle SVG
│   ├── loaders/
│   │   └── yaml.ts           — glob YAML files, parse, validate with ajv, return ShowcaseItem[]
│   ├── presets/
│   │   ├── index.ts          — re-exports pluginsPreset
│   │   └── plugins.ts        — pluginsPreset: tags, statuses, schemaPath
│   ├── theme/
│   │   ├── icons.ts          — SHOWCASE_ICONS map: string id → SVG component
│   │   ├── ShowcaseCard/
│   │   │   ├── index.tsx
│   │   │   └── styles.module.css
│   │   ├── ShowcaseFilters/
│   │   │   ├── index.tsx
│   │   │   └── styles.module.css
│   │   ├── ShowcaseFilterToggle/
│   │   │   └── index.tsx
│   │   ├── ShowcasePage/
│   │   │   ├── index.tsx
│   │   │   └── styles.module.css
│   │   ├── ShowcaseStatusSelect/
│   │   │   └── index.tsx
│   │   ├── ShowcaseTagSelect/
│   │   │   └── index.tsx
│   │   └── ShowcaseTooltip/
│   │       └── index.tsx
│   ├── declarations.d.ts     — CSS module + SVG type stubs
│   ├── index.ts              — package entrypoint: default plugin + public types
│   └── plugin.ts             — loadContent, contentLoaded, getThemePath, validateOptions
├── tests/
│   ├── core/utils.test.ts
│   ├── fixtures/
│   │   ├── valid-plugin.yaml
│   │   └── invalid-plugin.yaml
│   └── loaders/yaml.test.ts
├── .gitignore
├── CHANGELOG.md
├── LICENSE
├── README.md
├── cspell.json
├── eslint.config.js
├── package.json
├── tsconfig.json
└── vitest.config.ts
```

---

## Task 1: Initialize Project

**Files:**
- Create: `J:\Projects\docusaurus-showcase\` (new git repo)
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `eslint.config.js`
- Create: `cspell.json`
- Create: `vitest.config.ts`
- Create: `.gitignore`
- Create: `scripts/copy-assets.mjs`
- Create: `CHANGELOG.md`
- Create: `LICENSE`

- [ ] **Step 1: Create repo directory and initialize git**

```bash
mkdir "J:\Projects\docusaurus-showcase"
cd "J:\Projects\docusaurus-showcase"
git init
corepack enable
```

- [ ] **Step 2: Create `package.json`**

```json
{
  "name": "@homotechsual/docusaurus-plugin-showcase",
  "version": "0.1.0",
  "description": "A Docusaurus plugin for building swizzleable showcase / directory pages from YAML data",
  "type": "module",
  "main": "lib/index.js",
  "types": "lib/index.d.ts",
  "exports": {
    ".": {
      "types": "./lib/index.d.ts",
      "import": "./lib/index.js"
    },
    "./presets": {
      "types": "./lib/presets/index.d.ts",
      "import": "./lib/presets/index.js"
    },
    "./schema/*": "./schema/*"
  },
  "files": [
    "lib/**/*.js",
    "lib/**/*.js.map",
    "lib/**/*.d.ts",
    "lib/**/*.d.ts.map",
    "lib/**/*.css",
    "schema/**/*.json"
  ],
  "scripts": {
    "build": "tsc && node scripts/copy-assets.mjs",
    "watch": "tsc --watch",
    "lint": "eslint src",
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\"",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/homotechsual/docusaurus-plugin-showcase.git"
  },
  "keywords": ["docusaurus", "docusaurus-plugin", "showcase", "directory"],
  "author": "Mikey O'Toole <mikey@homotechsual.dev>",
  "license": "Apache-2.0",
  "bugs": {
    "url": "https://github.com/homotechsual/docusaurus-plugin-showcase/issues"
  },
  "homepage": "https://github.com/homotechsual/docusaurus-plugin-showcase#readme",
  "peerDependencies": {
    "@docusaurus/core": ">=3.0.0 <5.0.0",
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  },
  "dependencies": {
    "@popperjs/core": "^2.11.8",
    "ajv": "^8.17.1",
    "clsx": "^2.1.1",
    "glob": "^11.0.0",
    "js-yaml": "^4.1.0",
    "react-popper": "^2.3.0"
  },
  "devDependencies": {
    "@docusaurus/core": "^3.5.0",
    "@docusaurus/theme-common": "^3.5.0",
    "@docusaurus/types": "^3.5.0",
    "@types/js-yaml": "^4.0.9",
    "@types/node": "^22.0.0",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "copyfiles": "^2.4.1",
    "eslint": "^9.0.0",
    "eslint-config-prettier": "^10.0.0",
    "globals": "^16.0.0",
    "prettier": "^3.3.3",
    "typescript": "^5.5.4",
    "typescript-eslint": "^8.0.0",
    "vitest": "^3.0.0"
  },
  "publishConfig": {
    "access": "public"
  }
}
```

- [ ] **Step 3: Install dependencies**

```bash
yarn install
```

Expected: Yarn 4 installs all packages, creates `yarn.lock`.

- [ ] **Step 4: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "NodeNext",
    "lib": ["ESNext", "DOM"],
    "jsx": "react-jsx",
    "outDir": "./lib",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "NodeNext",
    "types": ["node"]
  },
  "include": ["src/**/*", "tests/**/*"],
  "exclude": ["node_modules", "lib"]
}
```

- [ ] **Step 5: Create `eslint.config.js`**

```js
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
  { ignores: ['lib/**', 'scripts/**'] },
  tseslint.configs.recommended,
  prettier,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
  },
);
```

- [ ] **Step 6: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
})
```

- [ ] **Step 7: Create `cspell.json`**

```json
{
  "version": "0.2",
  "language": "en",
  "words": [
    "docusaurus",
    "homotechsual",
    "showcaseable",
    "swizzleable",
    "ajv",
    "clsx",
    "popper",
    "popperjs",
    "rehype",
    "remark",
    "vitest"
  ],
  "ignorePaths": ["node_modules", "lib", "*.lock"]
}
```

- [ ] **Step 8: Create `scripts/copy-assets.mjs`**

This copies `.css` files from `src/` to `lib/` after `tsc` compiles the TypeScript (tsc does not copy non-TS files).

```js
#!/usr/bin/env node
import { readdirSync, statSync, copyFileSync, mkdirSync, existsSync } from 'fs'
import { join, relative, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const srcDir = join(__dirname, '../src')
const libDir = join(__dirname, '../lib')

function copyAssets(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const srcPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      copyAssets(srcPath)
    } else if (entry.name.endsWith('.css')) {
      const relPath = relative(srcDir, srcPath)
      const destPath = join(libDir, relPath)
      const destDir = dirname(destPath)
      if (!existsSync(destDir)) mkdirSync(destDir, { recursive: true })
      copyFileSync(srcPath, destPath)
      console.log(`Copied: ${relPath}`)
    }
  }
}

copyAssets(srcDir)
console.log('Assets copied.')
```

- [ ] **Step 9: Create `.gitignore`**

```
node_modules/
lib/
.yarn/cache
.yarn/install-state.gz
*.tgz
```

- [ ] **Step 10: Create `LICENSE`**

Copy the Apache-2.0 license text. Header line:
```
Copyright 2024 Mikey O'Toole
```

- [ ] **Step 11: Create `CHANGELOG.md`**

```markdown
# Changelog

## [Unreleased]
```

- [ ] **Step 12: Verify directory structure**

```bash
ls -la
```

Expected: `.git`, `.gitignore`, `CHANGELOG.md`, `LICENSE`, `cspell.json`, `eslint.config.js`, `node_modules`, `package.json`, `scripts/`, `tsconfig.json`, `vitest.config.ts`, `yarn.lock` are all present.

- [ ] **Step 13: Initial commit**

```bash
git add .
git commit -m "chore: initialize project scaffolding"
```

---

## Task 2: Core Types

**Files:**
- Create: `src/core/types.ts`

- [ ] **Step 1: Create `src/core/types.ts`**

```ts
import type React from 'react'

export type TagDef = {
  label: string
  description: string
  color: string
  icon?: string | null
}

export type StatusDef = {
  label: string
  description: string
  icon?: string | null
}

export type ShowcaseItem = {
  id: string
  name: string
  description: string
  website: string
  source?: string | null
  preview?: string | null
  author?: string | null
  tags: string[]
  status?: string | null
  npmPackages?: string[] | null
  minimumVersion?: string | null
  [key: string]: unknown
}

export type PluginOptions = {
  dataDir: string
  routeBasePath: string
  tags: Record<string, TagDef>
  statuses: Record<string, StatusDef>
  favouriteTag?: string | null
  pageTitle?: string | null
  pageDescription?: string | null
  submitUrl?: string | null
  schemaPath?: string | null
}

export type ShowcasePageData = {
  items: ShowcaseItem[]
  options: PluginOptions
}
```

Note: `icon` in `TagDef` and `StatusDef` is a **string identifier** (e.g. `'heart'`, `'circle-check'`) — not a React node. This ensures the data is JSON-serializable so Docusaurus can pass it to the page component via `createData`.

Note: `React` is imported as a type to satisfy the JSX transform reference in the tsconfig. It is not used at runtime in this file.

- [ ] **Step 2: Verify file compiles**

```bash
yarn tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/core/types.ts
git commit -m "feat: add core ShowcaseItem, TagDef, StatusDef, PluginOptions types"
```

---

## Task 3: Core Utils + Tests (TDD)

**Files:**
- Create: `tests/core/utils.test.ts`
- Create: `src/core/utils.ts`

- [ ] **Step 1: Write failing tests in `tests/core/utils.test.ts`**

```ts
import { describe, it, expect } from 'vitest'
import { sortBy, toggleListItem } from '../../src/core/utils.js'

describe('sortBy', () => {
  it('sorts an array by a string getter ascending', () => {
    const input = [{ name: 'Zebra' }, { name: 'Apple' }, { name: 'Mango' }]
    const result = sortBy(input, (x) => x.name.toLowerCase())
    expect(result.map((x) => x.name)).toEqual(['Apple', 'Mango', 'Zebra'])
  })

  it('sorts an array by a number getter ascending', () => {
    const input = [{ n: 3 }, { n: 1 }, { n: 2 }]
    const result = sortBy(input, (x) => x.n)
    expect(result.map((x) => x.n)).toEqual([1, 2, 3])
  })

  it('does not mutate the original array', () => {
    const input = [{ n: 2 }, { n: 1 }]
    sortBy(input, (x) => x.n)
    expect(input[0].n).toBe(2)
  })

  it('returns empty array unchanged', () => {
    expect(sortBy([], (x: string) => x)).toEqual([])
  })
})

describe('toggleListItem', () => {
  it('adds item when not present', () => {
    expect(toggleListItem(['a', 'b'], 'c')).toEqual(['a', 'b', 'c'])
  })

  it('removes item when present', () => {
    expect(toggleListItem(['a', 'b', 'c'], 'b')).toEqual(['a', 'c'])
  })

  it('does not mutate the original array', () => {
    const input = ['a', 'b']
    toggleListItem(input, 'a')
    expect(input).toEqual(['a', 'b'])
  })

  it('returns empty array when removing last item', () => {
    expect(toggleListItem(['a'], 'a')).toEqual([])
  })
})
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
yarn test
```

Expected: FAIL — `Cannot find module '../../src/core/utils.js'`

- [ ] **Step 3: Implement `src/core/utils.ts`**

```ts
export function sortBy<T>(
  array: T[],
  getter: (item: T) => string | number | boolean,
): T[] {
  const copy = [...array]
  copy.sort((a, b) => {
    const va = getter(a)
    const vb = getter(b)
    if (va > vb) return 1
    if (vb > va) return -1
    return 0
  })
  return copy
}

export function toggleListItem<T>(list: T[], item: T): T[] {
  const index = list.indexOf(item)
  if (index === -1) return [...list, item]
  const copy = [...list]
  copy.splice(index, 1)
  return copy
}
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
yarn test
```

Expected: All 8 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/core/utils.ts tests/core/utils.test.ts
git commit -m "feat: add sortBy and toggleListItem utils with tests"
```

---

## Task 4: JSON Schemas

**Files:**
- Create: `schema/showcase/1.0.0.json`
- Create: `schema/plugins-preset/1.0.0.json`

- [ ] **Step 1: Create `schema/showcase/1.0.0.json`**

Core schema for any `ShowcaseItem`. Used as default when no preset schema is specified.

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://github.com/homotechsual/docusaurus-plugin-showcase/schema/showcase/1.0.0.json",
  "title": "ShowcaseItem",
  "type": "object",
  "required": ["id", "name", "description", "website"],
  "additionalProperties": true,
  "properties": {
    "id": {
      "type": "string",
      "description": "Unique identifier for this item (e.g. 'author.plugin-name')"
    },
    "name": {
      "type": "string",
      "description": "Display name"
    },
    "description": {
      "type": "string",
      "description": "Short description"
    },
    "website": {
      "type": "string",
      "format": "uri",
      "description": "Primary URL (docs site, GitHub page, npm page, etc.)"
    },
    "source": {
      "type": ["string", "null"],
      "format": "uri",
      "description": "Source code URL"
    },
    "preview": {
      "type": ["string", "null"],
      "description": "Preview image URL. null = use screenshot service"
    },
    "author": {
      "type": ["string", "null"],
      "description": "Author handle or name"
    },
    "tags": {
      "type": "array",
      "items": { "type": "string" },
      "description": "Tag keys defined in plugin options"
    },
    "status": {
      "type": ["string", "null"],
      "description": "Status key defined in plugin options"
    },
    "npmPackages": {
      "type": ["array", "null"],
      "items": { "type": "string" },
      "description": "npm package name(s)"
    },
    "minimumVersion": {
      "type": ["string", "null"],
      "description": "Minimum Docusaurus version required"
    }
  }
}
```

- [ ] **Step 2: Create `schema/plugins-preset/1.0.0.json`**

Extends core schema, constrains `tags` and `status` to the plugins-preset values.

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://github.com/homotechsual/docusaurus-plugin-showcase/schema/plugins-preset/1.0.0.json",
  "title": "PluginsPresetItem",
  "type": "object",
  "required": ["id", "name", "description", "website"],
  "additionalProperties": false,
  "properties": {
    "id": { "type": "string" },
    "name": { "type": "string" },
    "description": { "type": "string" },
    "website": { "type": "string", "format": "uri" },
    "source": { "type": ["string", "null"], "format": "uri" },
    "preview": { "type": ["string", "null"] },
    "author": { "type": ["string", "null"] },
    "tags": {
      "type": "array",
      "items": {
        "type": "string",
        "enum": [
          "favourite",
          "docusaurus",
          "search",
          "api",
          "utility",
          "content",
          "theme",
          "markdown",
          "analytics",
          "integration",
          "seo",
          "editing"
        ]
      }
    },
    "status": {
      "type": ["string", "null"],
      "enum": ["maintained", "unmaintained", "unknown", null]
    },
    "npmPackages": { "type": ["array", "null"], "items": { "type": "string" } },
    "minimumVersion": { "type": ["string", "null"] }
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add schema/
git commit -m "feat: add core and plugins-preset JSON schemas"
```

---

## Task 5: Icon Components + Theme Icon Map

**Files:**
- Create: `src/icons/Heart.tsx`
- Create: `src/icons/CircleCheck.tsx`
- Create: `src/icons/CircleX.tsx`
- Create: `src/icons/CircleMinus.tsx`
- Create: `src/icons/PlusSquare.tsx`
- Create: `src/icons/Docusaurus.tsx`
- Create: `src/declarations.d.ts`
- Create: `src/theme/icons.ts`

- [ ] **Step 1: Create `src/declarations.d.ts`**

```ts
declare module '*.module.css' {
  const styles: Record<string, string>
  export default styles
}
```

- [ ] **Step 2: Create `src/icons/Heart.tsx`**

```tsx
// Heroicons MIT License — https://github.com/tailwindlabs/heroicons
type IconProps = { className?: string; size?: number }

export default function Heart({ className, size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
    </svg>
  )
}
```

- [ ] **Step 3: Create `src/icons/CircleCheck.tsx`**

```tsx
// Heroicons MIT License — https://github.com/tailwindlabs/heroicons
type IconProps = { className?: string; size?: number }

export default function CircleCheck({ className, size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  )
}
```

- [ ] **Step 4: Create `src/icons/CircleX.tsx`**

```tsx
// Heroicons MIT License — https://github.com/tailwindlabs/heroicons
type IconProps = { className?: string; size?: number }

export default function CircleX({ className, size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
        clipRule="evenodd"
      />
    </svg>
  )
}
```

- [ ] **Step 5: Create `src/icons/CircleMinus.tsx`**

```tsx
// Heroicons MIT License — https://github.com/tailwindlabs/heroicons
type IconProps = { className?: string; size?: number }

export default function CircleMinus({ className, size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm3 10.5a.75.75 0 000-1.5H9a.75.75 0 000 1.5h6z"
        clipRule="evenodd"
      />
    </svg>
  )
}
```

- [ ] **Step 6: Create `src/icons/PlusSquare.tsx`**

```tsx
// Heroicons MIT License — https://github.com/tailwindlabs/heroicons
type IconProps = { className?: string; size?: number }

export default function PlusSquare({ className, size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
        clipRule="evenodd"
      />
    </svg>
  )
}
```

- [ ] **Step 7: Create `src/icons/Docusaurus.tsx`**

Inline the Docusaurus dinosaur SVG (Apache 2.0 — https://github.com/facebook/docusaurus). Copy the SVG path data from `packages/docusaurus/static/img/docusaurus.svg` in the Docusaurus repo. Below is a minimal representative version — replace with the real paths:

```tsx
// Docusaurus SVG — Apache 2.0 — https://github.com/facebook/docusaurus
type IconProps = { className?: string }

export default function DocusaurusIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      className={className}
      aria-hidden="true"
    >
      {/* Replace with actual Docusaurus SVG paths from:
          https://github.com/facebook/docusaurus/blob/main/website/static/img/docusaurus.svg */}
      <circle cx="12" cy="12" r="10" fill="#3ECC5F" />
    </svg>
  )
}
```

> **Note for implementer:** Open the actual Docusaurus SVG file from the Docusaurus GitHub repo and replace the placeholder `<circle>` with the real paths. The file is Apache 2.0 licensed.

- [ ] **Step 8: Create `src/theme/icons.ts`**

Maps string icon identifiers (stored in YAML / `StatusDef.icon`) to React components.

```ts
import type React from 'react'
import CircleCheck from '../icons/CircleCheck.js'
import CircleMinus from '../icons/CircleMinus.js'
import CircleX from '../icons/CircleX.js'
import DocusaurusIcon from '../icons/Docusaurus.js'
import Heart from '../icons/Heart.js'
import PlusSquare from '../icons/PlusSquare.js'

type IconComponent = React.ComponentType<{ className?: string; size?: number }>

export const SHOWCASE_ICONS: Record<string, IconComponent> = {
  'circle-check': CircleCheck,
  'circle-minus': CircleMinus,
  'circle-x': CircleX,
  'docusaurus': DocusaurusIcon,
  'heart': Heart,
  'plus-square': PlusSquare,
}

export function getIcon(id: string | null | undefined): IconComponent | null {
  if (!id) return null
  return SHOWCASE_ICONS[id] ?? null
}
```

- [ ] **Step 9: Verify TypeScript compiles**

```bash
yarn tsc --noEmit
```

Expected: No errors.

- [ ] **Step 10: Commit**

```bash
git add src/icons/ src/declarations.d.ts src/theme/icons.ts
git commit -m "feat: add inline Heroicons SVG components and icon map"
```

---

## Task 6: YAML Loader + Tests (TDD)

**Files:**
- Create: `tests/fixtures/valid-plugin.yaml`
- Create: `tests/fixtures/invalid-plugin.yaml`
- Create: `tests/loaders/yaml.test.ts`
- Create: `src/loaders/yaml.ts`

- [ ] **Step 1: Create `tests/fixtures/valid-plugin.yaml`**

```yaml
id: test.my-plugin
name: My Plugin
description: A test Docusaurus plugin.
website: https://github.com/test/my-plugin
source: https://github.com/test/my-plugin
author: test
tags:
  - utility
status: maintained
npmPackages:
  - my-plugin
minimumVersion: "3.0.0"
```

- [ ] **Step 2: Create `tests/fixtures/invalid-plugin.yaml`**

```yaml
# Missing required field 'name'
id: test.bad-plugin
description: Bad plugin.
website: not-a-url
```

- [ ] **Step 3: Write failing tests in `tests/loaders/yaml.test.ts`**

```ts
import { describe, it, expect, vi } from 'vitest'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadShowcaseItems } from '../../src/loaders/yaml.js'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const fixturesDir = resolve(__dirname, '../fixtures')

describe('loadShowcaseItems', () => {
  it('loads valid YAML files and returns ShowcaseItem array', async () => {
    const warnings: string[] = []
    const items = await loadShowcaseItems(
      fixturesDir,
      { dataDir: '.', routeBasePath: 'showcase', tags: {}, statuses: {} },
      (msg) => warnings.push(msg),
    )
    const validItem = items.find((i) => i.id === 'test.my-plugin')
    expect(validItem).toBeDefined()
    expect(validItem?.name).toBe('My Plugin')
    expect(validItem?.tags).toEqual(['utility'])
  })

  it('skips files that fail schema validation and emits a warning', async () => {
    const warnings: string[] = []
    const items = await loadShowcaseItems(
      fixturesDir,
      { dataDir: '.', routeBasePath: 'showcase', tags: {}, statuses: {} },
      (msg) => warnings.push(msg),
    )
    const badItem = items.find((i) => (i as Record<string, unknown>)['id'] === 'test.bad-plugin')
    // invalid-plugin.yaml fails validation (missing 'name') — should be skipped
    expect(badItem).toBeUndefined()
    expect(warnings.some((w) => w.includes('invalid-plugin.yaml'))).toBe(true)
  })

  it('returns empty array when dataDir does not exist', async () => {
    const warnings: string[] = []
    const items = await loadShowcaseItems(
      '/nonexistent/path',
      { dataDir: '.', routeBasePath: 'showcase', tags: {}, statuses: {} },
      (msg) => warnings.push(msg),
    )
    expect(items).toEqual([])
    expect(warnings.length).toBeGreaterThan(0)
  })
})
```

- [ ] **Step 4: Run tests to confirm they fail**

```bash
yarn test
```

Expected: FAIL — `Cannot find module '../../src/loaders/yaml.js'`

- [ ] **Step 5: Implement `src/loaders/yaml.ts`**

```ts
import { readFileSync, existsSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { globSync } from 'glob'
import yaml from 'js-yaml'
import Ajv from 'ajv'
import type { ShowcaseItem, PluginOptions } from '../core/types.js'

type WarnFn = (message: string) => void

export async function loadShowcaseItems(
  siteDir: string,
  options: Pick<PluginOptions, 'dataDir' | 'routeBasePath' | 'tags' | 'statuses' | 'schemaPath'>,
  warn: WarnFn,
): Promise<ShowcaseItem[]> {
  const dataDir = resolve(siteDir, options.dataDir)

  if (!existsSync(dataDir)) {
    warn(`[docusaurus-plugin-showcase] dataDir "${dataDir}" does not exist — no items loaded.`)
    return []
  }

  const schemaPath =
    options.schemaPath ??
    fileURLToPath(new URL('../../schema/showcase/1.0.0.json', import.meta.url))

  const ajv = new Ajv({ allErrors: true })
  let validate: ReturnType<typeof ajv.compile> | null = null

  if (existsSync(schemaPath)) {
    try {
      const schema = JSON.parse(readFileSync(schemaPath, 'utf-8')) as object
      validate = ajv.compile(schema)
    } catch (err) {
      warn(`[docusaurus-plugin-showcase] Could not load schema from "${schemaPath}": ${String(err)}`)
    }
  }

  const yamlFiles = globSync('**/*.yaml', { cwd: dataDir, absolute: true })
  const items: ShowcaseItem[] = []

  for (const filePath of yamlFiles) {
    try {
      const raw = yaml.load(readFileSync(filePath, 'utf-8'))

      if (validate && !validate(raw)) {
        const errors = ajv.errorsText(validate.errors)
        warn(`[docusaurus-plugin-showcase] Validation failed for "${filePath}": ${errors} — item skipped.`)
        continue
      }

      items.push(raw as ShowcaseItem)
    } catch (err) {
      warn(`[docusaurus-plugin-showcase] Failed to parse "${filePath}": ${String(err)} — item skipped.`)
    }
  }

  return items
}
```

- [ ] **Step 6: Run tests to confirm they pass**

```bash
yarn test
```

Expected: All loader tests PASS (3 tests). All utils tests still PASS.

- [ ] **Step 7: Commit**

```bash
git add src/loaders/yaml.ts tests/loaders/yaml.test.ts tests/fixtures/
git commit -m "feat: add YAML loader with AJV schema validation"
```

---

## Task 7: Plugin Lifecycle

**Files:**
- Create: `src/plugin.ts`
- Create: `src/index.ts`

- [ ] **Step 1: Create `src/plugin.ts`**

```ts
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { LoadContext, OptionValidationContext, Plugin } from '@docusaurus/types'
import type { PluginOptions, ShowcasePageData } from './core/types.js'
import { loadShowcaseItems } from './loaders/yaml.js'

function pluginShowcase(
  context: LoadContext,
  options: PluginOptions,
): Plugin<ShowcasePageData> {
  return {
    name: 'docusaurus-plugin-showcase',

    getThemePath() {
      return join(dirname(fileURLToPath(import.meta.url)), 'theme')
    },

    async loadContent(): Promise<ShowcasePageData> {
      const items = await loadShowcaseItems(
        context.siteDir,
        options,
        (msg) => console.warn(msg),
      )
      return { items, options }
    },

    async contentLoaded({ content, actions }) {
      const { createData, addRoute } = actions

      const showcaseDataPath = await createData(
        'showcase-data.json',
        JSON.stringify(content),
      )

      addRoute({
        path: `/${options.routeBasePath}`,
        component: '@theme/ShowcasePage',
        modules: { showcase: showcaseDataPath },
        exact: true,
      })
    },
  }
}

export function validateOptions({
  options,
}: OptionValidationContext<unknown, PluginOptions>): PluginOptions {
  const opts = options as Partial<PluginOptions>

  if (!opts.dataDir) {
    throw new Error('[docusaurus-plugin-showcase] The `dataDir` option is required.')
  }
  if (!opts.tags || Object.keys(opts.tags).length === 0) {
    throw new Error('[docusaurus-plugin-showcase] The `tags` option must define at least one tag.')
  }
  if (!opts.statuses || Object.keys(opts.statuses).length === 0) {
    throw new Error('[docusaurus-plugin-showcase] The `statuses` option must define at least one status.')
  }

  return {
    routeBasePath: 'showcase',
    ...opts,
    dataDir: opts.dataDir,
    tags: opts.tags,
    statuses: opts.statuses,
  }
}

export default pluginShowcase as unknown as (
  context: LoadContext,
  options: unknown,
) => Plugin<ShowcasePageData>
```

- [ ] **Step 2: Create `src/index.ts`**

```ts
export { default, validateOptions } from './plugin.js'
export type { ShowcaseItem, TagDef, StatusDef, PluginOptions, ShowcasePageData } from './core/types.js'
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
yarn tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add src/plugin.ts src/index.ts
git commit -m "feat: add plugin lifecycle (loadContent, contentLoaded, getThemePath, validateOptions)"
```

---

## Task 8: Simple Theme Components (Tooltip, FilterToggle, TagSelect, StatusSelect)

**Files:**
- Create: `src/theme/ShowcaseTooltip/index.tsx`
- Create: `src/theme/ShowcaseFilterToggle/index.tsx`
- Create: `src/theme/ShowcaseTagSelect/index.tsx`
- Create: `src/theme/ShowcaseStatusSelect/index.tsx`

- [ ] **Step 1: Create `src/theme/ShowcaseTooltip/index.tsx`**

Popper-based tooltip that wraps any trigger element. Used by TagSelect and StatusSelect to show descriptions.

```tsx
import React, { type ReactNode, useState, useRef } from 'react'
import { usePopper } from 'react-popper'

type Props = {
  id: string
  text: string
  anchorEl: string
  children: ReactNode
}

export default function ShowcaseTooltip({ id, text, anchorEl, children }: Props): JSX.Element {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLSpanElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const { styles: popperStyles, attributes } = usePopper(
    triggerRef.current,
    tooltipRef.current,
    {
      modifiers: [{ name: 'offset', options: { offset: [0, 8] } }],
    },
  )

  return (
    <>
      <span
        ref={triggerRef}
        aria-describedby={open ? id : undefined}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        {children}
      </span>
      {open && (
        <div
          id={id}
          role="tooltip"
          ref={tooltipRef}
          style={{
            ...popperStyles.popper,
            background: 'var(--ifm-color-emphasis-700)',
            color: 'var(--ifm-color-emphasis-0)',
            borderRadius: 4,
            padding: '4px 8px',
            fontSize: '0.8rem',
            maxWidth: 200,
            zIndex: 100,
          }}
          {...attributes.popper}
        >
          {text}
        </div>
      )}
    </>
  )
}
```

- [ ] **Step 2: Create `src/theme/ShowcaseFilterToggle/index.tsx`**

AND/OR operator toggle for combining multiple filters. Reads/writes `?operator=AND|OR` query param.

```tsx
import React from 'react'
import { useHistory, useLocation } from '@docusaurus/router'
import Translate from '@docusaurus/Translate'

export type Operator = 'AND' | 'OR'

const OperatorQueryKey = 'operator'

export function readOperator(search: string): Operator {
  return (new URLSearchParams(search).get(OperatorQueryKey) as Operator) ?? 'OR'
}

export default function ShowcaseFilterToggle(): JSX.Element {
  const history = useHistory()
  const location = useLocation()
  const operator = readOperator(location.search)

  const toggle = () => {
    const next = operator === 'OR' ? 'AND' : 'OR'
    const search = new URLSearchParams(location.search)
    search.set(OperatorQueryKey, next)
    history.push({ ...location, search: search.toString() })
  }

  return (
    <button onClick={toggle} className="button button--sm button--secondary">
      <Translate
        id="showcase.filterToggle.label"
        values={{ operator: <b>{operator}</b> }}
      >
        {'Filter: {operator}'}
      </Translate>
    </button>
  )
}
```

- [ ] **Step 3: Create `src/theme/ShowcaseTagSelect/index.tsx`**

Checkbox-style tag filter. Reads/writes `?tags=tag1,tag2` query param.

```tsx
import React, { type ReactNode } from 'react'
import { useHistory, useLocation } from '@docusaurus/router'
import { toggleListItem } from '../../core/utils.js'

type Props = {
  tag: string
  id: string
  label: string
  icon: ReactNode
}

const TagsQueryKey = 'tags'

export function readSearchTags(search: string): string[] {
  return new URLSearchParams(search).getAll(TagsQueryKey)
}

export default function ShowcaseTagSelect({ tag, id, label, icon }: Props): JSX.Element {
  const location = useLocation()
  const history = useHistory()
  const selectedTags = readSearchTags(location.search)
  const checked = selectedTags.includes(tag)

  const toggle = () => {
    const newTags = toggleListItem(selectedTags, tag)
    const search = new URLSearchParams(location.search)
    search.delete(TagsQueryKey)
    newTags.forEach((t) => search.append(TagsQueryKey, t))
    history.push({ ...location, search: search.toString() })
  }

  return (
    <label htmlFor={id} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={toggle}
        style={{ marginRight: 4 }}
      />
      {label}
      {icon}
    </label>
  )
}
```

- [ ] **Step 4: Create `src/theme/ShowcaseStatusSelect/index.tsx`**

Checkbox-style status filter. Reads/writes `?status=maintained` query param.

```tsx
import React, { type ReactNode } from 'react'
import { useHistory, useLocation } from '@docusaurus/router'
import { toggleListItem } from '../../core/utils.js'

type Props = {
  status: string
  id: string
  label: string
  icon: ReactNode
}

const StatusQueryKey = 'status'

export function readMaintenanceStatus(search: string): string[] {
  return new URLSearchParams(search).getAll(StatusQueryKey)
}

export default function ShowcaseStatusSelect({ status, id, label, icon }: Props): JSX.Element {
  const location = useLocation()
  const history = useHistory()
  const selectedStatuses = readMaintenanceStatus(location.search)
  const checked = selectedStatuses.includes(status)

  const toggle = () => {
    const newStatuses = toggleListItem(selectedStatuses, status)
    const search = new URLSearchParams(location.search)
    search.delete(StatusQueryKey)
    newStatuses.forEach((s) => search.append(StatusQueryKey, s))
    history.push({ ...location, search: search.toString() })
  }

  return (
    <label htmlFor={id} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={toggle}
        style={{ marginRight: 4 }}
      />
      {label}
      {icon}
    </label>
  )
}
```

- [ ] **Step 5: Verify TypeScript compiles**

```bash
yarn tsc --noEmit
```

Expected: No errors.

- [ ] **Step 6: Commit**

```bash
git add src/theme/ShowcaseTooltip/ src/theme/ShowcaseFilterToggle/ src/theme/ShowcaseTagSelect/ src/theme/ShowcaseStatusSelect/
git commit -m "feat: add ShowcaseTooltip, ShowcaseFilterToggle, ShowcaseTagSelect, ShowcaseStatusSelect components"
```

---

## Task 9: ShowcaseFilters Component

**Files:**
- Create: `src/theme/ShowcaseFilters/index.tsx`
- Create: `src/theme/ShowcaseFilters/styles.module.css`

- [ ] **Step 1: Create `src/theme/ShowcaseFilters/styles.module.css`**

```css
.filtersRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.filtersRowLeft {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  gap: 8px;
}

.tagList {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0;
  list-style: none;
  margin: 0 0 0.5rem;
}

.tagListItem {
  user-select: none;
  white-space: nowrap;
  height: 32px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
}

.searchContainer {
  margin-left: auto;
}

.searchContainer input {
  height: 30px;
  border-radius: 15px;
  padding: 0 10px;
  border: 1px solid gray;
  width: 15rem;
}
```

- [ ] **Step 2: Create `src/theme/ShowcaseFilters/index.tsx`**

```tsx
import React, { useState, useEffect, type ReactNode } from 'react'
import { useLocation, useHistory } from '@docusaurus/router'
import { usePluralForm } from '@docusaurus/theme-common'
import { translate } from '@docusaurus/Translate'
import clsx from 'clsx'
import type { ShowcaseItem, PluginOptions } from '../../core/types.js'
import ShowcaseTagSelect, { readSearchTags } from '../ShowcaseTagSelect/index.js'
import ShowcaseStatusSelect, { readMaintenanceStatus } from '../ShowcaseStatusSelect/index.js'
import ShowcaseFilterToggle, { readOperator, type Operator } from '../ShowcaseFilterToggle/index.js'
import ShowcaseTooltip from '../ShowcaseTooltip/index.js'
import { getIcon } from '../icons.js'
import styles from './styles.module.css'

const SearchNameKey = 'name'

export function readSearchName(search: string): string | null {
  return new URLSearchParams(search).get(SearchNameKey)
}

export function filterItems(
  items: ShowcaseItem[],
  selectedTags: string[],
  operator: Operator,
  searchName: string | null,
  selectedStatuses: string[],
): ShowcaseItem[] {
  let result = items

  if (searchName) {
    const q = searchName.toLowerCase()
    result = result.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.author?.toLowerCase().includes(q),
    )
  }

  if (selectedStatuses.length > 0) {
    result = result.filter((item) =>
      operator === 'AND'
        ? selectedStatuses.every((s) => item.status === s)
        : selectedStatuses.some((s) => item.status === s),
    )
  }

  if (selectedTags.length > 0) {
    result = result.filter((item) => {
      if (item.tags.length === 0) return false
      return operator === 'AND'
        ? selectedTags.every((t) => item.tags.includes(t))
        : selectedTags.some((t) => item.tags.includes(t))
    })
  }

  return result
}

type Props = {
  items: ShowcaseItem[]
  options: PluginOptions
  onFilter: (filtered: ShowcaseItem[]) => void
}

export default function ShowcaseFilters({ items, options, onFilter }: Props): JSX.Element {
  const location = useLocation()
  const history = useHistory()
  const [searchValue, setSearchValue] = useState<string>('')

  useEffect(() => {
    const tags = readSearchTags(location.search)
    const operator = readOperator(location.search)
    const name = readSearchName(location.search)
    const statuses = readMaintenanceStatus(location.search)
    setSearchValue(name ?? '')
    onFilter(filterItems(items, tags, operator, name, statuses))
  }, [location.search, items, onFilter])

  const { selectMessage } = usePluralForm()
  const filteredCount = filterItems(
    items,
    readSearchTags(location.search),
    readOperator(location.search),
    readSearchName(location.search),
    readMaintenanceStatus(location.search),
  ).length

  const countLabel = selectMessage(
    filteredCount,
    translate({
      id: 'showcase.filters.resultCount',
      message: '1 item|{count} items',
    }, { count: filteredCount }),
  )

  const updateSearch = (value: string) => {
    setSearchValue(value)
    const search = new URLSearchParams(location.search)
    if (value) search.set(SearchNameKey, value)
    else search.delete(SearchNameKey)
    history.push({ ...location, search: search.toString() })
  }

  return (
    <section className="container margin-top--l margin-bottom--lg">
      <div className={styles.filtersRow}>
        <div className={styles.filtersRowLeft}>
          <h2 style={{ marginBottom: 0 }}>
            {translate({ id: 'showcase.filters.title', message: 'Filters' })}
          </h2>
          <span>{countLabel}</span>
        </div>
        <ShowcaseFilterToggle />
      </div>

      <ul className={clsx('clean-list', styles.tagList)}>
        {Object.entries(options.tags).map(([key, tag]) => {
          const id = `showcase-tag-${key}`
          const Icon = getIcon(tag.icon)
          return (
            <li key={key} className={styles.tagListItem}>
              <ShowcaseTooltip id={id} text={tag.description} anchorEl="#__docusaurus">
                <ShowcaseTagSelect
                  tag={key}
                  id={id}
                  label={tag.label}
                  icon={Icon ? <Icon size={16} /> : <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: tag.color, display: 'inline-block', marginLeft: 4 }} />}
                />
              </ShowcaseTooltip>
            </li>
          )
        })}
      </ul>

      <ul className={clsx('clean-list', styles.tagList)}>
        {Object.entries(options.statuses).map(([key, status]) => {
          const id = `showcase-status-${key}`
          const Icon = getIcon(status.icon)
          return (
            <li key={key} className={styles.tagListItem}>
              <ShowcaseTooltip id={id} text={status.description} anchorEl="#__docusaurus">
                <ShowcaseStatusSelect
                  status={key}
                  id={id}
                  label={status.label}
                  icon={Icon ? <Icon size={16} /> : null}
                />
              </ShowcaseTooltip>
            </li>
          )
        })}
      </ul>

      <div className={styles.searchContainer}>
        <input
          id="showcase-searchbar"
          placeholder={translate({
            id: 'showcase.searchBar.placeholder',
            message: 'Search by name or author...',
          })}
          value={searchValue}
          onInput={(e) => updateSearch(e.currentTarget.value)}
        />
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
yarn tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add src/theme/ShowcaseFilters/
git commit -m "feat: add ShowcaseFilters component with tag, status and name search"
```

---

## Task 10: ShowcaseCard Component

**Files:**
- Create: `src/theme/ShowcaseCard/index.tsx`
- Create: `src/theme/ShowcaseCard/styles.module.css`

- [ ] **Step 1: Create `src/theme/ShowcaseCard/styles.module.css`**

```css
.card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.cardImage {
  overflow: hidden;
}

.cardHeader {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 0.5rem;
}

.cardTitle {
  margin: 0;
  flex: 1 1 auto;
  font-size: 1rem;
}

.cardLink {
  color: var(--ifm-color-primary);
  text-decoration: none;
}

.cardLink:hover {
  text-decoration: underline;
}

.cardBody {
  font-size: 0.875rem;
  flex: 1 1 auto;
  margin-bottom: 0.25rem;
}

.cardAuthor {
  font-size: 0.8rem;
  color: var(--ifm-color-emphasis-600);
  margin-bottom: 0.25rem;
}

.authorLabel {
  font-weight: 600;
  margin-right: 4px;
}

.statusRow {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8rem;
  margin-bottom: 0;
}

.statusLabel {
  font-weight: 600;
}

.cardFooter {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding-top: 0.5rem;
  list-style: none;
  margin: 0;
}

.tag {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.7rem;
  border-radius: 12px;
  padding: 2px 8px;
  background-color: var(--ifm-color-emphasis-100);
}

.tagColor {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.favouriteIcon {
  color: var(--ifm-color-danger);
}

.sourceBtn {
  margin-left: auto;
}
```

- [ ] **Step 2: Create `src/theme/ShowcaseCard/index.tsx`**

```tsx
import React from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import Translate from '@docusaurus/Translate'
import { sortBy } from '../../core/utils.js'
import { getIcon } from '../icons.js'
import type { ShowcaseItem, PluginOptions } from '../../core/types.js'
import ShowcaseTooltip from '../ShowcaseTooltip/index.js'
import styles from './styles.module.css'

type Props = {
  item: ShowcaseItem
  options: PluginOptions
}

function getCardImage(item: ShowcaseItem): string {
  return (
    item.preview ??
    `https://slorber-api-screenshot.netlify.app/${encodeURIComponent(item.website)}/showcase`
  )
}

export default function ShowcaseCard({ item, options }: Props): JSX.Element {
  const image = getCardImage(item)
  const isFavourite = options.favouriteTag ? item.tags.includes(options.favouriteTag) : false

  const sortedTags = sortBy(
    item.tags.filter((t) => t in options.tags),
    (t) => Object.keys(options.tags).indexOf(t),
  )

  const statusDef = item.status ? options.statuses[item.status] : null
  const StatusIcon = statusDef?.icon ? getIcon(statusDef.icon) : null
  const FavIcon = getIcon('heart')

  return (
    <li className={clsx('card shadow--md', styles.card)}>
      <div className={clsx('card__image', styles.cardImage)}>
        <img src={image} alt={item.name} loading="lazy" />
      </div>
      <div className="card__body">
        <div className={styles.cardHeader}>
          <h4 className={styles.cardTitle}>
            <Link href={item.website} className={styles.cardLink}>
              {item.name}
            </Link>
          </h4>
          {isFavourite && FavIcon && (
            <FavIcon size={14} className={styles.favouriteIcon} />
          )}
          {item.source && (
            <Link
              href={item.source}
              className={clsx('button button--secondary button--sm', styles.sourceBtn)}
            >
              <Translate id="showcase.card.sourceLink">source</Translate>
            </Link>
          )}
        </div>
        <p className={styles.cardBody}>{item.description}</p>
        {item.author && (
          <p className={styles.cardAuthor}>
            <span className={styles.authorLabel}>Author:</span>
            <span>{item.author}</span>
          </p>
        )}
        {statusDef && (
          <p className={styles.statusRow}>
            <span className={styles.statusLabel}>Status:</span>
            <span>{statusDef.label}</span>
            {StatusIcon && <StatusIcon size={14} />}
          </p>
        )}
      </div>
      <ul className={clsx('card__footer', styles.cardFooter)}>
        {sortedTags.map((tagKey) => {
          const tagDef = options.tags[tagKey]
          if (!tagDef) return null
          const TooltipId = `card-tag-${item.id}-${tagKey}`
          const TagIcon = tagDef.icon ? getIcon(tagDef.icon) : null
          return (
            <ShowcaseTooltip key={tagKey} id={TooltipId} text={tagDef.description} anchorEl="#__docusaurus">
              <li className={styles.tag}>
                <span className={styles.tagColor} style={{ backgroundColor: tagDef.color }} />
                {tagDef.label.toLowerCase()}
                {TagIcon && <TagIcon size={12} />}
              </li>
            </ShowcaseTooltip>
          )
        })}
      </ul>
    </li>
  )
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
yarn tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add src/theme/ShowcaseCard/
git commit -m "feat: add ShowcaseCard component"
```

---

## Task 11: ShowcasePage Component

**Files:**
- Create: `src/theme/ShowcasePage/index.tsx`
- Create: `src/theme/ShowcasePage/styles.module.css`

- [ ] **Step 1: Create `src/theme/ShowcasePage/styles.module.css`**

```css
.pageHeader {
  text-align: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.favouriteSection {
  padding: 2rem 0;
  background-color: var(--ifm-color-emphasis-100);
  margin-bottom: 2rem;
}

.favouriteHeader {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.favouriteHeader h2 {
  margin: 0;
}

.favouriteIcon {
  color: var(--ifm-color-danger);
}

.noResults {
  text-align: center;
  padding: 2rem;
}
```

- [ ] **Step 2: Create `src/theme/ShowcasePage/index.tsx`**

`ShowcasePage` is the top-level swizzleable component. It receives serialised `showcase` data from Docusaurus's `addRoute` modules injection and manages split rendering of favourites vs all items.

```tsx
import React, { useState, useMemo } from 'react'
import clsx from 'clsx'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import Translate, { translate } from '@docusaurus/Translate'
import { sortBy } from '../../core/utils.js'
import type { ShowcaseItem, ShowcasePageData } from '../../core/types.js'
import ShowcaseFilters from '../ShowcaseFilters/index.js'
import ShowcaseCard from '../ShowcaseCard/index.js'
import { getIcon } from '../icons.js'
import styles from './styles.module.css'

type Props = {
  showcase: ShowcasePageData
}

export default function ShowcasePage({ showcase }: Props): JSX.Element {
  const { items, options } = showcase

  const sortedItems = useMemo(() => {
    let result = sortBy(items, (item) => item.name.toLowerCase())
    if (options.favouriteTag) {
      result = sortBy(result, (item) => !item.tags.includes(options.favouriteTag!))
    }
    return result
  }, [items, options.favouriteTag])

  const [filteredItems, setFilteredItems] = useState<ShowcaseItem[]>(sortedItems)

  const title = options.pageTitle ?? translate({ id: 'showcase.page.title', message: 'Showcase' })
  const description = options.pageDescription ?? translate({ id: 'showcase.page.description', message: 'A community showcase.' })
  const isFiltered = filteredItems.length !== sortedItems.length

  const favouriteItems = sortedItems.filter(
    (item) => options.favouriteTag && item.tags.includes(options.favouriteTag),
  )
  const otherItems = sortedItems.filter(
    (item) => !options.favouriteTag || !item.tags.includes(options.favouriteTag),
  )

  const FavIcon = getIcon('heart')

  return (
    <Layout title={title} description={description}>
      <main className="margin-vert--lg">
        <section className={clsx('margin-top--lg margin-bottom--lg', styles.pageHeader)}>
          <h1>{title}</h1>
          <p>{description}</p>
          {options.submitUrl && (
            <Link className="button button--primary button--lg" href={options.submitUrl} target="_blank" rel="noreferrer">
              {getIcon('plus-square') && React.createElement(getIcon('plus-square')!, { size: 16, className: 'margin-right--sm' })}
              <Translate id="showcase.header.addButton">Add an item</Translate>
            </Link>
          )}
        </section>

        <ShowcaseFilters
          items={sortedItems}
          options={options}
          onFilter={setFilteredItems}
        />

        {filteredItems.length === 0 ? (
          <section className={styles.noResults}>
            <h2>
              <Translate id="showcase.noResults">No results</Translate>
            </h2>
          </section>
        ) : isFiltered ? (
          <div className="container">
            <ul className={clsx('clean-list', styles.grid)}>
              {filteredItems.map((item) => (
                <ShowcaseCard key={item.id} item={item} options={options} />
              ))}
            </ul>
          </div>
        ) : (
          <>
            {favouriteItems.length > 0 && (
              <div className={styles.favouriteSection}>
                <div className="container">
                  <div className={styles.favouriteHeader}>
                    <h2>
                      <Translate id="showcase.favourites.title">Our favourites</Translate>
                    </h2>
                    {FavIcon && <FavIcon size={28} className={styles.favouriteIcon} />}
                  </div>
                  <ul className={clsx('clean-list', styles.grid)}>
                    {favouriteItems.map((item) => (
                      <ShowcaseCard key={item.id} item={item} options={options} />
                    ))}
                  </ul>
                </div>
              </div>
            )}
            <div className="container margin-top--lg">
              <h2>
                <Translate id="showcase.allItems.title">All items</Translate>
              </h2>
              <ul className={clsx('clean-list', styles.grid)}>
                {otherItems.map((item) => (
                  <ShowcaseCard key={item.id} item={item} options={options} />
                ))}
              </ul>
            </div>
          </>
        )}
      </main>
    </Layout>
  )
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
yarn tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add src/theme/ShowcasePage/
git commit -m "feat: add ShowcasePage with favourites section, filters, and no-results state"
```

---

## Task 12: Plugins Preset + Entrypoint

**Files:**
- Create: `src/presets/plugins.ts`
- Create: `src/presets/index.ts`

- [ ] **Step 1: Create `src/presets/plugins.ts`**

```ts
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { PluginOptions } from '../core/types.js'

export const pluginsPreset: Partial<PluginOptions> = {
  favouriteTag: 'favourite',
  schemaPath: join(dirname(fileURLToPath(import.meta.url)), '../../schema/plugins-preset/1.0.0.json'),
  pageTitle: 'Docusaurus Plugin Directory',
  pageDescription: 'A community-sourced list of plugins for Docusaurus',

  tags: {
    favourite: {
      label: 'Favourite',
      description: 'Our favourite Docusaurus plugins you should check out!',
      color: '#e9669e',
      icon: 'heart',
    },
    docusaurus: {
      label: 'Docusaurus',
      description: 'Docusaurus core / official plugins.',
      color: '#3ecc5f',
      icon: 'docusaurus',
    },
    search: {
      label: 'Search',
      description: 'Plugins implementing search functionality.',
      color: '#ca3c25',
    },
    api: {
      label: 'API',
      description: 'Plugins for API documentation and testing.',
      color: '#e6af2e',
    },
    utility: {
      label: 'Utility',
      description: 'Utility plugins such as analytics, SASS support, etc.',
      color: '#baff29',
    },
    content: {
      label: 'Content',
      description: 'Plugins providing content enhancements.',
      color: '#820b8a',
    },
    theme: {
      label: 'Theme',
      description: 'Plugins implementing themes or significant theme enhancements.',
      color: '#7eb2dd',
    },
    markdown: {
      label: 'Markdown',
      description: 'Plugins implementing new markdown features.',
      color: '#49d49d',
    },
    analytics: {
      label: 'Analytics',
      description: 'Plugins implementing analytics (Plausible, Matomo, etc.).',
      color: '#b892ff',
    },
    integration: {
      label: 'Integration',
      description: 'Plugins integrating with external services.',
      color: '#ff7700',
    },
    seo: {
      label: 'SEO',
      description: 'Plugins implementing SEO features.',
      color: '#e128d4',
    },
    editing: {
      label: 'Editing',
      description: 'Plugins implementing editing or contribution features.',
      color: '#ffaaff',
    },
  },

  statuses: {
    maintained: {
      label: 'Maintained',
      description: 'Compatible with the latest Docusaurus stable release.',
      icon: 'circle-check',
    },
    unmaintained: {
      label: 'Unmaintained',
      description: 'Not compatible with or not updated for the latest Docusaurus stable release.',
      icon: 'circle-x',
    },
    unknown: {
      label: 'Unknown',
      description: 'Maintenance status could not be determined.',
      icon: 'circle-minus',
    },
  },
}
```

- [ ] **Step 2: Create `src/presets/index.ts`**

```ts
export { pluginsPreset } from './plugins.js'
```

- [ ] **Step 3: Verify TypeScript compiles cleanly**

```bash
yarn tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Run all tests**

```bash
yarn test
```

Expected: All 11 tests PASS (8 utils + 3 loader).

- [ ] **Step 5: Commit**

```bash
git add src/presets/
git commit -m "feat: add pluginsPreset with all tags, statuses, and schema path"
```

---

## Task 13: Full Build Verification

**Files:** No new files — verify the complete build produces valid output.

- [ ] **Step 1: Run full build**

```bash
yarn build
```

Expected: `tsc` compiles all TypeScript to `lib/`, then `copy-assets.mjs` copies `*.css` files. Output:

```
lib/
  core/types.js, utils.js (+ .d.ts, .map)
  icons/*.js
  loaders/yaml.js
  presets/index.js, plugins.js
  theme/icons.js
  theme/ShowcaseCard/index.js + styles.module.css
  theme/ShowcaseFilters/index.js + styles.module.css
  theme/ShowcaseFilterToggle/index.js
  theme/ShowcasePage/index.js + styles.module.css
  theme/ShowcaseStatusSelect/index.js
  theme/ShowcaseTagSelect/index.js
  theme/ShowcaseTooltip/index.js
  declarations.d.ts
  index.js
  plugin.js
```

- [ ] **Step 2: Verify exports map resolves**

```bash
node --input-type=module <<'EOF'
import pkg from './lib/index.js'
import { pluginsPreset } from './lib/presets/index.js'
console.log('plugin:', typeof pkg)
console.log('preset tags:', Object.keys(pluginsPreset.tags ?? {}).length)
EOF
```

Expected:
```
plugin: function
preset tags: 12
```

- [ ] **Step 3: Run lint**

```bash
yarn lint
```

Expected: No errors.

- [ ] **Step 4: Run all tests**

```bash
yarn test
```

Expected: All tests PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "build: verify full build, lint, and tests pass"
```

---

## Task 14: GitHub Actions Workflows

**Files:**
- Create: `.github/workflows/ci.yml`
- Create: `.github/workflows/publish.yml`

- [ ] **Step 1: Create `.github/workflows/ci.yml`**

Aligned with the plausible plugin pattern (`actions/checkout@v6`, `setup-node@v6`, `node-version: 'current'`).

```yaml
name: CI

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v6

      - name: Remove built-in Yarn
        run: npm uninstall -g yarn

      - name: Enable Corepack
        run: corepack enable

      - uses: actions/setup-node@v6
        with:
          node-version: 'current'
          cache: 'yarn'

      - run: yarn install --immutable

      - run: yarn build

      - run: yarn lint

      - run: yarn test
```

- [ ] **Step 2: Create `.github/workflows/publish.yml`**

Triggered on GitHub Release published. Publishes to npm (OIDC trusted, no `NPM_TOKEN`) and then to GitHub Packages (via `GITHUB_TOKEN`).

```yaml
name: Publish

on:
  release:
    types: [published]

permissions:
  contents: read
  id-token: write
  packages: write

jobs:
  publish-npm:
    runs-on: ubuntu-latest
    environment: npm

    steps:
      - uses: actions/checkout@v6

      - name: Remove built-in Yarn
        run: npm uninstall -g yarn

      - name: Enable Corepack
        run: corepack enable

      - uses: actions/setup-node@v6
        with:
          node-version: 'current'
          cache: 'yarn'
          registry-url: 'https://registry.npmjs.org'

      - run: yarn install --immutable

      - run: yarn build

      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}

  publish-gpr:
    runs-on: ubuntu-latest
    needs: publish-npm

    steps:
      - uses: actions/checkout@v6

      - name: Remove built-in Yarn
        run: npm uninstall -g yarn

      - name: Enable Corepack
        run: corepack enable

      - uses: actions/setup-node@v6
        with:
          node-version: 'current'
          cache: 'yarn'
          registry-url: 'https://npm.pkg.github.com'

      - run: yarn install --immutable

      - run: yarn build

      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

> **Note:** The `environment: npm` on `publish-npm` enables OIDC trusted publishing. After the initial manual `npm publish`, configure the trust policy on npmjs.org under the package settings to allow publishing from this repo+environment. Once configured, the `NODE_AUTH_TOKEN` env var is no longer needed for subsequent publishes (the OIDC token from `id-token: write` takes over). The GPR job always uses `GITHUB_TOKEN`.

- [ ] **Step 3: Commit**

```bash
git add .github/
git commit -m "ci: add CI build/lint/test and trusted npm + GPR publish workflows"
```

---

## Task 15: README + CHANGELOG

**Files:**
- Modify: `README.md`
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Write `README.md`**

```markdown
# @homotechsual/docusaurus-plugin-showcase

A Docusaurus plugin for building swizzleable showcase / directory pages from YAML data files.

## Installation

\`\`\`bash
npm install @homotechsual/docusaurus-plugin-showcase
\`\`\`

## Quick start (plugins directory preset)

\`\`\`ts
// docusaurus.config.ts
import { pluginsPreset } from '@homotechsual/docusaurus-plugin-showcase/presets'

export default {
  plugins: [
    ['@homotechsual/docusaurus-plugin-showcase', {
      ...pluginsPreset,
      dataDir: 'data/plugins',       // directory of .yaml files relative to site root
      routeBasePath: 'plugins',      // page available at /plugins
      submitUrl: 'https://github.com/your-org/your-repo/discussions/1',
    }],
  ],
}
\`\`\`

## YAML file format (plugins preset)

Each plugin is a separate `.yaml` file. Add the language-server comment for autocomplete:

\`\`\`yaml
# yaml-language-server: $schema=../../../node_modules/@homotechsual/docusaurus-plugin-showcase/schema/plugins-preset/1.0.0.json
id: author.plugin-name
name: My Plugin
description: A useful Docusaurus plugin.
website: https://github.com/author/plugin-name
source: https://github.com/author/plugin-name
author: author
tags:
  - utility
status: maintained
npmPackages:
  - plugin-name
\`\`\`

## Custom configuration

Use core types to define your own tags and statuses for any showcase use case:

\`\`\`ts
import type { PluginOptions } from '@homotechsual/docusaurus-plugin-showcase'

const options: PluginOptions = {
  dataDir: 'data/showcase',
  routeBasePath: 'showcase',
  pageTitle: 'Community Showcase',
  pageDescription: 'Sites built with our framework.',
  tags: {
    featured: { label: 'Featured', description: 'Hand-picked featured sites.', color: '#e9669e' },
    community: { label: 'Community', description: 'Built by the community.', color: '#3ecc5f' },
  },
  statuses: {
    active: { label: 'Active', description: 'Actively maintained.', icon: 'circle-check' },
  },
  favouriteTag: 'featured',
}
\`\`\`

## Swizzling components

All theme components are swizzleable:

\`\`\`bash
npx docusaurus swizzle @homotechsual/docusaurus-plugin-showcase ShowcaseCard
\`\`\`

Swizzleable components: `ShowcasePage` (unsafe/wrap), `ShowcaseCard` (safe), `ShowcaseFilters` (safe), `ShowcaseFilterToggle` (safe), `ShowcaseTagSelect` (unsafe/wrap), `ShowcaseStatusSelect` (unsafe/wrap), `ShowcaseTooltip` (safe).

## Initial publish

Before OIDC trusted publishing works, publish once manually to claim the package name:

\`\`\`bash
npm publish --access public
\`\`\`

Then configure the trust policy on npmjs.org: package → Settings → Publishing → Granular access tokens → add the GitHub repo + `npm` environment.

## Licence

Apache-2.0
```

- [ ] **Step 2: Update `CHANGELOG.md`**

```markdown
# Changelog

## [0.1.0] - 2026-06-08

### Added

- Initial release
- `loadContent` YAML loader with AJV schema validation
- Swizzleable theme components: `ShowcasePage`, `ShowcaseCard`, `ShowcaseFilters`, `ShowcaseFilterToggle`, `ShowcaseTagSelect`, `ShowcaseStatusSelect`, `ShowcaseTooltip`
- Bundled Heroicons (MIT) SVG icon components
- `pluginsPreset` for the Docusaurus community plugin directory use-case
- JSON schemas for core `ShowcaseItem` and plugins preset items
- GitHub Actions CI and trusted npm + GitHub Packages publish workflows
```

- [ ] **Step 3: Final commit**

```bash
git add README.md CHANGELOG.md
git commit -m "docs: add README with usage, CHANGELOG for 0.1.0"
```

---

## Self-Review Against Spec

| Spec requirement | Task |
| --- | --- |
| New project at `J:\Projects\docusaurus-showcase` | Task 1 |
| `@homotechsual/docusaurus-plugin-showcase` package name | Task 1 |
| `ShowcaseItem`, `TagDef`, `StatusDef`, `PluginOptions`, `ShowcasePageData` types | Task 2 |
| `sortBy`, `toggleListItem` utils with tests | Task 3 |
| `schema/showcase/1.0.0.json` core schema | Task 4 |
| `schema/plugins-preset/1.0.0.json` preset schema | Task 4 |
| 6 Heroicons SVG components + icon map | Task 5 |
| YAML loader + AJV validation + warning-not-error | Task 6 |
| `loadContent`, `contentLoaded`, `getThemePath`, `validateOptions` | Task 7 |
| `ShowcaseTooltip`, `ShowcaseFilterToggle`, `ShowcaseTagSelect`, `ShowcaseStatusSelect` | Task 8 |
| `ShowcaseFilters` with search + tag + status + AND/OR | Task 9 |
| `ShowcaseCard` with tags, status, author, source link | Task 10 |
| `ShowcasePage` with favourites pinning, no-results, filtered view | Task 11 |
| `pluginsPreset` with all 12 tags, 3 statuses, schema path | Task 12 |
| ESM build to `lib/`, CSS copying, `exports` map | Task 1 + Task 13 |
| `ci.yml` aligned with plausible plugin pattern | Task 14 |
| `publish.yml` OIDC npm + GitHub Packages on release | Task 14 |
| `routeBasePath` defaults to `'showcase'`, configurable | Task 7 (validateOptions) |
| `type: "module"`, `moduleResolution: NodeNext` | Task 1 |
| Apache-2.0 licence | Task 1 |
| Yarn 4 + corepack | Task 1 |
