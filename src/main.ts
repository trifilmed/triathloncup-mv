import { Athlet } from './athlet';
import { Berechner, Berechner2017, BerechnerFactory } from './berechner';
import { ErgebnisImporter, CSVErgebnisImporter } from './importer';
import { RepositoryFactory, Repository } from './repository';
import { Wettkampf } from './wettkampf';
import { Ergebnis, CupErgebnis, WettkampfErgebnis } from './ergebnis';

export class Main {
    public makeCupBerechnung(): void {
        let repository: Repository = RepositoryFactory.makeRepository('json');
        let wettkaempfe: Array<Wettkampf> = repository.getWettkaempfe();
        let importer: ErgebnisImporter = new CSVErgebnisImporter();
        let ergebnissePromiseArray: Array<Promise<Ergebnis>> = [];

        for(let wettkampf of wettkaempfe) {
            ergebnissePromiseArray.push(importer.import(wettkampf.getErgebnisDateiName()));
        }

        Promise.all(ergebnissePromiseArray)
            .then((wettkampfErgebnis: Array<Array<WettkampfErgebnis>>) => {
                let it: number = 0;
                for(let ergebnis of wettkampfErgebnis) {
                    wettkaempfe[it].setErgebnis(ergebnis);
                    it++;   
                }
                
                let berechner: Berechner = BerechnerFactory.makeBerechner(2017);
                let cupErgebnis: Array<CupErgebnis> = berechner.berechne(wettkaempfe);
            })
            .catch((error: any) => {
                throw error;
            });
    }
}

let main = new Main();
main.makeCupBerechnung();