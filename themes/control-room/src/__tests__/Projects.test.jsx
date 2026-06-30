/**
 * R4 — Projects / Portfolio section.
 *
 * SHALL: at least one card with title, description, tech tags, and a link.
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
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
      const el = screen.getByRole('link', { name: new RegExp(link.label, 'i') });
      expect(el).toHaveAttribute('href', link.url);
      expect(el).toHaveAttribute('target', '_blank');
      expect(el.getAttribute('rel') ?? '').toMatch(/noopener/);
    }
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
    const metricTokens = [/\b30\+/, /\b200k\+/, /\b100\+/];
    for (const title of overlapping) {
      const project = projects.find((p) => p.title === title);
      expect(project, `project "${title}" not found`).toBeTruthy();
      const text = `${project.summary} ${project.impact}`;
      for (const token of metricTokens) {
        expect(text, `"${title}" summary/impact should not restate metric ${token}`).not.toMatch(token);
      }
    }
  });
});
