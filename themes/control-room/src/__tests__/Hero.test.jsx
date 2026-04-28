/**
 * R1 — Hero / Landing Section.
 *
 * SHALL: display name, title/tagline, CTA above the fold with atomic-age styling.
 * Scenario "First impression": name + title + CTA visible.
 * Scenario "CTA navigation": clicking the CTA invokes scrollIntoView on a section.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { personal } from '@shared/data.js';
import { Hero } from '../components/Hero.jsx';

describe('Hero (R1)', () => {
  it('renders the owner name, title and a primary CTA', () => {
    render(
      <main>
        <Hero />
        <section id="projects">projects target</section>
      </main>,
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(personal.name);
    expect(screen.getByText(new RegExp(personal.title, 'i'))).toBeInTheDocument();
    // The primary CTA is a link styled as a button — it must be discoverable.
    const cta = screen.getAllByRole('link').find((el) => /explore|projects|view|engage/i.test(el.textContent));
    expect(cta).toBeDefined();
    expect(cta).toHaveAttribute('href', '#projects');
  });

  it('scrolls smoothly to the target section when the CTA is clicked', async () => {
    const projectsScroll = vi.fn();
    render(
      <main>
        <Hero />
        <section id="projects" ref={(el) => { if (el) el.scrollIntoView = projectsScroll; }}>
          projects
        </section>
      </main>,
    );

    const cta = screen.getAllByRole('link').find((el) => el.getAttribute('href') === '#projects');
    expect(cta).toBeDefined();
    await userEvent.click(cta);
    expect(projectsScroll).toHaveBeenCalled();
  });
});
