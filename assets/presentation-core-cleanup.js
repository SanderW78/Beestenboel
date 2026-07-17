(() => {
  'use strict';

  const noop = () => {};
  const resolved = () => Promise.resolve();

  // Eén veilige presentatielaag. Oude gamecode mag deze functies blijven
  // aanroepen, maar veroorzaakt geen pop-ups, dubbele standen of blokkades.
  window.ProfessorDecibel = {
    show: noop,
    speak: noop,
    turn: noop,
    category: noop,
    chaos: noop,
    liveStart: noop,
    liveLevel: noop,
    liveStop: noop,
    analyse: noop,
    directedScoreReveal: noop
  };

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
      '#professor-decibel',
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

  // Geen MutationObserver: deze cleanup moet passief en voorspelbaar blijven.
  window.BeestenboelPresentation = Object.freeze({
    version: 'phase-1-cleanup',
    hideLegacyPresentation,
    ready: resolved
  });
})();
