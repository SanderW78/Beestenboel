(() => {
  'use strict';

  const cleanPlayerName = (value) => String(value || '')
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 14);

  const activeMedia = new Set();
  const nativePlay = HTMLMediaElement.prototype.play;
  const nativePause = HTMLMediaElement.prototype.pause;

  HTMLMediaElement.prototype.play = function trackedPlay() {
    activeMedia.add(this);
    this.addEventListener('ended', () => activeMedia.delete(this), { once: true });
    return nativePlay.apply(this, arguments);
  };

  HTMLMediaElement.prototype.pause = function trackedPause() {
    activeMedia.delete(this);
    return nativePause.apply(this, arguments);
  };

  function stopAllMedia() {
    activeMedia.forEach((media) => {
      try {
        nativePause.call(media);
        media.currentTime = 0;
      } catch (_) {}
    });
    activeMedia.clear();
  }

  if (typeof voegToe === 'function') {
    const originalVoegToe = voegToe;
    voegToe = function safeVoegToe() {
      const input = document.getElementById('naam-input');
      if (input) input.value = cleanPlayerName(input.value);
      return originalVoegToe.apply(this, arguments);
    };
  }

  function sanitizeExistingPlayers() {
    try {
      if (!Array.isArray(S?.spelers)) return;
      S.spelers = S.spelers
        .filter((player) => player && typeof player === 'object')
        .slice(0, 8)
        .map((player, index) => ({
          ...player,
          naam: cleanPlayerName(player.naam) || `Speler ${index + 1}`,
          score: Number.isFinite(Number(player.score)) ? Number(player.score) : 0,
        }));
    } catch (_) {}
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
    stopAllMedia();
    stopMicrophone();
    releaseWakeLock();
    revokeLastRecording();
  }

  function showRuntimeMessage(title, message) {
    if (document.querySelector('[data-runtime-alert]')) return;
    const panel = document.createElement('section');
    panel.className = 'kaart';
    panel.dataset.runtimeAlert = 'true';
    panel.setAttribute('role', 'alert');
    const heading = document.createElement('h2');
    heading.textContent = title;
    const text = document.createElement('p');
    text.textContent = message;
    panel.append(heading, text);
    document.querySelector('.app')?.prepend(panel);
  }

  window.addEventListener('pagehide', cleanupResources);
  window.addEventListener('beforeunload', cleanupResources);
  window.addEventListener('offline', () => showRuntimeMessage(
    'Geen internetverbinding',
    'Het huidige scherm blijft werken, maar nog niet geladen geluiden kunnen tijdelijk ontbreken.'
  ));

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      stopAllMedia();
      releaseWakeLock();
    }
  });

  window.addEventListener('load', () => {
    sanitizeExistingPlayers();
    window.setTimeout(() => {
      if (typeof S === 'undefined' || typeof tekenSpelers !== 'function') {
        showRuntimeMessage(
          'Het spel kon niet worden geladen',
          'Ververs de pagina. Blijft dit gebeuren, controleer dan of assets/game.js beschikbaar is.'
        );
        return;
      }
      try {
        tekenSpelers();
      } catch (error) {
        console.warn('Spelers konden niet opnieuw worden getekend.', error);
      }
    }, 300);
  });
})();
