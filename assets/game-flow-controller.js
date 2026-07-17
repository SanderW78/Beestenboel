(() => {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const isVisible = (el) => !!el && !el.classList.contains('verborgen');
  const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

  const Flow = {
    state: 'SETUP',
    transition: 0,
    timers: new Set(),
    busySince: 0,

    nextToken() {
      this.transition += 1;
      return this.transition;
    },

    schedule(ms, fn) {
      const timer = window.setTimeout(() => {
        this.timers.delete(timer);
        try { fn(); } catch (error) { console.warn('Flow-herstelactie mislukt', error); }
      }, ms);
      this.timers.add(timer);
      return timer;
    },

    clearTimers() {
      this.timers.forEach((timer) => window.clearTimeout(timer));
      this.timers.clear();
    },

    screen() {
      if (isVisible($('scherm-einde'))) return 'END';
      if (isVisible($('scherm-resultaat'))) return 'RESULT';
      if (isVisible($('scherm-beurt'))) {
        if (isVisible($('geluid-fase'))) return 'SOUND';
        return 'SPIN';
      }
      return 'SETUP';
    },

    setState(next) {
      if (this.state === next) return;
      this.state = next;
      document.body.dataset.gameFlow = next.toLowerCase();
      this.busySince = performance.now();
    },

    clearBlockingLayers() {
      document.querySelectorAll(
        '.show-overlay, .xxl-opening, .xxl-interstitial, .xxl-score-reveal, .tv-transition, .showmaster-overlay'
      ).forEach((element) => {
        element.classList.remove('zichtbaar', 'is-visible', 'active', 'show');
        element.setAttribute('aria-hidden', 'true');
        element.style.pointerEvents = 'none';
      });
      document.body.classList.add('xxl-curtains-open');
    },

    enable(button) {
      if (!button) return;
      button.disabled = false;
      button.removeAttribute('aria-disabled');
      button.style.pointerEvents = '';
    },

    forceTurnScreen() {
      if (typeof S === 'undefined' || !Array.isArray(S.spelers) || !S.spelers.length) return;
      this.clearBlockingLayers();
      if (typeof toon === 'function') toon('scherm-beurt');
      const player = S.spelers[S.beurt] || S.spelers[0];
      if ($('ronde-label')) $('ronde-label').textContent = `Ronde ${S.ronde + 1} van ${S.rondes}`;
      if ($('beurt-naam')) $('beurt-naam').textContent = `${player.naam}, jij bent!`;
      if ($('show-instructie')) $('show-instructie').textContent = 'Draai voor je opdracht';
      $('rad-fase')?.classList.remove('verborgen');
      $('geluid-fase')?.classList.add('verborgen');
      this.enable($('btn-draai'));
      try { if (typeof tekenChips === 'function') tekenChips(); } catch (_) {}
      this.setState('SPIN');
    },

    forceSoundScreen() {
      if (typeof S === 'undefined') return;
      this.clearBlockingLayers();
      try {
        if (!S.cat && typeof RAD !== 'undefined' && Array.isArray(RAD.segmenten) && RAD.segmenten.length) {
          S.cat = RAD.segmenten[Math.floor(Math.random() * RAD.segmenten.length)].cat;
        }
        if (S.cat && typeof toonGeluidFase === 'function') toonGeluidFase();
      } catch (error) {
        console.warn('Geluidsscherm kon niet automatisch worden hersteld', error);
      }
      if (isVisible($('geluid-fase'))) {
        this.enable($('btn-luister'));
        this.setState('SOUND');
      } else {
        this.forceTurnScreen();
      }
    },

    forceRecordButton() {
      if (!isVisible($('geluid-fase'))) return;
      this.clearBlockingLayers();
      const record = $('btn-opnemen');
      record?.classList.remove('verborgen');
      if (record) {
        record.textContent = '🎤 Start jouw optreden';
        record.classList.add('show-primary');
      }
      this.enable(record);
      this.enable($('btn-luister'));
      if ($('show-instructie')) $('show-instructie').textContent = 'Jij bent aan de beurt';
      if ($('beurt-hint') && !$('beurt-hint').textContent.trim()) {
        $('beurt-hint').textContent = 'Doe het geluid zo overtuigend mogelijk na.';
      }
      $('fase-knoppen')?.classList.remove('verborgen');
      this.setState('SOUND');
    },

    forceJury() {
      if (this.screen() !== 'SOUND') return;
      this.clearBlockingLayers();
      try {
        if (typeof startJury === 'function') {
          startJury();
          return;
        }
      } catch (_) {}
      $('jury-blok')?.classList.remove('verborgen');
      $('jury-blok')?.setAttribute('aria-hidden', 'false');
    },

    forceNextTurn() {
      if (this.screen() !== 'RESULT' || typeof S === 'undefined') return;
      this.clearBlockingLayers();
      S.beurt += 1;
      if (S.beurt >= S.spelers.length) {
        S.beurt = 0;
        S.ronde += 1;
        if (S.ronde >= S.rondes) {
          try { if (typeof toonEinde === 'function') toonEinde(); } catch (_) {}
          if (this.screen() !== 'END' && typeof toon === 'function') toon('scherm-einde');
          this.setState('END');
          return;
        }
      }
      try {
        const result = typeof nieuweBeurt === 'function' ? nieuweBeurt() : null;
        Promise.resolve(result).catch(() => this.forceTurnScreen());
      } catch (_) {
        this.forceTurnScreen();
      }
      this.schedule(1800, () => {
        if (this.screen() === 'RESULT') this.forceTurnScreen();
      });
    },

    bindStart() {
      const button = $('btn-start');
      if (!button) return;
      button.onclick = async () => {
        if (button.disabled) return;
        const token = this.nextToken();
        button.disabled = true;
        button.textContent = 'De show start…';
        try {
          if (typeof audio === 'function') { try { audio(); } catch (_) {} }
          if (typeof wisSpel === 'function') wisSpel();
          if (typeof S === 'undefined' || !Array.isArray(S.spelers) || S.spelers.length < 2) {
            throw new Error('Minimaal twee spelers nodig');
          }
          S.ronde = 0;
          S.beurt = 0;
          S.spelers.forEach((player) => { player.score = 0; });
          S.gebruikteOpdrachten = new Set();
          S.gebruikteBasis = new Set();
          try { if (typeof ShowIntelligence !== 'undefined') ShowIntelligence.reset(); } catch (_) {}
          try { if (typeof houdSchermWakker === 'function') houdSchermWakker(); } catch (_) {}

          const intro = typeof showIntro === 'function'
            ? Promise.resolve().then(() => showIntro()).catch(() => {})
            : Promise.resolve();
          await Promise.race([intro, wait(3000)]);
          if (token !== this.transition) return;

          this.forceTurnScreen();
          try { if (typeof vraagMic === 'function') vraagMic(3500).catch(() => {}); } catch (_) {}
        } catch (error) {
          console.error('Startflow mislukt', error);
          this.clearBlockingLayers();
          button.disabled = false;
          button.textContent = 'Start de show';
        }
      };
    },

    bindTransitions() {
      $('btn-draai')?.addEventListener('click', () => {
        const token = this.nextToken();
        this.setState('SPINNING');
        this.schedule(8500, () => {
          if (token === this.transition && this.screen() === 'SPIN') this.forceSoundScreen();
        });
      }, true);

      $('btn-luister')?.addEventListener('click', () => {
        const token = this.nextToken();
        this.setState('PLAYING');
        this.schedule(14000, () => {
          if (token === this.transition && this.screen() === 'SOUND') this.forceRecordButton();
        });
      }, true);

      $('btn-opnemen')?.addEventListener('click', () => {
        const token = this.nextToken();
        this.setState('RECORDING');
        this.schedule(22000, () => {
          if (token === this.transition && this.screen() === 'SOUND') this.forceJury();
        });
      }, true);

      $('btn-volgende')?.addEventListener('click', () => {
        const token = this.nextToken();
        this.setState('NEXT');
        this.schedule(7500, () => {
          if (token === this.transition && this.screen() === 'RESULT') this.forceNextTurn();
        });
      }, true);

      $('btn-opnieuw')?.addEventListener('click', () => {
        this.nextToken();
        this.clearTimers();
        this.clearBlockingLayers();
        this.setState('SETUP');
      }, true);
    },

    watchdog() {
      const current = this.screen();
      if (current !== this.state && !['SPINNING', 'PLAYING', 'RECORDING', 'NEXT'].includes(this.state)) {
        this.setState(current);
      }

      if (current === 'SETUP') {
        const count = typeof S !== 'undefined' && Array.isArray(S.spelers) ? S.spelers.length : 0;
        if (count >= 2) this.enable($('btn-start'));
      } else if (current === 'SPIN') {
        if (!document.querySelector('.show-overlay.zichtbaar, .xxl-opening.is-visible')) this.enable($('btn-draai'));
      } else if (current === 'SOUND') {
        const noAction = !isVisible($('btn-opnemen')) &&
          ($('btn-luister')?.disabled || !isVisible($('fase-knoppen'))) &&
          !isVisible($('jury-blok')) && !isVisible($('meter'));
        if (noAction && performance.now() - this.busySince > 15000) this.forceRecordButton();
      } else if (current === 'RESULT') {
        this.enable($('btn-volgende'));
      } else if (current === 'END') {
        this.enable($('btn-opnieuw'));
      }
    },

    init() {
      this.clearBlockingLayers();
      this.bindStart();
      this.bindTransitions();
      this.setState(this.screen());
      window.setInterval(() => this.watchdog(), 1000);
      window.BeestenboelFlow = this;
    },
  };

  Flow.init();
})();
