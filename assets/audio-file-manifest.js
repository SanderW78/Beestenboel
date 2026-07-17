(() => {
  'use strict';

  /*
   * De export van de Geluidenstudio heeft een reeks MP3-bestanden onder
   * verkeerde bestandsnamen opgeslagen. Deze manifestlaag koppelt iedere
   * opdracht aan het bestand waarvan de blob-SHA is geverifieerd tegen de
   * oorspronkelijke export uit de Geluidenstudio.
   *
   * Niet gokken: clips waarvan het oorspronkelijke audiobestand niet meer
   * in de repository aanwezig is, worden uit ACTIEVE_GELUIDEN verwijderd.
   */
  const VERIFIED_AUDIO_PATHS = Object.freeze({
    ballerina_capuchina_mrjda44b: 'audio/eigen/hehe_mrjdvz8j.mp3',
    bunghole_mrjdrblm: 'audio/eigen/messi_messi_mrjeb15n.mp3',
    dit_is_een_snackbar_mrmmhjv2: 'audio/eigen/its_me_mario_mrml7lyj.mp3',
    donkey_waffles_mrml96dg: 'audio/eigen/maaskantje_mrmmg7f4.mp3',
    he_meisje_mrmmfg3b: 'audio/eigen/pee_ka_pee_pikachu_mrml4u4s.mp3',
    hehe_mrjdvz8j: 'audio/eigen/omg_mrjde62r.mp3',
    its_me_mario_mrml7lyj: 'audio/eigen/scooby_mrml3gru.mp3',
    maaskantje_mrmmg7f4: 'audio/eigen/toad_wuh_wuh_mrml889y.mp3',
    messi_messi_mrjeb15n: 'audio/eigen/paard_mrje6sdm.mp3',
    minions_papoy_mrjdzf3n: 'audio/eigen/shy_shy_shy_sana_twice_mrje5mey.mp3',
    omg_mrjde62r: 'audio/eigen/stitch_mrjdnbez.mp3',
    paard_mrje6sdm: 'audio/eigen/trump_mrjdg6fm.mp3',
    pee_ka_pee_pikachu_mrml4u4s: 'audio/eigen/villager_minecraft_mrml6w4v.mp3',
    shy_shy_shy_sana_twice_mrje5mey: 'audio/eigen/dit_is_een_snackbar_mrmmhjv2.mp3',
    stitch_mrjdnbez: 'audio/eigen/donkey_waffles_mrml96dg.mp3',
    trump_mrjdg6fm: 'audio/eigen/he_meisje_mrmmfg3b.mp3'
  });

  const MISSING_SOURCE_AUDIO = new Set([
    'scooby_mrml3gru',
    'toad_wuh_wuh_mrml889y',
    'villager_minecraft_mrml6w4v'
  ]);

  if (typeof ACTIEVE_GELUIDEN === 'undefined' || !Array.isArray(ACTIEVE_GELUIDEN)) {
    console.error('Audiomanifest kon niet worden toegepast: ACTIEVE_GELUIDEN ontbreekt.');
    return;
  }

  for (let i = ACTIEVE_GELUIDEN.length - 1; i >= 0; i -= 1) {
    const sound = ACTIEVE_GELUIDEN[i];
    if (!sound || !sound.id) continue;

    if (MISSING_SOURCE_AUDIO.has(sound.id)) {
      ACTIEVE_GELUIDEN.splice(i, 1);
      continue;
    }

    const verifiedPath = VERIFIED_AUDIO_PATHS[sound.id];
    if (verifiedPath) {
      sound.audioPath = verifiedPath;
      delete sound.buffer;
      delete sound.analyse;
      sound.audioVerified = true;
    }
  }

  if (typeof BUNDEL_GELUIDEN !== 'undefined' && Array.isArray(BUNDEL_GELUIDEN)) {
    for (const sound of BUNDEL_GELUIDEN) {
      const verifiedPath = VERIFIED_AUDIO_PATHS[sound.id];
      if (verifiedPath) sound.audioPath = verifiedPath;
    }
  }

  window.BEESTENBOEL_AUDIO_MANIFEST = Object.freeze({
    verified: Object.keys(VERIFIED_AUDIO_PATHS),
    disabled: [...MISSING_SOURCE_AUDIO]
  });
})();