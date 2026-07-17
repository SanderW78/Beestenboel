(() => {
  'use strict';

  const noop = () => {};
  const resolved = () => Promise.resolve();

  // Houd alleen oude presentatielagen uitgeschakeld. De actieve Professor
  // Decibel wordt beheerd door de bestaande gamecode en zijn eigen DOM.
  window.ShowIntelligence = {
    reset: noop,
    beforeTurn: noop,
    afterScore: () => [],
    react: noop,
    showStandings: noop,
    summary: () => ({
      bestScore: 0,
      bestPlayer: '',
      legendary: 0,
      chaos: 0,
      gap: 0,
      winner: '',
      score: 0
    })
  };

  window.showMoment = async () => {};
  window.showIntro = async () => {};
  window.applyCategoryTheme = noop;

  const hideLegacyPresentation = () => {
    const selectors = [
      '#show-overlay',
      '.showmaster-overlay',
      '.xxl-score-reveal',
      '.xxl-opening',
      '.xxl-interstitial',
      '.tv-transition',
      '.pd-player-intro',
      '.pd-host-caption',
      '.pd-round-intermission',
      '#live-standings'
    ];

    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((element) => {
        element.classList.remove('zichtbaar', 'is-visible', 'active', 'show');
        element.setAttribute('aria-hidden', 'true');
        element.style.display = 'none';
        element.style.pointerEvents = 'none';
      });
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hideLegacyPresentation, { once: true });
  } else {
    hideLegacyPresentation();
  }

  window.BeestenboelPresentation = Object.freeze({
    version: 'professor-decibel-live',
    hideLegacyPresentation,
    ready: resolved
  });
})();
