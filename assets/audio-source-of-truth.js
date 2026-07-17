(() => {
  'use strict';

  const listenButton = document.getElementById('btn-luister');
  const soundPhase = document.getElementById('geluid-fase');
  if (!listenButton || !soundPhase || typeof S === 'undefined') return;

  let assignmentSequence = 0;
  let activeAssignment = null;
  let activeSource = null;
  let finishTimer = null;

  const get = (id) => document.getElementById(id);

  function stopActiveSource() {
    if (!activeSource) return;
    try { activeSource.stop(); } catch (_) {}
    try { activeSource.disconnect(); } catch (_) {}
    activeSource = null;
  }

  function assignmentForCurrentTask() {
    const sound = S.dier;
    if (!sound || !sound.id) return null;

    const currentId = soundPhase.dataset.assignmentSoundId;
    if (!activeAssignment || activeAssignment.sound !== sound || currentId !== sound.id) {
      assignmentSequence += 1;
      activeAssignment = Object.freeze({
        token: assignmentSequence,
        sound,
        id: sound.id,
        name: sound.naam,
        audioPath: sound.audioPath || `audio/basis/${sound.id}.mp3`,
      });
      soundPhase.dataset.assignmentToken = String(activeAssignment.token);
      soundPhase.dataset.assignmentSoundId = activeAssignment.id;
      soundPhase.dataset.assignmentAudioPath = activeAssignment.audioPath;
    }
    return activeAssignment;
  }

  function assignmentStillCurrent(assignment) {
    return !!assignment &&
      activeAssignment === assignment &&
      S.dier === assignment.sound &&
      S.dier?.id === assignment.id &&
      soundPhase.dataset.assignmentToken === String(assignment.token) &&
      soundPhase.dataset.assignmentSoundId === assignment.id;
  }

  function syncAssignmentFromUi() {
    const assignment = assignmentForCurrentTask();
    if (!assignment) return;
    get('beest-naam')?.setAttribute('data-sound-id', assignment.id);
    listenButton.dataset.soundId = assignment.id;
    listenButton.dataset.assignmentToken = String(assignment.token);
  }

  const originalShowSoundPhase = typeof toonGeluidFase === 'function' ? toonGeluidFase : null;
  if (originalShowSoundPhase) {
    toonGeluidFase = function audioSafeSoundPhase(...args) {
      stopActiveSource();
      window.clearTimeout(finishTimer);
      activeAssignment = null;
      const result = originalShowSoundPhase.apply(this, args);
      syncAssignmentFromUi();
      return result;
    };
  }

  function playBoundBuffer(assignment) {
    const ctx = audio();
    const src = ctx.createBufferSource();
    src.buffer = assignment.sound.buffer;
    src.connect(ctx.destination);
    activeSource = src;
    src.onended = () => {
      if (activeSource === src) activeSource = null;
    };
    src.start();
    return assignment.sound.buffer.duration;
  }

  function revealPerformanceStep(assignment) {
    if (!assignmentStillCurrent(assignment)) return;

    get('beest-emoji')?.classList.remove('speelt');
    get('sound-bars')?.classList.remove('speelt');
    listenButton.disabled = false;
    listenButton.textContent = '🔊 Nog eens luisteren';

    if (S.modifier) {
      if (get('modifier-emoji')) get('modifier-emoji').textContent = S.modifier.emoji;
      if (get('modifier-tekst')) get('modifier-tekst').textContent = S.modifier.tekst;
      get('modifier-reveal')?.classList.remove('verborgen');
      const card = get('show-card');
      if (card) {
        card.classList.remove('reveal-flash');
        void card.offsetWidth;
        card.classList.add('reveal-flash');
      }
      if (get('show-instructie')) get('show-instructie').textContent = 'Verrassing! Voeg dit toe aan je imitatie';
      try { SFX.glinster(); } catch (_) {}
      try { ProfessorDecibel.chaos(); } catch (_) {}
    } else if (get('show-instructie')) {
      get('show-instructie').textContent = 'Jij bent aan de beurt';
    }

    if (get('beurt-hint')) {
      get('beurt-hint').textContent = S.modifier
        ? 'Combineer het basisgeluid met de chaos-opdracht.'
        : 'Doe het geluid zo overtuigend mogelijk na.';
    }
    const recordButton = get('btn-opnemen');
    recordButton?.classList.remove('verborgen');
    recordButton?.classList.add('show-primary');
    if (recordButton) recordButton.textContent = '🎤 Start jouw optreden';
  }

  listenButton.onclick = async () => {
    const assignment = assignmentForCurrentTask();
    if (!assignment) return;

    listenButton.disabled = true;
    listenButton.dataset.soundId = assignment.id;
    listenButton.dataset.assignmentToken = String(assignment.token);

    try {
      await laadDier(assignment.sound);
    } catch (error) {
      if (!assignmentStillCurrent(assignment)) return;
      const errorBox = get('mic-fout');
      errorBox?.classList.remove('verborgen');
      if (errorBox) {
        errorBox.textContent = `Het geluid “${assignment.name}” kon niet worden geladen. `;
        const replacement = document.createElement('button');
        replacement.className = 'secundair';
        replacement.style.marginTop = '8px';
        replacement.textContent = '🎲 Kies een ander geluid';
        replacement.onclick = () => toonGeluidFase();
        errorBox.appendChild(replacement);
      }
      listenButton.disabled = false;
      return;
    }

    // Een oude fetch mag nooit audio voor een inmiddels gewijzigde opdracht starten.
    if (!assignmentStillCurrent(assignment)) return;

    const displayedId = get('beest-naam')?.dataset.soundId;
    if (displayedId && displayedId !== assignment.id) {
      console.error('Audio-opdracht geblokkeerd wegens ID-mismatch', {
        displayedId,
        assignmentId: assignment.id,
        assignmentName: assignment.name,
      });
      listenButton.disabled = false;
      return;
    }

    stopActiveSource();
    get('beest-emoji')?.classList.add('speelt');
    get('sound-bars')?.classList.add('speelt');
    if (get('show-instructie')) get('show-instructie').textContent = 'Luister goed…';

    const duration = playBoundBuffer(assignment);
    window.clearTimeout(finishTimer);
    finishTimer = window.setTimeout(
      () => revealPerformanceStep(assignment),
      Math.max(0, duration * 1000 + 150),
    );
  };

  // Initialiseer ook wanneer een opdracht al zichtbaar was voordat dit script geladen werd.
  syncAssignmentFromUi();

  window.addEventListener('pagehide', () => {
    window.clearTimeout(finishTimer);
    stopActiveSource();
  });
})();
