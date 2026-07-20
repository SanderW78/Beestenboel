/*
 * RondeShow — tussenronde-presentatie met Professor Decibel.
 *
 * Losstaande presentatiecomponent volgens de Beestenboel-architectuurregels:
 *  - beheert uitsluitend zijn eigen DOM (aangemaakt onder document.body);
 *  - leest of wijzigt nooit speldata; alles komt binnen via parameters;
 *  - geen MutationObservers, geen wrapping van bestaande functies;
 *  - Promise-based: show() resolvet wanneer de speler verdergaat;
 *  - één publieke naam: window.RondeShow (bevroren API).
 *
 * Gebruik:
 *   const resultaat = await RondeShow.show({
 *     ronde: 2,                 // zojuist afgeronde ronde
 *     totaalRondes: 5,
 *     standen: [{ naam: "Anna", score: 240 }, ...],  // wordt gesorteerd getoond
 *     hostLine: "optionele eigen tekst voor de professor"
 *   });
 *   // resultaat: { dismissedBy: "knop" | "escape" }
 *
 * De aanroeper (later: de integratielaag in FASE 6) bepaalt wanneer de show
 * verschijnt; deze component bepaalt alleen hoe hij eruitziet en verdwijnt.
 */
(() => {
  'use strict';

  const QUIPS = [
    'Mijn meetapparatuur heeft even pauze nodig. Jullie ook, vermoed ik.',
    'Tussenstand genoteerd. De decibellen liegen nooit.',
    'Interessant. Zeer interessant. Wetenschappelijk gezien: spannend.',
    'Wie achterstaat: paniek is een uitstekende stembandopwarmer.',
    'Ik heb luidere rondes gehoord. Maar zelden betere.',
    'De koploper zit goed. De rest zit op jaagafstand. Prachtig.',
  ];
  const MEDAILLES = ['🥇', '🥈', '🥉'];

  let overlay = null;
  let actief = null;          // { resolve, vorigeFocus } zolang de show open staat
  let quipGeschiedenis = [];

  function kiesQuip() {
    const kandidaten = QUIPS.filter((q) => !quipGeschiedenis.includes(q));
    const keuze = kandidaten[Math.floor(Math.random() * kandidaten.length)] || QUIPS[0];
    quipGeschiedenis = [...quipGeschiedenis.slice(-2), keuze];
    return keuze;
  }

  function bouwDom() {
    if (overlay) return;
    overlay = document.createElement('section');
    overlay.className = 'rs-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'rs-titel');
    overlay.setAttribute('aria-hidden', 'true');

    const kaart = document.createElement('div');
    kaart.className = 'rs-kaart';

    const kop = document.createElement('header');
    kop.className = 'rs-kop';
    const kicker = document.createElement('div');
    kicker.className = 'rs-kicker';
    kicker.textContent = 'Tussenstand';
    const titel = document.createElement('h2');
    titel.className = 'rs-titel';
    titel.id = 'rs-titel';
    kop.append(kicker, titel);

    const lijst = document.createElement('ol');
    lijst.className = 'rs-lijst';

    const prof = document.createElement('div');
    prof.className = 'rs-prof';
    const beeld = document.createElement('img');
    beeld.className = 'rs-prof-beeld';
    beeld.src = 'assets/professor/portret.webp';
    beeld.alt = '';
    beeld.decoding = 'async';
    const ballon = document.createElement('div');
    ballon.className = 'rs-ballon';
    const naam = document.createElement('strong');
    naam.textContent = 'Professor Decibel';
    const tekst = document.createElement('span');
    tekst.className = 'rs-ballon-tekst';
    ballon.append(naam, tekst);
    prof.append(beeld, ballon);

    const knop = document.createElement('button');
    knop.type = 'button';
    knop.className = 'rs-knop';
    knop.textContent = 'Volgende ronde! 🎬';
    knop.addEventListener('click', () => sluit('knop'));

    kaart.append(kop, lijst, prof, knop);
    overlay.appendChild(kaart);
    overlay.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') sluit('escape');
    });
    document.body.appendChild(overlay);
  }

  function vulStanden(standen) {
    const lijst = overlay.querySelector('.rs-lijst');
    lijst.textContent = '';
    const gesorteerd = [...standen].sort((a, b) => b.score - a.score);
    gesorteerd.forEach((sp, i) => {
      const rij = document.createElement('li');
      rij.className = 'rs-rij' + (i === 0 ? ' rs-leider' : '');
      rij.style.setProperty('--rs-vertraging', `${140 + i * 110}ms`);
      const plek = document.createElement('span');
      plek.className = 'rs-plek';
      plek.textContent = MEDAILLES[i] || `${i + 1}.`;
      const wie = document.createElement('span');
      wie.className = 'rs-naam';
      wie.textContent = sp.naam;
      const punten = document.createElement('span');
      punten.className = 'rs-punten';
      punten.textContent = `${sp.score} pt`;
      rij.append(plek, wie, punten);
      lijst.appendChild(rij);
    });
  }

  function sluit(dismissedBy) {
    if (!actief) return;
    const { resolve, vorigeFocus } = actief;
    actief = null;
    overlay.classList.remove('rs-zichtbaar');
    overlay.setAttribute('aria-hidden', 'true');
    if (vorigeFocus && typeof vorigeFocus.focus === 'function') vorigeFocus.focus();
    resolve({ dismissedBy });
  }

  function show(opties) {
    const { ronde, totaalRondes, standen = [], hostLine } = opties || {};
    bouwDom();
    if (actief) sluit('vervangen');

    overlay.querySelector('.rs-titel').textContent =
      totaalRondes ? `Ronde ${ronde} van ${totaalRondes} zit erop!` : `Ronde ${ronde} zit erop!`;
    overlay.querySelector('.rs-ballon-tekst').textContent = hostLine || kiesQuip();
    vulStanden(standen);

    const reducedMotion = typeof matchMedia === 'function'
      && matchMedia('(prefers-reduced-motion: reduce)').matches;
    overlay.classList.toggle('rs-rustig', reducedMotion);

    overlay.setAttribute('aria-hidden', 'false');
    overlay.classList.add('rs-zichtbaar');

    return new Promise((resolve) => {
      actief = { resolve, vorigeFocus: document.activeElement };
      overlay.querySelector('.rs-knop').focus();
    });
  }

  window.RondeShow = Object.freeze({
    show,
    hide: () => sluit('hide'),
    isVisible: () => actief !== null,
  });
})();
