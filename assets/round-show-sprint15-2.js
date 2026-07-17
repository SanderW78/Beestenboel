(() => {
  'use strict';

  const originalNewTurn = typeof window.nieuweBeurt === 'function' ? window.nieuweBeurt : null;
  const professor = document.getElementById('professor-decibel');
  if (!originalNewTurn || !professor) return;

  const intermission = document.createElement('section');
  intermission.className = 'pd-round-intermission';
  intermission.setAttribute('aria-hidden', 'true');
  intermission.innerHTML = `
    <div class="pd-studio-stage">
      <div class="pd-round-host" aria-hidden="true">
        <img src="professor-decibel.webp" alt="">
      </div>
      <div class="pd-round-panel">
        <div class="pd-round-kicker">Professor Decibel presenteert</div>
        <h2 class="pd-round-title">Tussenstand</h2>
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

  const sortedPlayers = () => {
    try {
      return [...S.spelers].sort((a, b) => (b.score || 0) - (a.score || 0));
    } catch (_) {
      return [];
    }
  };

  const renderStanding = () => {
    const players = sortedPlayers();
    standing.innerHTML = players.map((player, index) => `
      <div class="pd-round-row">
        <span class="pd-round-place">${index + 1}</span>
        <span>${player.naam}</span>
        <span class="pd-round-score">${player.score || 0} pt</span>
      </div>`).join('');
  };

  const hideRegularProfessor = () => {
    professor.classList.remove('zichtbaar', 'pd-host-enter', 'pd-host-wave', 'pd-host-announce', 'pd-host-celebrate', 'pd-host-shocked', 'pd-host-bow');
    professor.setAttribute('aria-hidden', 'true');
  };

  const openIntermission = () => new Promise((resolve) => {
    showing = true;
    continueRound = resolve;
    hideRegularProfessor();
    renderStanding();
    const roundNumber = Number(S.ronde) + 1;
    line.textContent = `Iedereen is aan de beurt geweest. Dit is de stand na ronde ${S.ronde}. Klaar voor ronde ${roundNumber}?`;
    next.textContent = `Start ronde ${roundNumber} →`;
    intermission.classList.add('is-visible');
    intermission.setAttribute('aria-hidden', 'false');
    document.body.classList.add('pd-round-show');
  });

  const closeIntermission = () => {
    if (!showing) return;
    showing = false;
    intermission.classList.remove('is-visible');
    intermission.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('pd-round-show');
    const done = continueRound;
    continueRound = null;
    window.setTimeout(() => done?.(), 320);
  };

  next.addEventListener('click', closeIntermission);

  window.nieuweBeurt = async function sprint152NewTurn(...args) {
    const betweenRounds = Number(S?.beurt) === 0 && Number(S?.ronde) > 0 && Number(S?.ronde) < Number(S?.rondes);
    if (betweenRounds) await openIntermission();
    hideRegularProfessor();
    return originalNewTurn.apply(this, args);
  };

  // Oude, frequente presentatorreacties blijven buiten beeld.
  hideRegularProfessor();
  new MutationObserver(hideRegularProfessor).observe(professor, {
    attributes: true,
    attributeFilter: ['class', 'aria-hidden']
  });
})();
