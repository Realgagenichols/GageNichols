# Delta Spec — R3: Skills / Capability Console

## MODIFIED

### R3 Scenario: Skills display (clarified)

The Capability Console SHALL render every category from `shared/data.js` as a group of element-style tiles, and every tile SHALL display a unique two-letter "atomic symbol."

##### Scenario: Unique symbols across the Capability Console
- GIVEN the Capability Console is rendered
- WHEN every tile's symbol is collected
- THEN no two tiles SHALL share the same symbol

##### Scenario: Symbol override for ambiguous derivations
- GIVEN a skill whose name produces a colliding or non-intuitive symbol under the default `symbolFor()` derivation
- WHEN `Skills.jsx` renders that tile
- THEN it SHALL use the value from a `SYMBOL_OVERRIDES` map in preference to the derived value
- AND the override SHALL be a two-character string

## ADDED

### R3.1: AI & Agentic Engineering category

The Capability Console SHALL include a category named **"AI & Agentic Engineering"** containing the following four items, in order:

1. Agentic AI Engineering (symbol `Ai`)
2. Security-First AI Tooling (symbol `Sf`)
3. Spec-Driven Development (symbol `Sd`)
4. Plugin & Skill Authorship (symbol `Ps`)

##### Scenario: AI category visible in legend and grid
- GIVEN the Skills section renders
- WHEN the Capability Console grid and legend are inspected
- THEN the category "AI & Agentic Engineering" SHALL appear in both
- AND its four tiles SHALL be rendered, each clickable to open a dossier

##### Scenario: Authenticity guardrail
- GIVEN each tile in the AI category
- WHEN its label is examined
- THEN it SHALL map to real work demonstrated elsewhere in the portfolio (bio, projects, repository structure) — no fabricated capabilities (L4)

## Traceability

| Requirement | Implementation | Test |
|---|---|---|
| Unique symbols | `Skills.jsx` (`SYMBOL_OVERRIDES`) | new test in `Skills.test.jsx` |
| AI category present | `shared/data.js` (new group) | existing category-render test covers it |
| IAM symbol override | `Skills.jsx` (`SYMBOL_OVERRIDES`) | new uniqueness test covers it |
