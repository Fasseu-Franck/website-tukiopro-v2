/**
 * TUKIO PRO v2 — Home Page Scripts
 * Navbar scroll, menu mobile, FAQ, scroll reveal, compteur animé, CTA form
 */
(function () {
  'use strict';

  /* ── NAVBAR SCROLL ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  /* ── MENU HAMBURGER ── */
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
    mobileMenu.querySelectorAll('.mobile-nav-link, .btn-nav-pro, .btn-nav-login').forEach(el => {
      el.addEventListener('click', () => {
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && mobileMenu.classList.contains('open')) {
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
      // Close others
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
  const revealObs = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    }),
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
    revealObs.observe(el);
  });

  /* ── COMPTEUR ANIMÉ ── */
  const counterObs = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.target, 10);
      const isLarge = target >= 10000;
      const start = performance.now();
      const duration = 1800;
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = Math.floor(eased * target);
        el.textContent = isLarge ? val.toLocaleString('fr-FR') : val;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = isLarge ? target.toLocaleString('fr-FR') : target;
      };
      requestAnimationFrame(tick);
      counterObs.unobserve(el);
    }),
    { threshold: 0.5 }
  );
  document.querySelectorAll('.stat-number[data-target]').forEach(el => counterObs.observe(el));

  /* ── CTA FORM ── */
  const ctaSubmit = document.querySelector('.cta-submit');
  const ctaInput = document.querySelector('.cta-input');
  if (ctaSubmit && ctaInput) {
    ctaSubmit.addEventListener('click', () => {
      const email = ctaInput.value.trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        ctaInput.style.borderColor = '#E05050';
        ctaInput.focus();
        setTimeout(() => ctaInput.style.borderColor = '', 2200);
        return;
      }
      ctaSubmit.textContent = 'En cours…';
      ctaSubmit.disabled = true;
      setTimeout(() => {
        ctaSubmit.textContent = '✓ Demande envoyée !';
        ctaSubmit.style.background = '#2D8A2D';
        ctaInput.value = '';
      }, 1200);
    });
    ctaInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') ctaSubmit.click();
    });
  }

})();
