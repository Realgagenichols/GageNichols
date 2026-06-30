/**
 * R8.1 — Footer code link (extends R8 privacy).
 *
 * SHALL: a GitHub profile link framed as source code, pointing at the owner's
 * account. Contact stays LinkedIn-only — no email/phone anywhere in the footer.
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { github } from '@shared/data.js';
import { Footer } from '../components/Footer.jsx';

describe('Footer (R8.1, R8)', () => {
  it('renders a GitHub link pointing at the owner profile, opening in a new tab', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /github/i });
    expect(link).toHaveAttribute('href', github.url);
    expect(link.getAttribute('href')).toBe('https://github.com/Realgagenichols');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link.getAttribute('rel') ?? '').toMatch(/noopener/);
  });

  it('does not expose email or phone (R8)', () => {
    const { container } = render(<Footer />);
    const text = container.textContent;
    expect(text).not.toMatch(/@(icloud|gmail|outlook|yahoo|hotmail)\.[a-z]+/i);
    expect(text).not.toMatch(/\(?\d{3}\)?[\s.\-]\d{3}[\s.\-]\d{4}/);
  });
});
