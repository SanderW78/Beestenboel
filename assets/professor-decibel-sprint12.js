(() => {
  'use strict';

  const professor = document.getElementById('professor-decibel');
  const speech = document.getElementById('pd-text');
  const scoreNode = document.getElementById('score-getal');
  if (!professor || !speech) return;

  let blinkTimer = null;
  let moodTimer = null;
  let speakingTimer = null;
  let lastScore = null;

  const clearMood = () => {
    professor.classList.remove('pd-happy', 'pd-sad', 'pd-wow', 'pd-speaking');
    professor.classList.add('pd-idle');
  };

  const setMood = (mood, duration = 3000) => {
    window.clearTimeout(moodTimer);
    professor.classList.remove('pd-idle', 'pd-happy', 'pd-sad', 'pd-wow');
    professor.classList.add(`pd-${mood}`);
    moodTimer = window.setTimeout(clearMood, duration);
  };

  const speak = () => {
    window.clearTimeout(speakingTimer);
    professor.classList.remove('pd-idle');
    professor.classList.add('pd-speaking');
    const duration = Math.min(3600, Math.max(900, speech.textContent.trim().length * 42));
    speakingTimer = window.setTimeout(() => {
      professor.classList.remove('pd-speaking');
      if (![...professor.classList].some((name) => /^pd-(happy|sad|wow)$/.test(name))) {
        professor.classList.add('pd-idle');
      }
    }, duration);
  };

  const scheduleBlink = () => {
    window.clearTimeout(blinkTimer);
    const delay = 2200 + Math.random() * 4300;
    blinkTimer = window.setTimeout(() => {
      professor.classList.add('pd-blink');
      window.setTimeout(() => professor.classList.remove('pd-blink'), 130);
      if (Math.random() > 0.76) {
        window.setTimeout(() => {
          professor.classList.add('pd-blink');
          window.setTimeout(() => professor.classList.remove('pd-blink'), 110);
        }, 260);
      }
      scheduleBlink();
    }, delay);
  };

  const reactToScore = (score) => {
    if (!Number.isFinite(score) || score === lastScore) return;
    lastScore = score;

    if (score >= 90) {
      speech.textContent = 'Fenomenaal! Mijn decibelmeters slaan volledig op hol!';
      setMood('wow', 4300);
    } else if (score >= 75) {
      speech.textContent = 'Dat klonk verdacht goed. Ik keur het wetenschappelijk goed!';
      setMood('happy', 3500);
    } else if (score < 40) {
      speech.textContent = 'Ai… mijn meetapparatuur vraagt om een herkansing.';
      setMood('sad', 3600);
    } else {
      speech.textContent = 'Interessant resultaat. Mijn laboratorium noteert vooruitgang.';
      setMood('happy', 2800);
    }
    speak();
  };

  new MutationObserver(speak).observe(speech, {
    childList: true,
    characterData: true,
    subtree: true
  });

  if (scoreNode) {
    new MutationObserver(() => {
      const score = Number.parseInt(scoreNode.textContent, 10);
      reactToScore(score);
    }).observe(scoreNode, {
      childList: true,
      characterData: true,
      subtree: true
    });
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      window.clearTimeout(blinkTimer);
      professor.classList.remove('pd-speaking', 'pd-blink');
    } else {
      clearMood();
      scheduleBlink();
    }
  });

  professor.classList.add('pd-idle');
  scheduleBlink();
})();
