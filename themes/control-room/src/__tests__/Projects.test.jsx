/**
 * R4 — Projects / Portfolio section.
 *
 * SHALL: at least one card with title, description, tech tags, and a link.
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { projects } from '@shared/data.js';
import { Projects } from '../components/Projects.jsx';

// Project titles can contain regex meta-characters such as parentheses
// (e.g. "Internal Data Loss Prevention (DLP) Platform").  We need a
// substring-style matcher rather than a raw `new RegExp(title)`.
function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

describe('Projects (R4)', () => {
  it('renders every project from shared data with title and description', () => {
    render(<Projects />);
    for (const project of projects) {
      expect(screen.getAllByText(new RegExp(escapeRegExp(project.title))).length).toBeGreaterThan(0);
      expect(screen.getByText(project.description)).toBeInTheDocument();
    }
  });

  it('renders the tech tags for each project', () => {
    render(<Projects />);
    for (const project of projects) {
      for (const tag of project.tags) {
        expect(screen.getAllByText(tag).length).toBeGreaterThan(0);
      }
    }
  });

  it('renders external links with target=_blank and rel=noopener', () => {
    render(<Projects />);
    const linksFromData = projects.flatMap((p) => p.links);
    if (linksFromData.length === 0) return; // Some projects have no links — that's allowed.
    for (const link of linksFromData) {
      // Labels collide (multiple "GitHub" links), so disambiguate by href.
      const matches = screen
        .getAllByRole('link', { name: new RegExp(link.label, 'i') })
        .filter((el) => el.getAttribute('href') === link.url);
      expect(matches.length, `link ${link.url}`).toBeGreaterThan(0);
      for (const el of matches) {
        expect(el).toHaveAttribute('target', '_blank');
        expect(el.getAttribute('rel') ?? '').toMatch(/noopener/);
      }
    }
  });

  // R4 (changes/open-source-proof): the open-source repos render as cards with
  // working GitHub links pointing at the owner's account.
  it('renders the open-source repos with GitHub links to the owner account', () => {
    render(<Projects />);
    const ossUrls = [
      'https://github.com/Realgagenichols/frisk',
      'https://github.com/Realgagenichols/tollbooth',
      'https://github.com/Realgagenichols/splashpass',
      'https://github.com/Realgagenichols/claude-dlp-guard',
      'https://github.com/Realgagenichols/mission-control',
    ];
    // Sanity-check the data shape first: every oss project carries a GitHub link.
    const oss = projects.filter((p) => p.kind === 'oss');
    expect(oss).toHaveLength(ossUrls.length);

    const githubLinks = screen.getAllByRole('link', { name: /github/i });
    for (const url of ossUrls) {
      const matching = githubLinks.filter((el) => el.getAttribute('href') === url);
      expect(matching.length, `no link to ${url}`).toBeGreaterThan(0);
      for (const el of matching) {
        expect(el).toHaveAttribute('target', '_blank');
        expect(el.getAttribute('rel') ?? '').toMatch(/noopener/);
      }
    }
  });

  // R4: work and open-source appear under distinct group headings, Selected Work first.
  it('renders distinct project groups with Selected Work before Open Source', () => {
    const { container } = render(<Projects />);
    const headings = [...container.querySelectorAll('.projects__group-title')].map(
      (el) => el.textContent,
    );
    expect(headings).toEqual(['Selected Work', 'Open Source · Public Code']);
  });

  // R3.2 (changes/section-content-differentiation): a project card that shares an
  // accomplishment with an Experience bullet describes the technical approach and
  // does NOT restate the headline metric Experience already carries.
  it('does not restate experience headline metrics in overlapping project cards', () => {
    const overlapping = [
      'Enterprise Cloud Security Posture Management',
      'Internal Data Loss Prevention (DLP) Platform',
      'Enterprise Vulnerability Management Program',
    ];
    const metricTokens = [/\b40\+/, /\b2\.5M\+/, /\b100\+/];
    for (const title of overlapping) {
      const project = projects.find((p) => p.title === title);
      expect(project, `project "${title}" not found`).toBeTruthy();
      const text = `${project.summary} ${project.impact}`;
      for (const token of metricTokens) {
        expect(text, `"${title}" summary/impact should not restate metric ${token}`).not.toMatch(token);
      }
    }
  });

  // R4 (changes/tollbooth-case-study): PyPI link + MIT tags on the OSS cards.
  it('renders the tollbooth PyPI link and MIT on the open-source cards', () => {
    render(<Projects />);
    const pypi = screen
      .getAllByRole('link', { name: /pypi/i })
      .filter((el) => el.getAttribute('href') === 'https://pypi.org/project/mcp-tollbooth/');
    expect(pypi.length, 'no PyPI link').toBeGreaterThan(0);
    expect(pypi[0]).toHaveAttribute('target', '_blank');
    expect(pypi[0].getAttribute('rel') ?? '').toMatch(/noopener/);

    for (const p of projects.filter((proj) => proj.kind === 'oss')) {
      expect(p.tags, `${p.title} missing MIT tag`).toContain('MIT');
    }
  });
});

// R4.1 (changes/tollbooth-case-study): flagship case studies, expand-in-place.
describe('Projects case study (R4.1)', () => {
  const heads = ['The problem', 'The approach', 'Key decisions', 'Outcome'];
  const withCaseStudy = projects.filter((p) => Array.isArray(p.caseStudy) && p.caseStudy.length);

  it('is collapsed by default with a toggle control', () => {
    render(<Projects />);
    const toggles = screen.getAllByRole('button', { name: /read the case study/i });
    expect(toggles.length).toBeGreaterThan(0);
    for (const toggle of toggles) {
      expect(toggle).toHaveAttribute('aria-expanded', 'false');
    }
    for (const h of heads) {
      expect(screen.queryByText(h)).not.toBeInTheDocument();
    }
  });

  it('reveals the case-study sections when toggled', async () => {
    render(<Projects />);
    // Open one at a time so the shared section headings stay unambiguous.
    for (let i = 0; i < withCaseStudy.length; i += 1) {
      const toggle = screen.getAllByRole('button', { name: /read the case study/i })[i];
      await userEvent.click(toggle);

      const expanded = screen.getByRole('button', { name: /close case study/i });
      expect(expanded).toHaveAttribute('aria-expanded', 'true');
      for (const h of heads) {
        expect(screen.getByText(h)).toBeInTheDocument();
      }
      await userEvent.click(expanded);
    }
  });

  it('renders exactly one toggle per project that carries a case study', () => {
    render(<Projects />);
    expect(withCaseStudy.length).toBeGreaterThan(0);
    expect(screen.getAllByRole('button', { name: /read the case study/i })).toHaveLength(
      withCaseStudy.length,
    );
    // Every case study uses the same four-section shape.
    for (const p of withCaseStudy) {
      expect(p.caseStudy.map((s) => s.heading)).toEqual(heads);
    }
  });
});
