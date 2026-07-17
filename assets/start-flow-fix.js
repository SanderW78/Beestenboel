(() => {
  'use strict';

  const startButton = document.getElementById('btn-start');
  if (!startButton) return;

  const delay = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

  function clearBlockingShowLayers() {
    document.querySelectorAll('.show-overlay, .xxl-opening, .xxl-interstitial, .xxl-score-reveal')
      .forEach((element) => {
        element.classList.remove('zichtbaar', 'is-visible');
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
        ShowIntelligence.reset();
      }
      if (typeof houdSchermWakker === 'function') houdSchermWakker();
      if (typeof SFX_NAMEN !== 'undefined' && typeof sfxBuffer === 'function') {
        SFX_NAMEN.forEach((name) => sfxBuffer(name).catch(() => {}));
      }

      // De intro mag de spelstart nooit meer blokkeren.
      if (typeof showIntro === 'function') {
        await Promise.race([
          Promise.resolve().then(() => showIntro()).catch(() => {}),
          delay(4200),
        ]);
      }

      clearBlockingShowLayers();

      if (typeof nieuweBeurt !== 'function') {
        throw new Error('Spelkern niet beschikbaar');
      }
      await nieuweBeurt();

      if (typeof vraagMic === 'function') vraagMic(3500).catch(() => {});
    } catch (error) {
      console.error('Beestenboel kon niet starten:', error);
      clearBlockingShowLayers();
      showStartError();
      startButton.disabled = false;
      startButton.textContent = originalLabel;
    }
  };
})();