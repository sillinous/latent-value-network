/* ═══════════════════════════════════════════════════
   LVN Shared JavaScript
   Dark mode, scroll reveal, nav active state
   ═══════════════════════════════════════════════════ */

(function() {
  'use strict';

  // ── Dark Mode ──
  const themeBtn = document.querySelector('.lvn-nav-theme');
  const stored = localStorage.getItem('lvn-theme');
  
  function setTheme(mode) {
    document.documentElement.setAttribute('data-theme', mode);
    localStorage.setItem('lvn-theme', mode);
    if (themeBtn) themeBtn.textContent = mode === 'dark' ? '☀' : '☽';
  }
  
  // Initialize: use stored preference, else follow system
  if (stored) {
    setTheme(stored);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark');
  }
  
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }
  
  // ── Nav Active State ──
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.lvn-nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
  
  // ── Scroll Reveal ──
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    
    reveals.forEach(el => observer.observe(el));
  }
  
  // ── Keyboard Navigation ──
  document.addEventListener('keydown', (e) => {
    // Escape closes any modal/overlay
    if (e.key === 'Escape') {
      const modal = document.querySelector('.modal.active, .overlay.active');
      if (modal) modal.classList.remove('active');
    }
  });
  
  // ── Smooth page load ──
  document.body.classList.add('page-fade-in');
  
})();
