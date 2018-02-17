import { Athlet } from './athlet';
import { Berechner, Berechner2017, BerechnerFactory } from './berechner';
import { ErgebnisImporter, CSVErgebnisImporter } from './importer';
import { RepositoryFactory, Repository } from './repository';
import { Wettkampf } from './wettkampf';
import { Ergebnis, CupErgebnis, WettkampfErgebnis } from './ergebnis';
import * as fs from 'fs';

export class Main {
    public static makeCupBerechnung(): Promise<Array<CupErgebnis>> {
        return new Promise((resolve, reject) => {
            let repository: Repository = RepositoryFactory.makeRepository('json');
            let wettkaempfe: Array<Wettkampf> = repository.getWettkaempfe();
            let importer: ErgebnisImporter = new CSVErgebnisImporter();
            let ergebnissePromiseArray: Array<Promise<Ergebnis>> = [];
            let cupErgebnis: Array<CupErgebnis> = [];

            for (let wettkampf of wettkaempfe) {
                ergebnissePromiseArray.push(importer.import(wettkampf.getErgebnisDateiName()));
            }

            Promise.all(ergebnissePromiseArray)
                .then((wettkampfErgebnis: Array<Array<WettkampfErgebnis>>) => {
                    let it: number = 0;
                    for (let ergebnis of wettkampfErgebnis) {
                        wettkaempfe[it].setErgebnis(ergebnis);
                        it++;
                    }

                    let berechner: Berechner = BerechnerFactory.makeBerechner(2017);
                    cupErgebnis = berechner.berechne(wettkaempfe);
                    
                    resolve(cupErgebnis);
                })
                .catch((error: any) => {
                    reject(error);
                });
            });
    }
}

// let finalesErgebnisPromise = Main.makeCupBerechnung();
// finalesErgebnisPromise
//     .then((cupErgebnis: Array<CupErgebnis>) => {    
//         fs.writeFile("./src/json/cupergebnis.json",JSON.stringify(cupErgebnis), (e: any) => {
//             if (e) {
//                 console.log(e);
//                 return;
//             } else {
//                 console.log("CupErgebnis wurde gespeichert!");
//             }
//         });
//     })
//     .catch((e: any) => {
//         console.log(e);
//     });