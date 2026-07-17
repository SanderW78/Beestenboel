"use strict";

/*
 * Professor Decibel — show director
 * Presentatielaag bovenop de bestaande spelcode. De score-, audio- en radlogica
 * blijven volledig in assets/game.js.
 */
(() => {
  const byId = id => document.getElementById(id);
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  const lines = {
    round: [
      name => `Nieuwe ronde. ${name} opent de jacht op de Gouden Geit.`,
      name => `De volgende ronde begint bij ${name}. Oren open.`,
      name => `${name} staat klaar. Mijn meetapparatuur ook.`
    ],
    lastPlayer: [
      name => `${name}, jij sluit deze ronde af. Maak er iets meetbaars van.`,
      name => `De laatste beurt van deze ronde is voor ${name}.`,
      name => `${name}, nog één poging voordat we de balans opmaken.`
    ],
    finale: [
      name => `${name}, dit is de laatste beurt van de hele show.`,
      name => `Alle lampen op ${name}. Hierna kennen we de winnaar.`,
      name => `${name}, de finale ligt in jouw handen — en stembanden.`
    ]
  };

  const fresh = (() => {
    const recent = [];
    return pool => {
      const available = pool.filter((_, index) => !recent.includes(index));
      const index = available.length
        ? pool.indexOf(available[Math.floor(Math.random() * available.length)])
        : Math.floor(Math.random() * pool.length);
      recent.push(index);
      if (recent.length > 4) recent.shift();
      return pool[index];
    };
  })();

  const announce = (pool, name, options = {}) => {
    if (typeof ProfessorDecibel === "undefined") return;
    const makeLine = fresh(pool);
    ProfessorDecibel.show(makeLine(name), {
      state: options.state || "praat",
      duur: options.duration || 4700,
      emotion: options.emotion || "confident",
      voiceKey: options.voiceKey || "show_director"
    });
  };

  function addLowerThird() {
    if (byId("pd-lower-third")) return;
    const card = byId("show-card");
    if (!card) return;
    const bar = document.createElement("div");
    bar.id = "pd-lower-third";
    bar.className = "pd-lower-third";
    bar.setAttribute("aria-live", "polite");
    bar.innerHTML = '<span class="pd-lower-kicker">NU IN DE STUDIO</span><strong id="pd-lower-name"></strong><span id="pd-lower-round"></span>';
    card.prepend(bar);
  }

  function syncLowerThird() {
    const name = byId("beurt-naam")?.textContent?.trim();
    const round = byId("ronde-label")?.textContent?.trim();
    const bar = byId("pd-lower-third");
    if (!bar || !name) return;
    byId("pd-lower-name").textContent = name;
    byId("pd-lower-round").textContent = round || "";
    bar.classList.remove("reveal");
    void bar.offsetWidth;
    bar.classList.add("reveal");
  }

  async function finaleCountdown() {
    const overlay = document.createElement("div");
    overlay.className = "pd-finale-countdown";
    overlay.setAttribute("aria-live", "assertive");
    overlay.innerHTML = '<div class="pd-finale-kicker">DE BESLISSING</div><div class="pd-finale-number">3</div><div class="pd-finale-copy">Professor Decibel telt af naar de eindstand</div>';
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add("visible"));
    const number = overlay.querySelector(".pd-finale-number");
    for (const value of ["3", "2", "1"]) {
      number.textContent = value;
      number.classList.remove("pop");
      void number.offsetWidth;
      number.classList.add("pop");
      if (typeof AudioDirector !== "undefined") AudioDirector.countdown(value);
      await wait(610);
    }
    number.textContent = "🏆";
    number.classList.remove("pop");
    void number.offsetWidth;
    number.classList.add("pop");
    await wait(720);
    overlay.classList.remove("visible");
    await wait(320);
    overlay.remove();
  }

  function installFinaleGate() {
    const button = byId("btn-volgende");
    if (!button || button.dataset.directorWrapped === "1") return;
    const original = button.onclick;
    if (typeof original !== "function") return;
    button.dataset.directorWrapped = "1";
    button.onclick = async function(event) {
      const isFinalTurn = typeof S !== "undefined" &&
        S.ronde === S.rondes - 1 &&
        S.beurt === S.spelers.length - 1;
      if (isFinalTurn) {
        this.disabled = true;
        await finaleCountdown();
      }
      try {
        return await original.call(this, event);
      } finally {
        this.disabled = false;
      }
    };
  }

  function installTurnObserver() {
    const nameNode = byId("beurt-naam");
    if (!nameNode) return;
    let lastKey = "";
    const observer = new MutationObserver(() => {
      const name = nameNode.textContent.trim();
      if (!name || typeof S === "undefined") return;
      const key = `${S.ronde}:${S.beurt}:${name}`;
      if (key === lastKey) return;
      lastKey = key;
      syncLowerThird();
      const lastPlayer = S.beurt === S.spelers.length - 1;
      const finalRound = S.ronde === S.rondes - 1;
      const pool = finalRound && lastPlayer ? lines.finale : lastPlayer ? lines.lastPlayer : S.beurt === 0 ? lines.round : null;
      if (pool) setTimeout(() => announce(pool, name, {
        state: finalRound ? "denkt" : "praat",
        emotion: finalRound ? "thinking" : "confident",
        duration: finalRound ? 5200 : 4600,
        voiceKey: finalRound ? "final_player_intro" : "round_director"
      }), 1150);
    });
    observer.observe(nameNode, { childList: true, characterData: true, subtree: true });
  }

  function installWinnerObserver() {
    const endScreen = byId("scherm-einde");
    if (!endScreen) return;
    const observer = new MutationObserver(() => {
      if (endScreen.classList.contains("verborgen") || endScreen.dataset.directorShown === "1") return;
      endScreen.dataset.directorShown = "1";
      document.body.classList.add("pd-champion-mode");
      setTimeout(() => document.body.classList.remove("pd-champion-mode"), 5200);
    });
    observer.observe(endScreen, { attributes: true, attributeFilter: ["class"] });
  }

  function initialise() {
    addLowerThird();
    installFinaleGate();
    installTurnObserver();
    installWinnerObserver();
    syncLowerThird();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialise, { once: true });
  } else {
    initialise();
  }
})();
