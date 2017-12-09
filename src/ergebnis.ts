import { Athlet } from "./athlet";
import { Wettkampf } from "./wettkampf";

export interface Ergebnis {

}

export interface PunkteZuordnung {
    wettkampf: Wettkampf;
    punkte: number;
}

export class CupErgebnis implements Ergebnis {
    private athlet: Athlet;
    private punkteZuordnung: Array<PunkteZuordnung>;
}

export class WettkampfErgebnis implements Ergebnis {
    private athlet: Athlet;
    private akPlatzierung: number;

    public setAthlet(athlet: Athlet): void {
        this.athlet = athlet;
    }

    public getAthlet(): Athlet {
        return this.athlet;
    }

    public setAkPlatzierung(platz: number): void {
        this.akPlatzierung = platz;
    }

    public getAkPlatzierung(): number {
        return this.akPlatzierung;
    }
}