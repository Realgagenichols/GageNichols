import { useEffect, useMemo, useRef, useState } from 'react';
import { sections, personal } from '@shared/data.js';
import { useScrollSpy } from '@shared/hooks/useScrollSpy.js';
import { useThemeToggle } from '@shared/hooks/useThemeToggle.js';
import { SmoothLink } from '@shared/components/SmoothScroll.jsx';
import { AtomLogo } from './AtomLogo.jsx';
import { Starburst } from './Decorations.jsx';

/**
 * Sticky control-room nav: row of labeled toggle switches for desktop,
 * collapsed drawer for mobile/tablet.  Active section gets the "switch
 * on" treatment with a phosphor lamp glow.  Includes a CRT/Daylight mode
 * toggle that drives the html[data-theme] attribute via the shared hook.
 *
 * Requirements: R7 (sticky nav, smooth scroll, active indicator),
 * S2 (theme toggle persisted in localStorage).
 */
export function Nav() {
  const sectionIds = useMemo(() => sections.map((s) => s.id), []);
  const activeId = useScrollSpy(sectionIds, { offset: 120 });
  const { mode, toggle } = useThemeToggle();
  const [open, setOpen] = useState(false);
  const drawerRef = useRef(null);

  // Close drawer when switching to desktop layout
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = (e) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Click-outside to close drawer
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        // Don't close if the click was on the toggle button itself
        const btn = document.getElementById('nav-menu-btn');
        if (btn && btn.contains(e.target)) return;
        setOpen(false);
      }
    };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, [open]);

  const onActivate = () => setOpen(false);

  const renderSwitch = (s) => {
    const isActive = activeId === s.id;
    return (
      <SmoothLink
        key={s.id}
        to={s.id}
        className={`switch${isActive ? ' switch--on' : ''}`}
        aria-current={isActive ? 'true' : undefined}
        onActivate={onActivate}
      >
        <span className="switch__toggle" aria-hidden="true" />
        <span className="switch__label">{s.label}</span>
      </SmoothLink>
    );
  };

  return (
    <nav className="nav" aria-label="Primary">
      <div className="nav__inner">
        <a href="#hero" className="nav__brand" aria-label={`${personal.name}, Home`}>
          <AtomLogo size={36} className="nav__brand-atom" />
          <span className="nav__id">{personal.name.toUpperCase()}</span>
        </a>

        <div className="nav__switches" role="group" aria-label="Sections">
          {sections.map(renderSwitch)}
        </div>

        <div className="nav__right">
          <button
            type="button"
            id="nav-menu-btn"
            className="nav__menu-btn"
            aria-expanded={open}
            aria-controls="nav-drawer"
            onClick={() => setOpen((v) => !v)}
          >
            <Starburst size={16} color="currentColor" />
            <span>{open ? 'Close' : 'Menu'}</span>
          </button>

          <button
            type="button"
            className="theme-toggle"
            onClick={toggle}
            aria-label={`Switch to ${mode === 'dark' ? 'daylight' : 'midnight'} mode`}
            title={`Switch to ${mode === 'dark' ? 'daylight' : 'midnight'} mode`}
          >
            <span className="theme-toggle__lamp" aria-hidden="true" />
            <span>{mode === 'dark' ? 'Night' : 'Day'}</span>
          </button>
        </div>

        {open && (
          <div id="nav-drawer" className="nav__drawer" role="menu" ref={drawerRef}>
            {sections.map(renderSwitch)}
          </div>
        )}
      </div>
    </nav>
  );
}
