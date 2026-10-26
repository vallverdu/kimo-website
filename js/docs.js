const contents = document.querySelector('.docs-contents');
const smallScreen = matchMedia('(max-width: 800px)');
const summary = contents.querySelector('summary');

function adaptContents() { contents.open = !smallScreen.matches; }
smallScreen.addEventListener('change', adaptContents);
adaptContents();

contents.addEventListener('click', event => {
  const link = event.target.closest('a[href^="#"]');
  if (!link || !smallScreen.matches) return;
  // Close before native anchor scrolling calculates the section's position.
  contents.open = false;
  const heading = document.querySelector(link.getAttribute('href'))?.querySelector('h2');
  if (heading) {
    heading.tabIndex = -1;
    // Let the native anchor navigation finish before moving reading focus.
    requestAnimationFrame(() => heading.focus({ preventScroll: true }));
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && smallScreen.matches && contents.open && contents.contains(document.activeElement)) {
    contents.open = false;
    summary.focus();
  }
});

const sections = [...document.querySelectorAll('.doc-section')];
const links = [...document.querySelectorAll('.docs-contents nav a')];
let frame;
function markSection() {
  frame = undefined;
  // Account for both sticky bars and the section's anchor spacing on phones.
  const line = smallScreen.matches ? 180 : 130;
  let current = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= line) current = section;
  }
  links.forEach(link => {
    if (link.hash === `#${current.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
addEventListener('scroll', () => { if (frame === undefined) frame = requestAnimationFrame(markSection); }, { passive: true });
addEventListener('resize', () => { if (frame === undefined) frame = requestAnimationFrame(markSection); });
markSection();
