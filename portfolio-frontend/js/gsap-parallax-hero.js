(function initParallaxHeroSection() {
  // Scope to this section only
  const root = document.querySelector('.parallax-hero-section');
  if (!root) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return; // respect user preference

  // Register plugin if available
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  const inner = root.querySelector('.parallax-hero-inner');
  const orbitItems = root.querySelectorAll('.orbit-item');
  const center = root.querySelector('.parallax-hero-center');

  // Load pinned placeholder images for orbit items (unless marked data-fixed)
  try {
    fetch('public/orbit-images.json')
      .then(r => r.ok ? r.json() : null)
      .then(map => {
        if (!map) return;
        orbitItems.forEach(el => {
          if (el.getAttribute('data-fixed') === 'true') return; // keep project covers
          const key = el.getAttribute('data-key');
          const url = key && map[key];
          const img = el.querySelector('img');
          if (img && url) {
            img.loading = img.loading || 'lazy';
            img.decoding = img.decoding || 'async';
            img.referrerPolicy = img.referrerPolicy || 'no-referrer';
            img.src = url;
          }
        });
      })
      .catch(() => {});
  } catch (_) {}

  // Subtle zoom out of the whole scene on scroll
  gsap.to(inner, {
    scale: 0.92,
    ease: 'none',
    scrollTrigger: {
      trigger: root,
      start: 'top top',
      end: '+=80%',
      scrub: true,
    }
  });

  // Rotate orbit layer while scrolling
  gsap.to(root.querySelector('.parallax-hero-orbit'), {
    rotation: 90,
    ease: 'none',
    transformOrigin: '50% 50%',
    scrollTrigger: {
      trigger: root,
      start: 'top top',
      end: '+=100%',
      scrub: true,
    }
  });

  // Individual floating orbits for parallax depth
  orbitItems.forEach((el, i) => {
    const dist = 40 + i * 12;
    gsap.fromTo(el,
      { y: dist, x: gsap.utils.wrap([-dist, dist], i) },
      {
        x: 0,
        y: 0,
        rotation: i % 2 ? 20 : -20,
        scrollTrigger: {
          trigger: root,
          start: 'top bottom',
          end: 'center top',
          scrub: true,
        }
      }
    );
  });

  // Gentle scale-in of the center badge
  gsap.from(center, {
    scale: 0.8,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: { trigger: root, start: 'top 80%' }
  });

  // Inertial pointer-based parallax for orbit items and center badge
  (function pointerParallax() {
    const rect = () => root.getBoundingClientRect();
    const pointer = { x: 0, y: 0 };
    const toZero = () => gsap.to(pointer, { x: 0, y: 0, duration: 0.8, ease: 'power3.out' });

    // Quick setters for performance
    const setters = Array.from(orbitItems).map((el, i) => ({
      x: gsap.quickSetter(el, 'x', 'px'),
      y: gsap.quickSetter(el, 'y', 'px'),
      r: gsap.quickSetter(el, 'rotation', 'deg'),
      depth: 14 + (i % 6) * 5,
      spin: i % 2 ? 10 : -10,
    }));
    const setCenter = {
      x: gsap.quickSetter(center, 'x', 'px'),
      y: gsap.quickSetter(center, 'y', 'px'),
    };

    function onMove(e) {
      const r = rect();
      const px = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const py = ((e.clientY - r.top) / r.height - 0.5) * 2;
      gsap.to(pointer, { x: px, y: py, duration: 0.6, ease: 'power2.out' });
    }
    root.addEventListener('mousemove', onMove);
    root.addEventListener('mouseleave', toZero);

    gsap.ticker.add(() => {
      const x = pointer.x;
      const y = pointer.y;
      setters.forEach(s => {
        s.x(x * s.depth);
        s.y(y * s.depth);
        s.r(x * s.spin);
      });
      setCenter.x(x * 10);
      setCenter.y(y * 10);
    });
  })();

  // Lightweight bokeh background on a canvas
  (function bokehBackground() {
    const canvas = document.createElement('canvas');
    canvas.className = 'parallax-bokeh';
    root.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let w, h, dpr, circles = [];

    function resize() {
      dpr = window.devicePixelRatio || 1;
      w = root.clientWidth; h = root.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      circles = Array.from({ length: 16 }).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 20 + Math.random() * 60,
        vx: (-0.2 + Math.random() * 0.4),
        vy: (-0.2 + Math.random() * 0.4),
        a: 0.12 + Math.random() * 0.18,
      }));
    }
    resize();
    window.addEventListener('resize', resize);

    let active = true;
    if (window.ScrollTrigger) {
      ScrollTrigger.create({
        trigger: root,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => { active = true; },
        onLeave: () => { active = false; },
        onEnterBack: () => { active = true; },
        onLeaveBack: () => { active = false; },
      });
    }

    function draw() {
      if (!active) return;
      ctx.clearRect(0, 0, w, h);
      circles.forEach(c => {
        c.x += c.vx; c.y += c.vy;
        if (c.x < -80) c.x = w + 80; if (c.x > w + 80) c.x = -80;
        if (c.y < -80) c.y = h + 80; if (c.y > h + 80) c.y = -80;
        const grd = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.r);
        grd.addColorStop(0, 'rgba(255,107,53,0.25)');
        grd.addColorStop(1, 'rgba(255,107,53,0.0)');
        ctx.fillStyle = grd;
        ctx.globalAlpha = c.a;
        ctx.beginPath(); ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2); ctx.fill();
      });
    }
    gsap.ticker.add(draw);
  })();
})();


