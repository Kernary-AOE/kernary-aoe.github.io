# AOE docs site

<picture>
<source media="(prefers-color-scheme: dark)" srcset="public/aoe-logo-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="public/aoe-logo.svg">
  <img src="public/aoe-logo.svg" alt="AOE" width="540">
</picture>

Static documentation and package-discovery site for AOE, the Agent Ontology
Engine maintained by the Kernary organization.

## Develop

This repository expects the AOE Engine and Frontend Design Domain Package at
their sibling paths:

```text
../aoe-engine
../aoe-frontend-design
```

Override them with `AOE_ENGINE_ROOT` and
`AOE_FRONTEND_DESIGN_ROOT` when the checkout layout differs.

```bash
bun install --frozen-lockfile
bun run check
bun run build
```

The build fails when an owning documentation source is missing. The website does
not keep handwritten copies of Engine and Domain reference pages.

## Content ownership

- Homepage, About, package discovery, Blog, and navigation are site-owned.
- Engine guides, concepts, and reference come from `aoe-engine/docs/`.
- The Frontend Design case study comes from
  `aoe-frontend-design/docs/overview.md`.
- `data/packages.yaml` locates public Corpus Packages for inspection. It is not
  the AOE Registry service and is not a publication claim.

The site currently deploys at `https://kernary-aoe.github.io`; the product name,
metadata, and public routes are AOE.

## Pages

| Path | Purpose |
|---|---|
| `/` | AOE product introduction |
| `/docs` | Current documentation rendered from owning repositories |
| `/marketplace` | Browse external Model, Corpus, Adapter, and Domain Packages |
| `/browse` | Inspect Units in published Corpus snapshots |
| `/about` | Understand AOE and choose a starting point |

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md). AOE is Apache-2.0 licensed.
