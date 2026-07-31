import { getMetadata, loadBlock } from '../ak.js';
import { getSite } from '../sites.js';

export default async function loadFooter() {
  const footer = document.querySelector('footer');
  if (!footer) return;
  // Path decides the footer block (see scripts/sites.js); explicit metadata wins.
  const meta = getMetadata('footer') || getSite().footer;
  if (meta === 'off') {
    footer.remove();
    return;
  }
  footer.className = meta;
  loadBlock(footer);
}
