import { getConfig } from '../../scripts/ak.js';
import { loadFragment } from '../fragment/fragment.js';

const FOOTER_PATH = '/fragments/nav/footer';

function getNavPath(defaultPath) {
  // Derive the site-scoped fragment path from the current page's top-level
  // segment (e.g. /siteone/** -> /siteone/fragments/nav/footer) so multiple
  // sites in one repo each load their own chrome. Falls back to the repo root.
  const [site] = window.location.pathname.split('/').filter(Boolean);
  return site ? `/${site}${defaultPath}` : defaultPath;
}

/**
 * loads and decorates the footer
 * @param {Element} el The footer element
 */
export default async function init(el) {
  const { locale } = getConfig();
  const path = getNavPath(FOOTER_PATH);
  try {
    const fragment = await loadFragment(`${locale.prefix}${path}`);
    fragment.classList.add('footer-content');

    const sections = [...fragment.querySelectorAll('.section')];

    const copyright = sections.pop();
    copyright.classList.add('section-copyright');

    const legal = sections.pop();
    legal.classList.add('section-legal');

    el.append(fragment);
  } catch (e) {
    throw Error(e);
  }
}
