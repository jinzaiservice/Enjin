/* ===========================================
   縁陣（Enjin）LP – main.js
   =========================================== */

(function () {
  'use strict';

  /* ============================================
     1. Navigation – scroll state
     ============================================ */
  const nav = document.getElementById('nav');

  function onScroll() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ============================================
     2. Reveal on scroll (IntersectionObserver)
     ============================================ */
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.delay ? parseInt(el.dataset.delay, 10) : 0;
          setTimeout(() => {
            el.classList.add('visible');
          }, delay);
          revealObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((el) => revealObserver.observe(el));

  /* ============================================
     3. Counter Animation
     ============================================ */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const isFloat = target % 1 !== 0;
    const duration = 1800;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      el.textContent = (isFloat ? current.toFixed(1) : Math.round(current)) + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('.counter').forEach((el) => counterObserver.observe(el));

  /* ============================================
     4. Service Tabs
     ============================================ */
  const tabBtns = document.querySelectorAll('.service-tab-btn');
  const tabContents = document.querySelectorAll('.service-tab-content');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach((b) => b.classList.remove('active'));
      tabContents.forEach((c) => {
        c.classList.remove('active');
        c.style.animation = '';
      });

      btn.classList.add('active');
      const targetContent = document.getElementById('tab-' + target);
      if (targetContent) {
        targetContent.classList.add('active');
        targetContent.style.animation = 'tabFadeIn 0.35s ease forwards';
      }
    });
  });

  /* Inject tab animation keyframes */
  const tabStyle = document.createElement('style');
  tabStyle.textContent = `
    @keyframes tabFadeIn {
      from { opacity: 0; transform: translateY(12px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(tabStyle);

  /* ============================================
     5. FAQ Accordion
     ============================================ */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      faqItems.forEach((fi) => fi.classList.remove('open'));

      // Toggle clicked
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  /* ============================================
     6. Floating CTA visibility
     ============================================ */
  const floatingCta = document.getElementById('floatingCta');
  const heroSection = document.getElementById('sec01');
  const ctaSection = document.getElementById('sec10');

  function updateFloating() {
    const heroBottom = heroSection ? heroSection.getBoundingClientRect().bottom : 0;
    const ctaTop = ctaSection ? ctaSection.getBoundingClientRect().top : Infinity;
    const windowH = window.innerHeight;

    if (heroBottom < 0 && ctaTop > windowH) {
      floatingCta.classList.add('visible');
    } else {
      floatingCta.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', updateFloating, { passive: true });
  updateFloating();

  /* ============================================
     7. Smooth scroll for anchor links
     ============================================ */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href').slice(1);
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;
      e.preventDefault();

      const navH = nav ? nav.offsetHeight : 0;
      const top = targetEl.getBoundingClientRect().top + window.scrollY - navH - 12;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ============================================
     8. Cycle Diagram – staggered highlight loop
     ============================================ */
  const cycleItems = document.querySelectorAll('.cycle-item');

  if (cycleItems.length > 0) {
    let current = 0;
    let cycleTimer = null;

    function pulseCycle() {
      cycleItems.forEach((ci, i) => {
        if (i === current) {
          ci.style.boxShadow = '0 0 0 2px rgba(0,212,255,0.4)';
          ci.style.borderColor = 'rgba(0,212,255,0.3)';
        } else {
          ci.style.boxShadow = '';
          ci.style.borderColor = '';
        }
      });
      current = (current + 1) % cycleItems.length;
    }

    // Only start animation when the diagram is visible
    const diagramObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cycleTimer = setInterval(pulseCycle, 700);
          } else {
            if (cycleTimer) clearInterval(cycleTimer);
            cycleItems.forEach((ci) => {
              ci.style.boxShadow = '';
              ci.style.borderColor = '';
            });
            current = 0;
          }
        });
      },
      { threshold: 0.3 }
    );

    const diagram = document.querySelector('.cycle-diagram');
    if (diagram) diagramObserver.observe(diagram);
  }

  /* ============================================
     9. Particle dots on Hero (Canvas)
     ============================================ */
  (function () {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;opacity:0.35;';
    const hero = document.getElementById('sec01');
    if (!hero) return;
    hero.querySelector('.hero-bg').appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let W, H, particles;

    function resize() {
      W = canvas.width = hero.offsetWidth;
      H = canvas.height = hero.offsetHeight;
    }

    function initParticles() {
      particles = Array.from({ length: 50 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.5 + 0.2,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${p.alpha})`;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
      });
      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', () => {
      resize();
      initParticles();
    });

    resize();
    initParticles();
    draw();
  })();

})();
