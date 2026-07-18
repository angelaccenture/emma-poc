/**
 * Banner — MD Anderson announcement / appointment bands.
 *
 * The colored background is owned by the SECTION (set via section-metadata
 * Background); the banner only handles layout + white content.
 *
 * Two shapes:
 *  - Announcement grid (icon | text | button): author adds a glyph variant
 *    (e.g. `glyph-location`, `glyph-drop`). Authored rows: heading, body copy,
 *    and a standalone link (its own paragraph) which becomes the outline button.
 *  - Centered bar (`center`): a single centered line, links kept inline.
 *
 * Add `dismissible` to show a session-dismiss close button.
 */
export default function init(el) {
  const rows = [...el.querySelectorAll(':scope > div')];

  const content = document.createElement('div');
  content.className = 'banner-content';
  rows.forEach((row) => {
    [...row.children].forEach((cell) => content.append(...cell.childNodes));
  });
  el.textContent = '';

  // A standalone CTA = a <p> whose only content is a single link.
  const ctaPara = [...content.querySelectorAll(':scope > p')].find(
    (p) => p.children.length === 1
      && p.firstElementChild?.tagName === 'A'
      && p.textContent.trim() === p.firstElementChild.textContent.trim(),
  );

  // Icon cell — only when the author picked a glyph variant.
  if ([...el.classList].some((c) => c.startsWith('glyph-'))) {
    const icon = document.createElement('span');
    icon.className = 'banner-icon';
    icon.setAttribute('aria-hidden', 'true');
    el.append(icon);
  }

  el.append(content);

  if (ctaPara) {
    ctaPara.classList.add('banner-cta');
    el.append(ctaPara);
  }

  if (!el.classList.contains('dismissible')) return;

  // Session dismiss memory, keyed by the message text.
  const key = `banner-dismissed:${content.textContent.trim().slice(0, 60)}`;
  try {
    if (sessionStorage.getItem(key) === '1') {
      el.setAttribute('hidden', '');
      return;
    }
  } catch (e) { /* sessionStorage unavailable — just show the banner */ }

  const close = document.createElement('button');
  close.className = 'banner-close';
  close.type = 'button';
  close.setAttribute('aria-label', 'Dismiss announcement');
  close.innerHTML = '<span class="icon icon-close" aria-hidden="true">×</span>';
  close.addEventListener('click', () => {
    el.setAttribute('hidden', '');
    try { sessionStorage.setItem(key, '1'); } catch (e) { /* ignore */ }
  });
  el.append(close);
}
