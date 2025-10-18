(function initProjectBreakdownSection() {
  const root = document.querySelector('.project-breakdown-section');
  if (!root) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  const stage = root.querySelector('.breakdown-stage');
  const finalShot = root.querySelector('.final-shot');
  const parts = root.querySelectorAll('.component-item');

  // Timeline: fade out final image, scatter components outward
  const tl = gsap.timeline({
    defaults: { ease: 'power2.out' },
    scrollTrigger: {
      trigger: root,
      start: 'top 70%',
      end: '+=80%',
      scrub: true,
    }
  });

  tl.to(finalShot, { autoAlpha: 0, scale: 0.92 }, 0);

  parts.forEach((el, i) => {
    const angle = (i / Math.max(parts.length, 1)) * Math.PI * 2;
    const radius = 180 + (i % 3) * 40; // varied distance
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    tl.to(el, { xPercent: 0, yPercent: 0, x, y, autoAlpha: 1, rotate: (i % 2 ? 8 : -8) }, 0);
  });

  // Steps rail: highlight matching component on step focus/scroll/hover
  const steps = Array.from(root.querySelectorAll('.breakdown-step'));
  const items = Array.from(parts);
  function findByKey(key) {
    return items.find(ci => ci.querySelector('.component-label')?.textContent?.trim().toLowerCase() === String(key).toLowerCase());
  }
  function clearActive() {
    steps.forEach(s => s.classList.remove('is-active'));
    items.forEach(ci => ci.classList.remove('active'));
  }
  function activate(key) {
    clearActive();
    const step = steps.find(s => s.dataset.key === key);
    const comp = findByKey(key);
    if (step) step.classList.add('is-active');
    if (comp) comp.classList.add('active');
  }

  if (window.ScrollTrigger && steps.length) {
    steps.forEach((step) => {
      ScrollTrigger.create({
        trigger: step,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => activate(step.dataset.key),
        onEnterBack: () => activate(step.dataset.key),
      });
    });
  }

  // Hover and keyboard focus interactions
  steps.forEach(step => {
    step.addEventListener('mouseenter', () => activate(step.dataset.key));
    step.addEventListener('focusin', () => activate(step.dataset.key));
  });
})();


