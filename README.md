# Beestenboel! 🐐

Een party-spel voor in de huiskamer: draai aan het rad, luister een geluid, doe het na in de microfoon — en de computerjury beoordeelt je imitatie. Professor Decibel presenteert; de winnaar gaat naar huis met de Gouden Geit.

## Spelen

1. Open `index.html` via een webserver (zie hieronder) op een telefoon, tablet of laptop.
2. Voeg minimaal twee spelers toe (maximaal acht) en kies 3, 5 of 7 rondes.
3. Geef toestemming voor de microfoon. Werkt die niet, dan neemt een menselijke jury het over met een sterrenoordeel.
4. Per beurt: rad draaien → categorie → geluid beluisteren → nadoen. Met 42% kans komt er een chaos-opdracht bij ("…maar dan verliefd"). Combo's en uitdagingskaarten leveren bonuspunten op.

Een onafgemaakt potje overleeft een refresh: op het startscherm verschijnt dan een hervat-knop.

## Hoe de beoordeling werkt

De opname wordt in frames van 50 ms geknipt. Per frame worden toonhoogte (autocorrelatie), volume en stemhelderheid bepaald. De vergelijking met het origineel gebeurt met dynamic time warping, toonsoort-onafhankelijk en met mediaanfiltering tegen octaafsprongen. De weging tussen toon, ritme en tempo past zich per geluid aan en wordt op het resultaatscherm getoond. Chaos-opdrachten worden apart gescoord op een bijpassend profiel (energie, melodie, stoten, …) en tellen voor 40% mee.

## Structuur

```
index.html               Het spel
contentmanager.html      Geluidenstudio: eigen mp3's toevoegen (IndexedDB, per browser)
assets/game.js           Kernlogica: spel, rad, opname, analyse, score
assets/*.js/.css         Show-lagen (Professor Decibel, tv-studio, regie, combo's)
audio/basis/             Meegeleverde basisgeluiden
audio/eigen/             Meegeleverde extra geluiden (films, games, memes)
audio/sfx/               Studio-effecten (applaus, tromgeroffel, …)
```

## Eigen geluiden toevoegen

Open `contentmanager.html`, sleep een mp3 naar de studio, vul naam/emoji/categorie/moeilijkheid in en sla op. Het geluid staat direct in het spel — in dezelfde browser. Via exporteren/importeren verhuis je een bibliotheek naar een ander apparaat. Permanent meeleveren kan door het bestand in `audio/eigen/` te zetten en een regel toe te voegen aan `BUNDEL_GELUIDEN` in `assets/game.js`.

## Testen

Elke wijziging moet langs de testomgeving voordat hij naar main gaat:

```
npm install        # eenmalig
npm test           # rooktest: statische integriteit + complete beurt-flow in jsdom
npm run test:audio # audiocontrole: bestanden aanwezig en lang genoeg voor hun trimvenster
```

GitHub Actions draait beide tests automatisch bij iedere push en pull request; een rode status op main betekent niet uitrollen. Werk nooit rechtstreeks op main: gebruik feature branches met één doel per commit, en laat één sessie of persoon tegelijk de regie voeren over de repository.

## Draaien en deployen

Het spel is statisch, maar laadt audio via `fetch` en heeft de microfoon nodig — open het dus via **http(s)**, niet via `file://`:

```
npx serve .        # of: python3 -m http.server
```

Deployen kan door de map naar Netlify te slepen; `netlify.toml` staat klaar. De microfoon werkt alleen op https of localhost.

## Licentie-aantekening

De meegeleverde audio bevat naast eigen opnames en publiek-domeinmateriaal ook herkenbare fragmenten uit films, games en muziek. Die zijn uitsluitend bedoeld voor privégebruik binnen dit spel.
