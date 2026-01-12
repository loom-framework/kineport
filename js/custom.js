// -----------------------------------------------------------------------------
// Description: Application bootstrap and initialization logic.
// Author: Janis Bedeicis
// Github: https://github.com/loom-framework
// E-mail: loom.framework@gmail.com
// Created: 2008
// -----------------------------------------------------------------------------


document.addEventListener('DOMContentLoaded', () => {
  const normalize = path => {
    path = path.toLowerCase().replace(/\/+$/, '');
    if (path === '') path = '/';
    if (path === '/index.html') path = '/';
    return path;
  };

  const current = normalize(window.location.pathname);

  document.querySelectorAll('.desktop-nav a[href]').forEach(link => {
    const raw = link.getAttribute('href');
    if (!raw || raw === '#') return;

    const linkPath = normalize(new URL(link.href).pathname);

    if (linkPath === current) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
});






