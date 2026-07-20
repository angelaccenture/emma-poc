import { getConfig, getMetadata } from '../../scripts/ak.js';
import { loadFragment } from '../fragment/fragment.js';

const FOOTER_PATH = '/fragments/nav/footer';

/**
 * loads and decorates the footer
 * @param {Element} el The footer element
 */
export default async function init(el) {
  const { locale } = getConfig();
  const footerMeta = getMetadata('footer');
  const path = footerMeta || FOOTER_PATH;
  try {
    const fragment = await loadFragment(`${locale.prefix}${path}`);
    fragment.classList.add('footer-content');

    const sections = [...fragment.querySelectorAll('.section')];

    const copyright = sections.pop();
    copyright.classList.add('section-copyright');

    const legal = sections.pop();
    legal.classList.add('section-legal');

    // Remaining sections: [0] brand logo, [1..] link columns.
    const [brand, ...columns] = sections;
    if (brand) brand.classList.add('section-brand');
    for (const col of columns) col.classList.add('section-column');

    // Tag social + podcast lists in the "Get in Touch" column so CSS can
    // render them as icon grids (the <ul> right after their heading <p>).
    const iconMap = { 'stay connected': 'social-icons', 'cancerwise podcast': 'podcast-icons' };
    for (const p of fragment.querySelectorAll('.section-column p strong')) {
      const key = p.textContent.trim().toLowerCase();
      const cls = iconMap[key];
      if (!cls) continue;
      const list = p.closest('p').nextElementSibling;
      if (list?.tagName === 'UL') list.classList.add('icon-list', cls);
    }

    // Tag the Call / Ask-a-question lines so they render beside a red glyph.
    for (const p of fragment.querySelectorAll('.section-column p:has(> a)')) {
      const href = p.querySelector('a').getAttribute('href') || '';
      if (href.startsWith('tel:')) p.classList.add('contact-line', 'contact-phone');
      else if (/ask-a-question/.test(href)) p.classList.add('contact-line', 'contact-ask');
    }

    el.append(fragment);
  } catch (e) {
    throw Error(e);
  }
}
