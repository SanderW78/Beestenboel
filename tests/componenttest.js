/*
 * Componenttest voor RondeShow (FASE 5).
 *
 * Laadt de component in een kale jsdom-pagina — zonder game.js, zonder
 * speldata — en toetst het volledige publieke contract:
 * rendering, sortering, Promise-afhandeling (knop en Escape),
 * focusbeheer, herbruikbaarheid, veilige naamweergave en reduced motion.
 *
 * Gebruik: npm test (draait na de rooktest) of node tests/componenttest.js
 */
'use strict';

const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const fouten = [];
const check = (naam, conditie) => {
  console.log(`${conditie ? '  ✔' : '  ✘'} ${naam}`);
  if (!conditie) fouten.push(naam);
};

function bouwPagina({ reducedMotion = false } = {}) {
  const code = fs.readFileSync(path.join(ROOT, 'assets/components/ronde-show.js'), 'utf8');
  const dom = new JSDOM(
    `<!DOCTYPE html><html><body><button id="anker">anker</button><script>${code}</script></body></html>`,
    {
      url: 'https://component.test/',
      runScripts: 'dangerously',
      pretendToBeVisual: true,
      beforeParse(w) {
        w.matchMedia = () => ({ matches: reducedMotion, addEventListener() {}, addListener() {} });
      },
    }
  );
  return dom.window;
}

(async () => {
  console.log('RondeShow-componenttest');

  const w = bouwPagina();
  const RondeShow = w.RondeShow;
  check('publieke API aanwezig en bevroren', !!RondeShow && Object.isFrozen(RondeShow));

  /* --- tonen, inhoud en sortering --- */
  w.document.getElementById('anker').focus();
  const belofte = RondeShow.show({
    ronde: 2,
    totaalRondes: 5,
    standen: [
      { naam: 'Laag', score: 40 },
      { naam: '<b>Injectie</b>', score: 300 },
      { naam: 'Midden', score: 120 },
    ],
  });
  const overlay = w.document.querySelector('.rs-overlay');
  check('overlay zichtbaar na show()', overlay.classList.contains('rs-zichtbaar')
    && overlay.getAttribute('aria-hidden') === 'false');
  check('isVisible() meldt open', RondeShow.isVisible() === true);
  check('titel toont rondestand', overlay.querySelector('.rs-titel').textContent === 'Ronde 2 van 5 zit erop!');

  const rijen = [...overlay.querySelectorAll('.rs-rij .rs-naam')].map((el) => el.textContent);
  check('standen aflopend gesorteerd', JSON.stringify(rijen) === JSON.stringify(['<b>Injectie</b>', 'Midden', 'Laag']));
  check('koploper uitgelicht met medaille', overlay.querySelector('.rs-rij').classList.contains('rs-leider')
    && overlay.querySelector('.rs-plek').textContent === '🥇');
  check('namen als tekst gerenderd, nooit als HTML', overlay.querySelector('.rs-lijst b') === null);
  check('professor heeft een quip', overlay.querySelector('.rs-ballon-tekst').textContent.length > 0);
  check('focus naar de verderknop', w.document.activeElement === overlay.querySelector('.rs-knop'));

  /* --- sluiten via de knop --- */
  overlay.querySelector('.rs-knop').click();
  const resultaat = await belofte;
  check('Promise resolvet met dismissedBy "knop"', resultaat.dismissedBy === 'knop');
  check('overlay dicht na sluiten', !overlay.classList.contains('rs-zichtbaar')
    && overlay.getAttribute('aria-hidden') === 'true');
  check('isVisible() meldt dicht', RondeShow.isVisible() === false);
  check('focus hersteld naar aanroeper', w.document.activeElement === w.document.getElementById('anker'));

  /* --- hergebruik en Escape --- */
  const tweede = RondeShow.show({ ronde: 3, standen: [{ naam: 'Solo', score: 10 }] });
  check('herhaald tonen hergebruikt de DOM', w.document.querySelectorAll('.rs-overlay').length === 1);
  check('titel zonder totaalRondes', overlay.querySelector('.rs-titel').textContent === 'Ronde 3 zit erop!');
  overlay.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  check('Escape sluit met dismissedBy "escape"', (await tweede).dismissedBy === 'escape');

  /* --- reduced motion --- */
  const wRustig = bouwPagina({ reducedMotion: true });
  wRustig.RondeShow.show({ ronde: 1, standen: [] });
  check('reduced motion activeert rustige stand',
    wRustig.document.querySelector('.rs-overlay').classList.contains('rs-rustig'));

  console.log(fouten.length === 0
    ? '\nAlle componentcontroles geslaagd.'
    : `\n${fouten.length} controle(s) GEFAALD.`);
  process.exit(fouten.length === 0 ? 0 : 1);
})();
