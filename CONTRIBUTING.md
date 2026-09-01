# Contributing to Kernary docs

This repository owns the Kernary homepage, navigation, package-discovery view,
Blog, and site renderer. Engine and Domain documentation must be changed in the
repository that owns the corresponding code or schema.

## Choose the owner

- Kernary engine concepts, guides, CLI, SDK, MCP, HTTP, Registry, and operations:
  change `skill-wiki/kernary-engine`.
- Frontend Design model, corpus, retrieval, tools, validation, and case study:
  change `skill-wiki/kernary-frontend-design`.
- Site navigation, layout, Homepage, About, or Blog: change this repository.

## Package inventory

`data/packages.yaml` is a temporary build inventory for compatibility Corpus
snapshots. Do not add an entry to claim that a new package is published. A
Registry contribution requires the Registry service, package-kind schema,
signature metadata, and a successful publish/install round trip; that external
workflow is not live yet.

## Verify

```bash
bun install --frozen-lockfile
bun run check
bun run build
```

The build must resolve documentation from the owning sibling repositories. Do
not replace a missing source with a copied Astro page.
