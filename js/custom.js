
  const normalize = path =>
    path.replace(/\/+$/, '').toLowerCase() || '/';

  const current = normalize(window.location.pathname);

  document.querySelectorAll('.desktop-nav a').forEach(link => {
    const linkPath = normalize(new URL(link.href).pathname);

    if (linkPath === current) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });


