document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const closeBtn = document.querySelector('.close-menu-btn');
  const menuOverlay = document.querySelector('.mobile-menu-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-links a, .mobile-logo');

  const setNavbarState = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 48);
  };

  const toggleMenu = () => {
    const isOpen = menuOverlay.classList.toggle('active');
    document.body.classList.toggle('menu-open', isOpen);
    menuOverlay.setAttribute('aria-hidden', String(!isOpen));
  };

  window.addEventListener('scroll', setNavbarState, { passive: true });
  setNavbarState();

  mobileBtn?.addEventListener('click', toggleMenu);
  closeBtn?.addEventListener('click', toggleMenu);
  mobileLinks.forEach((link) => link.addEventListener('click', toggleMenu));

  menuOverlay?.addEventListener('click', (event) => {
    if (event.target === menuOverlay) toggleMenu();
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      const offset = navbar.offsetHeight + 12;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });

  const revealElements = document.querySelectorAll('.scroll-reveal, .fade-up:not(.hero .fade-up)');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.16,
    rootMargin: '0px 0px -70px 0px'
  });

  revealElements.forEach((element) => observer.observe(element));
});
