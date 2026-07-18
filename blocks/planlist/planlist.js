/**
 * planlist — MD Anderson "Plan Your Care" list.
 * A heading followed by clickable rows (title + description + trailing arrow),
 * separated by thin rules, with an optional footer link.
 *
 * Authored rows (:scope > div):
 *  - Heading row: a single cell containing a heading (h2–h4).
 *  - Item row: two cells — [title link] and [description].
 *  - Footer row: a single cell containing just a link (rendered as the
 *    bottom "View …" link).
 */
export default function init(el) {
  const rows = [...el.querySelectorAll(':scope > div')];
  el.textContent = '';

  rows.forEach((row) => {
    const cells = [...row.children];
    const heading = row.querySelector('h1, h2, h3, h4, h5, h6');

    // Heading row
    if (heading && cells.length === 1) {
      heading.classList.add('planlist-title');
      el.append(heading);
      return;
    }

    const link = row.querySelector('a');

    // Footer row — a lone link
    if (cells.length === 1 && link && row.textContent.trim() === link.textContent.trim()) {
      const footer = document.createElement('p');
      footer.className = 'planlist-footer';
      footer.append(link);
      el.append(footer);
      return;
    }

    // Item row — title link + description
    const item = document.createElement('a');
    item.className = 'planlist-item';
    if (link) item.href = link.getAttribute('href');

    const title = document.createElement('span');
    title.className = 'planlist-item-title';
    title.textContent = (link || cells[0]).textContent.trim();
    item.append(title);

    const descText = cells[1]?.textContent.trim();
    if (descText) {
      const desc = document.createElement('span');
      desc.className = 'planlist-item-desc';
      desc.textContent = descText;
      item.append(desc);
    }

    el.append(item);
  });
}
