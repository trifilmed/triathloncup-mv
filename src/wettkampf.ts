import { Ergebnis, WettkampfErgebnis } from "./ergebnis";

export interface Wettkampf {
    setName(name: string): void;
    setLandesmeisterschaft(landesmeisterschaft: boolean): void;
    setJahr(jahr: number): void;
    setErgebnis(ergebnis: Array<Ergebnis>): void;
    
    getName(): string;
    getLandesmeisterschaft(): boolean;
    getJahr(): number;
    getErgebnis(): Array<WettkampfErgebnis>;
}

export class KonkreterWettkampf implements Wettkampf {
    private name: string;
    private landesmeisterschaft: boolean;
    private jahr: number;
    private ergebnis: Array<WettkampfErgebnis>;

    constructor(name: string, landesmeisterschaft: boolean, jahr: number) {
        this.name = name;
        this.landesmeisterschaft = landesmeisterschaft;
        this.jahr = jahr;
        this.ergebnis = null;
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
}