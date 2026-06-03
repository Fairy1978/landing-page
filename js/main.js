/* =====================================================================
   יעל פריד — Landing Page JS
   ===================================================================== */

/* ── Meta Pixel ───────────────────────────────────────────────────── */
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','871510868935639');
fbq('track','PageView');

/* ── Setup ────────────────────────────────────────────────────────── */
const isMobile = window.matchMedia('(max-width: 768px)').matches;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const animationsEnabled = !prefersReducedMotion && !document.body.classList.contains('no-animations');

/* ── Navigation ───────────────────────────────────────────────────── */
function toggleMobileMenu() {
  document.getElementById('navLinks').classList.toggle('active');
}

function closeMobileMenu() {
  document.getElementById('navLinks').classList.remove('active');
}

function scrollToSection(className) {
  const el = document.querySelector('.' + className);
  if (el) {
    window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
  }
  closeMobileMenu();
}

document.addEventListener('click', function(e) {
  const nav = document.querySelector('.main-nav');
  const links = document.getElementById('navLinks');
  if (nav && links && !nav.contains(e.target) && links.classList.contains('active')) {
    closeMobileMenu();
  }
});

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('#navLinks a').forEach(function(a) {
    a.addEventListener('click', closeMobileMenu);
  });
});

/* ── Scroll to top button ─────────────────────────────────────────── */
(function() {
  const btn = document.getElementById('scrollTopBtn');
  if (!btn) return;
  window.addEventListener('scroll', function() {
    btn.style.opacity = window.scrollY > 400 ? '1' : '0';
    btn.style.pointerEvents = window.scrollY > 400 ? 'auto' : 'none';
  }, { passive: true });
})();

/* ── Nav hide on scroll down, show on scroll up ───────────────────── */
(function() {
  let lastY = 0;
  const nav = document.querySelector('.main-nav');
  window.addEventListener('scroll', function() {
    if (!nav) return;
    const y = window.scrollY;
    if (y > lastY && y > 200) {
      nav.style.transform = 'translateY(-100%)';
      nav.style.transition = 'transform 0.3s ease';
    } else {
      nav.style.transform = 'translateY(0)';
      nav.style.transition = 'transform 0.3s ease';
    }
    lastY = y;
  }, { passive: true });
})();

/* ── FAQ Accordion ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.faq-item').forEach(function(item) {
    item.querySelector('.faq-question').addEventListener('click', function() {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function(i) { i.classList.remove('open'); });
      if (!isOpen) item.classList.add('open');
    });
  });
});

/* ── Testimonial Carousel ─────────────────────────────────────────── */
let slideIndex = 0;
let autoSlideTimer;

function showSlides() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  if (!slides.length) return;
  slides.forEach(s => s.style.display = 'none');
  dots.forEach(d => d.style.backgroundColor = '#bbb');
  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;
  slides[slideIndex - 1].style.display = 'block';
  if (dots[slideIndex - 1]) dots[slideIndex - 1].style.backgroundColor = 'var(--accent-purple)';
  autoSlideTimer = setTimeout(showSlides, 4000);
}

function currentSlide(n) {
  clearTimeout(autoSlideTimer);
  slideIndex = n - 1;
  showSlides();
}

document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('.testimonial-slide')) showSlides();
});

/* ── Accessibility ────────────────────────────────────────────────── */
window.addEventListener('load', function() {
  const settings = JSON.parse(localStorage.getItem('accessibilitySettings') || '{}');
  Object.keys(settings).forEach(k => { if (settings[k]) document.body.classList.add(k); });
});

function toggleAccessibilityMenu() {
  document.getElementById('accessibilityMenu').classList.toggle('active');
}

function saveSettings() {
  const keys = ['large-text','larger-text','high-contrast','grayscale','readable-font','highlight-links','no-animations'];
  const settings = {};
  keys.forEach(k => { settings[k] = document.body.classList.contains(k); });
  localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
}

function increaseFontSize() {
  if (!document.body.classList.contains('larger-text')) {
    document.body.classList.toggle('large-text');
  } else {
    document.body.classList.remove('larger-text');
    document.body.classList.add('large-text');
  }
  saveSettings();
}

function decreaseFontSize() {
  if (document.body.classList.contains('larger-text')) {
    document.body.classList.remove('larger-text');
  } else {
    document.body.classList.remove('large-text');
  }
  saveSettings();
}

function toggleHighContrast() { document.body.classList.toggle('high-contrast'); saveSettings(); }
function toggleGrayscale() { document.body.classList.toggle('grayscale'); saveSettings(); }
function toggleReadableFont() { document.body.classList.toggle('readable-font'); saveSettings(); }
function toggleHighlightLinks() { document.body.classList.toggle('highlight-links'); saveSettings(); }
function toggleAnimations() { document.body.classList.toggle('no-animations'); saveSettings(); }

function resetAccessibility() {
  ['large-text','larger-text','high-contrast','grayscale','readable-font','highlight-links','no-animations']
    .forEach(k => document.body.classList.remove(k));
  localStorage.removeItem('accessibilitySettings');
}

document.addEventListener('click', function(e) {
  const menu = document.getElementById('accessibilityMenu');
  const btn = document.querySelector('.accessibility-btn');
  if (menu && btn && !menu.contains(e.target) && !btn.contains(e.target)) {
    menu.classList.remove('active');
  }
});

/* ── Force mobile/desktop preview toggle ─────────────────────────── */
function setMobilePreview() { document.body.classList.add('force-mobile'); }
function setDesktopPreview() { document.body.classList.remove('force-mobile'); }

/* ── Mechanism cards + Trance steps (plain JS, no GSAP dependency) ── */
function handleStickyCards(selector) {
  const cards = document.querySelectorAll(selector);
  if (!cards.length) return;
  const wh = window.innerHeight;
  let activeIndex = -1;
  cards.forEach((card, i) => {
    const rect = card.getBoundingClientRect();
    if (rect.top < wh * 0.8 && rect.bottom > 0) {
      activeIndex = i;
    }
  });
  cards.forEach((card, i) => {
    if (i === activeIndex) {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    } else {
      card.style.opacity = '0';
      card.style.transform = 'translateY(50px)';
    }
  });
}

window.addEventListener('scroll', function() {
  handleStickyCards('.mechanism-card');
  handleStickyCards('.trance-step');
}, { passive: true });

document.addEventListener('DOMContentLoaded', function() {
  handleStickyCards('.mechanism-card');
  handleStickyCards('.trance-step');
});

/* ══════════════════════════════════════════════════════════════════
   GSAP ANIMATIONS — fires after DOM + GSAP are both ready
   ══════════════════════════════════════════════════════════════════ */
window.addEventListener('load', function() {
  if (typeof gsap === 'undefined' || prefersReducedMotion) {
    // Fallback: just show everything
    document.querySelectorAll('.reveal, .mechanism-card, .trance-step').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ── Hero headshot ── */
  gsap.from('.hero-headshot', {
    duration: 1.2,
    scale: 0.7,
    opacity: 0,
    ease: 'back.out(1.4)',
    delay: 0.2
  });

  /* ── Hero title ── */
  gsap.from('.main-title', {
    duration: 1.2,
    opacity: 0,
    y: 40,
    ease: 'power3.out',
    delay: 0.3
  });

  /* ── Hero subtitle + CTA ── */
  gsap.from('.hero-section p, .hero-section .cta-btn', {
    duration: 0.9,
    opacity: 0,
    y: 25,
    stagger: 0.15,
    ease: 'power2.out',
    delay: isMobile ? 0.5 : 0.9
  });

  /* ── CTA breathing pulse ── */
  gsap.to('.cta-btn', {
    scale: 1.03,
    duration: 1.8,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
    delay: 2
  });

  /* ── Generic .reveal scroll entrance (skip sticky cards — handled separately) ── */
  gsap.utils.toArray('.reveal:not(.mechanism-card):not(.trance-step)').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 30, filter: 'blur(6px)' },
      {
        opacity: 1, y: 0, filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
      }
    );
  });

  /* ── Icon cards — stagger ── */
  gsap.utils.toArray('.icon-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.7,
        ease: 'power2.out',
        delay: i * 0.12,
        scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' }
      }
    );
  });

  /* ── Percentage count-up (5% and 95%) ── */
  gsap.utils.toArray('.percentage').forEach(el => {
    const target = parseInt(el.textContent);
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 1.8,
      ease: 'power1.out',
      snap: { val: 1 },
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
      onUpdate: () => { el.textContent = Math.round(obj.val) + '%'; }
    });
  });


  /* ── Barrier section cards (trauma flow — NOT sticky mechanism cards) ── */
  gsap.utils.toArray('.barrier-section .reveal:not(.mechanism-card)').forEach((card, i) => {
    const fromLeft = i % 2 === 0;
    gsap.fromTo(card,
      { opacity: 0, x: fromLeft ? -60 : 60 },
      {
        opacity: 1, x: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
      }
    );
  });

  /* ── Results cards — stagger ── */
  gsap.utils.toArray('.results-section .mind-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 35 },
      {
        opacity: 1, y: 0,
        duration: 0.65,
        ease: 'power2.out',
        delay: (i % 3) * 0.1,
        scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' }
      }
    );
  });

  /* ── About section photo parallax (desktop only) ── */
  if (!isMobile) {
    const aboutImg = document.querySelector('.about-section img, .about-photo');
    if (aboutImg) {
      gsap.to(aboutImg, {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: { trigger: aboutImg, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    }
  }

  /* ── Testimonial section fade-in (not individual slides — carousel controls those) ── */
  const testimonialsSection = document.querySelector('.testimonials-section');
  if (testimonialsSection) {
    gsap.fromTo(testimonialsSection,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: { trigger: testimonialsSection, start: 'top 85%', toggleActions: 'play none none none' }
      }
    );
  }

  /* ── Contact section entrance ── */
  const contactSection = document.querySelector('#contact');
  if (contactSection) {
    gsap.fromTo(contactSection,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: { trigger: contactSection, start: 'top 85%', toggleActions: 'play none none none' }
      }
    );
  }
});
