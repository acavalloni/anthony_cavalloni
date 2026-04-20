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
  const scrollLinks = document.querySelectorAll('.page-scroll');

  const onScroll = () => {
    const y = window.scrollY;
    if (nav) nav.classList.toggle('sticky', y >= 10);
    if (backTop) backTop.classList.toggle('show', y > 600);
    scrollLinks.forEach(link => {
      const target = document.querySelector(link.hash);
      if (!target) return;
      const offset = target.getBoundingClientRect().top + window.scrollY - 73;
      if (offset <= y) {
        link.parentElement.classList.add('active');
        Array.from(link.parentElement.parentElement.children).forEach(li => {
          if (li !== link.parentElement) li.classList.remove('active');
        });
      }
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // Modal (replaces magnific-popup)
  const openModal = (targetId) => {
    const content = document.querySelector(targetId);
    if (!content) return;
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML = '<div class="modal-container"><button class="modal-close" aria-label="Fermer" type="button">&times;</button><div class="modal-body"></div></div>';
    overlay.querySelector('.modal-body').innerHTML = content.innerHTML;
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
