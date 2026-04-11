'use strict';

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const revealItems = document.querySelectorAll('.reveal');
const yearNode = document.getElementById('year');
const contactForm = document.getElementById('contactForm');
const contactModal = document.getElementById('contactModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalOkBtn = document.getElementById('modalOkBtn');

if (hamburger && navMenu) {
  const closeMenu = () => {
    navMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };

  hamburger.addEventListener('click', () => {
    const willOpen = !navMenu.classList.contains('open');
    navMenu.classList.toggle('open', willOpen);
    hamburger.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    document.body.classList.toggle('menu-open', willOpen);
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', event => {
    if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
      closeMenu();
    }
  });
}

if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

if (revealItems.length > 0) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.22 });

  revealItems.forEach((item, index) => {
    item.style.animationDelay = `${Math.min(index * 0.08, 0.4)}s`;
    observer.observe(item);
  });
}

if (contactForm && contactModal) {
  const openModal = () => {
    contactModal.classList.add('active');
    contactModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
    if (modalOkBtn) modalOkBtn.focus();
  };

  const closeModal = () => {
    contactModal.classList.remove('active');
    contactModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  };

  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    openModal();
    contactForm.reset();
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOkBtn) {
    modalOkBtn.addEventListener('click', closeModal);
  }

  contactModal.addEventListener('click', event => {
    if (event.target === contactModal) closeModal();
  });

  window.addEventListener('keydown', event => {
    if (event.key === 'Escape' && contactModal.classList.contains('active')) {
      closeModal();
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', event => {
    const targetId = anchor.getAttribute('href');
    if (!targetId || targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
