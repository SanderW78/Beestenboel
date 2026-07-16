(() => {
  'use strict';

  const cleanPlayerName = (value) => String(value || '')
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 14);

  // Prevent player names from becoming executable markup in scoreboards and summaries.
  if (typeof voegToe === 'function') {
    const originalVoegToe = voegToe;
    voegToe = function safeVoegToe() {
      const input = document.getElementById('naam-input');
      if (input) input.value = cleanPlayerName(input.value);
      return originalVoegToe.apply(this, arguments);
    };
  }

  function stopMicrophone() {
    try {
      if (typeof micStream !== 'undefined' && micStream) {
        micStream.getTracks().forEach((track) => track.stop());
        micStream = null;
      }
    } catch (error) {
      console.warn('Microfoon kon niet volledig worden afgesloten.', error);
    }
  }

  function releaseWakeLock() {
    try {
      if (typeof wakeLock !== 'undefined' && wakeLock) {
        const currentLock = wakeLock;
        wakeLock = null;
        Promise.resolve(currentLock.release()).catch(() => {});
      }
    } catch (error) {
      console.warn('Wake lock kon niet volledig worden vrijgegeven.', error);
    }
  }

  function revokeLastRecording() {
    try {
      if (typeof S !== 'undefined' && S.laatsteOpname && String(S.laatsteOpname).startsWith('blob:')) {
        URL.revokeObjectURL(S.laatsteOpname);
        S.laatsteOpname = null;
      }
    } catch (error) {
      console.warn('Opname-URL kon niet worden opgeruimd.', error);
    }
  }

  function cleanupResources() {
    stopMicrophone();
    releaseWakeLock();
    revokeLastRecording();
  }

  window.addEventListener('pagehide', cleanupResources);
  window.addEventListener('beforeunload', cleanupResources);

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      releaseWakeLock();
    }
  });

  // A failed or missing main bundle should produce a visible error instead of a dead screen.
  window.addEventListener('load', () => {
    window.setTimeout(() => {
      if (typeof S === 'undefined' || typeof tekenSpelers !== 'function') {
        const panel = document.createElement('section');
        panel.className = 'kaart';
        panel.setAttribute('role', 'alert');
        panel.innerHTML = '<h2>Het spel kon niet worden geladen</h2><p>Ververs de pagina. Blijft dit gebeuren, controleer dan of assets/game.js beschikbaar is.</p>';
        document.querySelector('.app')?.prepend(panel);
      }
    }, 300);
  });
})();
