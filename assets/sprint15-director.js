(() => {
  'use strict';

  const duplicateSelectors = [
    '.xxl-score-reveal',
    '.show-overlay.score',
    '.showmaster-overlay',
    '.pd-player-intro',
    '.pd-host-caption'
  ];

  const blockingSelectors = [
    '.show-overlay.zichtbaar',
    '.xxl-opening.is-visible',
    '.xxl-interstitial.is-visible',
    '.tv-transition.active'
  ];

  function disableDuplicateLayers(root = document) {
    duplicateSelectors.forEach((selector) => {
      root.querySelectorAll?.(selector).forEach((element) => {
        element.classList.remove('zichtbaar', 'is-visible', 'active', 'show');
        element.setAttribute('aria-hidden', 'true');
        element.style.pointerEvents = 'none';
      });
    });
  }

  function keepSingleBlockingLayer() {
    const active = blockingSelectors.flatMap((selector) => [...document.querySelectorAll(selector)]);
    if (active.length <= 1) return;

    // De laatst geactiveerde laag krijgt voorrang; oudere lagen worden gesloten.
    active.slice(0, -1).forEach((element) => {
      element.classList.remove('zichtbaar', 'is-visible', 'active', 'show');
      element.setAttribute('aria-hidden', 'true');
      element.style.pointerEvents = 'none';
    });
  }

  function tidy() {
    disableDuplicateLayers();
    keepSingleBlockingLayer();
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) disableDuplicateLayers(node);
      });
    });
    tidy();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class']
  });

  tidy();
  window.addEventListener('pagehide', () => observer.disconnect());
})();
