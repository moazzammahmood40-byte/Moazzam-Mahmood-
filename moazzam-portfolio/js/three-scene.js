/**
 * MOAZZAM MAHMOOD — CINEMATIC 3D DEVELOPER PORTFOLIO
 * Three.js Atmospheric Background Scene
 *
 * Lightweight, GPU-efficient 3D experience featuring an ambient particle field,
 * slow orbital lattice, and smooth scroll/mouse depth.
 */

(function () {
  'use strict';

  // Check reduced-motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const container = document.getElementById('bg-canvas-container');
  if (!container || typeof THREE === 'undefined') {
    return;
  }

  // Mobile check
  const isMobile = window.innerWidth <= 768;

  let scene, camera, renderer, particles, orbitalRings;
  let animationFrameId = null;
  let isTabVisible = true;

  // Mouse & Scroll coordinates with damping (LERP)
  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  let scrollProgress = 0;

  function initThreeScene() {
    // 1. Scene & Camera
    scene = new THREE.Scene();
    
    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);
    camera.position.z = 25;

    // 2. Renderer
    renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('three-canvas'),
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 3. Ambient Particle Constellation
    const particleCount = isMobile ? 80 : 180;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(0x00f2fe);
    const blueColor = new THREE.Color(0x38bdf8);
    const silverColor = new THREE.Color(0x94a3b8);

    for (let i = 0; i < particleCount; i++) {
      // Distributed across a 3D volume
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 35;

      // Color variation
      const rand = Math.random();
      const col = rand > 0.6 ? cyanColor : rand > 0.3 ? blueColor : silverColor;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Crisp circular particles texture via Canvas
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(0, 242, 254, 0.8)');
    grad.addColorStop(1, 'rgba(0, 242, 254, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);

    const particleTexture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.35 : 0.45,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 4. Subtle Orbital Wireframe Accent
    orbitalRings = new THREE.Group();

    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.08
    });
    const ringGeo1 = new THREE.TorusGeometry(12, 0.04, 16, 80);
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    orbitalRings.add(ring1);

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.05
    });
    const ringGeo2 = new THREE.TorusGeometry(16, 0.03, 16, 90);
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    orbitalRings.add(ring2);

    orbitalRings.position.set(4, -2, -5);
    scene.add(orbitalRings);

    // 5. Event Listeners
    setupEvents();

    // 6. Start Loop
    animate();
  }

  function setupEvents() {
    // Window Resize
    window.addEventListener('resize', onWindowResize, { passive: true });

    // Tab Visibility (save battery/GPU)
    document.addEventListener('visibilitychange', () => {
      isTabVisible = !document.hidden;
      if (isTabVisible && !animationFrameId) {
        animate();
      }
    });

    // Mouse movement parallax (disabled on mobile or reduced-motion)
    if (!isMobile && !prefersReducedMotion) {
      window.addEventListener('mousemove', (e) => {
        mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
      }, { passive: true });
    }

    // Scroll progress listener
    window.addEventListener('scroll', () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    }, { passive: true });
  }

  function onWindowResize() {
    if (!camera || !renderer) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  function animate() {
    if (!isTabVisible) {
      animationFrameId = null;
      return;
    }

    animationFrameId = requestAnimationFrame(animate);

    if (prefersReducedMotion) {
      renderer.render(scene, camera);
      return;
    }

    // Smooth LERP mouse coordinates
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    // Slow ambient rotation
    if (particles) {
      particles.rotation.y += 0.0006;
      particles.rotation.x = mouse.y * 0.12;
      particles.position.y = -scrollProgress * 6;
    }

    if (orbitalRings) {
      orbitalRings.rotation.z += 0.001;
      orbitalRings.rotation.x += 0.0004;
      orbitalRings.position.x = 4 + mouse.x * 1.5;
      orbitalRings.position.y = -2 - scrollProgress * 8;
    }

    // Subtle camera response
    camera.position.x = mouse.x * 1.2;
    camera.position.y = -mouse.y * 0.8;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }

  // Auto initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThreeScene);
  } else {
    initThreeScene();
  }
})();
