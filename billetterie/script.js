/**
 * TUKIO PRO v2 — Module Pages Shared Script
 * Navbar, hamburger, FAQ, scroll reveal, counter, CTA form
 */
(function () {
  'use strict';

  /* ── NAVBAR SCROLL ── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  /* ── HAMBURGER MENU ── */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      mobileMenu.classList.toggle('open', isOpen);
      mobileMenu.setAttribute('aria-hidden', !isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(el => {
      el.addEventListener('click', () => {
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
    document.addEventListener('click', (e) => {
      if (navbar && !navbar.contains(e.target) && mobileMenu.classList.contains('open')) {
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── FAQ ACCORDION ── */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('.faq-question').forEach(other => {
        if (other !== btn) {
          other.setAttribute('aria-expanded', 'false');
          const ans = document.getElementById(other.getAttribute('aria-controls'));
          if (ans) ans.hidden = true;
        }
      });
      btn.setAttribute('aria-expanded', !isExpanded);
      const answer = document.getElementById(btn.getAttribute('aria-controls'));
      if (answer) answer.hidden = isExpanded;
    });
  });

  /* ── SCROLL REVEAL ── */
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 0.08}s`;
      obs.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  /* ── ANIMATED COUNTER ── */
  if ('IntersectionObserver' in window) {
    const cObs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.dataset.target, 10);
        const isLarge = target >= 10000;
        const start = performance.now();
        const tick = now => {
          const p = Math.min((now - start) / 1800, 1);
          const val = Math.floor((1 - Math.pow(1 - p, 3)) * target);
          el.textContent = isLarge ? val.toLocaleString('fr-FR') : val;
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = isLarge ? target.toLocaleString('fr-FR') : target;
        };
        requestAnimationFrame(tick);
        cObs.unobserve(el);
      }),
      { threshold: 0.5 }
    );
    document.querySelectorAll('.stat-number[data-target]').forEach(el => cObs.observe(el));
  }

  /* ── CTA FORM ── */
  const submit = document.querySelector('.cta-submit');
  const input  = document.querySelector('.cta-input');
  if (submit && input) {
    const validate = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
    submit.addEventListener('click', () => {
      if (!validate()) {
        input.style.borderColor = '#E05050'; input.focus();
        setTimeout(() => input.style.borderColor = '', 2200); return;
      }
      submit.textContent = 'En cours…'; submit.disabled = true;
      setTimeout(() => {
        submit.textContent = '✓ Demande envoyée !';
        submit.style.background = '#2D8A2D'; input.value = '';
      }, 1200);
    });
    input.addEventListener('keydown', e => { if (e.key === 'Enter') submit.click(); });
  }

})();
