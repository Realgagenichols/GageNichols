/**
 * R3 — Skills section.
 *
 * SHALL: skills grouped by category with theme-appropriate visuals; clicking
 * an element opens a dossier panel.
 */

import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { skills } from '@shared/data.js';
import { Skills } from '../components/Skills.jsx';

describe('Skills (R3)', () => {
  it('renders every category from shared data and labels the legend with each', () => {
    render(<Skills />);
    for (const group of skills) {
      // Category name appears at least once (legend + per-group aria-label).
      expect(screen.getAllByText(group.category).length).toBeGreaterThan(0);
    }
  });

  it('renders one element tile per skill', () => {
    render(<Skills />);
    const totalSkills = skills.reduce((sum, g) => sum + g.items.length, 0);
    const tiles = screen.getAllByRole('button', { expanded: false });
    expect(tiles.length).toBe(totalSkills);
  });

  it('renders a unique two-letter symbol on every tile (no collisions)', () => {
    render(<Skills />);
    const tiles = screen.getAllByRole('button', { expanded: false });
    const symbols = tiles.map((tile) => {
      const symEl = tile.querySelector('.element__symbol');
      return symEl ? symEl.textContent : '';
    });
    const unique = new Set(symbols);
    expect(unique.size).toBe(symbols.length);
    // Specifically verify the IAM/IaC disambiguation that prompted the override.
    expect(symbols).toContain('Id');
    expect(symbols).toContain('Ia');
  });

  it('opens a dossier with the skill name and category when an element is clicked', async () => {
    render(<Skills />);
    const firstSkill = skills[0].items[0].name;
    const tile = screen.getByRole('button', { name: new RegExp(firstSkill, 'i') });
    await userEvent.click(tile);
    expect(tile).toHaveAttribute('aria-expanded', 'true');

    const dossier = screen.getByRole('region', { name: /capability dossier/i });
    expect(dossier).toHaveTextContent(firstSkill);
    expect(dossier).toHaveTextContent(skills[0].category);
  });

  // Delta spec (changes/capability-dossier-examples): dossier shows a per-element example.
  it('shows the selected element\'s sourced example in the dossier', async () => {
    render(<Skills />);
    const firstSkill = skills[0].items[0];
    expect(firstSkill.detail).toBeTruthy(); // guard: real data carries an example
    const tile = screen.getByRole('button', { name: new RegExp(firstSkill.name, 'i') });
    await userEvent.click(tile);

    const dossier = screen.getByRole('region', { name: /capability dossier/i });
    expect(dossier).toHaveTextContent(firstSkill.detail);
    // The generic boilerplate must NOT appear when a detail is present.
    expect(dossier).not.toHaveTextContent(/Cataloged in the .* register/i);
  });

  // R3.1: tokens are assigned by category index from a five-token list, so a sixth
  // category would silently reuse the first category's hue.
  it('gives every category its own palette token', () => {
    const { container } = render(<Skills />);
    const TOKENS = ['coral', 'gold', 'turquoise', 'pink', 'violet'];
    expect(skills.length).toBeLessThanOrEqual(TOKENS.length);

    const used = [...container.querySelectorAll('.periodic__group')].map((el) => {
      const hit = TOKENS.filter((t) => el.classList.contains(`periodic__group--${t}`));
      expect(hit, `group has exactly one palette token, got ${hit}`).toHaveLength(1);
      return hit[0];
    });
    expect(used).toHaveLength(skills.length);
    expect(new Set(used).size).toBe(used.length);
  });

  // Delta spec: every shipped element carries a sourced example (no boilerplate fallback in prod data).
  it('provides a detail example for every capability', () => {
    for (const group of skills) {
      for (const item of group.items) {
        expect(item.detail, `${item.name} is missing a detail`).toBeTruthy();
      }
    }
  });
});

// Delta spec (changes/capability-dossier-examples): missing detail falls back gracefully.
// Isolated so the module mock for a detail-less skill does not leak into the suite above.
describe('Skills dossier fallback (R3)', () => {
  afterEach(() => {
    vi.resetModules();
    vi.doUnmock('@shared/data.js');
  });

  it('renders the generic register line when an element has no detail', async () => {
    vi.resetModules();
    vi.doMock('@shared/data.js', () => ({
      skills: [{ category: 'Cloud & Infrastructure', items: [{ name: 'Orphan Skill' }] }],
    }));
    const { Skills: SkillsMocked } = await import('../components/Skills.jsx');

    render(<SkillsMocked />);
    await userEvent.click(screen.getByRole('button', { name: /Orphan Skill/i }));

    const dossier = screen.getByRole('region', { name: /capability dossier/i });
    expect(dossier).toHaveTextContent(/Cataloged in the cloud & infrastructure register/i);
  });
});
