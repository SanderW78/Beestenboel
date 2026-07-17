# Professor Decibel — veilige ontwikkelbasis

## Branch
`feature/professor-decibel-foundation`

## Doel van deze fase
Een volledig afgeschermde karaktertest bouwen zonder de werkende game te wijzigen.

## Wel gewijzigd
- `professor-test.html`
- `assets/professor-test.css`

## Niet gewijzigd
- `index.html`
- `assets/game.js`
- spelstatus `S`
- ronde- en beurtberekening
- audio- en microfoonflow
- scoreberekening
- Netlify-productie op `main`

## Technische grenzen
De testpagina gebruikt geen `MutationObserver`, overschrijft geen globale functies en importeert geen spelscripts. De animaties zijn uitsluitend CSS-gestuurd. De knoppen veranderen alleen lokale klassen op de testpagina.

## Vaste acceptatiecriteria voor de volgende fase
1. De publieke game op `main` blijft ongewijzigd en speelbaar.
2. De testpagina opent zelfstandig.
3. Binnenlopen, rusthouding, aanwijzen, vieren en verdwijnen blokkeren de pagina niet.
4. Desktop- en mobiele layout blijven binnen het scherm.
5. Pas na akkoord wordt een zelfstandige studiocomponent gebouwd; nog steeds zonder spelkoppeling.
