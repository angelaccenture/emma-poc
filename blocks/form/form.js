/**
 * form (PLACEHOLDER)
 *
 * POC stub for the newsletter signup ("Subscribe to our Cancerwise newsletter").
 * Renders the intro text + first/last/email fields + submit button. Non-functional.
 *
 * Authored structure (one row):
 *   | Form                                   |
 *   | Subscribe to our Cancerwise newsletter |
 *   | Get started                            |  (button label)
 *
 * TODO (post-POC): wire submission to the real marketing endpoint, or replace
 * with EDS Forms for full field config/validation.
 *
 * @param {Element} block
 */
export default function init(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const intro = rows[0]?.textContent.trim() || 'Sign up for our newsletter';
  const submitLabel = rows[1]?.textContent.trim() || 'Get started';

  block.textContent = '';

  const label = document.createElement('p');
  label.className = 'form-intro';
  label.textContent = intro;

  const form = document.createElement('form');
  form.className = 'form-fields';
  form.addEventListener('submit', (e) => e.preventDefault()); // PLACEHOLDER

  ['First Name', 'Last Name', 'Email Address'].forEach((ph, i) => {
    const input = document.createElement('input');
    input.type = i === 2 ? 'email' : 'text';
    input.placeholder = `${ph} *`;
    input.setAttribute('aria-label', ph);
    form.append(input);
  });

  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.className = 'form-submit';
  submit.textContent = submitLabel;
  form.append(submit);

  block.append(label, form);
}
