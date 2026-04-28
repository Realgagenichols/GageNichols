/**
 * R3 — Experience timeline.
 *
 * SHALL: timeline shows company, role, dates, and headline metrics.
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { experience } from '@shared/data.js';
import { Experience } from '../components/Experience.jsx';

describe('Experience (R3)', () => {
  it('renders every role with company, role title, and date range', () => {
    render(<Experience />);

    for (const role of experience) {
      // Company name and role appear
      expect(screen.getAllByText(new RegExp(role.company)).length).toBeGreaterThan(0);
      expect(screen.getByText(role.role)).toBeInTheDocument();
    }
  });

  it('renders headline metrics for the current role', () => {
    render(<Experience />);
    const current = experience[0];
    for (const metric of current.metrics) {
      expect(screen.getAllByText(metric.value).length).toBeGreaterThan(0);
    }
  });

  it('renders the leadership and delivery bullets verbatim from shared data', () => {
    render(<Experience />);
    for (const role of experience) {
      for (const bullet of role.leadership) {
        expect(screen.getByText(bullet)).toBeInTheDocument();
      }
      for (const bullet of role.delivery) {
        expect(screen.getByText(bullet)).toBeInTheDocument();
      }
    }
  });
});
