import { Ergebnis, WettkampfErgebnis } from "./ergebnis";
import { Athlet, KonkreterAthlet } from "./athlet";
import * as csv from "csvtojson";
import * as path from "path";

export interface ErgebnisImporter {
    import(source: string): Promise<Array<Ergebnis>>;
}

export class CSVErgebnisImporter implements ErgebnisImporter {
    private athleten: Array<Athlet> = [];
    private wettkampfErgebnis: Array<WettkampfErgebnis> = [];

    public import(source: string): Promise<Array<WettkampfErgebnis>> {
        let pathName = path.join(__dirname, '../csv/' + source + '.csv');
        return new Promise((resolve: any, reject: any) => {
            csv({noheader: false})
                .fromFile(pathName)
                .on('json', (zeile: any) => {
                        let vorname: string = zeile.Vorname;
                        let name: string = zeile.Nachname;
                        let altersklasse: string = zeile.Ak;
                        let altersklassenRang: number = zeile.AkRang;
                        let athlet: Athlet;
                        let wettkampfErgebnis: WettkampfErgebnis;

                        if(this.athletExistiert(vorname,name,altersklasse)) {
                            athlet = this.findeAthlet(vorname, name, altersklasse);
                        } else {
                            athlet = new KonkreterAthlet(vorname, name, altersklasse);
                        }
                        
                        this.athleten.push(athlet);

                        wettkampfErgebnis = new WettkampfErgebnis(athlet, altersklassenRang);
                        this.wettkampfErgebnis.push(wettkampfErgebnis);
                })
                .on('done', () => {
                    resolve(this.wettkampfErgebnis);
                })
                .on('error', (error: any) => {
                    reject(error);
                });
        });
    }
    
    private athletExistiert(vorname: string, nachname: string, altersklasse: string): boolean {
        let existiert = false; 

        for(let athlet of this.athleten) {
            if(athlet.getVorname() == vorname 
                && athlet.getName() == nachname 
                && athlet.getAltersklasse() == altersklasse) {
                existiert = true;
            }
        }

        return existiert;
    }

    private findeAthlet(vorname: string, nachname: string, altersklasse: string): Athlet {
        for(let athlet of this.athleten) {
            if(athlet.getVorname() == vorname 
                && athlet.getName() == nachname 
                && athlet.getAltersklasse() == altersklasse) {
                return athlet;
            }
        }
    }
}