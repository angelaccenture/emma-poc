/**
 * planlist — MD Anderson "Plan Your Care" / "Your Gifts at Work" list.
 * A heading followed by clickable rows (title + description + trailing arrow),
 * separated by thin rules, with an optional footer link.
 *
 * Authored rows (:scope > div):
 *  - Heading row: a single cell containing a heading (h2–h4).
 *  - Item row: cells — [title link] and [description]. In the `thumbnail`
 *    variant an item row may lead with a picture cell: [picture][title][desc].
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

    // Item row — optional leading thumbnail + title link + description.
    const item = document.createElement('a');
    item.className = 'planlist-item';
    if (link) item.href = link.getAttribute('href');

    // Identify the picture cell (thumbnail variant) BEFORE moving anything, so
    // the remaining cells still resolve to the title + description columns.
    const picture = row.querySelector('picture');
    const pictureCell = picture ? cells.find((c) => c.contains(picture)) : null;
    const textCells = cells.filter((c) => c !== pictureCell);

    // Thumbnail (thumbnail variant): a picture in the row leads the item.
    if (picture) {
      const thumb = document.createElement('span');
      thumb.className = 'planlist-item-thumb';
      thumb.append(picture);
      item.append(thumb);
    }

    // Text wrapper — groups title + description alongside the thumbnail.
    const text = document.createElement('span');
    text.className = 'planlist-item-text';

    // Title + description live in the non-picture cells.
    const titleCell = textCells[0];
    const descCell = textCells[1];

    const title = document.createElement('span');
    title.className = 'planlist-item-title';
    title.textContent = (titleCell?.querySelector('a') || titleCell)?.textContent.trim() || '';
    text.append(title);

    const descText = descCell?.textContent.trim();
    if (descText) {
      const desc = document.createElement('span');
      desc.className = 'planlist-item-desc';
      desc.textContent = descText;
      text.append(desc);
    }

    item.append(text);
    el.append(item);
  });
}
