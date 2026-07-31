import { getConfig } from '../../scripts/ak.js';
import { loadFragment } from '../fragment/fragment.js';

const { locale } = getConfig();

/* SAP-style minimal header: brand logo on the left, a hamburger toggle on the
   right that reveals the nav panel. Content comes from the sitetwo header
   fragment — never the MD Anderson nav. */
const HEADER_PATH = '/sitetwo/fragments/nav/header';

function decorateNav(fragment) {
  const sections = [...fragment.querySelectorAll(':scope > .section')];
  const [brand, nav] = sections;
  if (brand) brand.classList.add('header-sap-brand');
  if (nav) {
    nav.classList.add('header-sap-nav');
    nav.querySelector('ul')?.classList.add('header-sap-nav-list');
  }
}

function buildToggle(el) {
  const toggle = document.createElement('button');
  toggle.className = 'header-sap-toggle';
  toggle.type = 'button';
  toggle.setAttribute('aria-label', 'Open menu');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.innerHTML = '<span></span><span></span><span></span>';
  toggle.addEventListener('click', () => {
    const open = el.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  return toggle;
}

/**
 * loads and decorates the SAP-style header
 * @param {Element} el The header element
 */
export default async function init(el) {
  try {
    const fragment = await loadFragment(`${locale.prefix}${HEADER_PATH}`);
    fragment.classList.add('header-sap-content');
    decorateNav(fragment);
    el.append(fragment);
    el.append(buildToggle(el));
  } catch (e) {
    throw Error(e);
  }
}
