import { Ergebnis, WettkampfErgebnis } from "./ergebnis";
import { Athlet, KonkreterAthlet } from "./athlet";
import * as csv from "csvtojson";
import * as path from "path";

export interface ErgebnisImporter {
    import(source: string): Promise<Array<Ergebnis>>;
}

export class CSVErgebnisImporter implements ErgebnisImporter {

    public import(source: string): Promise<Array<WettkampfErgebnis>> {
        let pathName = path.join(__dirname, '../csv/' + source + '.csv');
        return new Promise((resolve: any, reject: any) => {
            let athleten: Array<Athlet> = [];
            let wettkampfErgebnisArray: Array<WettkampfErgebnis> = [];
            csv({ noheader: false })
                .fromFile(pathName)
                .on('json', (zeile: any) => {
                    let vorname: string;
                    let name: string;

                    if(zeile.Name) {
                        let namensArray: Array<string> = zeile.Name.split(',');
                        vorname = namensArray[0];
                        name = namensArray[1].trim();
                    } else {
                        vorname = zeile.Vorname;
                        name = zeile.Nachname;
                    }

                    let altersklasse: string = zeile.Ak;
                    let altersklassenRang: number = zeile.AkRang;
                    let athlet: Athlet;
                    let wettkampfErgebnis: WettkampfErgebnis;

                    if (this.athletExistiert(vorname, name, altersklasse, athleten)) {
                        athlet = this.findeAthlet(vorname, name, altersklasse, athleten);
                    } else {
                        athlet = new KonkreterAthlet(vorname, name, altersklasse);
                    }

                    athleten.push(athlet);

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

    private athletExistiert(vorname: string, nachname: string, altersklasse: string, athleten: Array<Athlet>): boolean {
        let existiert = false;

        for (let athlet of athleten) {
            if (athlet.getVorname() == vorname
                && athlet.getName() == nachname
                && athlet.getAltersklasse() == altersklasse) {
                existiert = true;
            }
        }

        return existiert;
    }

    private findeAthlet(vorname: string, nachname: string, altersklasse: string, athleten: Array<Athlet>): Athlet {
        for (let athlet of athleten) {
            if (athlet.getVorname() == vorname
                && athlet.getName() == nachname
                && athlet.getAltersklasse() == altersklasse) {
                return athlet;
            }
        }
    }
}