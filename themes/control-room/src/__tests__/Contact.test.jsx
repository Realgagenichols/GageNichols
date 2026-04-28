/**
 * R5 — Contact section (LinkedIn-only) AND R8 — Privacy.
 *
 * SHALL: contact section has LinkedIn only.  No email, no phone, no resume.
 * Each link MUST open in a new tab with rel="noopener noreferrer".
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { social } from '@shared/data.js';
import { Contact } from '../components/Contact.jsx';

describe('Contact (R5, R8)', () => {
  it('does not advertise email or phone as a contact channel', () => {
    const { container } = render(<Contact />);
    const text = container.textContent;
    expect(text).not.toMatch(/@(icloud|gmail|outlook|yahoo|hotmail)\.[a-z]+/i);
    expect(text).not.toMatch(/\(?\d{3}\)?[\s.\-]\d{3}[\s.\-]\d{4}/);
    expect(text).not.toMatch(/download\s+resume/i);
  });

  it('exposes only the LinkedIn channel from shared data', () => {
    expect(social.length).toBe(1);
    expect(social[0].label.toLowerCase()).toBe('linkedin');
    render(<Contact />);
    const link = screen.getByRole('link', { name: /linkedin/i });
    expect(link).toHaveAttribute('href', social[0].url);
  });

  it('opens the LinkedIn link in a new tab with rel=noopener noreferrer', () => {
    render(<Contact />);
    const link = screen.getByRole('link', { name: /linkedin/i });
    expect(link).toHaveAttribute('target', '_blank');
    const rel = link.getAttribute('rel') ?? '';
    expect(rel).toMatch(/noopener/);
    expect(rel).toMatch(/noreferrer/);
  });
});
