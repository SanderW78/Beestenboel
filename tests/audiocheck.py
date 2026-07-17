#!/usr/bin/env python3
"""Audiocontrole voor Beestenboel.

Controleert voor elk geluid in game.js dat het audiobestand bestaat en —
wanneer mutagen beschikbaar is — dat het bestand minstens zo lang is als
het trimvenster (trimEnd) van dat geluid. Een trimvenster kan onmogelijk
langer zijn dan het bestand waarop het ooit is ingesteld; deze controle
had de verhaspelde export van juli 2026 direct gesignaleerd.

Gebruik: npm run test:audio  (of: python3 tests/audiocheck.py)
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

try:
    from mutagen.mp3 import MP3
    MET_DUUR = True
except ImportError:
    MET_DUUR = False

def main() -> int:
    game = open(os.path.join(ROOT, "assets", "game.js"), encoding="utf-8").read()
    fouten = []
    aantal = 0
    duurchecks = 0

    for m in re.finditer(
        r'\{id:"([^"]+)"[^}]*?trimEnd:([\d.]+)[^}]*?audioPath:"([^"]+)"', game
    ):
        sid, trim_end, pad = m.group(1), float(m.group(2)), m.group(3)
        aantal += 1
        vol = os.path.join(ROOT, pad)
        if not os.path.isfile(vol):
            fouten.append(f"{sid}: bestand ontbreekt ({pad})")
            continue
        if MET_DUUR:
            duur = MP3(vol).info.length
            duurchecks += 1
            if duur + 0.06 < trim_end:
                fouten.append(
                    f"{sid}: bestand {duur:.2f}s is korter dan trimEnd {trim_end}s "
                    f"({pad}) — inhoud hoort vrijwel zeker bij een ander geluid"
                )

    print(f"gecontroleerd: {aantal} geluiden, waarvan {duurchecks} met duurcontrole")
    if not MET_DUUR:
        print("waarschuwing: mutagen niet geinstalleerd, duurcontrole overgeslagen "
              "(pip install mutagen)")
    if fouten:
        for f in fouten:
            print("  ✘", f)
        return 1
    print("alle audiocontroles geslaagd")
    return 0

if __name__ == "__main__":
    sys.exit(main())
