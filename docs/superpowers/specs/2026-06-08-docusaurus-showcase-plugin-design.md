# Design: `@homotechsual/docusaurus-plugin-showcase`

**Date:** 2026-06-08
**Status:** Approved

## Summary

Extract the `plugindirectory` page from the docusaurus.community website into a standalone, reusable Docusaurus plugin published as `@homotechsual/docusaurus-plugin-showcase`. The plugin registers a swizzleable showcase page route, loads item data from consumer-provided YAML files at build time, and ships a "plugins" preset that exactly replicates the current community site directory.

---

## 1. Project Structure

```text
J:\Projects\docusaurus-showcase\
├── src/
│   ├── index.ts                        # Plugin entrypoint — exports default plugin + public types
│   ├── plugin.ts                       # loadContent, contentLoaded, validateOptions, getThemePath
│   ├── core/
│   │   ├── types.ts                    # ShowcaseItem, TagDef, StatusDef, PluginOptions
│   │   └── utils.ts                    # sortBy, toggleListItem (no Docusaurus dep)
│   ├── presets/
│   │   ├── index.ts                    # Re-exports all presets
│   │   └── plugins.ts                  # pluginsPreset — full tag/status/schema config
│   ├── theme/
│   │   ├── ShowcasePage/
│   │   │   ├── index.tsx               # Swizzleable top-level page component
│   │   │   └── styles.module.scss
│   │   ├── ShowcaseCard/
│   │   │   ├── index.tsx               # Swizzleable item card
│   │   │   └── styles.module.scss
│   │   ├── ShowcaseFilters/
│   │   │   ├── index.tsx               # Swizzleable filter bar + search + count
│   │   │   └── styles.module.scss
│   │   ├── ShowcaseTagSelect/
│   │   │   └── index.tsx               # Swizzleable tag checkbox
│   │   ├── ShowcaseStatusSelect/
│   │   │   └── index.tsx               # Swizzleable status checkbox
│   │   ├── ShowcaseFilterToggle/
│   │   │   └── index.tsx               # Swizzleable AND/OR toggle
│   │   └── ShowcaseTooltip/
│   │       └── index.tsx               # Swizzleable tooltip wrapper
│   ├── icons/
│   │   ├── Heart.tsx                   # Heroicons MIT — heart
│   │   ├── CircleCheck.tsx             # Heroicons MIT — check-circle
│   │   ├── CircleX.tsx                 # Heroicons MIT — x-circle
│   │   ├── CircleMinus.tsx             # Heroicons MIT — minus-circle
│   │   ├── PlusSquare.tsx              # Heroicons MIT — plus-circle
│   │   └── Docusaurus.tsx              # Docusaurus SVG (Apache 2.0)
│   └── loaders/
│       └── yaml.ts                     # Node-side: glob YAML, validate with ajv, return ShowcaseItem[]
├── schema/
│   ├── showcase/
│   │   └── 1.0.0.json                  # Core schema — generic ShowcaseItem fields
│   └── plugins-preset/
│       └── 1.0.0.json                  # Plugins preset schema — extends core, adds plugin domain fields
├── .github/
│   └── workflows/
│       ├── ci.yml                      # Typecheck + lint + build on push/PR
│       └── publish.yml                 # npm provenance + GitHub Packages on GitHub Release publish
├── package.json
├── tsconfig.json
├── eslint.config.js
├── cspell.json
├── CHANGELOG.md
├── LICENSE                             # Apache-2.0
└── README.md
```

---

## 2. Data Model

### Core types (`src/core/types.ts`)

```ts
type TagDef = {
  label: string
  description: string
  color: string
}

type StatusDef = {
  label: string
  description: string
  icon?: React.ReactNode
}

type ShowcaseItem = {
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
  [key: string]: unknown   // preset-specific extras pass through to components
}

type PluginOptions = {
  dataDir: string                        // path to YAML files, relative to site root
  routeBasePath: string                  // default: 'showcase'
  tags: Record<string, TagDef>
  statuses: Record<string, StatusDef>
  favouriteTag?: string                  // tag key that gets a pinned "favourites" section
  pageTitle?: string
  pageDescription?: string
  submitUrl?: string                     // "Add an item" button href — omit to hide button
  schemaPath?: string                    // path to JSON schema for YAML validation, defaults to bundled schema
}
```

### Plugins preset (`src/presets/plugins.ts`)

Exports `pluginsPreset` — a plain `Partial<PluginOptions>` object pre-populated with:

* All 12 tags from the current community site (favourite, docusaurus, search, api, utility, content, theme, markdown, analytics, integration, seo, editing)
* All 3 maintenance statuses (maintained, unmaintained, unknown) with Heroicons SVG icons
* `favouriteTag: 'favourite'`
* `schemaPath` pointing at the bundled `plugins-preset/1.0.0.json`

Consumer usage:

```ts
import { pluginsPreset } from '@homotechsual/docusaurus-plugin-showcase/presets'

plugins: [
  ['@homotechsual/docusaurus-plugin-showcase', {
    ...pluginsPreset,
    dataDir: 'data/plugins',
    submitUrl: 'https://github.com/...',
  }]
]
```

### YAML loader (`src/loaders/yaml.ts`)

* Node-side only (not bundled into browser output)
* Globs `**/*.yaml` from resolved `dataDir`
* Parses each file with `js-yaml`
* Validates against the resolved JSON schema using `ajv`
* Validation errors surface as Docusaurus build **warnings** (not hard failures) with the offending file path logged — a malformed YAML skips that item but does not break the build
* Returns `ShowcaseItem[]`

---

## 3. Plugin Lifecycle (`src/plugin.ts`)

```text
loadContent()       → runs at build time (Node), calls yaml loader, returns { items, options }
contentLoaded()     → registers route at `/${routeBasePath}` using createData + addRoute
                      injects { items, options } as page props
getThemePath()      → returns path to src/theme/ so Docusaurus registers all components as swizzleable
validateOptions()   → validates PluginOptions with Joi (matching Docusaurus plugin convention)
```

Data flows from YAML files → `loadContent` → `contentLoaded` → `ShowcasePage` props. No client-side data fetching.

---

## 4. Theme Components & Swizzling

All components under `src/theme/` are swizzleable via:

```sh
docusaurus swizzle @homotechsual/docusaurus-plugin-showcase <ComponentName>
```

| Component | Swizzle safety | Notes |
| --- | --- | --- |
| `ShowcasePage` | Unsafe (wrap) | Full layout — header, filters, cards |
| `ShowcaseCard` | Safe | Single item card — most commonly customised |
| `ShowcaseFilters` | Safe | Filter bar, search input, result count |
| `ShowcaseTagSelect` | Unsafe (wrap) | Tag checkbox + tooltip |
| `ShowcaseStatusSelect` | Unsafe (wrap) | Status checkbox + tooltip |
| `ShowcaseFilterToggle` | Safe | AND/OR operator toggle |
| `ShowcaseTooltip` | Safe | Popper-based tooltip wrapper |

`ShowcasePage` receives `{ items: ShowcaseItem[], options: PluginOptions }` as props so swizzled versions have full access to all data.

---

## 5. Icons

Icons are inline SVG components under `src/icons/`, sourced from **Heroicons (MIT licence)**. Each file carries `// Heroicons MIT License — https://github.com/tailwindlabs/heroicons` at the top. The Docusaurus SVG is Apache 2.0, compatible with the package licence.

No runtime icon library dependency. All icons accept `{ className?: string; size?: number }` props.

---

## 6. Schemas

Two JSON Schema files under `schema/`:

* **`schema/showcase/1.0.0.json`** — core ShowcaseItem fields (id, name, description, website, source, preview, author, tags, status, npmPackages, minimumVersion)
* **`schema/plugins-preset/1.0.0.json`** — extends core schema, constrains `tags` to the plugins preset tag keys and `status` to the maintenance status keys

YAML files reference the schema via:

```yaml
# yaml-language-server: $schema=../../../node_modules/@homotechsual/docusaurus-plugin-showcase/schema/plugins-preset/1.0.0.json
```

---

## 7. Package Configuration

```json
{
  "name": "@homotechsual/docusaurus-plugin-showcase",
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
  "files": ["lib/**/*.js", "lib/**/*.js.map", "lib/**/*.d.ts", "lib/**/*.d.ts.map", "schema/**/*.json"],
  "license": "Apache-2.0",
  "packageManager": "yarn@4.x"
}
```

**TypeScript**: `target: ESNext`, `module: NodeNext`, `moduleResolution: NodeNext`, output to `lib/`.

**Peer dependencies**: `@docusaurus/core >=3.0.0 <5.0.0`, `react >=18.0.0`, `react-dom >=18.0.0`

**Runtime dependencies**: `js-yaml`, `ajv`, `react-popper`, `@popperjs/core`, `clsx`

---

## 8. CI & Publish Workflows

### `ci.yml` — on push to `main` and all PRs

Steps (aligned with plausible plugin pattern):

1. `actions/checkout@v6`
2. Remove built-in Yarn + enable Corepack
3. `actions/setup-node@v6` — `node-version: 'current'`, `cache: 'yarn'`
4. `yarn install --immutable`
5. `yarn build` (tsc)
6. `yarn lint` (eslint)

### `publish.yml` — on GitHub Release published

```yaml
permissions:
  contents: read
  id-token: write    # npm OIDC trusted publishing
  packages: write    # GitHub Packages

jobs:
  publish-npm:
    environment: npm  # OIDC trust policy configured on npm.js.org
    steps: checkout → corepack → setup-node (registry: npmjs) → install → build → npm publish --access public

  publish-gpr:
    needs: publish-npm
    steps: checkout → corepack → setup-node (registry: npm.pkg.github.com) → install → build
           NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }} → npm publish --access public
```

**Initial manual publish**: `npm publish --access public` locally once to claim the package name on npm before OIDC trust policy takes over.

**Release flow**: bump `package.json` version → commit → create GitHub Release → workflow fires → both registries updated.

---

## 9. Community Site Migration

Once the plugin is published, the community site can migrate its `plugindirectory` page by:

1. Installing `@homotechsual/docusaurus-plugin-showcase`
2. Moving YAML files from `data/plugins/*.yaml` to remain in place (already correct format)
3. Replacing the `src/data/plugins.tsx` import with `pluginsPreset` spread into the plugin config
4. Removing `src/pages/plugindirectory/` entirely
5. The route changes from `/plugindirectory` to `/showcase` (or configured to `/plugindirectory` via `routeBasePath`)
