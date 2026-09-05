/**
 * R2 — About Me Section.
 *
 * SHALL: bio paragraph + photo/avatar + at least 3 highlights with leadership emphasis.
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { bio, highlights, personal } from '@shared/data.js';
import { About } from '../components/About.jsx';

describe('About (R2)', () => {
  it('renders the owner name, the bio paragraphs, and the portrait', () => {
    render(<About />);

    // Name appears in the section
    expect(screen.getAllByText(new RegExp(personal.name)).length).toBeGreaterThan(0);

    // Each bio paragraph appears verbatim
    for (const paragraph of bio) {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    }

    // Portrait is an <img> with alt text including the owner's name
    const img = screen.getByRole('img', { name: new RegExp(personal.name, 'i') });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src');
  });

  it('shows at least three headline highlights', () => {
    render(<About />);
    for (const h of highlights.slice(0, 3)) {
      expect(screen.getByText(h.label)).toBeInTheDocument();
      expect(screen.getByText(h.value)).toBeInTheDocument();
    }
  });

  // R2: the first bio paragraph SHALL name both differentiator strengths.
  it('opens the bio with both differentiators in its first sentence', () => {
    const opener = bio[0].split('.')[0];
    expect(opener).toMatch(/cloud security at scale/i);
    expect(opener).toMatch(/AI agents?/i);
  });
});
