import { CupErgebnis, Ergebnis, WettkampfErgebnis } from './ergebnis'
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
        for(let i = 0; i < wettkaempfe.length; i++) {
            let wettkampf:Wettkampf = wettkaempfe[i];
            let ergebnis: Array<WettkampfErgebnis> = wettkaempfe[i].getErgebnis();
            
            for(let ergebniseZeile of ergebnis) {
                let athlet: Athlet = ergebniseZeile.getAthlet();
                let platzierung: number = ergebniseZeile.getAkPlatzierung();

                console.log(athlet, platzierung);
            }       
        }
    }

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

    // private wettkampfpunkte()
}