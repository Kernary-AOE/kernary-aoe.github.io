---
title: "Kernary v0.2 — the ontology engine is taking shape"
date: "2026-09-01"
excerpt: "Kernary is a model-driven ontology engine: external models and corpora compile into verified snapshots, then serve typed query plans and governed actions through an SDK, MCP, or HTTP."
---

# Kernary v0.2 — the ontology engine is taking shape

Kernary is the next chapter of this project. The product is no longer a
design-specific knowledge collection or a fixed set of atom kinds. It is a
model-driven ontology engine: a small, deterministic core that lets a team
define a domain outside the engine, compile that definition with its corpus,
and expose the result to agents and applications through stable contracts.

The current site and repositories are being migrated under the Kernary name.
The old Prime and Skill Wiki identifiers remain only where they are needed for
compatibility with existing checkouts, package names, and protocol URLs.

## What ships

The engine is split into a few deliberately boring boundaries:

- **Model Package** — types, fields, relations, projections, retrieval
  profiles, functions, actions, policies, validators, and migrations.
- **Corpus Package** — units, assets, provenance, licensing, and release
  identity. A corpus is data supplied by a domain owner, not a built-in
  database.
- **Compiler and verified snapshots** — declarations become deterministic IR,
  projections, an index, a manifest, and a content digest. Runtime refuses a
  tampered or incomplete snapshot.
- **Query path** — selection plans explain candidates, features, constraints,
  relation closure, load order, and token budgets.
- **Action path** — preflight, capability checks, policy, approval, idempotency,
  retries, and append-only evidence are separate from read-only query.
- **SDK and transports** — the same contracts are available embedded, through
  MCP, or over HTTP. The transport does not decide domain semantics.

The reference implementation lives in
[`skill-wiki/kernary-engine`](https://github.com/skill-wiki/kernary-engine).
The Frontend Design repository is now a separate external Domain Package, not
part of the engine:
[`skill-wiki/kernary-frontend-design`](https://github.com/skill-wiki/kernary-frontend-design).

## The important boundary

Kernary Core knows how to load and verify a model. It does not know what a
Ticket, Recipe, ColorToken, or DesignPrinciple is. Those names, fields, and
relations arrive from the Model Package. Units arrive from the Corpus Package.
That is the conformance test: adding a new domain should require new package
data, not a new `if` branch in the engine.

```text
Model + Corpus + Adapters
            │
            ▼
   parser → IR → compiler → verified snapshot
            │                    │
       query plan          governed action
            └──────── SDK · MCP · HTTP ────────┘
```

## Try the maintained example

Kernary uses Bun for the workspace toolchain. From the engine repository:

```bash
bun install --frozen-lockfile
bun run typecheck
bun run test
bun run build
```

The repository includes small compatibility examples so that the complete
compile-to-runtime path can be inspected locally. They are examples, not the
ontology shipped by Core. For a deployable domain, start with the
[package model](/docs/concepts/package-model) and the
[authoring guide](/docs/guides/authoring-a-domain).

## What is deliberately not promised yet

Kernary is usable as an engine and SDK, but it is not pretending that every
ecosystem service is finished. The hosted registry, first-party evaluation
harness, and optional observability integrations are follow-on products. The
protocol keeps their extension points external so they can evolve without
turning the engine into a marketplace or a single vendor's agent runtime.

If you are migrating from the old names, read the
[name and product-boundary ADR](https://github.com/skill-wiki/kernary-engine/blob/main/docs/adr/0001-kernary-name-and-product-boundary.md).
For issues and implementation discussion, use the
[Kernary Engine repository](https://github.com/skill-wiki/kernary-engine).

—
