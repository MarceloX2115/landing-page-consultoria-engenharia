/* MAYRA LUANNE – script.js */

document.getElementById('year').textContent = new Date().getFullYear();

/* Header scroll */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });
header.classList.toggle('scrolled', window.scrollY > 40);

/* Menu mobile */
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
nav.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

/* Reveal on scroll */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
    const idx = siblings.indexOf(entry.target);
    entry.target.style.transitionDelay = `${idx * 90}ms`;
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* Formulário */
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');

function validateField(input) {
  const errorEl = input.parentElement.querySelector('.form-error');
  if (!errorEl) return true;
  if (input.required && !input.value.trim()) {
    errorEl.textContent = 'Este campo é obrigatório.';
    input.style.borderColor = '#c0392b';
    return false;
  }
  if (input.type === 'email' && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
    errorEl.textContent = 'Informe um e-mail válido.';
    input.style.borderColor = '#c0392b';
    return false;
  }
  errorEl.textContent = '';
  input.style.borderColor = '';
  return true;
}

form.querySelectorAll('.form-input').forEach(input => {
  input.addEventListener('blur', () => validateField(input));
  input.addEventListener('input', () => validateField(input));
});

form.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;
  form.querySelectorAll('.form-input[required]').forEach(input => {
    if (!validateField(input)) valid = false;
  });
  if (!valid) return;
  const btn = form.querySelector('.btn');
  btn.classList.add('loading');
  btn.disabled = true;
  setTimeout(() => {
    btn.classList.remove('loading');
    btn.disabled = false;
    form.reset();
    successMsg.classList.add('show');
    setTimeout(() => successMsg.classList.remove('show'), 5000);
  }, 1500);
});

/* Scroll suave */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - header.offsetHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* Active nav */
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.nav__link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));