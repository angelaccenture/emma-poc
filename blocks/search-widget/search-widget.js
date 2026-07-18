/**
 * search-widget — MD Anderson search panel.
 * Authored rows: [0] title, [1] placeholder text, [2] browse link.
 * Renders: heading + a (visual, non-functional) search input using the
 * placeholder text, then the browse link below. POC = visual match; the input
 * is decorative (no backend wired).
 */
export default function init(el) {
  const rows = [...el.querySelectorAll(':scope > div')];
  const [titleRow, placeholderRow, linkRow] = rows;

  // Heading
  if (titleRow) {
    const titleText = titleRow.textContent.trim();
    const heading = document.createElement('h3');
    heading.className = 'search-widget-title';
    heading.textContent = titleText;
    titleRow.replaceWith(heading);
  }

  // Search input (placeholder from the second row)
  if (placeholderRow) {
    const placeholder = placeholderRow.textContent.trim();
    const field = document.createElement('div');
    field.className = 'search-widget-field';
    const input = document.createElement('input');
    input.type = 'search';
    input.className = 'search-widget-input';
    input.setAttribute('placeholder', placeholder);
    input.setAttribute('aria-label', placeholder);
    field.append(input);
    placeholderRow.replaceWith(field);
  }

  // Browse link
  if (linkRow) {
    linkRow.classList.add('search-widget-link');
  }
}
