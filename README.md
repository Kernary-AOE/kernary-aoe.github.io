# Kernary docs site

<img src="public/kernary-logo.svg" alt="Kernary" width="540">

Static documentation and package-discovery site for Kernary, the model-driven
ontology engine for Agents and domain-aware software.

## Develop

This repository expects the Kernary Engine and Frontend Design Domain Package at
their current sibling compatibility paths:

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
  `prime-frontend-design/docs/overview.md`.
- `data/packages.yaml` locates compatibility Corpus snapshots for inspection. It
  is not the Kernary Registry service and is not a publication claim.
- Old Skill Wiki / Prime v1 routes remain available with a compatibility notice
  and `noindex`; they are not present in current navigation.

The configured site URL remains `https://skill-wiki.github.io` until the
external domain and GitHub Pages migration is complete.

## Pages

| Path | Purpose |
|---|---|
| `/` | Kernary product introduction |
| `/docs` | Current documentation rendered from owning repositories |
| `/marketplace` | Typed package discovery; compatibility Corpus inventory today |
| `/browse` | Inspect Units in compatibility snapshots |
| `/about` | Product boundary and name migration |

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md). Kernary is Apache-2.0 licensed.
