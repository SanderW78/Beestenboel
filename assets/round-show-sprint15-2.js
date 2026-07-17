(() => {
  'use strict';

  const professor = document.getElementById('professor-decibel');
  const originalNewTurn = typeof window.nieuweBeurt === 'function' ? window.nieuweBeurt : null;

  // Deze uitbreiding mag de basisgame nooit blokkeren.
  if (!originalNewTurn || !professor || document.querySelector('.pd-round-intermission')) return;

  const intermission = document.createElement('section');
  intermission.className = 'pd-round-intermission';
  intermission.setAttribute('aria-hidden', 'true');
  intermission.innerHTML = `
    <div class="pd-studio-stage" role="dialog" aria-modal="true" aria-labelledby="pd-round-title">
      <div class="pd-round-host" aria-hidden="true">
        <img src="professor-decibel.webp" alt="">
      </div>
      <div class="pd-round-panel">
        <div class="pd-round-kicker">Professor Decibel presenteert</div>
        <h2 class="pd-round-title" id="pd-round-title">Tussenstand</h2>
        <p class="pd-round-line" id="pd-round-line"></p>
        <div class="pd-round-standing" id="pd-round-standing"></div>
        <button class="pd-round-next groen" id="pd-round-next">Start volgende ronde →</button>
      </div>
    </div>`;
  document.body.appendChild(intermission);

  const line = intermission.querySelector('#pd-round-line');
  const standing = intermission.querySelector('#pd-round-standing');
  const next = intermission.querySelector('#pd-round-next');
  let continueRound = null;
  let showing = false;

  const hideRegularProfessor = () => {
    const classes = ['zichtbaar', 'pd-host-enter', 'pd-host-wave', 'pd-host-announce', 'pd-host-celebrate', 'pd-host-shocked', 'pd-host-bow'];
    if (classes.some((name) => professor.classList.contains(name))) professor.classList.remove(...classes);
    if (professor.getAttribute('aria-hidden') !== 'true') professor.setAttribute('aria-hidden', 'true');
  };

  const getState = () => {
    try {
      if (!window.S || !Array.isArray(window.S.spelers)) return null;
      return window.S;
    } catch (_) {
      return null;
    }
  };

  const renderStanding = (state) => {
    const players = [...state.spelers].sort((a, b) => (b.score || 0) - (a.score || 0));
    standing.replaceChildren(...players.map((player, index) => {
      const row = document.createElement('div');
      row.className = 'pd-round-row';
      const place = document.createElement('span');
      place.className = 'pd-round-place';
      place.textContent = String(index + 1);
      const name = document.createElement('span');
      name.textContent = player.naam || 'Speler';
      const score = document.createElement('span');
      score.className = 'pd-round-score';
      score.textContent = `${player.score || 0} pt`;
      row.append(place, name, score);
      return row;
    }));
  };

  const openIntermission = (state) => new Promise((resolve) => {
    showing = true;
    continueRound = resolve;
    hideRegularProfessor();
    renderStanding(state);
    const completedRound = Number(state.ronde);
    const nextRound = completedRound + 1;
    line.textContent = `Iedereen is aan de beurt geweest. Dit is de stand na ronde ${completedRound}.`;
    next.textContent = `Start ronde ${nextRound} →`;
    intermission.classList.add('is-visible');
    intermission.setAttribute('aria-hidden', 'false');
    document.body.classList.add('pd-round-show');
    window.setTimeout(() => next.focus(), 450);
  });

  const closeIntermission = () => {
    if (!showing) return;
    showing = false;
    intermission.classList.remove('is-visible');
    intermission.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('pd-round-show');
    const done = continueRound;
    continueRound = null;
    window.setTimeout(() => {
      try { done?.(); } catch (_) {}
    }, 320);
  };

  next.addEventListener('click', closeIntermission);
  intermission.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && showing) closeIntermission();
  });

  window.nieuweBeurt = async function sprint152NewTurn(...args) {
    try {
      const state = getState();
      const betweenRounds = !!state && Number(state.beurt) === 0 && Number(state.ronde) > 0 && Number(state.ronde) < Number(state.rondes);
      if (betweenRounds) await openIntermission(state);
    } catch (error) {
      console.warn('Rondepresentatie overgeslagen om de spelstroom te beschermen.', error);
      closeIntermission();
    }

    hideRegularProfessor();
    return originalNewTurn.apply(this, args);
  };

  hideRegularProfessor();
})();