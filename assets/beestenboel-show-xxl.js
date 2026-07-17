(() => {
  'use strict';
  const q = (s) => document.querySelector(s);
  const visible = (el) => el && !el.classList.contains('verborgen');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wait = (ms) => new Promise((r) => setTimeout(r, reduced ? Math.min(ms, 80) : ms));

  document.body.insertAdjacentHTML('afterbegin', `
    <div class="xxl-curtain left" aria-hidden="true"></div><div class="xxl-curtain right" aria-hidden="true"></div>
    <div class="xxl-opening" aria-hidden="true"><div class="xxl-opening-card">
      <div class="xxl-opening-kicker">Professor Decibel presenteert</div>
      <div class="xxl-opening-title">Beestenboel</div>
      <div class="xxl-opening-sub">HOOR · DOE NA · SCOOR</div>
      <button class="xxl-opening-skip">Start de show</button>
    </div></div>
    <div class="xxl-interstitial" aria-hidden="true"><div class="xxl-interstitial-card">
      <div class="xxl-interstitial-kicker">Dames en heren, maak lawaai voor</div>
      <div class="xxl-interstitial-name"></div><div class="xxl-applause">👏 👏 👏</div>
    </div></div>
    <div class="xxl-score-reveal" aria-hidden="true"><div class="xxl-score-card">
      <div class="xxl-drum">🥁</div><div class="xxl-score-number"></div>
    </div></div><div class="xxl-confetti" aria-hidden="true"></div>`);

  const opening = q('.xxl-opening');
  const interstitial = q('.xxl-interstitial');
  const interName = q('.xxl-interstitial-name');
  const scoreReveal = q('.xxl-score-reveal');
  const scoreNumber = q('.xxl-score-number');
  const drum = q('.xxl-drum');
  const confettiLayer = q('.xxl-confetti');
  const turnScreen = q('#scherm-beurt');
  const resultScreen = q('#scherm-resultaat');
  const endScreen = q('#scherm-einde');
  const playerName = q('#beurt-naam');
  const scoreNode = q('#score-getal');
  const spinButton = q('#btn-draai');
  let lastPlayer = '';
  let lastScoreKey = '';
  let introRunning = false;

  function setOverlay(el, on) {
    el.classList.toggle('is-visible', on);
    el.setAttribute('aria-hidden', on ? 'false' : 'true');
  }

  function confetti(amount = 90) {
    const colors = ['#ffd84d','#ff2d7a','#33d8ff','#ffffff','#8aff7b'];
    for (let i=0;i<amount;i++) {
      const bit = document.createElement('i');
      bit.style.left = `${Math.random()*100}%`;
      bit.style.color = colors[i % colors.length];
      bit.style.setProperty('--drift', `${-120 + Math.random()*240}px`);
      bit.style.animationDelay = `${Math.random()*.55}s`;
      bit.style.animationDuration = `${1.8 + Math.random()*1.6}s`;
      confettiLayer.appendChild(bit);
      setTimeout(() => bit.remove(), 3800);
    }
  }

  async function openingShow() {
    if (sessionStorage.getItem('bb-xxl-opening-seen')) {
      document.body.classList.add('xxl-curtains-open');
      return;
    }
    setOverlay(opening, true);
    await wait(450);
    document.body.classList.add('xxl-curtains-open');
    await wait(700);
    confetti(55);
  }

  async function closeOpening() {
    sessionStorage.setItem('bb-xxl-opening-seen','1');
    setOverlay(opening, false);
  }
  q('.xxl-opening-skip')?.addEventListener('click', closeOpening);
  opening?.addEventListener('click', (e) => { if (e.target === opening) closeOpening(); });

  async function playerIntro(name) {
    if (!name || name === lastPlayer || introRunning) return;
    introRunning = true;
    lastPlayer = name;
    interName.textContent = name;
    setOverlay(interstitial, true);
    confetti(35);
    await wait(2300);
    setOverlay(interstitial, false);
    document.body.classList.add('xxl-camera-wheel');
    await wait(700);
    document.body.classList.remove('xxl-camera-wheel');
    introRunning = false;
  }

  async function revealScore(score) {
    const name = playerName?.textContent?.trim() || '';
    const key = `${name}-${score}`;
    if (!Number.isFinite(score) || key === lastScoreKey || !visible(resultScreen)) return;
    lastScoreKey = key;
    scoreNumber.textContent = '';
    drum.style.display = '';
    scoreNumber.classList.remove('xxl-explosion');
    setOverlay(scoreReveal, true);
    await wait(650);
    drum.textContent = '🥁';
    await wait(500);
    drum.textContent = '🥁 🥁';
    await wait(500);
    drum.textContent = '🥁 🥁 🥁';
    await wait(550);
    drum.style.display = 'none';
    scoreNumber.textContent = score;
    scoreNumber.classList.add('xxl-explosion');
    if (score >= 95) {
      document.body.classList.add('xxl-mega-score');
      confetti(180);
      setTimeout(() => document.body.classList.remove('xxl-mega-score'), 2600);
    } else if (score >= 80) confetti(75);
    await wait(score >= 95 ? 2400 : 1500);
    setOverlay(scoreReveal, false);
  }

  function onTurn() {
    if (!visible(turnScreen)) return;
    setTimeout(() => playerIntro(playerName?.textContent?.trim() || ''), 120);
  }
  function onResult() {
    if (!visible(resultScreen)) return;
    const run = () => revealScore(Number.parseInt(scoreNode?.textContent || '',10));
    setTimeout(run, 450);
  }
  function onEnd() {
    if (!visible(endScreen)) return;
    setTimeout(() => confetti(220), 300);
    document.body.classList.add('xxl-finale-mode');
  }

  [turnScreen,resultScreen,endScreen].forEach((el) => {
    if (!el) return;
    new MutationObserver(() => {
      if (el === turnScreen) onTurn();
      if (el === resultScreen) onResult();
      if (el === endScreen) onEnd();
    }).observe(el,{attributes:true,attributeFilter:['class']});
  });
  playerName && new MutationObserver(onTurn).observe(playerName,{childList:true,subtree:true,characterData:true});
  scoreNode && new MutationObserver(onResult).observe(scoreNode,{childList:true,subtree:true,characterData:true});

  spinButton?.addEventListener('click', () => {
    document.body.classList.add('xxl-wheel-spinning');
    setTimeout(() => document.body.classList.remove('xxl-wheel-spinning'), 3600);
  });

  q('#btn-opnieuw')?.addEventListener('click', () => {
    lastPlayer=''; lastScoreKey=''; document.body.classList.remove('xxl-finale-mode');
  });

  openingShow();
})();
