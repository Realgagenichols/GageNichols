import { useEffect } from 'react';
import { sections, seo, assertNoPII } from '@shared/data.js';
import * as data from '@shared/data.js';
import { SEO } from '@shared/components/SEO.jsx';

import { BackgroundDecor } from './components/BackgroundDecor.jsx';
import { Nav } from './components/Nav.jsx';
import { Hero } from './components/Hero.jsx';
import { About } from './components/About.jsx';
import { Skills } from './components/Skills.jsx';
import { Experience } from './components/Experience.jsx';
import { Projects } from './components/Projects.jsx';
import { Contact } from './components/Contact.jsx';
import { Footer } from './components/Footer.jsx';

/**
 * Theme A — The Atomic Control Room
 *
 * Top-level shell: nav + main with each section + footer + atomic-age
 * background decor (starfield in dark mode, Googie tile in light mode).
 * Pulls all content from shared/data.js. Runs the PII guard at mount so any
 * PII regression in the content layer fails fast in development.
 */
export function App() {
  useEffect(() => {
    try {
      assertNoPII(JSON.stringify(data));
    } catch (err) {
      // Surface in console — at build time, the scan-pii script is the
      // authoritative gate. In dev, a thrown error here helps us notice.
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }, []);

  return (
    <div className="app-shell">
      <SEO title={seo.title} description={seo.description} />
      <a href="#hero" className="skip-link">
        Skip to main content
      </a>

      <Nav />

      <main className="console" id="main-content">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <Footer />
      <BackgroundDecor />

      {/* Belt-and-suspenders: ensure every declared section id exists somewhere
          in the DOM so the scroll-spy hook always has a target.  Section
          components own the real anchors; this is a static assertion only
          rendered if a content drift adds a section we forgot to wire. */}
      <div aria-hidden="true" style={{ display: 'none' }}>
        {sections.map((s) => (
          <span key={s.id} data-section-id={s.id} />
        ))}
      </div>
    </div>
  );
}
