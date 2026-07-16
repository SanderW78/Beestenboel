(() => {
  'use strict';

  const body = document.body;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const studio = document.createElement('div');
  studio.className = 'tv-studio';
  studio.setAttribute('aria-hidden', 'true');
  studio.innerHTML = `
    <div class="tv-truss"></div>
    <div class="tv-led-wall"></div>
    <div class="tv-spot s1"></div>
    <div class="tv-spot s2"></div>
    <div class="tv-spot s3"></div>
    <div class="tv-smoke left"></div>
    <div class="tv-smoke right"></div>
    <div class="tv-stage-floor"></div>
    <div class="tv-stage-ring"></div>
  `;
  body.prepend(studio);

  const intro = document.createElement('div');
  intro.className = 'tv-intro';
  intro.setAttribute('aria-hidden', 'true');
  intro.innerHTML = `
    <div class="tv-intro-card">
      <div class="tv-intro-kicker">Professor Decibel presenteert</div>
      <div class="tv-intro-title">Beestenboel</div>
      <div class="tv-intro-sub">De ultieme partyshow</div>
      <div class="tv-intro-stars">★ ★ ★</div>
    </div>
  `;
  body.appendChild(intro);

  const finishIntro = () => {
    if (body.classList.contains('tv-intro-done')) return;
    body.classList.add('tv-intro-done');
    intro.classList.add('is-finished');
    window.setTimeout(() => intro.remove(), 900);
  };

  if (reducedMotion) {
    window.setTimeout(finishIntro, 150);
  } else {
    window.setTimeout(finishIntro, 2600);
    intro.addEventListener('click', finishIntro, { once: true });
  }

  const screenModes = new Map([
    ['scherm-setup', 'tv-camera-wide'],
    ['scherm-beurt', 'tv-camera-close'],
    ['scherm-resultaat', 'tv-camera-result'],
    ['scherm-einde', 'tv-camera-wide']
  ]);

  const screens = [...screenModes.keys()]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const setCamera = (screen) => {
    body.classList.remove('tv-camera-wide', 'tv-camera-close', 'tv-camera-result');
    const mode = screenModes.get(screen.id);
    if (mode) body.classList.add(mode);

    body.classList.remove('tv-scene-change');
    void body.offsetWidth;
    body.classList.add('tv-scene-change');
    window.setTimeout(() => body.classList.remove('tv-scene-change'), 850);
  };

  const isVisible = (node) => !node.classList.contains('verborgen');

  screens.forEach((screen) => {
    new MutationObserver(() => {
      if (isVisible(screen)) setCamera(screen);
    }).observe(screen, { attributes: true, attributeFilter: ['class'] });
  });

  const initial = screens.find(isVisible);
  if (initial) setCamera(initial);

  const startButton = document.getElementById('btn-start');
  if (startButton) {
    startButton.addEventListener('click', () => {
      body.classList.add('tv-show-started');
    });
  }
})();
