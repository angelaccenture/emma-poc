/*
 * Path-driven site resolver.
 *
 * The first path segment (after any locale prefix) selects the header block,
 * the footer block, and the template — so which chrome a page gets is decided
 * by WHERE the page lives, never by author-set metadata. Add a new site by
 * adding one entry here; authors do nothing.
 *
 *   /siteone/**        → MD Anderson header + footer, landing template
 *   /sitetwo/**        → minimal header + mega footer, sitetwo template
 *   /de/sitetwo/**     → same as /sitetwo/** (locale prefix is stripped first)
 *   /  ·  /index  ·  …  → ROOT: no header, no footer, no template
 *
 * `header`/`footer` are block class strings (a space-separated variant is
 * allowed, e.g. 'footer mega'), or 'off' to remove the landmark entirely.
 * `template` is a template name, or null for no template.
 */

/** Root and any unrecognized top-level path: no chrome at all. */
const ROOT = { header: 'off', footer: 'off', template: null };

const SITES = {
  siteone: { header: 'header', footer: 'footer', template: 'landing' },
  sitetwo: { header: 'header minimal', footer: 'footer mega', template: 'sitetwo' },
  // sitethree: { … } — add when its design is known.
};

/**
 * Resolve the site config for a pathname.
 * @param {string} pathname - defaults to the current location.
 * @param {string} localePrefix - optional locale prefix to strip (e.g. '/de').
 * @returns {{header: string, footer: string, template: (string|null)}}
 */
export function getSite(pathname = window.location.pathname, localePrefix = '') {
  let path = pathname;
  if (localePrefix && path.startsWith(`${localePrefix}/`)) {
    path = path.slice(localePrefix.length);
  }
  const segment = path.split('/')[1];
  return SITES[segment] || ROOT;
}
