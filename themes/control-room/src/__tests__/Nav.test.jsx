/**
 * R7 — Navigation.
 *
 * SHALL: sticky nav with smooth scroll to each section + active section indicator.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { sections } from '@shared/data.js';
import { Nav } from '../components/Nav.jsx';

describe('Nav (R7)', () => {
  it('renders an anchor for every declared section', () => {
    render(<Nav />);
    for (const section of sections) {
      // Each section label appears in the nav (may appear in both desktop + mobile views).
      expect(screen.getAllByText(new RegExp(section.label, 'i')).length).toBeGreaterThan(0);
    }
  });

  it('uses a <nav> landmark with an accessible name', () => {
    render(<Nav />);
    expect(screen.getByRole('navigation', { name: /primary/i })).toBeInTheDocument();
  });

  it('triggers scrollIntoView on the target section when a switch is clicked', async () => {
    // Mount target sections that the nav scrolls to.
    const targets = {};
    sections.forEach((s) => { targets[s.id] = vi.fn(); });

    document.body.innerHTML = '';
    sections.forEach((s) => {
      const el = document.createElement('section');
      el.id = s.id;
      el.scrollIntoView = targets[s.id];
      document.body.appendChild(el);
    });

    render(<Nav />);
    const aboutLinks = screen.getAllByRole('link', { name: /about/i });
    const aboutLink = aboutLinks.find((el) => el.getAttribute('href') === '#about');
    expect(aboutLink).toBeDefined();
    await userEvent.click(aboutLink);
    expect(targets.about).toHaveBeenCalled();
  });
});
