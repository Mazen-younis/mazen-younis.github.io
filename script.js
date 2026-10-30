/**
 * Mazen Younis — Portfolio interactions
 * Shared by the English and German versions of the website.
 *
 * IMPORTANT: Translations live in the corresponding HTML pages, not here.
 * Language-switch links must point to the matching page in the other language.
 * The optional data-preserve-hash attribute keeps the current section when
 * switching between the English and German homepages.
 */

(() => {
  'use strict';

  // ------------------------------------------------------------
  // 1. Current language and accessible interface labels
  // ------------------------------------------------------------
  const isGerman = document.documentElement.lang.toLowerCase().startsWith('de');

  const labels = isGerman
    ? { openMenu: 'Menü öffnen', closeMenu: 'Menü schließen' }
    : { openMenu: 'Open menu', closeMenu: 'Close menu' };

  // ------------------------------------------------------------
  // 2. Reading progress indicator
  // ------------------------------------------------------------
  const progress = document.getElementById('scroll-progress');

  function updateProgress() {
    if (!progress) return;

    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = scrollableHeight > 0
      ? (window.scrollY / scrollableHeight) * 100
      : 0;

    progress.style.width = `${Math.max(0, Math.min(percentage, 100))}%`;
  }

  document.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  updateProgress();

  // ------------------------------------------------------------
  // 3. Accessible mobile navigation (English and German)
  // ------------------------------------------------------------
  const mobileMenu = document.getElementById('mobile-nav');
  const menuToggle = document.getElementById('menu-toggle');

  if (mobileMenu && menuToggle) {
    function setMenuOpen(isOpen) {
      mobileMenu.hidden = !isOpen;
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? labels.closeMenu : labels.openMenu);
    }

    // The menu starts closed, regardless of the current language.
    setMenuOpen(false);

    menuToggle.addEventListener('click', () => {
      setMenuOpen(mobileMenu.hidden);
    });

    // This also closes the menu after selecting a language link inside it.
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => setMenuOpen(false));
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') setMenuOpen(false);
    });

    document.addEventListener('click', event => {
      if (
        !mobileMenu.hidden &&
        !mobileMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    });

    // Prevent an open mobile menu from lingering after a desktop resize.
    window.addEventListener('resize', () => {
      if (window.innerWidth > 960 && !mobileMenu.hidden) {
        setMenuOpen(false);
      }
    }, { passive: true });
  }

  // ------------------------------------------------------------
  // 4. Language switching: preserve a homepage section if requested
  // ------------------------------------------------------------
  // Language switches are normal HTML links, so they work without JavaScript.
  // Add both attributes only to homepage switch links:
  //   data-language-switch data-preserve-hash
  // Example: If the visitor is at #work, switching to German opens #work.
  // Do not add data-preserve-hash to project pages unless their section IDs match.
  const sectionLanguageLinks = document.querySelectorAll(
    'a[data-language-switch][data-preserve-hash]'
  );

  sectionLanguageLinks.forEach(link => {
    // Save the original URL so switching between sections never accumulates hashes.
    link.dataset.languageBaseHref = link.getAttribute('href').split('#')[0];
  });

  function updateLanguageLinks() {
    sectionLanguageLinks.forEach(link => {
      const baseHref = link.dataset.languageBaseHref;
      link.setAttribute('href', baseHref + window.location.hash);
    });
  }

  window.addEventListener('hashchange', updateLanguageLinks);
  updateLanguageLinks();

  // ------------------------------------------------------------
  // 5. Project filters (same stable categories in both languages)
  // ------------------------------------------------------------
  // Translate the visible button labels in German HTML, but keep:
  // data-filter="All", "Industrial", "Embedded", and "AI" unchanged.
  // Project data-category values must also remain unchanged.
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedCategory = button.dataset.filter;

      filterButtons.forEach(filter => {
        const isActive = filter === button;
        filter.classList.toggle('active', isActive);
        filter.setAttribute('aria-pressed', String(isActive));
      });

      projectCards.forEach(card => {
        card.hidden = selectedCategory !== 'All' &&
          card.dataset.category !== selectedCategory;
      });
    });
  });

  // ------------------------------------------------------------
  // 6. Subtle scroll-reveal animations
  // ------------------------------------------------------------
  // If reduced motion is preferred (or IntersectionObserver is unsupported),
  // content stays visible without any animation.
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const animatedElements = document.querySelectorAll(
      '.section-heading-row, .project-card, .about-copy, ' +
      '.about-photo-wrap, .timeline-entry, .skill-group, ' +
      '.manifesto-inner > p, .contact-main'
    );

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px'
    });

    animatedElements.forEach(element => {
      element.classList.add('reveal');
      observer.observe(element);
    });
  }
})();
