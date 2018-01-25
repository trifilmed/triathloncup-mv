import { Ergebnis, WettkampfErgebnis } from "./ergebnis";
import { CSVErgebnisImporter } from "./importer";

export interface Wettkampf {
    setName(name: string): void;
    setLandesmeisterschaft(landesmeisterschaft: boolean): void;
    setJahr(jahr: number): void;
    setErgebnis(ergebnis: Array<Ergebnis>): void;
    setErgebnisDateiName(name: string): void;
    
    getName(): string;
    getLandesmeisterschaft(): boolean;
    getJahr(): number;
    getErgebnis(): Array<WettkampfErgebnis>;
    getErgebnisDateiName(): string;
}

export class KonkreterWettkampf implements Wettkampf {
    private name: string;
    private landesmeisterschaft: boolean;
    private jahr: number;
    private ergebnisDateiName: string;
    private ergebnis: Array<WettkampfErgebnis>;

    constructor(name: string, landesmeisterschaft: boolean, jahr: number, ergebnisDateiName: string) {
        this.name = name;
        this.landesmeisterschaft = landesmeisterschaft;
        this.jahr = jahr;
        this.ergebnisDateiName = ergebnisDateiName;

        let importer = new CSVErgebnisImporter();
        this.ergebnis = importer.import(this.ergebnisDateiName)
    }

    setName(name: string): void {
        this.name = name;
    }
    
    setLandesmeisterschaft(landesmeisterschaft: boolean): void {
        this.landesmeisterschaft = landesmeisterschaft;
    }
    
    setJahr(jahr: number): void {
        this.jahr = jahr;
    }

    setErgebnis(ergebnis: Array<WettkampfErgebnis>) {
        this.ergebnis = ergebnis;
    }

    setErgebnisDateiName(name: string) {
        this.ergebnisDateiName = name;
    }
         
    getName(): string {
        return this.name;
    }

    getLandesmeisterschaft(): boolean {
        return this.landesmeisterschaft;
    }

    getJahr(): number {
        return this.jahr;
    }
    
    getErgebnis(): Array<WettkampfErgebnis> {
        return this.ergebnis;
    }

    getErgebnisDateiName(): string {
        return this.ergebnisDateiName;
    }
}