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

  let cleaning = false;
  let scheduled = false;

  function hideElement(element) {
    if (!element) return false;

    const wasActive =
      element.classList.contains('zichtbaar') ||
      element.classList.contains('is-visible') ||
      element.classList.contains('active') ||
      element.classList.contains('show') ||
      element.getAttribute('aria-hidden') !== 'true' ||
      element.style.pointerEvents !== 'none';

    if (!wasActive) return false;

    element.classList.remove('zichtbaar', 'is-visible', 'active', 'show');
    if (element.getAttribute('aria-hidden') !== 'true') {
      element.setAttribute('aria-hidden', 'true');
    }
    if (element.style.pointerEvents !== 'none') {
      element.style.pointerEvents = 'none';
    }
    return true;
  }

  function disableDuplicateLayers(root = document) {
    duplicateSelectors.forEach((selector) => {
      root.querySelectorAll?.(selector).forEach(hideElement);
      if (root.matches?.(selector)) hideElement(root);
    });
  }

  function keepSingleBlockingLayer() {
    const active = blockingSelectors.flatMap((selector) => [
      ...document.querySelectorAll(selector)
    ]);

    if (active.length <= 1) return;
    active.slice(0, -1).forEach(hideElement);
  }

  function tidy() {
    if (cleaning) return;
    cleaning = true;
    try {
      disableDuplicateLayers();
      keepSingleBlockingLayer();
    } finally {
      cleaning = false;
    }
  }

  function scheduleTidy() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(() => {
      scheduled = false;
      tidy();
    });
  }

  const observer = new MutationObserver((mutations) => {
    if (cleaning) return;

    const relevant = mutations.some((mutation) => {
      if (mutation.type === 'childList') return mutation.addedNodes.length > 0;
      if (mutation.type !== 'attributes') return false;
      const target = mutation.target;
      return duplicateSelectors.some((selector) => target.matches?.(selector)) ||
        blockingSelectors.some((selector) => target.matches?.(selector));
    });

    if (relevant) scheduleTidy();
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