# Kernary docs site

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="public/kernary-logo-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="public/kernary-logo.svg">
  <img src="public/kernary-logo.svg" alt="Kernary" width="540">
</picture>

Static documentation and package-discovery site for Kernary, the model-driven
ontology engine for Agents and domain-aware software.

## Develop

This repository expects the Kernary Engine and Frontend Design Domain Package at
their sibling paths:

```text
../kernary-engine
../kernary-frontend-design
```

Override them with `KERNARY_ENGINE_ROOT` and
`KERNARY_FRONTEND_DESIGN_ROOT` when the checkout layout differs.

```bash
bun install --frozen-lockfile
bun run check
bun run build
```

The build fails when an owning documentation source is missing. The website does
not keep handwritten copies of Engine and Domain reference pages.

## Content ownership

- Homepage, About, package discovery, Blog, and navigation are site-owned.
- Engine guides, concepts, and reference come from `kernary-engine/docs/`.
- The Frontend Design case study comes from
  `kernary-frontend-design/docs/overview.md`.
- `data/packages.yaml` locates public Corpus Packages for inspection. It is not
  the Kernary Registry service and is not a publication claim.

The site currently deploys at `https://skill-wiki.github.io`; the product name,
metadata, and public routes are Kernary.

## Pages

| Path | Purpose |
|---|---|
| `/` | Kernary product introduction |
| `/docs` | Current documentation rendered from owning repositories |
| `/marketplace` | Browse external Model, Corpus, Adapter, and Domain Packages |
| `/browse` | Inspect Units in published Corpus snapshots |
| `/about` | Understand Kernary and choose a starting point |

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md). Kernary is Apache-2.0 licensed.
