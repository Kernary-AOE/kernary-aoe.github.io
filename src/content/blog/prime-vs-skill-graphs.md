---
title: "Why an ontology engine is different from a skill library"
date: "2026-09-01"
excerpt: "A skill can be useful guidance. Kernary is the layer that makes domain knowledge typed, versioned, queryable, verifiable, and safe to act on."
---

# Why an ontology engine is different from a skill library

The word *skill* is useful because it describes how an agent learns to do a
task. It is not a good boundary for a domain system. A skill is usually a
document, a prompt, or a small tool recipe. It can tell an agent what to try,
but it does not by itself define the types in a domain, the relationships
between them, the evidence behind a result, or the permissions required to
change state.

Kernary starts one layer below that question. It is an ontology engine: a
runtime for a domain model and its corpus. A Domain Package can still ship an
Agent Skill as a human-friendly entry point, but the skill is a consumer of the
package, not the package's schema or security boundary.

## The boundary in one picture

```text
Model Package       Corpus Package       Adapter / Tool Package
(types, relations)  (units, sources)     (providers, validators)
        \                 |                  /
         \                |                 /
          └────── Kernary compiler ────────┘
                         │
               verified, versioned snapshot
                         │
                 SDK · MCP · HTTP
                         │
                     Agent / app
```

The engine owns the contracts and the verification rules. The external
packages own the vocabulary and data. This is why a new domain should be
installable without editing the engine source.

## What the engine adds

**A model instead of a closed list of kinds.** The core has a small meta-schema
for declaring types, fields, relations, projections, retrieval, functions,
actions, policies, and migrations. The actual domain types are package data.

**A corpus instead of a prompt dump.** Source units are compiled into an
immutable snapshot with deterministic projections, an index, and a manifest.
Runtime checks the content digest before serving it, so a changed file cannot
silently masquerade as the published version.

**A plan instead of a best guess.** Query returns a Selection Plan: candidates,
feature contributions, hard and soft constraints, relation closure, load order,
and token budget. An application can inspect why a unit was selected.

**A governed write path.** Reading a unit never grants permission to mutate
anything. Actions declare their input/output, required capabilities and
preconditions. Policy, approval, idempotency, retry bounds, and event evidence
are explicit parts of execution.

## Where a Skill belongs

An Agent Skill is a useful adapter at the edge. It can teach an agent how to
author a Model Package, how to compile a Corpus Package, or how to call a
domain's MCP tools. It can also provide examples and conventions. It should
not hard-code the engine's ontology or bypass the runtime's checks.

That separation keeps the core reusable across design, support, compliance,
operations, or a domain we have never seen. The Frontend Design repository in
this workspace is intentionally just one reference Domain Package.

## The practical test

If replacing Ticket with Recipe requires changing a switch statement in Core,
the boundary is wrong. If replacing it only requires a different Model Package,
a different Corpus Package, and perhaps a domain adapter, the engine is doing
its job.

For the implementation details, start with the
[package model](/docs/concepts/package-model), then read
[compilation and snapshots](/docs/concepts/compilation-and-snapshots) and
[selection and execution](/docs/concepts/selection-and-execution).

The old Prime v1 documents remain in the engine repository's legacy area for
archival purposes. They are not the current product definition.
