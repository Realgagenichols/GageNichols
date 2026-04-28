/**
 * S2 — Dark/light theme toggle persists in localStorage.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useThemeToggle } from '@shared/hooks/useThemeToggle.js';

describe('useThemeToggle (S2)', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('toggles between dark and light and persists in localStorage', () => {
    const { result } = renderHook(() => useThemeToggle());
    const initial = result.current.mode;

    act(() => result.current.toggle());
    expect(result.current.mode).not.toBe(initial);
    expect(window.localStorage.getItem('atom-theme-mode')).toBe(result.current.mode);

    act(() => result.current.toggle());
    expect(result.current.mode).toBe(initial);
    expect(window.localStorage.getItem('atom-theme-mode')).toBe(initial);
  });

  it('applies the mode as a data-theme attribute on <html>', () => {
    const { result } = renderHook(() => useThemeToggle());
    expect(document.documentElement.getAttribute('data-theme')).toBe(result.current.mode);
    act(() => result.current.toggle());
    expect(document.documentElement.getAttribute('data-theme')).toBe(result.current.mode);
  });
});
