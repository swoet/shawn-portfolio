(function initTextMaskVideoSection() {
  const root = document.querySelector('.text-mask-video-section');
  if (!root) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Split the text into words (more stable wrapping than per-letter)
  const text = root.querySelector('.tmv-text');
  if (!text) return;
  const raw = text.textContent.trim().replace(/\s+/g, ' ');
  const wordsArr = raw.split(' ');
  text.textContent = '';
  wordsArr.forEach((w) => {
    const span = document.createElement('span');
    span.className = 'tmv-word';
    span.textContent = w;
    text.appendChild(span);
  });
  const words = Array.from(text.querySelectorAll('.tmv-word'));

  // Compute spread amplitude based on viewport width
  const getAmpX = () => {
    const w = window.innerWidth;
    if (w >= 1280) return Math.round(w * 0.08); // ~8vw
    if (w >= 768) return Math.round(w * 0.06);  // ~6vw
    return Math.round(w * 0.045);               // ~4.5vw
  };

  // Animate words: subtle vertical drift + horizontal spread, responsive
  gsap.fromTo(words,
    { yPercent: (i) => (i % 2 ? 16 : 10), opacity: 0.9, scale: 0.98, transformOrigin: '50% 50%' },
    {
      yPercent: 0,
      opacity: 1,
      x: (i) => (i - (words.length - 1) / 2) * getAmpX(),
      rotate: (i) => (i % 2 ? -1.2 : 1.2),
      scale: 1,
      ease: 'none',
      stagger: { each: 0.08, from: 'center' },
      scrollTrigger: {
        trigger: root,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true,
      }
    }
  );

  // Recalculate on resize
  if (window.ScrollTrigger) {
    window.addEventListener('resize', () => ScrollTrigger.refresh());
  }
})();


