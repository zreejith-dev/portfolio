/**
 * Sreejith R — Portfolio
 * Main JavaScript: Scroll animations, nav, back-to-top, scroll progress
 */
(function() {
  "use strict";

  // --- Intersection Observer for scroll reveal ---
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => io.observe(el));

  // --- Nav toggle ---
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // --- Scroll progress & Back to top ---
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight) * 100;
    if (scrollProgress) scrollProgress.style.width = scrolled + '%';
    if (backToTop) backToTop.classList.toggle('show', h.scrollTop > 600);
  }, { passive: true });

  if (backToTop) {
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Stagger animation for work cards ---
  const workGrid = document.querySelector('.work-grid');
  if (workGrid) {
    workGrid.classList.add('reveal-stagger');
    workGrid.querySelectorAll('.work-card').forEach(card => card.classList.add('stagger-child'));
    io.observe(workGrid);
  }

  // --- Stagger for services ---
  const servicesGrid = document.querySelector('.services-grid');
  if (servicesGrid) {
    servicesGrid.classList.add('reveal-stagger');
    servicesGrid.querySelectorAll('.service-card').forEach(card => card.classList.add('stagger-child'));
    io.observe(servicesGrid);
  }

  // --- Stats stagger ---
  const statsGrid = document.querySelector('.stats-grid');
  if (statsGrid) {
    statsGrid.classList.add('reveal-stagger');
    statsGrid.querySelectorAll('.stat-block').forEach(block => block.classList.add('stagger-child'));
    io.observe(statsGrid);
  }

  // --- Principles stagger ---
  const principles = document.querySelector('.principles');
  if (principles) {
    principles.classList.add('reveal-stagger');
    principles.querySelectorAll('li').forEach(li => li.classList.add('stagger-child'));
    io.observe(principles);
  }

  // --- Hero staggered load ---
  const heroElements = document.querySelectorAll('.hero-content > *, .hero-photo');
  heroElements.forEach((el, i) => {
    el.classList.add('hero-load');
    if (i === 0) el.classList.add('d1');
    else if (i === 1) el.classList.add('d2');
    else if (i === 2) el.classList.add('d3');
    else if (i === 3) el.classList.add('d4');
    else if (i === 4) el.classList.add('d5');
    else el.classList.add('d5');
  });

})();