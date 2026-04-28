/**
 * R8 — Privacy / no PII exposure (in-process unit checks).
 *
 * The authoritative gate is `scripts/scan-pii.mjs` (run by CI), but this
 * test catches regressions in shared data at the unit level so they fail
 * fast in a developer's editor.
 */

import { describe, it, expect } from 'vitest';
import * as data from '@shared/data.js';

const EMAIL_PATTERN = /[A-Za-z0-9._%+-]+@(icloud|gmail|outlook|yahoo|hotmail|protonmail)\.[a-z]+/i;
const PHONE_PATTERN = /\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]?\d{4}/;
const RESUME_FILE_PATTERN = /resume\.pdf|gage_nichols_resume/i;

describe('Privacy guard (R8)', () => {
  const serialized = JSON.stringify(data);

  it('serialized shared data contains no consumer email handle', () => {
    expect(serialized).not.toMatch(EMAIL_PATTERN);
  });

  it('serialized shared data contains no phone-shaped string', () => {
    expect(serialized).not.toMatch(PHONE_PATTERN);
  });

  it('serialized shared data contains no resume filename reference', () => {
    expect(serialized).not.toMatch(RESUME_FILE_PATTERN);
  });

  it('exposes assertNoPII, which throws on a planted email', () => {
    const planted = JSON.stringify({ ...data, leak: 'someone@gmail.com' });
    expect(() => data.assertNoPII(planted)).toThrow(/PII GUARD/);
  });

  it('exposes assertNoPII, which throws on a planted phone number', () => {
    const planted = JSON.stringify({ ...data, leak: '(555) 123-4567' });
    expect(() => data.assertNoPII(planted)).toThrow(/PII GUARD/);
  });

  it('exposes assertNoPII, which passes on unmodified data', () => {
    expect(() => data.assertNoPII(JSON.stringify(data))).not.toThrow();
  });
});
