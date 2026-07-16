(() => {
  'use strict';

  const CHALLENGES = [
    { icon: '🎭', title: 'Vol overtuiging', text: 'Ga er volledig voor. Bij 70+ krijg je 4 bonuspunten.', threshold: 70, bonus: 4 },
    { icon: '📣', title: 'Publieksfavoriet', text: 'Maak er een show van. Bij 75+ krijg je 5 bonuspunten.', threshold: 75, bonus: 5 },
    { icon: '⚡', title: 'Volle bak', text: 'Geen twijfel, meteen raak. Bij 80+ krijg je 6 bonuspunten.', threshold: 80, bonus: 6 },
    { icon: '🎯', title: 'Professor-proof', text: 'Nauwkeurig én overtuigend. Bij 85+ krijg je 7 bonuspunten.', threshold: 85, bonus: 7 }
  ];

  const streaks = new Map();
  let activeChallenge = null;
  let challengeTurnKey = '';

  const challengeCard = document.createElement('aside');
  challengeCard.id = 'sprint14-challenge';
  challengeCard.className = 's14-challenge verborgen';
  challengeCard.setAttribute('aria-live', 'polite');
  challengeCard.innerHTML = '<span class="s14-icon"></span><div><strong></strong><p></p></div>';
  document.body.appendChild(challengeCard);

  const bonusBadge = document.createElement('div');
  bonusBadge.id = 'sprint14-bonus';
  bonusBadge.className = 's14-bonus verborgen';
  bonusBadge.setAttribute('aria-live', 'assertive');
  document.body.appendChild(bonusBadge);

  const getPlayer = () => {
    try { return S.spelers[S.beurt] || null; } catch (_) { return null; }
  };

  const getTurnKey = () => {
    try { return `${S.ronde}:${S.beurt}`; } catch (_) { return ''; }
  };

  const hideChallenge = () => {
    challengeCard.classList.add('verborgen');
  };

  const renderChallenge = (challenge) => {
    challengeCard.querySelector('.s14-icon').textContent = challenge.icon;
    challengeCard.querySelector('strong').textContent = challenge.title;
    challengeCard.querySelector('p').textContent = challenge.text;
    challengeCard.classList.remove('verborgen');
    challengeCard.classList.remove('s14-pop');
    void challengeCard.offsetWidth;
    challengeCard.classList.add('s14-pop');
  };

  const prepareChallenge = () => {
    const key = getTurnKey();
    if (!key || key === challengeTurnKey) return;
    challengeTurnKey = key;
    activeChallenge = Math.random() < 0.38
      ? CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)]
      : null;
    if (activeChallenge) renderChallenge(activeChallenge);
    else hideChallenge();
  };

  const showBonus = (lines) => {
    if (!lines.length) return;
    bonusBadge.innerHTML = lines.map((line) => `<span>${line}</span>`).join('');
    bonusBadge.classList.remove('verborgen', 's14-bonus-show');
    void bonusBadge.offsetWidth;
    bonusBadge.classList.add('s14-bonus-show');
    window.setTimeout(() => bonusBadge.classList.add('verborgen'), 3300);
  };

  const originalToonResultaat = typeof toonResultaat === 'function' ? toonResultaat : null;
  if (originalToonResultaat) {
    toonResultaat = function sprint14Result(score, stil, delen, gewichten, modScore, kenmerken) {
      const player = getPlayer();
      const playerName = player?.naam || 'speler';
      let streak = streaks.get(playerName) || 0;
      const bonusLines = [];
      let bonus = 0;

      if (!stil && score >= 70) streak += 1;
      else streak = 0;
      streaks.set(playerName, streak);

      if (streak === 2) {
        bonus += 3;
        bonusLines.push('🔥 Combo x2: +3');
      } else if (streak >= 3) {
        bonus += 5;
        bonusLines.push(`🔥 Combo x${streak}: +5`);
      }

      if (activeChallenge && !stil && score >= activeChallenge.threshold) {
        bonus += activeChallenge.bonus;
        bonusLines.push(`${activeChallenge.icon} ${activeChallenge.title}: +${activeChallenge.bonus}`);
      }

      const finalScore = Math.min(100, Math.max(0, score + bonus));
      activeChallenge = null;
      hideChallenge();
      showBonus(bonusLines);

      return originalToonResultaat.call(this, finalScore, stil, delen, gewichten, modScore, kenmerken);
    };
  }

  document.getElementById('btn-draai')?.addEventListener('click', () => {
    window.setTimeout(prepareChallenge, 900);
  });

  document.getElementById('btn-volgende')?.addEventListener('click', () => {
    activeChallenge = null;
    hideChallenge();
    window.setTimeout(prepareChallenge, 500);
  });

  document.getElementById('btn-opnieuw')?.addEventListener('click', () => {
    streaks.clear();
    activeChallenge = null;
    challengeTurnKey = '';
    hideChallenge();
  });
})();