import { CupErgebnis } from './ergebnis'
import { Wettkampf } from './wettkampf';

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
    berechne(wettkaempfe: Array<Wettkampf>): CupErgebnis;
}

export class Berechner2017 implements Berechner {
    
    public berechne(wettkaempfe: Array<Wettkampf>): CupErgebnis {
        // to be implemented
    }
}