/* ============================================
   Pas Froid aux Yeux - JavaScript principal
   Navigation mobile, accessibilité, formulaire
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

      // Focus le premier lien quand le menu s'ouvre
      if (isOpen) {
        var firstLink = mainNav.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    });

    // Fermer le menu avec Échap
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.textContent = 'Menu';
        navToggle.focus();
      }
    });

    // Focus trap dans le menu mobile
    mainNav.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab' || !mainNav.classList.contains('open')) return;

      var links = mainNav.querySelectorAll('a');
      var firstLink = links[0];
      var lastLink = links[links.length - 1];

      if (e.shiftKey) {
        // Shift+Tab sur le premier lien : revenir au bouton menu
        if (document.activeElement === firstLink) {
          e.preventDefault();
          navToggle.focus();
        }
      } else {
        // Tab sur le dernier lien : revenir au bouton menu
        if (document.activeElement === lastLink) {
          e.preventDefault();
          navToggle.focus();
        }
      }
    });

    // Depuis le bouton menu, Shift+Tab ne sort pas du menu
    navToggle.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab' || !mainNav.classList.contains('open')) return;

      var links = mainNav.querySelectorAll('a');
      if (!e.shiftKey) {
        // Tab depuis le bouton : aller au premier lien
        e.preventDefault();
        links[0].focus();
      }
    });
  }

  // --- Marquer le lien actif dans la navigation ---
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  var allNavLinks = document.querySelectorAll('.main-nav a, .footer-nav a');
  allNavLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // --- Formulaire de contact : validation accessible ---
  var contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    // Effacer les erreurs quand l'utilisateur corrige un champ
    var requiredFields = contactForm.querySelectorAll('[required]');
    requiredFields.forEach(function (field) {
      field.addEventListener('input', function () {
        clearFieldError(field);
      });
    });

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Effacer toutes les erreurs précédentes
      var oldErrors = contactForm.querySelectorAll('.form-error');
      oldErrors.forEach(function (el) { el.remove(); });
      requiredFields.forEach(function (field) {
        field.removeAttribute('aria-invalid');
        field.removeAttribute('aria-describedby');
      });

      var nom = contactForm.querySelector('#nom');
      var email = contactForm.querySelector('#email');
      var message = contactForm.querySelector('#message');
      var firstInvalid = null;

      if (nom && !nom.value.trim()) {
        showFieldError(nom, 'Veuillez indiquer votre nom.');
        if (!firstInvalid) firstInvalid = nom;
      }
      if (email && !email.value.trim()) {
        showFieldError(email, 'Veuillez indiquer votre adresse e-mail.');
        if (!firstInvalid) firstInvalid = email;
      }
      if (message && !message.value.trim()) {
        showFieldError(message, 'Veuillez écrire un message.');
        if (!firstInvalid) firstInvalid = message;
      }

      if (firstInvalid) {
        firstInvalid.focus();
      } else {
        // Succès
        var statusDiv = document.getElementById('form-status');
        if (statusDiv) {
          statusDiv.textContent = 'Merci pour votre message ! Nous vous répondrons rapidement.';
          statusDiv.className = 'info-box success';
        }
        contactForm.reset();
      }
    });
  }

  function showFieldError(field, message) {
    field.setAttribute('aria-invalid', 'true');
    var errorId = field.id + '-error';
    field.setAttribute('aria-describedby', errorId);
    var errorEl = document.createElement('p');
    errorEl.id = errorId;
    errorEl.className = 'form-error';
    errorEl.setAttribute('role', 'alert');
    errorEl.textContent = message;
    field.parentNode.appendChild(errorEl);
  }

  function clearFieldError(field) {
    field.removeAttribute('aria-invalid');
    var errorId = field.id + '-error';
    var errorEl = document.getElementById(errorId);
    if (errorEl) errorEl.remove();
    field.removeAttribute('aria-describedby');
  }

});
