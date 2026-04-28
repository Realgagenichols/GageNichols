/**
 * R3 — Skills section.
 *
 * SHALL: skills grouped by category with theme-appropriate visuals; clicking
 * an element opens a dossier panel.
 */

import { describe, it, expect } from 'vitest';
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

  it('opens a dossier with the skill name and category when an element is clicked', async () => {
    render(<Skills />);
    const firstSkill = skills[0].items[0];
    const tile = screen.getByRole('button', { name: new RegExp(firstSkill, 'i') });
    await userEvent.click(tile);
    expect(tile).toHaveAttribute('aria-expanded', 'true');

    const dossier = screen.getByRole('region', { name: /capability dossier/i });
    expect(dossier).toHaveTextContent(firstSkill);
    expect(dossier).toHaveTextContent(skills[0].category);
  });
});
