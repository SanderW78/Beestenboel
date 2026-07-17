(() => {
  'use strict';

  // Eén presentatieregel: geen host- of klassementsoverlays tijdens een beurt.
  // De afzonderlijke ronde-intermissie verzorgt de presentatie tussen rondes.
  const disableLegacyPresentation = () => {
    try {
      if (window.ShowIntelligence && typeof window.ShowIntelligence === 'object') {
        window.ShowIntelligence.showStandings = () => {};
        window.ShowIntelligence.react = () => {};
      }
    } catch (_) {}

    try {
      if (window.ProfessorDecibel && typeof window.ProfessorDecibel === 'object') {
        [
          'show', 'speak', 'turn', 'category', 'chaos', 'liveStart', 'liveLevel',
          'liveStop', 'analyse', 'directedScoreReveal'
        ].forEach((method) => {
          if (typeof window.ProfessorDecibel[method] === 'function') {
            window.ProfessorDecibel[method] = () => {};
          }
        });
      }
    } catch (_) {}

    const professor = document.getElementById('professor-decibel');
    if (professor) {
      professor.classList.remove(
        'zichtbaar', 'pd-host-enter', 'pd-host-wave', 'pd-host-announce',
        'pd-host-celebrate', 'pd-host-shocked', 'pd-host-bow'
      );
      professor.setAttribute('aria-hidden', 'true');
    }

    document.querySelectorAll(
      '.pd-player-intro, .pd-host-caption, .showmaster-overlay, .xxl-score-reveal'
    ).forEach((element) => {
      element.classList.remove('zichtbaar', 'is-visible', 'active', 'show');
      element.setAttribute('aria-hidden', 'true');
      element.style.pointerEvents = 'none';
    });
  };

  disableLegacyPresentation();

  // Oude scripts kunnen kort na DOMContentLoaded nog elementen maken. Eén begrensde
  // nacontrole is voldoende; geen MutationObserver en dus geen recursieve lus.
  window.setTimeout(disableLegacyPresentation, 0);
  window.setTimeout(disableLegacyPresentation, 1200);
})();