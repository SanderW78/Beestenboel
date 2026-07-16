(() => {
  'use strict';

  const professor = document.getElementById('professor-decibel');
  const speech = document.getElementById('pd-text');
  const turnScreen = document.getElementById('scherm-beurt');
  const resultScreen = document.getElementById('scherm-resultaat');
  const endScreen = document.getElementById('scherm-einde');
  const setupScreen = document.getElementById('scherm-setup');
  const playerName = document.getElementById('beurt-naam');
  const scoreNode = document.getElementById('score-getal');
  const endList = document.getElementById('eind-lijst');
  const audioToggle = document.getElementById('audio-toggle');

  if (!professor || !speech) return;

  let lastPlayer = '';
  let lastScore = null;
  let introTimer = null;
  let hostTimer = null;
  let captionTimer = null;
  let scoreTimer = null;
  let finaleDone = false;
  let interactionUnlocked = false;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const visible = (el) => el && !el.classList.contains('verborgen');

  const intro = document.createElement('div');
  intro.className = 'pd-player-intro';
  intro.setAttribute('aria-hidden', 'true');
  intro.innerHTML = `
    <div class="pd-player-card">
      <div class="pd-player-kicker">Dames en heren, geef een warm applaus voor</div>
      <div class="pd-player-name" id="pd-player-name"></div>
      <div class="pd-player-applause" aria-hidden="true">👏 👏 👏</div>
    </div>`;
  document.body.appendChild(intro);

  const introName = intro.querySelector('#pd-player-name');
  const caption = document.createElement('div');
  caption.className = 'pd-host-caption';
  caption.setAttribute('role', 'status');
  document.body.appendChild(caption);

  const clearHostClasses = () => {
    professor.classList.remove(
      'pd-host-enter',
      'pd-host-wave',
      'pd-host-announce',
      'pd-host-celebrate',
      'pd-host-shocked',
      'pd-host-bow'
    );
  };

  const audioEnabled = () => {
    if (!audioToggle) return true;
    const label = `${audioToggle.getAttribute('aria-label') || ''} ${audioToggle.title || ''}`.toLowerCase();
    return !label.includes('aanzetten') && !label.includes('geluid aan');
  };

  const speak = (text) => {
    if (!interactionUnlocked || !audioEnabled() || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'nl-NL';
      utterance.rate = 1.02;
      utterance.pitch = 1.08;
      utterance.volume = .88;
      const voices = window.speechSynthesis.getVoices();
      const dutch = voices.find((voice) => voice.lang?.toLowerCase().startsWith('nl'));
      if (dutch) utterance.voice = dutch;
      window.speechSynthesis.speak(utterance);
    } catch (_) {
      // Tekst en animatie blijven altijd beschikbaar als spraak niet wordt ondersteund.
    }
  };

  const showCaption = (text, duration = 3000) => {
    window.clearTimeout(captionTimer);
    caption.textContent = text;
    caption.classList.add('is-visible');
    captionTimer = window.setTimeout(() => caption.classList.remove('is-visible'), duration);
  };

  const hostLine = (text, animation = 'announce', duration = 3400, useVoice = true) => {
    window.clearTimeout(hostTimer);
    clearHostClasses();
    speech.textContent = text;
    professor.setAttribute('aria-hidden', 'false');
    professor.classList.remove('pd-host-hidden');
    professor.classList.add(`pd-host-${animation}`);
    showCaption(text, Math.min(duration, 4200));
    if (useVoice) speak(text);
    hostTimer = window.setTimeout(clearHostClasses, duration);
  };

  const showPlayerIntro = (name) => {
    if (!name || name === lastPlayer) return;
    lastPlayer = name;
    window.clearTimeout(introTimer);
    introName.textContent = name;
    document.body.classList.add('pd-host-focus');
    intro.classList.add('is-visible');
    intro.setAttribute('aria-hidden', 'false');
    hostLine(`Dames en heren... geef een warm applaus voor ${name}!`, 'wave', 3300);

    introTimer = window.setTimeout(() => {
      intro.classList.remove('is-visible');
      intro.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('pd-host-focus');
      hostLine(`${name}, draai aan het rad en laat horen wat je kunt!`, 'announce', 2800, false);
    }, reducedMotion ? 900 : 2550);
  };

  const scoreReaction = (score, name) => {
    if (score >= 96) return { animation: 'celebrate', text: `${score} punten! ${name}, dit is buitenaards goed. De studio ontploft!` };
    if (score >= 90) return { animation: 'celebrate', text: `${score} punten! Een weergaloze imitatie van ${name}!` };
    if (score >= 75) return { animation: 'wave', text: `${score} punten. Sterk optreden, ${name}!` };
    if (score >= 55) return { animation: 'announce', text: `${score} punten. Degelijk werk, maar mijn decibelmeter hoort nog ruimte.` };
    if (score >= 40) return { animation: 'shocked', text: `${score} punten. Dat was dapper, en wetenschappelijk gezien bijzonder.` };
    return { animation: 'shocked', text: `${score} punten... Oei. Dat klonk alsof een kat over een doedelzak liep.` };
  };

  const reactToScore = () => {
    if (!visible(resultScreen)) return;
    const score = Number.parseInt(scoreNode?.textContent || '', 10);
    if (!Number.isFinite(score) || score === lastScore) return;
    lastScore = score;
    const name = playerName?.textContent?.trim() || 'kandidaat';
    const reaction = scoreReaction(score, name);
    hostLine(reaction.text, reaction.animation, score >= 90 ? 4700 : 3900);
  };

  const scheduleScoreReaction = () => {
    window.clearTimeout(scoreTimer);
    scoreTimer = window.setTimeout(reactToScore, 650);
  };

  const winnerName = () => {
    if (!endList) return '';
    const first = endList.firstElementChild;
    if (!first) return '';
    const explicit = first.querySelector('[data-name], .naam, .speler-naam, strong, b');
    const text = (explicit?.textContent || first.textContent || '').trim();
    return text.replace(/^\s*[🥇🏆1.\-]+\s*/u, '').split(/\s{2,}|\n|\d+\s*(?:punten|pt)/i)[0].trim();
  };

  const runFinale = () => {
    if (finaleDone || !visible(endScreen)) return;
    finaleDone = true;
    window.setTimeout(() => {
      const winner = winnerName();
      const line = winner
        ? `Wat een show! De Gouden Geit gaat naar ${winner}. Maak lawaai voor onze winnaar!`
        : 'Wat een show! Maak lawaai voor de winnaar van De Gouden Geit!';
      hostLine(line, 'celebrate', 5200);
    }, 700);
    window.setTimeout(() => {
      hostLine('Bedankt voor het spelen van Beestenboel. Professor Decibel maakt een diepe buiging!', 'bow', 4300);
    }, 6100);
  };

  const observeScreen = (screen, callback) => {
    if (!screen) return;
    new MutationObserver(() => {
      if (visible(screen)) callback();
    }).observe(screen, { attributes: true, attributeFilter: ['class'] });
  };

  observeScreen(turnScreen, () => {
    window.setTimeout(() => showPlayerIntro(playerName?.textContent?.trim() || ''), 120);
  });

  if (playerName) {
    new MutationObserver(() => {
      if (visible(turnScreen)) window.setTimeout(() => showPlayerIntro(playerName.textContent.trim()), 80);
    }).observe(playerName, { childList: true, characterData: true, subtree: true });
  }

  if (scoreNode) {
    new MutationObserver(scheduleScoreReaction).observe(scoreNode, {
      childList: true,
      characterData: true,
      subtree: true
    });
  }

  observeScreen(resultScreen, scheduleScoreReaction);
  observeScreen(endScreen, runFinale);
  observeScreen(setupScreen, () => {
    lastPlayer = '';
    lastScore = null;
    finaleDone = false;
  });

  const unlock = () => {
    interactionUnlocked = true;
    document.removeEventListener('pointerdown', unlock);
    document.removeEventListener('keydown', unlock);
  };
  document.addEventListener('pointerdown', unlock, { once: true });
  document.addEventListener('keydown', unlock, { once: true });

  professor.classList.add('pd-host-hidden');
  window.setTimeout(() => {
    professor.classList.remove('pd-host-hidden');
    professor.classList.add('pd-host-enter', 'pd-host-wave');
    speech.textContent = 'Goedenavond! Ik ben Professor Decibel, en dit is Beestenboel!';
    showCaption('Goedenavond! Ik ben Professor Decibel, en dit is Beestenboel!', 3800);
    window.setTimeout(clearHostClasses, 3600);
  }, reducedMotion ? 100 : 800);

  window.addEventListener('pagehide', () => {
    [introTimer, hostTimer, captionTimer, scoreTimer].forEach((timer) => window.clearTimeout(timer));
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  });
})();
