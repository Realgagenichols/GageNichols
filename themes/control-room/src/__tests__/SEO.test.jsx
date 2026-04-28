/**
 * S4 — Open Graph / Twitter card meta tags (runtime SEO component).
 *
 * The authoritative tags for crawlers live in static index.html, but the
 * runtime SEO component should also produce Open Graph entries for any
 * page that mounts it.
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { SEO } from '@shared/components/SEO.jsx';

describe('SEO (S4)', () => {
  it('writes Open Graph and Twitter meta tags into the document head', () => {
    render(<SEO title="Test Title" description="Test description." ogImage="./og.jpg" />);

    expect(document.title).toBe('Test Title');
    expect(document.head.querySelector('meta[property="og:title"]')?.getAttribute('content'))
      .toBe('Test Title');
    expect(document.head.querySelector('meta[property="og:description"]')?.getAttribute('content'))
      .toBe('Test description.');
    expect(document.head.querySelector('meta[property="og:image"]')?.getAttribute('content'))
      .toBe('./og.jpg');
    expect(document.head.querySelector('meta[name="twitter:card"]')?.getAttribute('content'))
      .toBe('summary_large_image');
  });
});
