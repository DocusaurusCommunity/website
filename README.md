# Docusaurus.community

[![CC BY-SA 4.0][cc-by-sa-shield]][cc-by-sa]

This work is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License][cc-by-sa].

[![CC BY-SA 4.0][cc-by-sa-image]][cc-by-sa]

[cc-by-sa]: http://creativecommons.org/licenses/by-sa/4.0/
[cc-by-sa-image]: https://licensebuttons.net/l/by-sa/4.0/88x31.png
[cc-by-sa-shield]: https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## Installation
 
```bash
yarn
```

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Community homepage and theme

The [homepage](src/pages/index.tsx) highlights the knowledge base, plugin directory, and ways to
contribute. Its curated notebook and topic links point to existing community content; update these
alongside the content they feature. Keep recommendations descriptive rather than implying popularity
or endorsement.

[Homepage styles](src/pages/index.module.scss) use the shared `--cp-*` palette in
[the community theme](src/scss/_community-theme.scss), which is loaded after the existing custom
styles. The shared theme maps those tokens to Infima so documentation and the plugin directory use
the same visual language without replacing their layouts. Existing admonition and syntax-highlighting
colours retain their semantic meaning.

Docusaurus owns theme detection and persistence, including the native light/dark switch and operating
system preference. Avoid adding a separate theme-detection script that would compete with it.
Keep keyboard focus visible, respect reduced-motion preferences, and check both themes at mobile and
desktop widths when changing the design. Run `yarn typecheck` and `yarn build` before submitting changes.

## Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
