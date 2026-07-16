(() => {
  'use strict';

  const professor = document.getElementById('professor-decibel');
  const speech = document.getElementById('pd-text');
  const scoreNode = document.getElementById('score-getal');
  const resultScreen = document.getElementById('scherm-resultaat');
  if (!professor || !speech) return;

  let blinkTimer = null;
  let moodTimer = null;
  let speakingTimer = null;
  let scoreSettleTimer = null;
  let lastReactedScore = null;

  const hasMood = () => ['pd-happy', 'pd-sad', 'pd-wow'].some((name) => professor.classList.contains(name));

  const clearMood = () => {
    window.clearTimeout(moodTimer);
    professor.classList.remove('pd-happy', 'pd-sad', 'pd-wow', 'pd-speaking');
    professor.classList.add('pd-idle');
  };

  const setMood = (mood, duration = 3000) => {
    window.clearTimeout(moodTimer);
    professor.classList.remove('pd-idle', 'pd-happy', 'pd-sad', 'pd-wow');
    professor.classList.add(`pd-${mood}`);
    moodTimer = window.setTimeout(clearMood, duration);
  };

  const animateSpeech = () => {
    window.clearTimeout(speakingTimer);
    professor.classList.remove('pd-idle');
    professor.classList.add('pd-speaking');
    const duration = Math.min(3600, Math.max(900, speech.textContent.trim().length * 42));
    speakingTimer = window.setTimeout(() => {
      professor.classList.remove('pd-speaking');
      if (!hasMood()) professor.classList.add('pd-idle');
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

  const reactionForScore = (score) => {
    if (score >= 90) {
      return { mood: 'wow', duration: 4300, text: 'Fenomenaal! Mijn decibelmeters slaan volledig op hol!' };
    }
    if (score >= 75) {
      return { mood: 'happy', duration: 3500, text: 'Dat klonk verdacht goed. Ik keur het wetenschappelijk goed!' };
    }
    if (score < 40) {
      return { mood: 'sad', duration: 3600, text: 'Ai… mijn meetapparatuur vraagt om een herkansing.' };
    }
    return { mood: 'happy', duration: 2800, text: 'Interessant resultaat. Mijn laboratorium noteert vooruitgang.' };
  };

  const reactToSettledScore = () => {
    if (!scoreNode || resultScreen?.classList.contains('verborgen')) return;
    const score = Number.parseInt(scoreNode.textContent, 10);
    if (!Number.isFinite(score) || score === lastReactedScore) return;

    lastReactedScore = score;
    const reaction = reactionForScore(score);
    speech.textContent = reaction.text;
    setMood(reaction.mood, reaction.duration);
    animateSpeech();
  };

  const scheduleScoreReaction = () => {
    window.clearTimeout(scoreSettleTimer);
    scoreSettleTimer = window.setTimeout(reactToSettledScore, 500);
  };

  new MutationObserver(animateSpeech).observe(speech, {
    childList: true,
    characterData: true,
    subtree: true
  });

  if (scoreNode) {
    new MutationObserver(scheduleScoreReaction).observe(scoreNode, {
      childList: true,
      characterData: true,
      subtree: true
    });
  }

  if (resultScreen) {
    new MutationObserver(() => {
      if (resultScreen.classList.contains('verborgen')) {
        lastReactedScore = null;
        window.clearTimeout(scoreSettleTimer);
      } else {
        scheduleScoreReaction();
      }
    }).observe(resultScreen, { attributes: true, attributeFilter: ['class'] });
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      window.clearTimeout(blinkTimer);
      window.clearTimeout(scoreSettleTimer);
      professor.classList.remove('pd-speaking', 'pd-blink');
    } else {
      clearMood();
      scheduleBlink();
    }
  });

  window.addEventListener('pagehide', () => {
    [blinkTimer, moodTimer, speakingTimer, scoreSettleTimer].forEach((timer) => window.clearTimeout(timer));
  });

  professor.classList.add('pd-idle');
  scheduleBlink();
})();
