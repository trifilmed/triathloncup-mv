import { Ergebnis, WettkampfErgebnis } from "./ergebnis";
import { Athlet, KonkreterAthlet } from "./athlet";
import * as csv from "csvtojson";
import * as path from "path";

export interface ErgebnisImporter {
    import(source: string): Promise<Array<Ergebnis>>;
}

export class CSVErgebnisImporter implements ErgebnisImporter {
    private athleten: Array<Athlet> = [];

    public import(source: string): Promise<Array<WettkampfErgebnis>> {
        let pathName = path.join(__dirname, '../csv/' + source + '.csv');
        return new Promise((resolve: any, reject: any) => {
            // let athleten: Array<Athlet> = [];
            let wettkampfErgebnisArray: Array<WettkampfErgebnis> = [];
            csv({ noheader: false })
                .fromFile(pathName)
                .on('json', (zeile: any) => {
                    let vorname: string;
                    let name: string;

                    if(zeile.Name) {
                        let namensArray: Array<string> = zeile.Name.split(',');
                        name = namensArray[0];
                        vorname = namensArray[1].trim();
                    } else {
                        vorname = zeile.Vorname;
                        name = zeile.Nachname;
                    }

                    let altersklasse: string = zeile.Ak;
                    let altersklassenRang: number = zeile.AkRang;
                    let athlet: Athlet;
                    let wettkampfErgebnis: WettkampfErgebnis;

                    athlet = this.bekommeAthlet(vorname, name, altersklasse);
                    
                    wettkampfErgebnis = new WettkampfErgebnis(athlet, altersklassenRang);
                    wettkampfErgebnisArray.push(wettkampfErgebnis);
                })
                .on('done', () => {
                    resolve(wettkampfErgebnisArray);
                })
                .on('error', (error: any) => {
                    reject(error);
                });
        });
    }

    private bekommeAthlet(vorname: string, nachname: string, altersklasse: string): Athlet {
        let existiert: boolean = false;
        let rueckgabeAthlet: Athlet;

        for (let athlet of this.athleten) {
           if (athlet.getVorname().toLowerCase() == vorname.toLowerCase()
                && athlet.getName().toLowerCase() == nachname.toLowerCase()
                && athlet.getAltersklasse() == altersklasse) {
                    existiert = true;
                    rueckgabeAthlet = athlet;
            }
        }

        if(existiert) {
            return rueckgabeAthlet;
        } else {
            rueckgabeAthlet = new KonkreterAthlet(vorname,nachname,altersklasse);
            this.athleten.push(rueckgabeAthlet);

            return rueckgabeAthlet;
        }
    }
}