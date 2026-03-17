(function () {
  'use strict';

  const header = document.querySelector('.header');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const menuToggle = document.querySelector('.menu-toggle');
  const sections = document.querySelectorAll('section[id]');

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (nav.classList.contains('open')) {
          nav.classList.remove('open');
        }
      }
    });
  });

  // Active nav link on scroll
  function setActiveLink() {
    const scrollY = window.scrollY;
    const headerHeight = header ? header.offsetHeight : 70;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerHeight;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveLink);
  setActiveLink(); // run on load

  // Mobile menu toggle
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
  }

  // Optional: subtle header background on scroll
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50 && header) {
      header.style.background = 'rgba(10, 25, 47, 0.95)';
    } else if (header) {
      header.style.background = 'rgba(10, 25, 47, 0.85)';
    }
  });
})();
