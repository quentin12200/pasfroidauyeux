/* ============================================
   Pas Froid aux Yeux - JavaScript principal
   Navigation mobile et accessibilité
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // --- Navigation mobile (toggle) ---
  var navToggle = document.querySelector('.nav-toggle');
  var mainNav = document.querySelector('.main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggle.textContent = isOpen ? 'Fermer le menu' : 'Menu';
    });
  }

  // --- Marquer le lien actif dans la navigation ---
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  var navLinks = document.querySelectorAll('.main-nav a');
  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // --- Formulaire de contact : validation simple ---
  var contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var nom = contactForm.querySelector('#nom');
      var email = contactForm.querySelector('#email');
      var message = contactForm.querySelector('#message');
      var errors = [];

      if (nom && !nom.value.trim()) {
        errors.push('Veuillez indiquer votre nom.');
      }
      if (email && !email.value.trim()) {
        errors.push('Veuillez indiquer votre adresse e-mail.');
      }
      if (message && !message.value.trim()) {
        errors.push('Veuillez écrire un message.');
      }

      if (errors.length > 0) {
        alert(errors.join('\n'));
      } else {
        alert('Merci pour votre message ! Nous vous répondrons rapidement.');
        contactForm.reset();
      }
    });
  }

});
