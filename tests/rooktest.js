/*
 * Rooktest voor Beestenboel.
 *
 * Draait de echte index.html met alle geladen scripts in jsdom en speelt
 * een complete beurt: spelers aanmelden, starten, rad draaien, geluid
 * beluisteren, jury-oordeel, resultaat en overdracht aan speler twee.
 * Daarnaast: statische integriteit (alle DOM-ids waar game.js naar
 * verwijst bestaan, alle audioPaths verwijzen naar bestaande bestanden).
 *
 * Gebruik: npm test
 * Slaagt met exitcode 0, faalt met 1 en een duidelijke melding.
 */
'use strict';

const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const chdir = (p) => path.join(ROOT, p);

const fouten = [];
const check = (naam, conditie) => {
  console.log(`${conditie ? '  ✔' : '  ✘'} ${naam}`);
  if (!conditie) fouten.push(naam);
};

/* ---------- Deel 1: statische integriteit ---------- */

function statischeChecks() {
  console.log('Statische integriteit');
  const gejs = fs.readFileSync(chdir('assets/game.js'), 'utf8');
  const html = fs.readFileSync(chdir('index.html'), 'utf8');

  // Ids die game.js dynamisch zelf aanmaakt en dus niet in de HTML staan.
  const dynamisch = new Set(['show-summary']);
  const nodig = new Set([...gejs.matchAll(/\$\("([a-z0-9-]+)"\)/g)].map((m) => m[1]));
  const aanwezig = new Set([...html.matchAll(/id="([a-z0-9-]+)"/g)].map((m) => m[1]));
  const ontbreekt = [...nodig].filter((id) => !aanwezig.has(id) && !dynamisch.has(id));
  check(`alle ${nodig.size} DOM-ids uit game.js bestaan in index.html`, ontbreekt.length === 0);
  if (ontbreekt.length) console.log('    ontbrekend:', ontbreekt.join(', '));

  const paden = [...gejs.matchAll(/audioPath:"([^"]+)"/g)].map((m) => m[1]);
  const weg = paden.filter((p) => !fs.existsSync(chdir(p)));
  check(`alle ${paden.length} audioPaths verwijzen naar bestaande bestanden`, weg.length === 0);
  if (weg.length) console.log('    ontbrekend:', weg.join(', '));

  const geladen = [...html.matchAll(/(?:src|href)="(assets\/[^"]+)"/g)].map((m) => m[1]);
  const kapot = geladen.filter((p) => !fs.existsSync(chdir(p)));
  check(`alle ${geladen.length} geladen assets bestaan`, kapot.length === 0);
}

/* ---------- Deel 2: browser-stubs ---------- */

class FakeAudioCtx {
  constructor() { this.currentTime = 0; this.state = 'running'; this.sampleRate = 48000; this.destination = {}; }
  resume() { return Promise.resolve(); }
  createGain() { return { gain: { value: 0, setTargetAtTime() {}, setValueAtTime() {}, exponentialRampToValueAtTime() {} }, connect() {} }; }
  createOscillator() { return { type: '', frequency: { setValueAtTime() {}, exponentialRampToValueAtTime() {} }, connect() {}, start() {}, stop() {} }; }
  createBuffer(ch, len) { return { getChannelData: () => new Float32Array(len) }; }
  createBufferSource() { return { buffer: null, connect() {}, start() {}, stop() {}, onended: null, disconnect() {} }; }
  createBiquadFilter() { return { type: '', frequency: { value: 0 }, connect() {} }; }
  createAnalyser() { return { fftSize: 2048, getFloatTimeDomainData() {}, connect() {} }; }
  createMediaStreamSource() { return { connect() {}, disconnect() {} }; }
  decodeAudioData(ab, res) {
    const buf = { duration: 1.2, sampleRate: 48000, numberOfChannels: 1, getChannelData: () => new Float32Array(57600) };
    if (res) { res(buf); return undefined; }
    return Promise.resolve(buf);
  }
}

function bouwDom() {
  let html = fs.readFileSync(chdir('index.html'), 'utf8');
  // Scripts inline zetten geeft echte classic-script-semantiek in jsdom
  // (gedeelde globale scope), precies zoals in de browser.
  html = html.replace(/<script src="(assets\/[^"]+)" defer><\/script>/g,
    (m, src) => '<script>\n' + fs.readFileSync(chdir(src), 'utf8') + '\n</script>');
  return new JSDOM(html, {
    url: 'https://beestenboel.test/',
    runScripts: 'dangerously',
    pretendToBeVisual: true,
    beforeParse(w) {
      w.AudioContext = FakeAudioCtx;
      if (!w.matchMedia) w.matchMedia = () => ({ matches: false, addEventListener() {}, addListener() {} });
      w.fetch = async (u) => {
        const p = String(u).replace('https://beestenboel.test/', '').split('?')[0];
        return { ok: fs.existsSync(chdir(p)), arrayBuffer: async () => new ArrayBuffer(64) };
      };
      w.__paginafouten = [];
      w.addEventListener('error', (e) => w.__paginafouten.push(e.message));
    },
  });
}

/* ---------- Deel 3: volledige beurt-flow ---------- */

const wacht = (ms) => new Promise((r) => setTimeout(r, ms));

async function speelBeurt(w, $, label) {
  $('btn-draai').click();
  await wacht(9000);
  check(`${label}: geluidsfase bereikt na raddraai`, !$('geluid-fase').classList.contains('verborgen'));
  $('btn-luister').click();
  await wacht(3000);
  $('btn-opnemen').click();          // geen microfoon in jsdom: het spel valt terug op de jury
  await wacht(2500);
  const juryKnoppen = $('jury-knoppen').querySelectorAll('button');
  check(`${label}: jury-fallback actief`, juryKnoppen.length >= 3);
  juryKnoppen[2].click();
  await wacht(8000);
  check(`${label}: resultaat met score`, !$('scherm-resultaat').classList.contains('verborgen')
    && /^\d+$/.test($('score-getal').textContent.trim()));
}

async function flowTest() {
  console.log('Beurt-flow met rondegrens');
  const dom = bouwDom();
  const w = dom.window;
  const $ = (id) => w.document.getElementById(id);

  await wacht(900);
  $('naam-input').value = 'Testspeler A'; $('btn-voeg-toe').click();
  $('naam-input').value = 'Testspeler B'; $('btn-voeg-toe').click();
  check('twee spelers aangemeld', w.document.querySelectorAll('#speler-lijst .speler-item').length === 2);
  [...w.document.querySelectorAll('.ronde-knop')].find((k) => k.dataset.r === '3').click();

  $('btn-start').click();
  await wacht(6000);
  check('beurtscherm zichtbaar na start', !$('scherm-beurt').classList.contains('verborgen'));
  check('professor spreekt', ($('pd-text').textContent || '').length > 0);

  await speelBeurt(w, $, 'beurt 1');
  $('btn-volgende').click();
  await wacht(6000);
  check('speler twee aan de beurt', $('beurt-naam').textContent.includes('Testspeler B'));
  check('geen tussenstand-show midden in de ronde', !w.document.querySelector('.rs-overlay.rs-zichtbaar'));

  await speelBeurt(w, $, 'beurt 2');
  $('btn-volgende').click();
  await wacht(2500);
  const rondeShow = w.document.querySelector('.rs-overlay');
  check('tussenstand-show verschijnt op de rondegrens', !!rondeShow && rondeShow.classList.contains('rs-zichtbaar'));
  check('titel meldt afgeronde ronde', rondeShow.querySelector('.rs-titel').textContent === 'Ronde 1 van 3 zit erop!');
  check('tussenstand toont beide spelers', rondeShow.querySelectorAll('.rs-rij').length === 2);
  rondeShow.querySelector('.rs-knop').click();

  await wacht(6000);
  check('ronde twee begint na de show', !$('scherm-beurt').classList.contains('verborgen')
    && $('beurt-naam').textContent.includes('Testspeler A'));
  check('rondelabel meldt ronde 2', ($('ronde-label').textContent || '').includes('2'));
  check('geen onafgevangen paginafouten', w.__paginafouten.length === 0);
  if (w.__paginafouten.length) console.log('    fouten:', w.__paginafouten.join(' | '));
}

/* ---------- Uitvoeren ---------- */

(async () => {
  try {
    statischeChecks();
    await flowTest();
  } catch (e) {
    fouten.push(`onverwachte testfout: ${e.message}`);
    console.log('  ✘ onverwachte testfout:', e.message);
  }
  console.log(fouten.length === 0
    ? '\nAlle controles geslaagd.'
    : `\n${fouten.length} controle(s) GEFAALD.`);
  process.exit(fouten.length === 0 ? 0 : 1);
})();
