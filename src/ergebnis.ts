import { Athlet } from "./athlet";
import { Wettkampf } from "./wettkampf";

export interface Ergebnis {

}

export class PunkteZuordnung {
    wettkampf: Wettkampf;
    punkte: number;
}

export class CupErgebnis implements Ergebnis {
    private athlet: Athlet;
    private punkteZuordnung: Array<PunkteZuordnung>;

    constructor(athlet: Athlet, punkteZuordnung: Array<PunkteZuordnung>) {
        this.athlet = athlet;
        this.punkteZuordnung = punkteZuordnung;
    }
}

export class WettkampfErgebnis implements Ergebnis {
    private athlet: Athlet;
    private akPlatzierung: number;

    constructor(athlet: Athlet, akPlatzierung: number) {
        this.athlet = athlet;
        this.akPlatzierung = akPlatzierung;
    }

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