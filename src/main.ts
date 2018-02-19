import { Athlet } from './athlet';
import { Berechner, Berechner2017, BerechnerFactory } from './berechner';
import { ErgebnisImporter, CSVErgebnisImporter } from './importer';
import { RepositoryFactory, Repository } from './repository';
import { Wettkampf } from './wettkampf';
import { Ergebnis, CupErgebnis, WettkampfErgebnis } from './ergebnis';
import { Utils } from './utils';
import * as fs from 'fs';

export class Main {
    public static makeCupBerechnung(jahr: number): Promise<Array<any>> {
        return new Promise((resolve, reject) => {
            let repository: Repository = RepositoryFactory.makeRepository('json');
            let wettkaempfe: Array<Wettkampf> = repository.getWettkaempfe(jahr);
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

                    let berechner: Berechner = BerechnerFactory.makeBerechner(jahr);
                    cupErgebnis = berechner.berechne(wettkaempfe);
                    
                    let rueckgabeArray: Array<any> = Utils.transformiereCupErgebnis(cupErgebnis);
                    resolve(rueckgabeArray);
                })
                .catch((error: any) => {
                    reject(error);
                });
            });
    }
}