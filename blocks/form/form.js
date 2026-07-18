/**
 * form — MD Anderson newsletter signup (visual match, POC).
 * Authored rows: [0] heading, [1] submit button label.
 * Renders: heading + a <form> with First/Last/Email inputs and a submit button.
 * The fields mirror the source newsletter form; not wired to a backend (POC).
 */
export default function init(el) {
  const rows = [...el.querySelectorAll(':scope > div')];
  const headingText = rows[0]?.textContent.trim() || '';
  const buttonText = rows[1]?.textContent.trim() || 'Submit';

  el.textContent = '';

  if (headingText) {
    const heading = document.createElement('p');
    heading.className = 'form-heading';
    heading.textContent = headingText;
    el.append(heading);
  }

  const form = document.createElement('form');
  form.className = 'form-fields';
  form.setAttribute('novalidate', '');

  const fields = [
    { name: 'first-name', placeholder: 'First Name *', type: 'text' },
    { name: 'last-name', placeholder: 'Last Name *', type: 'text' },
    { name: 'email', placeholder: 'Email Address *', type: 'email' },
  ];
  for (const f of fields) {
    const input = document.createElement('input');
    input.type = f.type;
    input.name = f.name;
    input.setAttribute('placeholder', f.placeholder);
    input.setAttribute('aria-label', f.placeholder.replace(' *', ''));
    form.append(input);
  }

  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.className = 'form-submit';
  submit.textContent = buttonText;
  form.append(submit);

  // POC: no backend — prevent navigation on submit.
  form.addEventListener('submit', (e) => e.preventDefault());

  el.append(form);
}
