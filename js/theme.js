// Apply the saved preference before styles paint. Storage can be unavailable.
document.documentElement.classList.add('js');
try {
  const theme = localStorage.getItem('kimo-site-theme');
  if (theme === 'light' || theme === 'dark') document.documentElement.dataset.theme = theme;
} catch { /* Follow the system theme. */ }
