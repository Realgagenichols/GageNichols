import { useId, useState } from 'react';
import { skills } from '@shared/data.js';
import { Starburst } from './Decorations.jsx';

/**
 * Explicit symbol overrides for skills whose default derivation collides
 * with another tile or produces a non-intuitive abbreviation. Keep small
 * and named so reviewers can audit each override at a glance.
 */
const SYMBOL_OVERRIDES = {
  'Identity & Access Management (IAM)': 'Id',
  'Agentic AI Engineering': 'Ai',
  'Security-First AI Tooling': 'Sf',
};

/**
 * Build a 1-2 letter "atomic symbol" abbreviation for a skill name.
 *
 * Strategy: prefer an explicit override, then the first letters of an
 * acronym in parens (like "(IAM)"), then a leading all-caps acronym,
 * then initials of the first two significant words.  Length is clamped
 * to two letters so the tile reads like an element symbol on a periodic
 * table.
 */
function symbolFor(name) {
  if (SYMBOL_OVERRIDES[name]) return SYMBOL_OVERRIDES[name];
  const parenAcronymMatch = name.match(/\(([A-Z]{2,5})\)/);
  if (parenAcronymMatch) {
    const a = parenAcronymMatch[1];
    return a.length <= 2
      ? a[0] + (a[1] ? a[1].toLowerCase() : '')
      : a[0] + a[1].toLowerCase();
  }

  const leadingAcronym = name.match(/^([A-Z]{2,5})\b/);
  if (leadingAcronym) {
    const a = leadingAcronym[1];
    return a[0] + (a[1] ? a[1].toLowerCase() : '');
  }

  const words = name
    .replace(/[()&]/g, ' ')
    .split(/\s+/)
    .filter((w) => w && !['and', 'of', 'the', 'for', '&'].includes(w.toLowerCase()));
  if (words.length === 0) return name.slice(0, 2);
  if (words.length === 1) {
    const w = words[0];
    return w[0] + (w[1] ? w[1].toLowerCase() : '');
  }
  return words[0][0] + words[1][0].toLowerCase();
}

/** Category-driven palette token — coral, gold, turquoise, pink, violet. */
function categoryToken(idx) {
  const tokens = ['coral', 'gold', 'turquoise', 'pink', 'violet'];
  return tokens[idx % tokens.length];
}

/**
 * Skills — "Periodic Table of Capabilities" within the Atomic Control Room.
 *
 * Each skill is a chemical-element-style tile: a sequential atomic number
 * (decorative — see L4 in tasks/lessons.md, NOT a proficiency claim), a
 * two-letter symbol derived from the skill name, and a category color band.
 * Click an element to expand a dossier panel.  No fabricated levels.
 *
 * Requirements: R3.
 */
export function Skills() {
  const [activeKey, setActiveKey] = useState(null);
  const detailId = useId();

  let runningNumber = 0;
  const groups = skills.map((g, gi) => ({
    ...g,
    token: categoryToken(gi),
    items: g.items.map((label) => {
      runningNumber += 1;
      return {
        label,
        symbol: symbolFor(label),
        number: runningNumber,
        key: `${gi}-${label}`,
        category: g.category,
      };
    }),
  }));

  const handleSelect = (key) => {
    setActiveKey((cur) => (cur === key ? null : key));
  };

  const activeElement = (() => {
    for (const g of groups) {
      const found = g.items.find((it) => it.key === activeKey);
      if (found) return { ...found, group: g };
    }
    return null;
  })();

  return (
    <section id="skills" className="skills" aria-labelledby="skills-heading">
      <header className="section-head">
        <span className="coord">Sector 03 · Instrumentation</span>
        <h2 id="skills-heading" className="section-head__title">
          <Starburst size={32} color="var(--gold)" centerColor="var(--coral)" className="section-head__title-burst" />
          Capability Console
        </h2>
        <p className="section-head__sub">
          Periodic table of capabilities. Click any element to read its dossier.
        </p>
      </header>

      <div className="periodic">
        <ul className="periodic__legend" aria-label="Category legend">
          {groups.map((g) => (
            <li
              className={`periodic__legend-item periodic__legend-item--${g.token}`}
              key={g.category}
            >
              <span className="periodic__legend-swatch" aria-hidden="true" />
              {g.category}
            </li>
          ))}
        </ul>

        <div className="periodic__grid" role="list">
          {groups.map((g) => (
            <div
              key={g.category}
              className={`periodic__group periodic__group--${g.token}`}
              role="group"
              aria-label={g.category}
            >
              {g.items.map((it) => {
                const isActive = activeKey === it.key;
                return (
                  <button
                    key={it.key}
                    type="button"
                    className={`element element--${g.token}${isActive ? ' element--active' : ''}`}
                    onClick={() => handleSelect(it.key)}
                    aria-expanded={isActive}
                    aria-controls={detailId}
                    aria-label={`${it.label}, ${g.category}`}
                  >
                    <span className="element__number">{it.number}</span>
                    <span className="element__symbol">{it.symbol}</span>
                    <span className="element__name">{it.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div
          id={detailId}
          className={`periodic__detail${activeElement ? ' periodic__detail--open' : ''}`}
          role="region"
          aria-live="polite"
          aria-label="Selected capability dossier"
        >
          {activeElement ? (
            <div className={`dossier dossier--${activeElement.group.token}`}>
              <div className="dossier__chip">
                <span className="dossier__chip-num">{activeElement.number}</span>
                <span className="dossier__chip-sym">{activeElement.symbol}</span>
              </div>
              <div className="dossier__body">
                <span className="dossier__category">{activeElement.group.category}</span>
                <h3 className="dossier__name">{activeElement.label}</h3>
                <p className="dossier__copy">
                  Cataloged in the {activeElement.group.category.toLowerCase()} register. Click another element to view its dossier, or click this one again to close the panel.
                </p>
              </div>
            </div>
          ) : (
            <p className="periodic__detail-prompt">
              <Starburst size={18} color="var(--gold)" /> Pick an element above to view its dossier.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
