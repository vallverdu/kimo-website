const root = document.documentElement;
const systemTheme = matchMedia('(prefers-color-scheme: dark)');
const themeButton = document.querySelector('.theme-toggle');
const isDark = () => (root.dataset.theme || (systemTheme.matches ? 'dark' : 'light')) === 'dark';

function syncTheme() {
  const dark = isDark();
  document.querySelectorAll('[data-screen]').forEach(image => {
    image.src = `assets/screenshots/${image.dataset.screen}${dark ? '-dark' : ''}.png`;
  });
  themeButton.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
  themeButton.querySelector('use').setAttribute('href', dark ? '#sun' : '#moon');
  document.querySelector('meta[name="theme-color"]').content = getComputedStyle(root).getPropertyValue('--color-background').trim();
}

themeButton.hidden = false;
themeButton.addEventListener('click', () => {
  root.dataset.theme = isDark() ? 'light' : 'dark';
  try { localStorage.setItem('kimo-site-theme', root.dataset.theme); } catch { /* The current page still changes. */ }
  syncTheme();
});
systemTheme.addEventListener('change', syncTheme);
syncTheme();

const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
menuButton.hidden = false;
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  mobileNav.hidden = true;
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  mobileNav.hidden = !open;
});
mobileNav.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileNav.hidden) { closeMenu(); menuButton.focus(); }
});
matchMedia('(min-width: 801px)').addEventListener('change', closeMenu);

const tabs = [...document.querySelectorAll('.view-tab')];
function selectTab(tab) {
  tabs.forEach(item => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
  });
  document.querySelector('#feature-description').textContent = document.getElementById(tab.getAttribute('aria-controls')).dataset.description;
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectTab(tabs[next]); tabs[next].focus(); }
  });
});

const installCommand = 'curl -fsSL https://raw.githubusercontent.com/vallverdu/kimo/main/install.sh | sh';
document.querySelectorAll('[data-install]').forEach(button => {
  button.addEventListener('click', () => {
    const server = button.dataset.install === 'server';
    document.querySelectorAll('[data-install]').forEach(option => option.setAttribute('aria-pressed', String(option === button)));
    document.querySelector('#install-command').textContent = installCommand + (server ? ' -s -- --server' : '');
    document.querySelector('#install-note').textContent = server ? 'Server only · macOS + Linux · no native window required' : 'macOS (Apple silicon / Intel) · Linux (ARM64 / x86_64)';
  });
});

let toastTimer;
function notify(message) {
  const toast = document.querySelector('#toast');
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.hidden = false;
  toastTimer = setTimeout(() => { toast.hidden = true; }, 3000);
}
if (navigator.clipboard?.writeText) {
  document.querySelectorAll('[data-copy]').forEach(button => {
    button.hidden = false;
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(document.getElementById(button.dataset.copy).textContent);
        notify('Command copied.');
      } catch {
        notify('Could not copy. Select the command and copy it manually.');
      }
    });
  });
}
