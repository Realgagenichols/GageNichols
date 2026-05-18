# Proposal: Capability Console — Resolve Symbol Collision & Add AI Tile

## Motivation

Two issues in the Capability Console (Skills section, R3):

1. **Symbol collision.** `symbolFor()` produces the symbol `Ia` for both *Identity & Access Management (IAM)* and *Infrastructure as Code (IaC)*. Two tiles sharing a periodic-table symbol breaks the metaphor and confuses readers.

2. **Missing positioning signal.** The bio and project list already frame agentic AI for security velocity as a current focus area, but the Skills section has no surface representation of it. For recruiters skimming the page, the Capability Console is the densest at-a-glance signal of technical breadth.

## Change Summary

- **Disambiguate IAM** by overriding its derived symbol from `Ia` to `Id`. IaC keeps `Ia`.
- **Add a new category** "AI & Agentic Engineering" with four tiles:
  - Agentic AI Engineering (symbol `Ai`)
  - Security-First AI Tooling (symbol `Sf`)
  - Spec-Driven Development (symbol `Sd`)
  - Plugin & Skill Authorship (symbol `Ps`)
- **Add `SYMBOL_OVERRIDES` map** in `Skills.jsx` for named-tile overrides where derivation produces the wrong symbol. Surgical, reversible, self-documenting.

## Non-Goals

- No data-model change (items stay as plain strings).
- No new dossier descriptions — the existing generic dossier copy remains for all tiles, including the new ones. (A richer dossier could be a separate change.)
- No restyle of the Capability Console grid or category palette beyond what a 5th category requires.

## Authenticity Check (L4)

Every new tile maps to real work:
- *Agentic AI Engineering* — bio already mentions "agentic AI for security velocity"; this portfolio itself is built collaboratively with agentic AI.
- *Security-First AI Tooling* — direct reflection of the owner's security-engineering frame applied to AI tooling.
- *Spec-Driven Development* — visible in this very repository (SPEC.md, RFC 2119 + Given/When/Then scenarios).
- *Plugin & Skill Authorship* — visible in the owner's `~/.claude/` workflow (custom `/brainstorm`, `/plan`, `/implement` skills, superpowers plugin integration).

## Risks

- **Color-palette wraparound.** `categoryToken()` cycles through 4 tokens; a 5th category re-uses `coral`. Acceptable — each category is its own group box, color repeat is not visually adjacent.
- **Test count assertion.** `Skills.test.jsx` counts total tiles; adding four tiles requires no test change because the count is computed from `skills.reduce(...)`. Verified by re-reading the test.
