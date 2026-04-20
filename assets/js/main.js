(function() {
  'use strict';

  // Mobile menu toggle
  const toggler = document.querySelector('.navbar-toggler');
  const collapse = document.querySelector('.navbar-collapse');
  if (toggler && collapse) {
    toggler.addEventListener('click', () => {
      toggler.classList.toggle('active');
      collapse.classList.toggle('show');
    });
  }

  // Close menu when nav link clicked
  document.querySelectorAll('.navbar-nav a').forEach(a => {
    a.addEventListener('click', () => {
      if (toggler) toggler.classList.remove('active');
      if (collapse) collapse.classList.remove('show');
    });
  });

  // Sticky navigation on scroll
  const nav = document.querySelector('.navigation');
  const backTop = document.querySelector('.back-to-top');
  const scrollEntries = Array.from(document.querySelectorAll('.page-scroll'))
    .map(link => ({ link, target: document.querySelector(link.hash) }))
    .filter(e => e.target);

  let ticking = false;
  const update = () => {
    ticking = false;
    const y = window.scrollY;
    if (nav) nav.classList.toggle('sticky', y >= 10);
    if (backTop) backTop.classList.toggle('show', y > 600);
    scrollEntries.forEach(({ link, target }) => {
      const offset = target.getBoundingClientRect().top + y - 90;
      if (offset <= y) {
        link.parentElement.classList.add('active');
        Array.from(link.parentElement.parentElement.children).forEach(li => {
          if (li !== link.parentElement) li.classList.remove('active');
        });
      }
    });
  };
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // Modal (replaces magnific-popup)
  let modalCounter = 0;
  const openModal = (targetId) => {
    const content = document.querySelector(targetId);
    if (!content) return;
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML = '<div class="modal-container"><button class="modal-close" aria-label="Fermer" type="button">&times;</button><div class="modal-body"></div></div>';
    const body = overlay.querySelector('.modal-body');
    body.innerHTML = content.innerHTML;
    const heading = body.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) {
      const headingId = heading.id || (heading.id = `modal-title-${++modalCounter}`);
      overlay.setAttribute('aria-labelledby', headingId);
    }
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => overlay.classList.add('open'));

    const close = () => {
      overlay.classList.remove('open');
      setTimeout(() => {
        overlay.remove();
        document.body.style.overflow = '';
      }, 200);
      document.removeEventListener('keydown', onKey);
    };
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    overlay.querySelector('.modal-close').addEventListener('click', close);
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', onKey);
    overlay.querySelector('.modal-close').focus();
  };

  document.querySelectorAll('.text-popup').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      openModal(link.getAttribute('href'));
    });
  });
})();
