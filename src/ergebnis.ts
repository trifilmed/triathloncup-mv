import { Athlet } from "./athlet";
import { Wettkampf } from "./wettkampf";

export interface Ergebnis {

}

export class PunkteZuordnung {
    private wettkampf: Wettkampf;
    private punkte: number;

    constructor(wettkampf: Wettkampf, punkte: number) {
        this.wettkampf = wettkampf;
        this.punkte = punkte;
    }

    public setPunkte(punkte: number): void {
        this.punkte = punkte;
    }

    public getPunkte(): number {
        return this.punkte;
    }

    public getWettkampf(): Wettkampf {
        return this.wettkampf;
    }
}

export class CupErgebnis implements Ergebnis {
    private athlet: Athlet;
    private punkteZuordnung: Array<PunkteZuordnung> = [];
    private punkteZuordnungNachBerechnung: Array<PunkteZuordnung> = [];
    private gesamtPunkte: number;
    private gesamtPlatzierung: number;

    constructor(athlet: Athlet, punkteZuordnung: PunkteZuordnung) {
        this.athlet = athlet;
        this.punkteZuordnung = [punkteZuordnung];
    }

    public pushPunkteZuordnung(punkteZuordnung: PunkteZuordnung): void {
        this.punkteZuordnung.push(punkteZuordnung);
    }

    public getAthlet(): Athlet {
        return this.athlet;
    }

    public getPunkteZuordnung(): Array<PunkteZuordnung> {
        return this.punkteZuordnung;
    }

    public setGesamtPunkte(punkte: number): void {
        this.gesamtPunkte = punkte;
    }

    public getGesamtPunkte(): number {
        return this.gesamtPunkte;
    }

    public setPunkteZuordnungNachBerechnung(punkteZuordnungsArray: Array<PunkteZuordnung>) {
        this.punkteZuordnungNachBerechnung = punkteZuordnungsArray;
    }

    public getPunkteZuordnungNachBerechnung(): Array<PunkteZuordnung> {
        return this.punkteZuordnungNachBerechnung;
    }

    public getGesamtPlatzierung(): number {
        return this.gesamtPlatzierung;
    }

    public setGesamtPlatzierung(gesamtPlatzierung: number): void {
        this.gesamtPlatzierung = gesamtPlatzierung;
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