# Sprint 11 – uitgevoerde fixes

- Spelersnamen worden vóór verwerking opgeschoond, zodat ingevoerde HTML niet als markup wordt uitgevoerd.
- Microfoontracks worden afgesloten bij verlaten of sluiten van de pagina.
- Wake locks worden vrijgegeven wanneer de pagina niet meer actief is.
- Tijdelijke opname-URL's worden ingetrokken om geheugenlekken te voorkomen.
- Er verschijnt een zichtbaar foutbericht wanneer de hoofdcode niet kan worden geladen.

Deze fixes zijn bewust als kleine aanvullende runtime-laag toegevoegd, zodat het bestaande spelgedrag niet opnieuw hoeft te worden herschreven.
