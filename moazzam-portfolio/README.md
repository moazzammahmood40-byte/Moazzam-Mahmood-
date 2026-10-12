# Moazzam Mahmood — Cinematic 3D Developer Portfolio

A bespoke, production-ready, cinematic 3D personal portfolio website for **Moazzam Mahmood** — Web Developer, Computer Teacher at Brains College, and BSCS Student at Virtual University of Pakistan.

Designed with an editorial dark cinematic visual identity, CSS 3D perspective depth, real-time Three.js background constellation, choreographed GSAP scroll animations, and authentic career verification.

---

## 1. Project Overview & Visual Identity

- **Art Direction**: Near-black charcoal (`#090a0f`) and dark graphite surfaces, electric cyan (`#00f2fe`) and sky blue accents, muted silver highlights, and atmospheric lighting.
- **Hero Presentation**: Features Moazzam Mahmood's supplied photograph in a CSS 3D perspective card with rim lighting, depth layers, ambient glow, and floating skill badges (*JavaScript, PHP, WordPress, UI Development*).
- **Subtle 3D Scene**: Three.js particle constellation and geometric orbital ring accents with smooth camera parallax and tab-visibility pause to preserve battery and GPU power.
- **Zero Framework Bloat**: 100% Vanilla HTML5, CSS3, and JavaScript with reliable CDN imports for Three.js, GSAP, and Lucide icons.

---

## 2. Directory Structure

```text
moazzam-portfolio/
├── index.html                     # Semantic HTML5 structure
├── assets/
│   ├── images/
│   │   ├── moazzam-portrait.png   # Moazzam's supplied photograph (hero visual)
│   │   ├── moazzam-portrait.jpg   # JPG source version
│   │   └── projects/
│   │       ├── roselite.svg       # Rose Lite LLC mockup
│   │       ├── aquanix.svg        # AquaNix Water Filter mockup
│   │       ├── malvincraft.svg    # Malvin Craft mockup
│   │       └── softentraders.svg  # Soften Traders mockup
│   ├── cv/
│   │   └── Moazzam_Mahmood_CV.pdf # Target directory for formal resume
│   └── icons/
├── css/
│   ├── style.css                  # Design tokens, layout, 3D cards, modals
│   └── responsive.css             # Fluid clamp(), tablet & mobile breakpoints
├── js/
│   ├── main.js                    # Nav spy, mobile drawer, project filters, validation
│   ├── animations.js              # GSAP entrance, ScrollTrigger & 3D tilt
│   └── three-scene.js             # Three.js particle field with lifecycle control
└── README.md                      # Documentation & customization guide
```

---

## 3. Verified Professional Background

All details presented across the portfolio strictly reflect verified credentials:
- **Name**: Moazzam Mahmood
- **Experience**: 2–3 Years active web development practice
- **Teaching**: Computer Teacher & Lab Instructor at Brains College
- **Education**: Bachelor of Science in Computer Science (BSCS) at Virtual University of Pakistan
- **Verified Client Websites**:
  1. [Rose Lite LLC](https://roselitellc.com/) — Corporate business solutions platform (*WordPress, Elementor, PHP*)
  2. [AquaNix Water Filter](https://aquanixwaterfilter.com/) — Multi-stage water purification catalog (*WordPress, WooCommerce, PHP*)
  3. [Malvin Craft](https://malvincraft.com/) — Artisanal craft & brand portfolio (*PHP, MySQL, JavaScript, CSS Grid*)
  4. [Soften Traders](https://softentraders.com/) — B2B commercial enterprise trading portal (*WordPress, PHP, SEO*)

---

## 4. How to Run Locally

You can run the portfolio in any of the following ways:

### Option A: Python Built-in HTTP Server (Recommended)
Open PowerShell or Terminal inside the `moazzam-portfolio` folder and run:
```powershell
python -m http.server 3000
```
Then open your browser at:
```text
http://localhost:3000
```

### Option B: Node.js `npx serve` or `live-server`
```bash
npx serve .
# or
npx live-server
```

### Option C: Direct Browser Launch
Simply double-click `index.html` to open it in your browser. All scripts and assets are structured to run seamlessly under `file:///` protocols as well.

---

## 5. Customization Guide

### How to Update Moazzam's Portrait
Replace `assets/images/moazzam-portrait.png` (or `.jpg`) with any high-resolution portrait photograph (recommended dimensions: `800x1000px` or `1200x1500px`). The CSS 3D frame will automatically adapt and apply the rim lighting and perspective tilt.

### How to Add Your CV PDF
Drop your resume into `assets/cv/` and name it `Moazzam_Mahmood_CV.pdf`. If you wish to enable instant automatic file download, update the button in `index.html`:
```html
<a href="assets/cv/Moazzam_Mahmood_CV.pdf" download="Moazzam_Mahmood_CV.pdf" class="btn btn-primary">
  <i data-lucide="file-text"></i> Download CV
</a>
```

### How to Connect the Contact Form to a Live Backend
The contact form in `index.html` includes client-side regex and length validation. To connect it to real email delivery:

#### Method 1: Formspree (No server required)
Change the form tag in `index.html`:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" class="contact-form">
```

#### Method 2: EmailJS
In `js/main.js`, inside the `form.addEventListener('submit', ...)` handler, replace the simulation timer with:
```javascript
emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
  from_name: nameInput.value,
  from_email: emailInput.value,
  subject: subjectInput.value,
  message: messageInput.value
}).then(() => {
  showToast("Message sent successfully!");
  form.reset();
});
```

### How to Upgrade to a 3D GLB/glTF Avatar in Three.js
If a true 3D volumetric model (`.glb` or `.gltf`) is created later, integrate `THREE.GLTFLoader` inside `js/three-scene.js`:
```javascript
const loader = new THREE.GLTFLoader();
loader.load('assets/models/moazzam-avatar.glb', (gltf) => {
  const model = gltf.scene;
  model.scale.set(1.5, 1.5, 1.5);
  model.position.set(2, -1, 0);
  scene.add(model);
});
```

---

## 6. Accessibility & Performance Features

- **Keyboard Navigation**: Complete tab indexing with visible focus styling (`:focus-visible`).
- **Screen Reader Support**: Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`), ARIA dialog roles, and `aria-label` tags.
- **Reduced Motion**: Automatically honors `prefers-reduced-motion: reduce` by disabling parallax, 3D tilt, and continuous loops.
- **GPU Optimization**: Three.js render loop automatically suspends when switching browser tabs (`document.hidden`).
- **Responsive Layout**: Fluid CSS `clamp()` typography and touch-optimized navigation across desktop, laptop, tablet, and smartphone screens.
