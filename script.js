// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const nav = document.getElementById('primary-navigation');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

// Smooth scroll for buttons/links with data-scroll or anchor links
function smoothScrollTo(target) {
  const el = document.querySelector(target);
  if (!el) return;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
}

document.querySelectorAll('[data-scroll]').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const target = btn.getAttribute('data-scroll');
    smoothScrollTo(target);
    // close mobile menu if open
    nav?.classList.remove('active');
    hamburger?.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('a[href^="#"][data-nav]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = link.getAttribute('href');
    smoothScrollTo(target);
    nav?.classList.remove('active');
    hamburger?.setAttribute('aria-expanded', 'false');
  });
});

// Active link highlighting on scroll
const sections = Array.from(document.querySelectorAll('section[id], footer[id]'));
const navLinks = Array.from(document.querySelectorAll('.nav-links a[data-nav]'));

function setActiveLink() {
  const scrollY = window.scrollY + 120; // offset for sticky nav
  let currentId = 'home';
  sections.forEach(sec => {
    if (sec.offsetTop <= scrollY && (sec.offsetTop + sec.offsetHeight) > scrollY) {
      currentId = sec.id;
    }
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${currentId}`);
  });
}

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

// Info modal open/close
document.querySelectorAll('[data-open]').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.getAttribute('data-open');
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    }
  });
});

document.querySelectorAll('[data-close]').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.getAttribute('data-close');
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }
  });
});

// Dark mode toggle with localStorage
const themeToggle = document.getElementById('theme-toggle');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeToggle?.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
}

function initTheme() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));
}
initTheme();

themeToggle?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

// Newsletter form (client-side validation + demo success)
const form = document.querySelector('.newsletter-form');
const message = document.querySelector('.form-message');

form?.addEventListener('submit', async e => {
  e.preventDefault();
  const email = form.email?.value?.trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    message.textContent = 'Please enter a valid email address.';
    message.style.color = '#ffdbdb';
    return;
  }

  // Simulate network call; replace with your backend endpoint.
  message.textContent = 'Subscribing...';
  message.style.color = '#fff';

  try {
    await new Promise(res => setTimeout(res, 800));
    message.textContent = 'You’re in! Check your inbox for a welcome message.';
    form.reset();
  } catch (err) {
    message.textContent = 'Something went wrong. Please try again.';
  }
});

// Lazy-load images (extra guard for older browsers)
if ('loading' in HTMLImageElement.prototype === false) {
  const imgs = document.querySelectorAll('img[loading="lazy"]');
  imgs.forEach(img => {
    // Fallback: just set src; in production, use IntersectionObserver
    const src = img.getAttribute('src');
    if (src) img.src = src;
  });
}
