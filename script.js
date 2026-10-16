(() => {
  const progress = document.getElementById('scroll-progress');
  const updateProgress = () => {
    if (!progress) return;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const amount = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
    progress.style.width = Math.max(0, Math.min(amount, 100)) + '%';
  };
  document.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  updateProgress();

  const menu = document.getElementById('mobile-nav');
  const toggle = document.getElementById('menu-toggle');
  if (toggle && menu) {
    const close = () => { menu.hidden = true; toggle.setAttribute('aria-expanded','false'); toggle.setAttribute('aria-label','Open menu'); };
    toggle.addEventListener('click', () => {
      const opening = menu.hidden;
      menu.hidden = !opening;
      toggle.setAttribute('aria-expanded', String(opening));
      toggle.setAttribute('aria-label', opening ? 'Close menu' : 'Open menu');
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    document.addEventListener('click', e => { if (!menu.hidden && !menu.contains(e.target) && !toggle.contains(e.target)) close(); });
  }

  const filters = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  filters.forEach(button => {
    button.addEventListener('click', () => {
      const selected = button.dataset.filter;
      filters.forEach(filter => { const active = filter === button; filter.classList.toggle('active', active); filter.setAttribute('aria-pressed', String(active)); });
      cards.forEach(card => { card.hidden = !(selected === 'All' || card.dataset.category === selected); });
    });
  });
  // Subtle motion only where the user permits it; page content remains accessible without it.
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const targets = document.querySelectorAll('.section-heading-row, .project-card, .about-copy, .about-photo-wrap, .timeline-entry, .skill-group, .manifesto-inner>p, .contact-main');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: .08, rootMargin: '0px 0px -30px 0px' });
    targets.forEach(el => { el.classList.add('reveal'); observer.observe(el); });
  }
})();
