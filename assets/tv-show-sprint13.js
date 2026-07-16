(() => {
  'use strict';

  const fxLayer = document.getElementById('fx-layer');
  const screens = ['scherm-setup','scherm-beurt','scherm-resultaat','scherm-einde']
    .map((id) => document.getElementById(id)).filter(Boolean);
  const scoreNode = document.getElementById('score-getal');
  const endScreen = document.getElementById('scherm-einde');

  const visible = (el) => !el.classList.contains('verborgen');

  const animateScreen = (screen) => {
    screen.classList.remove('s13-screen-enter');
    void screen.offsetWidth;
    screen.classList.add('s13-screen-enter');
  };

  screens.forEach((screen) => {
    new MutationObserver(() => {
      if (visible(screen)) animateScreen(screen);
    }).observe(screen, { attributes: true, attributeFilter: ['class'] });
  });

  const flash = (kind) => {
    const node = document.createElement('div');
    node.className = `s13-score-flash ${kind}`;
    document.body.appendChild(node);
    window.setTimeout(() => node.remove(), 800);
  };

  const confetti = (count = 40) => {
    if (!fxLayer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const symbols = ['★','✦','●','◆','🎉'];
    for (let i = 0; i < count; i += 1) {
      const piece = document.createElement('span');
      piece.className = 's13-confetti';
      piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.setProperty('--drift', `${-90 + Math.random() * 180}px`);
      piece.style.animationDuration = `${2.8 + Math.random() * 2.4}s`;
      piece.style.animationDelay = `${Math.random() * .6}s`;
      fxLayer.appendChild(piece);
      window.setTimeout(() => piece.remove(), 6000);
    }
  };

  let lastScore = null;
  if (scoreNode) {
    new MutationObserver(() => {
      const score = Number.parseInt(scoreNode.textContent, 10);
      if (!Number.isFinite(score) || score === lastScore) return;
      lastScore = score;
      if (score >= 90) {
        flash('high');
        confetti(55);
      } else if (score < 40) {
        flash('low');
      }
    }).observe(scoreNode, { childList: true, characterData: true, subtree: true });
  }

  if (endScreen) {
    new MutationObserver(() => {
      if (visible(endScreen)) {
        window.setTimeout(() => confetti(85), 250);
      }
    }).observe(endScreen, { attributes: true, attributeFilter: ['class'] });
  }

  // Sprint 14 is loaded here so the existing page does not need another manual edit.
  if (!document.querySelector('link[href="assets/gameplay-sprint14.css"]')) {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'assets/gameplay-sprint14.css';
    document.head.appendChild(style);
  }
  if (!document.querySelector('script[src="assets/gameplay-sprint14.js"]')) {
    const script = document.createElement('script');
    script.src = 'assets/gameplay-sprint14.js';
    script.defer = true;
    document.body.appendChild(script);
  }
})();