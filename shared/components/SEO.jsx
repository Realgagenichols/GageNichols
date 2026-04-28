import { useEffect } from 'react';

/**
 * Sets document title and meta tags (description, Open Graph, Twitter Card).
 * Idempotent — safe to render multiple times.
 *
 * @param {Object} props
 * @param {string} props.title
 * @param {string} props.description
 * @param {string} [props.ogImage]
 * @param {string} [props.url]
 */
export function SEO({ title, description, ogImage, url }) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    document.title = title;

    const tags = [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      ...(ogImage ? [{ property: 'og:image', content: ogImage }] : []),
      ...(url ? [{ property: 'og:url', content: url }] : []),
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      ...(ogImage ? [{ name: 'twitter:image', content: ogImage }] : []),
    ];

    const created = [];
    for (const tag of tags) {
      const selector = tag.property
        ? `meta[property="${tag.property}"]`
        : `meta[name="${tag.name}"]`;
      let el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (tag.property) el.setAttribute('property', tag.property);
        if (tag.name) el.setAttribute('name', tag.name);
        document.head.appendChild(el);
        created.push(el);
      }
      el.setAttribute('content', tag.content);
    }

    return () => {
      // Only remove tags this render created — leaves any pre-existing tags intact
      for (const el of created) {
        el.remove();
      }
    };
  }, [title, description, ogImage, url]);

  return null;
}
