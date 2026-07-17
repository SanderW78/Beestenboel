(() => {
  'use strict';

  const startButton = document.getElementById('btn-start');
  if (!startButton) return;

  const delay = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

  function clearBlockingShowLayers() {
    document.querySelectorAll('.show-overlay, .xxl-opening, .xxl-interstitial, .xxl-score-reveal')
      .forEach((element) => {
        element.classList.remove('zichtbaar', 'is-visible');
        element.style.pointerEvents = 'none';
        element.setAttribute('aria-hidden', 'true');
      });
    document.body.classList.add('xxl-curtains-open');
  }

  function showStartError() {
    let message = document.getElementById('start-flow-error');
    if (!message) {
      message = document.createElement('p');
      message.id = 'start-flow-error';
      message.className = 'fout';
      message.setAttribute('role', 'alert');
      startButton.insertAdjacentElement('afterend', message);
    }
    message.textContent = 'De show kon niet starten. Ververs de pagina en probeer het opnieuw.';
    message.classList.remove('verborgen');
  }

  function forceFirstTurnVisible() {
    if (typeof S === 'undefined' || !Array.isArray(S.spelers) || !S.spelers.length) return;
    const player = S.spelers[S.beurt] || S.spelers[0];

    if (typeof toon === 'function') toon('scherm-beurt');
    else {
      document.querySelectorAll('#scherm-setup, #scherm-beurt, #scherm-resultaat, #scherm-einde')
        .forEach((screen) => screen.classList.toggle('verborgen', screen.id !== 'scherm-beurt'));
    }

    try { if (typeof tekenChips === 'function') tekenChips(); } catch (_) {}

    const roundLabel = document.getElementById('ronde-label');
    const playerName = document.getElementById('beurt-naam');
    const instruction = document.getElementById('show-instructie');
    const wheelPhase = document.getElementById('rad-fase');
    const soundPhase = document.getElementById('geluid-fase');
    const spinButton = document.getElementById('btn-draai');

    if (roundLabel) roundLabel.textContent = `Ronde ${S.ronde + 1} van ${S.rondes}`;
    if (playerName) playerName.textContent = `${player.naam}, jij bent!`;
    if (instruction) instruction.textContent = 'Draai voor je opdracht';
    if (wheelPhase) wheelPhase.classList.remove('verborgen');
    if (soundPhase) soundPhase.classList.add('verborgen');
    if (spinButton) spinButton.disabled = false;

    clearBlockingShowLayers();
  }

  startButton.onclick = async () => {
    if (startButton.disabled) return;
    startButton.disabled = true;
    const originalLabel = startButton.textContent;
    startButton.textContent = 'De show start…';

    try {
      if (typeof audio === 'function') {
        try { audio(); } catch (_) {}
      }
      if (typeof wisSpel === 'function') wisSpel();

      if (typeof S === 'undefined' || !Array.isArray(S.spelers) || S.spelers.length < 2) {
        throw new Error('Geen geldige spelers');
      }

      S.ronde = 0;
      S.beurt = 0;
      S.spelers.forEach((player) => { player.score = 0; });
      S.gebruikteOpdrachten = new Set();
      S.gebruikteBasis = new Set();

      if (typeof ShowIntelligence !== 'undefined' && ShowIntelligence?.reset) {
        try { ShowIntelligence.reset(); } catch (_) {}
      }
      if (typeof houdSchermWakker === 'function') houdSchermWakker();
      if (typeof SFX_NAMEN !== 'undefined' && typeof sfxBuffer === 'function') {
        SFX_NAMEN.forEach((name) => sfxBuffer(name).catch(() => {}));
      }

      // Openingsregie is decoratie en mag de gameplay nooit blokkeren.
      if (typeof showIntro === 'function') {
        await Promise.race([
          Promise.resolve().then(() => showIntro()).catch(() => {}),
          delay(3200),
        ]);
      }

      clearBlockingShowLayers();

      // Laat de spelkern de beurt voorbereiden, maar wacht er niet onbeperkt op.
      if (typeof nieuweBeurt === 'function') {
        await Promise.race([
          Promise.resolve().then(() => nieuweBeurt()).catch((error) => {
            console.warn('Showregie tijdens eerste beurt overgeslagen:', error);
          }),
          delay(1800),
        ]);
      }

      // Onvoorwaardelijke fallback: het rad en de eerste speler worden zichtbaar.
      forceFirstTurnVisible();

      if (typeof vraagMic === 'function') {
        Promise.resolve().then(() => vraagMic(3500)).catch(() => {});
      }
    } catch (error) {
      console.error('Beestenboel kon niet starten:', error);
      clearBlockingShowLayers();
      showStartError();
      startButton.disabled = false;
      startButton.textContent = originalLabel;
    }
  };
})();