# triathloncup-mv
Diese Programm ermittelt aus vorliegenden Ergebnislisten (.csv) das Gesamtergebnis des jährlich stattfindenden Triathloncups in Mecklenburg-Vorpommern.
## Benutzung
Transpilieren mit dem Befehl
```javascript
tsc
```

Starten des Servers mit dem Befehl
```
npm run start
```

Das CupErgebnis ist über `localhost:3000/cupergebnis` als JSON abrufbar.

## Ergebnislisten
Die Ergebnislisten werden im `dist/csv` Ordner hinterlegt. In der Konfiguration der Wettkämpfe wird der jeweilige Dateiname ohne Endung angegeben. Die CSV-Dateien müssen mindestens folgende Spalten im Header bereitstellen:
```
Rang, Vorname, Nachname, VereinOrt, Ak, AkRang
```
Weitere Spalten können angegeben werden, jedoch finden sie keine Betrachtung in der Auswertung.

`Rang`: Platzierung als Zahl, z.B. `12`

`Vorame`: Vorname als String, z.B. `Max`

`Nachname`: Nachname als String, z.B. `Mustermann`

`VereinOrt`: Verein oder Ort als String, z.B. `Rostock`

`Ak`: Altersklasse als String im Format der Deutschen Triathlon Union, z.B. `M25`

`AkRang`: Platzierung innerhalb der Altersklasse als Zahl, z.B. `4`