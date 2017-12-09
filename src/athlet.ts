export interface Athlet {
    setName(name: string): void;
    setVorname(vorname: string): void;
    setAltersklasse(altersklasse: string): void;

    getName(): string;
    getVorname(): string;
    getAltersklasse(): string;
}

export class KonkreterAthlet implements Athlet {
    private name: string;
    private vorname: string;
    private altersklasse: string;

    constructor(name: string, vorname: string, altersklasse: string) {
        this.name = name;
        this.vorname = vorname;
        this.altersklasse = altersklasse;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setVorname(vorname: string): void {
        this.vorname = vorname;
    }

    public setAltersklasse(altersklasse: string): void {
        this.altersklasse = altersklasse;
    }

    public getVorname(): string {
        return this.vorname;
    }

    public getName(): string {
        return this.name;
    }

    public getAltersklasse(): string {
        return this.altersklasse;
    }
}