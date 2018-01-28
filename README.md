# triathloncup-mv
Diese Programm ermittelt aus vorliegenden Ergebnislisten (.csv) das Gesamtergebnis des jährlich stattfindenden Triathloncups in Mecklenburg-Vorpommern.
## Benutzung
Transpilieren mit dem Befehl
```javascript
tsc
```

Ausführen mit dem Befehl
```
npm run start
```

## Ergebnislisten
Die Ergebnislisten werden im `dist/csv` Ordner hinterlegt. In der Konfiguration der Wettkämpfe wird der jeweilige Dateiname ohne Endung angegeben. Die CSV-Dateien müssen mindestens folgende Spalten im Header bereitstellen:
```
Rang, Name, VereinOrt, Land, Ak, AkRng
```
Weitere Spalten können angegeben werden, jedoch finden sie keine Betrachtung in der Auswertung.