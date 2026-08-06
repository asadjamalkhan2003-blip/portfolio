/* =============================================
   PORTFOLIO - MAIN JAVASCRIPT
   ============================================= */

'use strict';

// ── Typed Text Animation ──────────────────────
const typedStrings = [
  'Frontend Web Developer',
  'Portfolio Designer',
  'HTML & CSS Expert',
  'JavaScript Developer',
  'Responsive UI Builder'
];

let typedIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typed-text');
const TYPING_SPEED = 80;
const DELETING_SPEED = 45;
const PAUSE_BEFORE_DELETE = 2200;
const PAUSE_BEFORE_NEXT = 400;

function typeEffect() {
  if (!typedEl) return;

  const currentStr = typedStrings[typedIndex];

  if (isDeleting) {
    typedEl.textContent = currentStr.slice(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = currentStr.slice(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? DELETING_SPEED : TYPING_SPEED;

  if (!isDeleting && charIndex === currentStr.length) {
    delay = PAUSE_BEFORE_DELETE;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    typedIndex = (typedIndex + 1) % typedStrings.length;
    delay = PAUSE_BEFORE_NEXT;
  }

  setTimeout(typeEffect, delay);
}

// ── Navbar scroll effect ──────────────────────
const navbar = document.getElementById('navbar');
let lastScrollY = 0;

function handleNavbar() {
  const scrollY = window.scrollY;

  if (scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  lastScrollY = scrollY;
}

// ── Active nav link on scroll ─────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function highlightNav() {
  const scrollY = window.scrollY + 120;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// ── Mobile Menu ───────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMobileMenu() {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburger?.addEventListener('click', toggleMobileMenu);
mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

// ── Scroll Reveal ─────────────────────────────
function setupScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => observer.observe(el));
}

// ── Timeline reveal ───────────────────────────
function setupTimelineReveal() {
  const timelineItems = document.querySelectorAll('.timeline-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 150);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  timelineItems.forEach(item => observer.observe(item));
}

// ── Skill Bar Animation ───────────────────────
function animateSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const pct = bar.getAttribute('data-pct');
        setTimeout(() => {
          bar.style.width = pct + '%';
        }, 200);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
}

// ── Counter Animation ─────────────────────────
function animateCounter(el, target, suffix = '') {
  const duration = 2000;
  const step = 16;
  const increment = target / (duration / step);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.round(current) + suffix;
  }, step);
}

function setupCounters() {
  const statEls = document.querySelectorAll('.stat-number');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const num = parseInt(text);
        const suffix = text.replace(/[0-9]/g, '');
        animateCounter(el, num, suffix);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statEls.forEach(el => observer.observe(el));
}

// ── Contact Form ──────────────────────────────
const contactForm = document.getElementById('contact-form');
const toast = document.getElementById('toast');
const btnText = document.getElementById('btn-text');
const submitBtn = document.getElementById('form-submit-btn');

function showToast(message, isError = false) {
  toast.innerHTML = `<i class="fa-solid fa-${isError ? 'circle-xmark' : 'circle-check'}"></i> ${message}`;
  toast.style.background = isError ? '#ef4444' : 'var(--green)';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('form-name').value.trim();
  const email = document.getElementById('form-email').value.trim();
  const subject = document.getElementById('form-subject').value.trim();
  const message = document.getElementById('form-message').value.trim();

  // Basic validation
  if (!name || !email || !subject || !message) {
    showToast('Please fill in all fields.', true);
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast('Please enter a valid email address.', true);
    return;
  }

  // Simulate send
  submitBtn.disabled = true;
  btnText.textContent = 'Sending...';
  submitBtn.querySelector('i').className = 'fa-solid fa-spinner fa-spin';

  await new Promise(r => setTimeout(r, 1500));

  submitBtn.disabled = false;
  btnText.textContent = 'Send Message';
  submitBtn.querySelector('i').className = 'fa-solid fa-paper-plane';

  contactForm.reset();
  showToast('Message sent successfully! I\'ll get back to you soon. 🎉');
});

// ── Smooth scroll for all anchor links ────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Footer year ───────────────────────────────
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Cursor glow effect ────────────────────────
(function setupCursorGlow() {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: left 0.15s ease, top 0.15s ease;
    will-change: left, top;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
})();

// ── 3D Preloader Three.js Visualization ──────────
let preloaderComplete = false;

function init3DPreloader() {
  const container = document.getElementById('loader-3d-container');
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.z = 4.5;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Create a glowing torus knot
  const geometry = new THREE.TorusKnotGeometry(0.8, 0.25, 120, 16);
  const material = new THREE.MeshBasicMaterial({
    color: 0x8b5cf6,
    wireframe: true,
    transparent: true,
    opacity: 0.85
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Light blue outer points
  const pointsGeometry = new THREE.TorusKnotGeometry(0.81, 0.26, 80, 10);
  const pointsMaterial = new THREE.PointsMaterial({
    color: 0x06b6d4,
    size: 0.025,
    transparent: true,
    opacity: 0.6
  });
  const pointsMesh = new THREE.Points(pointsGeometry, pointsMaterial);
  scene.add(pointsMesh);

  let animId;
  function animateLoader() {
    if (preloaderComplete) {
      cancelAnimationFrame(animId);
      geometry.dispose();
      material.dispose();
      pointsGeometry.dispose();
      pointsMaterial.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
      return;
    }

    mesh.rotation.x += 0.015;
    mesh.rotation.y += 0.02;
    pointsMesh.rotation.x -= 0.01;
    pointsMesh.rotation.y -= 0.015;

    const time = Date.now() * 0.003;
    const pulse = 1 + Math.sin(time) * 0.05;
    mesh.scale.set(pulse, pulse, pulse);
    pointsMesh.scale.set(pulse, pulse, pulse);

    renderer.render(scene, camera);
    animId = requestAnimationFrame(animateLoader);
  }

  animateLoader();

  // Progress animation
  let progress = 0;
  const progressFill = document.getElementById('loader-progress-fill');
  const percentageText = document.getElementById('loader-percentage');

  const interval = setInterval(() => {
    if (progress < 85) {
      progress += Math.floor(Math.random() * 5) + 1;
      if (progress > 85) progress = 85;
      updateLoaderUI(progress);
    }
  }, 80);

  function updateLoaderUI(val) {
    if (progressFill) progressFill.style.width = val + '%';
    if (percentageText) percentageText.textContent = val + '%';
  }

  window.addEventListener('load', () => {
    clearInterval(interval);
    let finalProgress = progress;
    const finalInterval = setInterval(() => {
      if (finalProgress < 100) {
        finalProgress += 4;
        if (finalProgress > 100) finalProgress = 100;
        updateLoaderUI(finalProgress);
      } else {
        clearInterval(finalInterval);
        setTimeout(() => {
          preloaderComplete = true;
          const preloader = document.getElementById('preloader');
          if (preloader) {
            preloader.classList.add('loaded');
            setTimeout(() => {
              document.body.style.overflow = '';
              setupScrollReveal();
              setupTimelineReveal();
              setupCounters();
            }, 600);
          }
        }, 200);
      }
    }, 20);
  });
}

// ── 3D Interactive Background Canvas ──────────
function init3DBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 8;

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const particleCount = 500;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const color1 = new THREE.Color('#8b5cf6'); // Purple
  const color2 = new THREE.Color('#06b6d4'); // Cyan
  const color3 = new THREE.Color('#ec4899'); // Pink

  for (let i = 0; i < particleCount * 3; i += 3) {
    const radius = 8 + Math.random() * 20;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);

    positions[i] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i+1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i+2] = radius * Math.cos(phi);

    const rand = Math.random();
    let mixedColor = color1;
    if (rand < 0.33) mixedColor = color1;
    else if (rand < 0.66) mixedColor = color2;
    else mixedColor = color3;

    colors[i] = mixedColor.r;
    colors[i+1] = mixedColor.g;
    colors[i+2] = mixedColor.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  function createCircleTexture() {
    const c = document.createElement('canvas');
    c.width = 16;
    c.height = 16;
    const ctx = c.getContext('2d');
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(8, 8, 8, 0, Math.PI * 2);
    ctx.fill();
    return new THREE.CanvasTexture(c);
  }

  const material = new THREE.PointsMaterial({
    size: 0.16,
    map: createCircleTexture(),
    vertexColors: true,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  const particleSystem = new THREE.Points(geometry, material);
  scene.add(particleSystem);

  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) / 120;
    mouseY = (e.clientY - window.innerHeight / 2) / 120;
  });

  let scrollY = 0;
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  }, { passive: true });

  const clock = new THREE.Clock();
  function animateBg() {
    requestAnimationFrame(animateBg);

    const elapsedTime = clock.getElapsedTime();

    particleSystem.rotation.y = elapsedTime * 0.015;
    particleSystem.rotation.x = elapsedTime * 0.008;

    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    camera.position.x = targetX * 0.4;
    camera.position.y = -targetY * 0.4;
    particleSystem.position.y = -scrollY * 0.003;

    renderer.render(scene, camera);
  }

  animateBg();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// ── 3D Card Interactive Tilt Effect ──────────────
function setup3DCardTilt() {
  const cards = document.querySelectorAll('.project-card, .hero-image-container, .about-image-frame');

  cards.forEach(card => {
    const reflection = document.createElement('div');
    reflection.className = 'card-reflection';
    reflection.style.cssText = `
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.12) 0%, transparent 60%);
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s;
      z-index: 10;
      border-radius: inherit;
    `;
    card.style.position = card.style.position || 'relative';
    card.appendChild(reflection);

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const maxRotateX = 8;
      const maxRotateY = 8;

      const rotateY = ((x - centerX) / centerX) * maxRotateY;
      const rotateX = -((y - centerY) / centerY) * maxRotateX;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.025)`;
      
      reflection.style.opacity = '1';
      const pctX = (x / rect.width) * 100;
      const pctY = (y / rect.height) * 100;
      reflection.style.background = `radial-gradient(circle at ${pctX}% ${pctY}%, rgba(255, 255, 255, 0.15) 0%, transparent 60%)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
      reflection.style.opacity = '0';
    });
  });
}

// ── Scroll events ─────────────────────────────
window.addEventListener('scroll', () => {
  handleNavbar();
  highlightNav();
}, { passive: true });

// ── Init ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.overflow = 'hidden';
  
  // Initialize Three.js structures
  init3DPreloader();
  init3DBackground();
  setup3DCardTilt();
  
  typeEffect();
  animateSkillBars();
  handleNavbar();
  highlightNav();
});
