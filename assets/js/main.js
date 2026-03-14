'use strict';

const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');
const revealItems = document.querySelectorAll('.reveal');
const yearNode = document.getElementById('year');

if (menuBtn && navMenu) {
  const closeMenu = () => {
    navMenu.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };

  menuBtn.addEventListener('click', () => {
    const willOpen = !navMenu.classList.contains('open');
    navMenu.classList.toggle('open', willOpen);
    menuBtn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    document.body.classList.toggle('menu-open', willOpen);
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) closeMenu();
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
