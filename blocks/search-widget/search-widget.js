/**
 * search-widget (PLACEHOLDER)
 *
 * POC stub for the MD Anderson typeahead search widgets ("Search Cancer Types",
 * "Search Clinical Trials"). Renders a styled heading + input + "Browse" link.
 *
 * Authored structure (one row):
 *   | Search Widget (cancer-types) |
 *   | Heading text                 |
 *   | Placeholder text             |
 *   | [Browse link](url)           |
 *
 * TODO (post-POC): wire the input to the real search endpoint for live typeahead
 * results. Variant class (cancer-types | clinical-trials) selects the endpoint.
 *
 * @param {Element} block
 */
export default function init(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const heading = rows[0]?.textContent.trim() || 'Search';
  const placeholder = rows[1]?.textContent.trim() || 'Search…';
  const browseLink = block.querySelector('a');

  block.textContent = '';

  const title = document.createElement('h3');
  title.className = 'search-widget-title';
  title.textContent = heading;

  const field = document.createElement('div');
  field.className = 'search-widget-field';
  const input = document.createElement('input');
  input.type = 'search';
  input.placeholder = placeholder;
  input.setAttribute('aria-label', heading);
  input.disabled = true; // PLACEHOLDER: no backend wired yet
  field.append(input);

  block.append(title, field);

  if (browseLink) {
    browseLink.classList.add('search-widget-browse');
    block.append(browseLink);
  }
}
