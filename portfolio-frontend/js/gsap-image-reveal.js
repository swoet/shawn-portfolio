;(function initBuildUpRevealSection() {
  const root = document.querySelector('.build-up-reveal-section');
  if (!root) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  // GSAP is loaded globally in index.html
  if (!window.gsap) return;

  const container = root.querySelector('.reveal-container');
  if (!container) return;

  // Collect project poster images from case studies section
  const posterImgs = Array.from(document.querySelectorAll('.case-studies .device-screen img'))
    .map(img => img.currentSrc || img.getAttribute('src'))
    .filter(Boolean);
  // Deduplicate while preserving order
  const posters = posterImgs.filter((src, i, a) => a.indexOf(src) === i);

  // Fallback to existing single image or a default cover
  const fallback = (container.querySelector('img.reveal-image')?.getAttribute('src')) || 'public/red-notice-cover.png';
  if (posters.length === 0) posters.push(fallback);

  // Rebuild the container with stacked images for the slideshow
  container.innerHTML = '';
  posters.forEach((src) => {
    const img = document.createElement('img');
    img.className = 'reveal-image';
    img.src = src;
    img.alt = 'Project poster';
    img.loading = 'lazy';
    container.appendChild(img);
  });

  // Add strobe ring overlay for phenakistoscope vibe
  const ring = document.createElement('div');
  ring.className = 'strobe-ring';
  container.appendChild(ring);

  const images = Array.from(container.querySelectorAll('.reveal-image'));
  if (!images.length) return;

  // Initial state for all images
  gsap.set(images, { opacity: 0, scale: 1.02, clipPath: 'inset(0% 0 0 0)' });

  // Build an autoplay looping timeline (phenakistoscope-like)
  const tl = gsap.timeline({ defaults: { ease: 'power1.out' }, repeat: -1, repeatDelay: 0 });

  const fadeIn = 0.6;
  const hold = 1.8;
  const fadeOut = 0.6;

  images.forEach((img, i) => {
    // Each image sequence is appended one after another
    tl.to(img, { opacity: 1, duration: fadeIn })
      .to(img, { scale: 1.08, duration: hold })
      .to(img, { opacity: 0, duration: fadeOut },  "+=0");
  });

  // Pause slideshow when section is out of view (does not tie to scroll)
  if (window.ScrollTrigger) {
    window.gsap.registerPlugin(ScrollTrigger);
    window.ScrollTrigger.create({
      trigger: root,
      start: 'top 95%',
      end: 'bottom 5%',
      onEnter: () => tl.play(),
      onEnterBack: () => tl.play(),
      onLeave: () => tl.pause(),
      onLeaveBack: () => tl.pause(),
    });
  }
})();


