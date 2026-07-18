/**
 * media — MD Anderson full-bleed media feature.
 * A background image (or video poster) with a heading and a play/CTA link
 * overlaid bottom-left. The authored link becomes a play button when it points
 * at a video, otherwise a plain overlay link.
 *
 * Authored rows (:scope > div):
 *  - [0] a cell with the <picture> (background image)
 *  - [1..] heading + a link
 */
export default function init(el) {
  const pic = el.querySelector('picture');
  const heading = el.querySelector('h1, h2, h3, h4, h5, h6');
  const link = el.querySelector('a');

  el.textContent = '';

  if (pic) {
    const bg = document.createElement('div');
    bg.className = 'media-bg';
    bg.append(pic);
    el.append(bg);
  }

  const content = document.createElement('div');
  content.className = 'media-content';

  if (heading) {
    heading.classList.add('media-heading');
    content.append(heading);
  }

  if (link) {
    link.classList.add('media-cta');
    // A trailing play-triangle glyph is added via CSS ::before.
    content.append(link);
  }

  el.append(content);
}
