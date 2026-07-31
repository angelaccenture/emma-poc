import { getConfig } from '../../scripts/ak.js';
import { loadFragment } from '../fragment/fragment.js';

/* SAP-style mega footer: multi-column link groups (collapsible on mobile),
   then a legal/copyright + social strip. Content comes from the sitetwo
   footer fragment — never the MD Anderson footer. */
const FOOTER_PATH = '/sitetwo/fragments/nav/footer';

/* Column groups collapse into accordions on mobile: the heading becomes a
   button that toggles its list open. */
function decorateColumn(section) {
  section.classList.add('footer-sap-column');
  const heading = section.querySelector('p strong, h2, h3, h4, h5, h6');
  const list = section.querySelector('ul');
  if (!(heading && list)) return;

  const btn = document.createElement('button');
  btn.className = 'footer-sap-column-toggle';
  btn.type = 'button';
  btn.setAttribute('aria-expanded', 'false');
  btn.textContent = heading.textContent.trim();
  heading.closest('p, h2, h3, h4, h5, h6').replaceWith(btn);
  list.classList.add('footer-sap-column-list');

  btn.addEventListener('click', () => {
    const open = section.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', String(open));
  });
}

/**
 * loads and decorates the SAP-style footer
 * @param {Element} el The footer element
 */
export default async function init(el) {
  const { locale } = getConfig();
  try {
    const fragment = await loadFragment(`${locale.prefix}${FOOTER_PATH}`);
    fragment.classList.add('footer-sap-content');

    const sections = [...fragment.querySelectorAll(':scope > .section')];
    // Last section is the legal/copyright + social strip; the rest are columns.
    const legal = sections.pop();
    if (legal) legal.classList.add('footer-sap-legal');
    for (const col of sections) decorateColumn(col);

    el.append(fragment);
  } catch (e) {
    throw Error(e);
  }
}
