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
  

  // ── Mobile Menu ──
  const navToggle = document.querySelector('.lvn-nav-toggle');
  const navLinks = document.querySelector('.lvn-nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.textContent = isOpen ? '✕' : '☰';
      navToggle.setAttribute('aria-expanded', isOpen);
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.textContent = '☰';
      });
    });
    // Close on outside click
    document.addEventListener('click', e => {
      if (!e.target.closest('.lvn-nav') && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        navToggle.textContent = '☰';
      }
    });
  }

  // ── Onboarding Tour ──
  const TOUR_KEY = 'lvn-tour-done';
  
  window.startTour = function() {
    const steps = [
      { target: '.lvn-nav-logo', title: 'Welcome!', text: 'This is the Latent Value Network — an open protocol for AI-assisted human cooperation. Let\'s show you around.' },
      { target: '.journey-flow', title: 'Your Path', text: 'Follow this 4-step journey: try the demo, read the specs, debate the open questions, then join the build.' },
      { target: '.gh-stats, .stat-row', title: 'Live Project', text: 'This is an active open-source project with working documents, discussions, and a development roadmap.' },
      { target: '.doc-grid', title: 'Specifications', text: 'Six working documents define the protocol. Hover any card to preview its contents.' },
      { target: '.lvn-nav-theme', title: 'Dark Mode', text: 'Toggle dark mode anytime with this button. Your preference is saved.' }
    ];
    
    let current = 0;
    
    // Create overlay
    let overlay = document.querySelector('.tour-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'tour-overlay';
      document.body.appendChild(overlay);
    }
    
    let tooltip = document.querySelector('.tour-tooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.className = 'tour-tooltip';
      document.body.appendChild(tooltip);
    }
    
    function showStep(idx) {
      // Clean up previous
      document.querySelectorAll('.tour-highlight').forEach(el => el.classList.remove('tour-highlight'));
      
      if (idx >= steps.length) {
        endTour();
        return;
      }
      
      const step = steps[idx];
      const target = document.querySelector(step.target);
      
      if (target) {
        target.classList.add('tour-highlight');
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      tooltip.innerHTML = 
        '<div class="tour-tooltip-step">Step ' + (idx + 1) + ' of ' + steps.length + '</div>' +
        '<div class="tour-tooltip-title">' + step.title + '</div>' +
        '<div class="tour-tooltip-text">' + step.text + '</div>' +
        '<div class="tour-tooltip-btns">' +
          '<button class="tour-btn tour-btn-skip" onclick="endTour()">Skip</button>' +
          '<button class="tour-btn tour-btn-next" onclick="nextTourStep()">' + 
            (idx === steps.length - 1 ? 'Got it!' : 'Next →') + 
          '</button>' +
        '</div>';
      
      // Position tooltip near target
      setTimeout(() => {
        overlay.classList.add('active');
        tooltip.classList.add('active');
        
        if (target) {
          const rect = target.getBoundingClientRect();
          const ttRect = tooltip.getBoundingClientRect();
          let top = rect.bottom + 12;
          let left = rect.left + rect.width / 2 - ttRect.width / 2;
          
          // Keep within viewport
          if (top + ttRect.height > window.innerHeight - 20) top = rect.top - ttRect.height - 12;
          if (left < 10) left = 10;
          if (left + ttRect.width > window.innerWidth - 10) left = window.innerWidth - ttRect.width - 10;
          
          tooltip.style.top = top + 'px';
          tooltip.style.left = left + 'px';
        } else {
          tooltip.style.top = '50%';
          tooltip.style.left = '50%';
          tooltip.style.transform = 'translate(-50%, -50%)';
        }
      }, 150);
      
      current = idx;
    }
    
    window.nextTourStep = function() {
      showStep(current + 1);
    };
    
    window.endTour = function() {
      overlay.classList.remove('active');
      tooltip.classList.remove('active');
      document.querySelectorAll('.tour-highlight').forEach(el => el.classList.remove('tour-highlight'));
      try { localStorage.setItem(TOUR_KEY, '1'); } catch {}
    };
    
    // Close on overlay click
    overlay.addEventListener('click', endTour);
    
    showStep(0);
  };
  
  // Auto-start tour for first-time visitors (only on hub page)
  const isHub = !window.location.pathname.includes('demo') && 
                !window.location.pathname.includes('provocations') && 
                !window.location.pathname.includes('architecture');
  try {
    if (isHub && !localStorage.getItem(TOUR_KEY)) {
      setTimeout(startTour, 1500);
    }
  } catch {}

})();
