/**
 * MOAZZAM MAHMOOD — CINEMATIC 3D DEVELOPER PORTFOLIO
 * Main Interactions & Controller Logic
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initLucideIcons();
    initStickyHeader();
    initActiveNavSpy();
    initMobileNavigation();
    initProjectFiltering();
    initContactFormValidation();
    initClipboardCopy();
    initModalSystem();
    initBackToTop();
  });

  /* -------------------------------------------------------------
     1. Lucide SVG Icons Initialization
     ------------------------------------------------------------- */
  function initLucideIcons() {
    if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
      lucide.createIcons();
    }
  }

  /* -------------------------------------------------------------
     2. Sticky Header with Scroll Blur
     ------------------------------------------------------------- */
  function initStickyHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    const handleScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* -------------------------------------------------------------
     3. Active Section Spy
     ------------------------------------------------------------- */
  function initActiveNavSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    if (!sections.length || !navLinks.length) return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));
  }

  /* -------------------------------------------------------------
     4. Accessible Mobile Navigation
     ------------------------------------------------------------- */
  function initMobileNavigation() {
    const toggleBtn = document.querySelector('.mobile-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (!toggleBtn || !mobileNav) return;

    function openMenu() {
      mobileNav.classList.add('open');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      // Focus first link
      if (mobileLinks.length > 0) mobileLinks[0].focus();
    }

    function closeMenu() {
      mobileNav.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      toggleBtn.focus();
    }

    toggleBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  /* -------------------------------------------------------------
     5. Project Category Filtering
     ------------------------------------------------------------- */
  function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        // Toggle active button
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach((card) => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category.includes(filterValue)) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  /* -------------------------------------------------------------
     6. Client-Side Contact Form Validation
     ------------------------------------------------------------- */
  function initContactFormValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const subjectInput = document.getElementById('form-subject');
    const messageInput = document.getElementById('form-message');
    const submitBtn = document.getElementById('form-submit-btn');
    const alertSuccess = document.getElementById('form-alert-success');
    const alertError = document.getElementById('form-alert-error');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validateField(input, condition, errorId) {
      const errorEl = document.getElementById(errorId);
      if (!condition) {
        input.classList.add('invalid');
        input.setAttribute('aria-invalid', 'true');
        if (errorEl) errorEl.classList.add('visible');
        return false;
      } else {
        input.classList.remove('invalid');
        input.removeAttribute('aria-invalid');
        if (errorEl) errorEl.classList.remove('visible');
        return true;
      }
    }

    // Clear error on input
    [nameInput, emailInput, subjectInput, messageInput].forEach((input) => {
      if (!input) return;
      input.addEventListener('input', () => {
        input.classList.remove('invalid');
        input.removeAttribute('aria-invalid');
        const err = input.parentElement.querySelector('.form-error');
        if (err) err.classList.remove('visible');
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (alertSuccess) alertSuccess.style.display = 'none';
      if (alertError) alertError.style.display = 'none';

      const isNameValid = validateField(nameInput, nameInput.value.trim().length >= 2, 'error-name');
      const isEmailValid = validateField(emailInput, emailRegex.test(emailInput.value.trim()), 'error-email');
      const isSubjectValid = validateField(subjectInput, subjectInput.value.trim().length >= 3, 'error-subject');
      const isMessageValid = validateField(messageInput, messageInput.value.trim().length >= 10, 'error-message');

      if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
        if (alertError) {
          alertError.style.display = 'flex';
          alertError.innerHTML = '<i data-lucide="alert-circle"></i><span>Please correct the errors in the highlighted fields.</span>';
          initLucideIcons();
        }
        return;
      }

      // Simulated sending state
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending Message...</span>';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        if (alertSuccess) {
          alertSuccess.style.display = 'flex';
          alertSuccess.innerHTML = '<i data-lucide="check-circle-2"></i><span>Thank you! Your message has been prepared. Moazzam will get back to you shortly.</span>';
          initLucideIcons();
        }

        form.reset();
        showToast('Message validation passed! Ready for delivery.');
      }, 900);
    });
  }

  /* -------------------------------------------------------------
     7. Copy Email to Clipboard & Toast System
     ------------------------------------------------------------- */
  function initClipboardCopy() {
    const copyBtns = document.querySelectorAll('.copy-trigger');
    copyBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const textToCopy = btn.getAttribute('data-copy') || 'moazzam.dev@example.com';
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard: ${textToCopy}`);
        }).catch(() => {
          showToast('Failed to copy. Please select and copy manually.');
        });
      });
    });
  }

  function showToast(message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i data-lucide="info" style="color: var(--accent-cyan); width: 18px; height: 18px;"></i><span>${message}</span>`;
    container.appendChild(toast);
    initLucideIcons();

    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 400);
    }, 3800);
  }
  window.showToast = showToast;

  /* -------------------------------------------------------------
     8. Modal System (CV & Information)
     ------------------------------------------------------------- */
  function initModalSystem() {
    const modalOverlay = document.getElementById('info-modal');
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const closeBtn = document.querySelector('.modal-close-btn');

    if (!modalOverlay) return;

    function openModal() {
      modalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modalOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    modalTriggers.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
        closeModal();
      }
    });

    const modalContactAction = document.getElementById('modal-contact-action');
    if (modalContactAction) {
      modalContactAction.addEventListener('click', () => {
        closeModal();
      });
    }
  }

  /* -------------------------------------------------------------
     9. Back to Top Button
     ------------------------------------------------------------- */
  function initBackToTop() {
    const topBtn = document.querySelector('.back-to-top');
    if (!topBtn) return;

    topBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
})();
