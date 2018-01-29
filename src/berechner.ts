import { CupErgebnis, Ergebnis, WettkampfErgebnis, PunkteZuordnung } from './ergebnis'
import { Wettkampf } from './wettkampf';
import { Athlet } from './athlet';

export class BerechnerFactory {

    public static makeBerechner(jahr: number): Berechner {
        if(jahr == 2017) {
            return new Berechner2017();
        } else {
            throw Error;
        }
    }
}

export interface Berechner {
    berechne(wettkaempfe: Array<Wettkampf>): Array<CupErgebnis>;
}

export class Berechner2017 implements Berechner {
    private punkteListe: Array<number> = [50,40,34,32,30,28,26,24,22,20,18,16,14,12,10,8,6,4,2];

    public berechne(wettkaempfe: Array<Wettkampf>): Array<CupErgebnis> {
        let cupErgebnisArray: Array<CupErgebnis> = [];

        for(let i = 0; i < wettkaempfe.length; i++) {
            let wettkampf:Wettkampf = wettkaempfe[i];
            let wettkampfErgebnis: Array<WettkampfErgebnis> = wettkaempfe[i].getErgebnis();
            
            for(let ergebniseZeile of wettkampfErgebnis) {
                let athlet: Athlet = ergebniseZeile.getAthlet();
                let platzierung: number = ergebniseZeile.getAkPlatzierung();
                let platzierungspunkte: number = 0;
                let konkurrenzpunkte: number = this.anzahlAthletenEinerAk(athlet.getAltersklasse(),wettkampf) - platzierung;

                if(platzierung <= 20) {
                    platzierungspunkte = this.punkteListe[platzierung - 1];
                }

                let punkteDieserWettkampf: number = konkurrenzpunkte + platzierungspunkte;
                let punkteZuordnung: PunkteZuordnung = new PunkteZuordnung(wettkampf, punkteDieserWettkampf);

                let cupErgebnis: CupErgebnis = this.findeCupErgebnis(athlet,cupErgebnisArray); 
                if(cupErgebnis) {
                    cupErgebnis.pushPunkteZuordnung(punkteZuordnung);
                } else {
                    cupErgebnis = new CupErgebnis(athlet, punkteZuordnung);
                    cupErgebnisArray.push(cupErgebnis);
                }
            }       
        }

        // Alle Landesmeisterschaften in ein Array
        // Alle Nicht-Landesmeisterschafen in ein zweites Array
        // Wenn Landesmeisterschafts-Array > 3, dann die übrigen in Nicht-Landesmeisterschaftsarray
        // Beide Arrays konkatenieren, sortieren und nach 9 abschneiden
        console.log(cupErgebnisArray[0].getPunkteZuordnung());
    }

    /* 
    Wertungsmodus 2017 
    Die 9 besten Wettkämpfe, wovon maximal die besten drei LM doppelt gewertet werden
    */

    private anzahlAthletenEinerAk(ak: string, wettkampf: Wettkampf): number {
        let athletenEinerAk: Array<Athlet> = [];
        let ergebnis: Array<WettkampfErgebnis> = wettkampf.getErgebnis();
        let anzahl: number = 0;

        for(let ergebniseZeile of ergebnis) {
            let athlet: Athlet = ergebniseZeile.getAthlet();
            
            if(athlet.getAltersklasse() == ak) {
                anzahl++;
            }
        }

        return anzahl;
    }

    private findeCupErgebnis(gesuchterAthlet: Athlet, cupErgebnisArray: Array<CupErgebnis>): CupErgebnis {
        for(let ergebnis of cupErgebnisArray) {
            let aktuellerAthlet = ergebnis.getAthlet();
            if(aktuellerAthlet === gesuchterAthlet) {
                return ergebnis;
            }
        }
    }
}