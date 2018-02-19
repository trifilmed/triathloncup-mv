import { CupErgebnis, Ergebnis, WettkampfErgebnis, PunkteZuordnung } from './ergebnis'
import { Wettkampf } from './wettkampf';
import { Athlet } from './athlet';

export class BerechnerFactory {

    public static makeBerechner(jahr: number): Berechner {
        if (jahr == 2017) {
            return new Berechner2017();
        } else if(jahr == 2018) {
            return new Berechner2018();
        } else {
            throw Error;
        }
    }
}

export interface Berechner {
    berechne(wettkaempfe: Array<Wettkampf>): Array<CupErgebnis>;
}

export abstract class Berechner {
    protected anzahlAthletenEinerAk(ak: string, wettkampf: Wettkampf): number {
        let athletenEinerAk: Array<Athlet> = [];
        let ergebnis: Array<WettkampfErgebnis> = wettkampf.getErgebnis();
        let anzahl: number = 0;

        for (let ergebniseZeile of ergebnis) {
            let athlet: Athlet = ergebniseZeile.getAthlet();

            if (athlet.getAltersklasse() == ak) {
                anzahl++;
            }
        }

        return anzahl;
    }

    protected findeCupErgebnis(gesuchterAthlet: Athlet, cupErgebnisArray: Array<CupErgebnis>): CupErgebnis {
        for (let ergebnis of cupErgebnisArray) {
            let aktuellerAthlet = ergebnis.getAthlet();
            if (aktuellerAthlet.getVorname() === gesuchterAthlet.getVorname() && aktuellerAthlet.getName() === gesuchterAthlet.getName() && aktuellerAthlet.getAltersklasse() === gesuchterAthlet.getAltersklasse()) {
                return ergebnis;
            }
        }
    }

    protected sortiereArrayAbsteigend(arr: Array<any>):  Array<any> {
        return arr.sort((a: any, b: any) => {
            return b.getPunkte() - a.getPunkte();
        });
    }

    protected berechneGesamtpunkte(punkteZuordnungen: Array<PunkteZuordnung>): number {
        let gesamtPunkte: number = 0;

        punkteZuordnungen.map((a) => {
            gesamtPunkte += a.getPunkte();
        });

        return gesamtPunkte;
    }

    protected multiplizierePunkteInZuordnungsArray(punkteZuordnungen: Array<PunkteZuordnung>, multiplikator: number): void {
        punkteZuordnungen.map((a) => {
            a.setPunkte(a.getPunkte() * multiplikator);
        });
    }

    protected sortiereNachGesamtPunkten(cupErgebnisArray: Array<CupErgebnis>): Array<CupErgebnis> {
        return cupErgebnisArray.sort((a: any, b: any) => {
            return b.getGesamtPunkte() - a.getGesamtPunkte();
        });
    }

    protected setzeGesamtPlatzierungen(sortiertesArray: Array<CupErgebnis>): Array<CupErgebnis> {
        let aktuellePlatzierung: number = 1;
        let aktuellePunktzahl: number = sortiertesArray[0].getGesamtPunkte();
        let gleichplatzierte: number = 0;
        
        for(let cupErgebnis of sortiertesArray) {
            if(cupErgebnis.getGesamtPunkte() == aktuellePunktzahl) {
                gleichplatzierte++;
                cupErgebnis.setGesamtPlatzierung(aktuellePlatzierung);
            } else if(cupErgebnis.getGesamtPunkte() < aktuellePunktzahl) {
                aktuellePlatzierung = aktuellePlatzierung + gleichplatzierte;
                gleichplatzierte = 1;
                aktuellePunktzahl = cupErgebnis.getGesamtPunkte();
                cupErgebnis.setGesamtPlatzierung(aktuellePlatzierung);
            }
        }

        return sortiertesArray;
    }
}

/*
    Wertungsmodus 2017
    Die 9 besten Wettkämpfe, wovon maximal die besten drei LM doppelt gewertet werden

    Vorgehen:
    Alle Landesmeisterschaften in ein Array & sortieren
    Alle Nicht-Landesmeisterschafen in ein zweites Array & sortieren
    Wenn Landesmeisterschafts-Array > 3, dann die übrigen in Nicht-Landesmeisterschaftsarray
    Elemente in Landesmeisterschafts-Array verdoppeln
    Beide Arrays konkatenieren, sortieren und nach 9 abschneiden
*/
export class Berechner2017 extends Berechner implements Berechner {
    private punkteListe: Array<number> = [50, 40, 34, 32, 30, 28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2];

    public berechne(wettkaempfe: Array<Wettkampf>): Array<CupErgebnis> {
        let cupErgebnisArray: Array<CupErgebnis> = [];

        /*
            Erstellen der CupErgebnisse:
            Beinhalten für jeden Athleten die Punkte die er im einzelnen Wettkampf erlangt hat.
        */
        for (let i = 0; i < wettkaempfe.length; i++) {
            let wettkampf: Wettkampf = wettkaempfe[i];
            let wettkampfErgebnis: Array<WettkampfErgebnis> = wettkaempfe[i].getErgebnis();

            for (let ergebniseZeile of wettkampfErgebnis) {
                let athlet: Athlet = ergebniseZeile.getAthlet();
                let platzierung: number = ergebniseZeile.getAkPlatzierung();
                let platzierungspunkte: number = 0;
                let konkurrenzpunkte: number = this.anzahlAthletenEinerAk(athlet.getAltersklasse(), wettkampf) - platzierung;

                if (platzierung <= 20) {
                    platzierungspunkte = this.punkteListe[platzierung - 1];
                }

                let punkteDieserWettkampf: number = konkurrenzpunkte + platzierungspunkte;
                let punkteZuordnung: PunkteZuordnung = new PunkteZuordnung(wettkampf, punkteDieserWettkampf);

                let cupErgebnis: CupErgebnis = this.findeCupErgebnis(athlet, cupErgebnisArray);
                if (cupErgebnis) {
                    cupErgebnis.pushPunkteZuordnung(punkteZuordnung);
                } else {
                    cupErgebnis = new CupErgebnis(athlet, punkteZuordnung);
                    cupErgebnisArray.push(cupErgebnis);
                }
            }
        }

        for (let cupErgebnis of cupErgebnisArray) {
            let punkteZuOrdnungsArray: Array<PunkteZuordnung> = cupErgebnis.getPunkteZuordnung();
            let landesmeisterschaftsArray: Array<PunkteZuordnung> = [];
            let nichtLandesmeisterschaftsArray: Array<PunkteZuordnung> = [];

            for (let zuordnung of punkteZuOrdnungsArray) {
                let wettkampf: Wettkampf = zuordnung.getWettkampf();

                if (wettkampf.getLandesmeisterschaft()) {
                    landesmeisterschaftsArray.push(zuordnung);
                } else {
                    nichtLandesmeisterschaftsArray.push(zuordnung);
                }
            }

            landesmeisterschaftsArray = this.sortiereArrayAbsteigend(landesmeisterschaftsArray);

            if (landesmeisterschaftsArray.length > 3) {
                let zuNichtLandesmeisterschaftHinzufuegen: Array<PunkteZuordnung> = landesmeisterschaftsArray.slice(3, landesmeisterschaftsArray.length);

                landesmeisterschaftsArray = landesmeisterschaftsArray.slice(0,3);

                nichtLandesmeisterschaftsArray = nichtLandesmeisterschaftsArray.concat(zuNichtLandesmeisterschaftHinzufuegen);
            }

            nichtLandesmeisterschaftsArray = this.sortiereArrayAbsteigend(nichtLandesmeisterschaftsArray);

            this.multiplizierePunkteInZuordnungsArray(landesmeisterschaftsArray,2);

            let allePunkteZuordnungenEinesAthleten: Array<PunkteZuordnung> = landesmeisterschaftsArray.concat(nichtLandesmeisterschaftsArray);

            this.sortiereArrayAbsteigend(allePunkteZuordnungenEinesAthleten);

            allePunkteZuordnungenEinesAthleten = allePunkteZuordnungenEinesAthleten.slice(0,9);

            let gesamtPunkte: number = this.berechneGesamtpunkte(allePunkteZuordnungenEinesAthleten);

            cupErgebnis.setGesamtPunkte(gesamtPunkte);
            cupErgebnis.setPunkteZuordnungNachBerechnung(allePunkteZuordnungenEinesAthleten);
        }

        let sortiertesArray = this.sortiereNachGesamtPunkten(cupErgebnisArray);
        cupErgebnisArray = this.setzeGesamtPlatzierungen(sortiertesArray);

        return cupErgebnisArray;
    }
}

export class Berechner2018 extends Berechner implements Berechner {
    private punkteListe: Array<number> = [50, 40, 34, 32, 30, 28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2];

    public berechne(wettkaempfe: Array<Wettkampf>): Array<CupErgebnis> {
        let cupErgebnisArray: Array<CupErgebnis> = [];

        /*
            Erstellen der CupErgebnisse:
            Beinhalten für jeden Athleten die Punkte die er im einzelnen Wettkampf erlangt hat.
        */
        for (let i = 0; i < wettkaempfe.length; i++) {
            let wettkampf: Wettkampf = wettkaempfe[i];
            let wettkampfErgebnis: Array<WettkampfErgebnis> = wettkaempfe[i].getErgebnis();

            for (let ergebniseZeile of wettkampfErgebnis) {
                let athlet: Athlet = ergebniseZeile.getAthlet();
                let platzierung: number = ergebniseZeile.getAkPlatzierung();
                let platzierungspunkte: number = 0;
                let konkurrenzpunkte: number = this.anzahlAthletenEinerAk(athlet.getAltersklasse(), wettkampf) - platzierung;

                if (platzierung <= 20) {
                    platzierungspunkte = this.punkteListe[platzierung - 1];
                }

                let punkteDieserWettkampf: number = konkurrenzpunkte + platzierungspunkte;
                let punkteZuordnung: PunkteZuordnung = new PunkteZuordnung(wettkampf, punkteDieserWettkampf);

                let cupErgebnis: CupErgebnis = this.findeCupErgebnis(athlet, cupErgebnisArray);
                if (cupErgebnis) {
                    cupErgebnis.pushPunkteZuordnung(punkteZuordnung);
                } else {
                    cupErgebnis = new CupErgebnis(athlet, punkteZuordnung);
                    cupErgebnisArray.push(cupErgebnis);
                }
            }
        }

        for (let cupErgebnis of cupErgebnisArray) {
            let punkteZuOrdnungsArray: Array<PunkteZuordnung> = cupErgebnis.getPunkteZuordnung();
            let landesmeisterschaftsArray: Array<PunkteZuordnung> = [];
            let nichtLandesmeisterschaftsArray: Array<PunkteZuordnung> = [];

            for (let zuordnung of punkteZuOrdnungsArray) {
                let wettkampf: Wettkampf = zuordnung.getWettkampf();

                if (wettkampf.getLandesmeisterschaft()) {
                    landesmeisterschaftsArray.push(zuordnung);
                } else {
                    nichtLandesmeisterschaftsArray.push(zuordnung);
                }
            }

            landesmeisterschaftsArray = this.sortiereArrayAbsteigend(landesmeisterschaftsArray);

            if (landesmeisterschaftsArray.length > 2) {
                let zuNichtLandesmeisterschaftHinzufuegen: Array<PunkteZuordnung> = landesmeisterschaftsArray.slice(2, landesmeisterschaftsArray.length);

                landesmeisterschaftsArray = landesmeisterschaftsArray.slice(0,2);

                nichtLandesmeisterschaftsArray = nichtLandesmeisterschaftsArray.concat(zuNichtLandesmeisterschaftHinzufuegen);
            }

            nichtLandesmeisterschaftsArray = this.sortiereArrayAbsteigend(nichtLandesmeisterschaftsArray);

            this.multiplizierePunkteInZuordnungsArray(landesmeisterschaftsArray,2);

            let allePunkteZuordnungenEinesAthleten: Array<PunkteZuordnung> = landesmeisterschaftsArray.concat(nichtLandesmeisterschaftsArray);

            this.sortiereArrayAbsteigend(allePunkteZuordnungenEinesAthleten);

            allePunkteZuordnungenEinesAthleten = allePunkteZuordnungenEinesAthleten.slice(0,7);

            let gesamtPunkte: number = this.berechneGesamtpunkte(allePunkteZuordnungenEinesAthleten);

            cupErgebnis.setGesamtPunkte(gesamtPunkte);
            cupErgebnis.setPunkteZuordnungNachBerechnung(allePunkteZuordnungenEinesAthleten);
        }

        cupErgebnisArray = this.setzeGesamtPlatzierungen(cupErgebnisArray);

        return cupErgebnisArray;
    }
}