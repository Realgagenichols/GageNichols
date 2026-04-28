/**
 * Vitest test setup — runs before each test file.
 *
 * Adds @testing-library/jest-dom matchers and shims a few browser APIs
 * that jsdom does not implement (IntersectionObserver, matchMedia,
 * scrollIntoView).  Components that depend on these will otherwise crash
 * the test runner.
 */

import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// IntersectionObserver — used by useInView for scroll-triggered animations.
class IntersectionObserverMock {
  constructor(callback) {
    this.callback = callback;
  }
  observe(target) {
    // Immediately report as in-view so visibility-gated UI renders in tests.
    this.callback([{ isIntersecting: true, target }], this);
  }
  unobserve() {}
  disconnect() {}
}
globalThis.IntersectionObserver = IntersectionObserverMock;

// matchMedia — used by usePrefersReducedMotion and useThemeToggle.
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  });
}

// scrollIntoView — used by SmoothLink.
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = vi.fn();
}
