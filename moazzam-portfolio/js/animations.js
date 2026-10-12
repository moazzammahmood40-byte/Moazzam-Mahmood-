/**
 * MOAZZAM MAHMOOD — CINEMATIC 3D DEVELOPER PORTFOLIO
 * GSAP & ScrollTrigger Choreography + 3D Tilt Interactions
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

  // Initialize once DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimations();
    initScrollAnimations();
    init3DTiltInteractions();
    initNumberCounters();
  });

  /* -------------------------------------------------------------
     1. Hero Entrance Animation
     ------------------------------------------------------------- */
  function initHeroAnimations() {
    if (prefersReducedMotion || typeof gsap === 'undefined') {
      // Ensure elements are immediately visible
      document.querySelectorAll('.hero-content > *, .portrait-3d-card, .floating-badge').forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Staggered reveal
    tl.from('.hero-badge', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      delay: 0.2
    })
    .from('.hero-title', {
      y: 35,
      opacity: 0,
      duration: 1.0
    }, '-=0.5')
    .from('.hero-description', {
      y: 25,
      opacity: 0,
      duration: 0.9
    }, '-=0.7')
    .from('.hero-actions .btn', {
      y: 20,
      opacity: 0,
      stagger: 0.15,
      duration: 0.7
    }, '-=0.6')
    .from('.hero-stat-item', {
      y: 15,
      opacity: 0,
      stagger: 0.12,
      duration: 0.6
    }, '-=0.5')
    // 3D Portrait Entrance
    .from('.portrait-3d-card', {
      scale: 0.88,
      rotationY: 15,
      rotationX: -8,
      opacity: 0,
      duration: 1.3,
      ease: 'back.out(1.4)'
    }, '-=1.2')
    .from('.portrait-identity-pill', {
      y: 20,
      opacity: 0,
      duration: 0.7
    }, '-=0.5')
    .from('.floating-badge', {
      scale: 0.5,
      opacity: 0,
      stagger: 0.18,
      duration: 0.8,
      ease: 'back.out(1.8)'
    }, '-=0.7')
    .from('.scroll-indicator', {
      opacity: 0,
      y: 15,
      duration: 0.8
    }, '-=0.3');
  }

  /* -------------------------------------------------------------
     2. ScrollTrigger Animations for Sections
     ------------------------------------------------------------- */
  function initScrollAnimations() {
    if (prefersReducedMotion || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Section Headers
    gsap.utils.toArray('.section-header').forEach((header) => {
      gsap.from(header.children, {
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out'
      });
    });

    // About Section Editorial & Metrics
    gsap.from('.about-editorial > *', {
      scrollTrigger: {
        trigger: '.about-editorial',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.9,
      ease: 'power3.out'
    });

    gsap.from('.metric-card', {
      scrollTrigger: {
        trigger: '.about-card-stack',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      x: 35,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out'
    });

    // Skills Category Groups
    gsap.utils.toArray('.skills-category-group').forEach((group) => {
      gsap.from(group.querySelectorAll('.skill-card'), {
        scrollTrigger: {
          trigger: group,
          start: 'top 82%',
          toggleActions: 'play none none none'
        },
        y: 25,
        opacity: 0,
        stagger: 0.06,
        duration: 0.6,
        ease: 'power2.out'
      });
    });

    // Project Cards Entrance
    gsap.from('.project-card', {
      scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out'
    });

    // Experience Timeline items
    gsap.utils.toArray('.timeline-item').forEach((item) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        x: -30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    });

    // Contact Grid items
    gsap.from('.contact-info > *', {
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 78%',
        toggleActions: 'play none none none'
      },
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out'
    });

    gsap.from('.contact-form-panel', {
      scrollTrigger: {
        trigger: '.contact-form-panel',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out'
    });
  }

  /* -------------------------------------------------------------
     3. 3D Tilt Card Interaction
     ------------------------------------------------------------- */
  function init3DTiltInteractions() {
    if (prefersReducedMotion || isTouchDevice) {
      return;
    }

    // Apply tilt to the portrait card
    const portraitCard = document.querySelector('.portrait-3d-card');
    if (portraitCard) {
      addTiltEffect(portraitCard, 14); // Max 14 deg tilt
    }

    // Apply subtle tilt to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card) => {
      addTiltEffect(card, 8); // Max 8 deg tilt
    });
  }

  function addTiltEffect(element, maxAngle) {
    let bounds;
    let isHovering = false;

    element.addEventListener('mouseenter', () => {
      bounds = element.getBoundingClientRect();
      isHovering = true;
    });

    element.addEventListener('mousemove', (e) => {
      if (!isHovering || !bounds) return;

      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      const xPct = (mouseX / bounds.width - 0.5) * 2; // -1 to 1
      const yPct = (mouseY / bounds.height - 0.5) * 2; // -1 to 1

      const rotateY = xPct * maxAngle;
      const rotateX = -yPct * maxAngle;

      element.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    element.addEventListener('mouseleave', () => {
      isHovering = false;
      element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  /* -------------------------------------------------------------
     4. Number Counter Animation for Verified Metrics
     ------------------------------------------------------------- */
  function initNumberCounters() {
    if (typeof ScrollTrigger === 'undefined' || prefersReducedMotion) {
      return;
    }

    const counters = document.querySelectorAll('[data-counter-target]');
    counters.forEach((counter) => {
      const target = parseFloat(counter.getAttribute('data-counter-target'));
      const decimals = target % 1 !== 0 ? 1 : 0;

      ScrollTrigger.create({
        trigger: counter,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.fromTo(counter, 
            { innerText: 0 },
            {
              innerText: target,
              duration: 1.8,
              ease: 'power2.out',
              snap: { innerText: decimals === 0 ? 1 : 0.1 },
              onUpdate: function () {
                counter.innerText = Number(this.targets()[0].innerText).toFixed(decimals);
              }
            }
          );
        }
      });
    });
  }
})();
