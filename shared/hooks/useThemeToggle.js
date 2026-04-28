import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'atom-theme-mode';

function getInitialMode() {
  if (typeof window === 'undefined') return 'dark';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'dark' || stored === 'light') return stored;
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  return prefersLight ? 'light' : 'dark';
}

/**
 * Manages a 'dark' | 'light' theme mode persisted in localStorage.
 * Sets `data-theme` attribute on <html> for CSS-variable-driven theming.
 *
 * @returns {{ mode: 'dark'|'light', toggle: () => void, setMode: (m: 'dark'|'light') => void }}
 */
export function useThemeToggle() {
  const [mode, setModeState] = useState(getInitialMode);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('data-theme', mode);
    try {
      window.localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // localStorage may be unavailable (private mode, quota); failing silently is acceptable here
    }
  }, [mode]);

  const setMode = useCallback((next) => {
    if (next !== 'dark' && next !== 'light') return;
    setModeState(next);
  }, []);

  const toggle = useCallback(() => {
    setModeState((m) => (m === 'dark' ? 'light' : 'dark'));
  }, []);

  return { mode, toggle, setMode };
}
