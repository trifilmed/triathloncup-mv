import { Athlet } from './athlet';
import { Berechner, Berechner2017, BerechnerFactory } from './berechner';
import { ErgebnisImporter, CSVErgebnisImporter } from './importer';
import { RepositoryFactory, Repository } from './repository';
import { Wettkampf } from './wettkampf';
import { Ergebnis, CupErgebnis } from './ergebnis';

export class Main {
    public makeCupBerechnung(): void {
        let importer: ErgebnisImporter = new CSVErgebnisImporter();

        let repository: Repository = RepositoryFactory.makeRepository('json');
        let wettkaempfe: Array<Wettkampf> = repository.getWettkaempfe();

        // importiere ergebnisse falls noch nicht vorhanden
        for(let i = 0; i < wettkaempfe.length; i++) {
            let wettkampfErgebnis: Array<Ergebnis>;
            let importer: ErgebnisImporter = new CSVErgebnisImporter();

            if(!wettkaempfe[i].getErgebnis()) {
                let pfadZumCsvErgebnis: string = wettkaempfe[i].getName().toLocaleLowerCase().replace(' ', '_') + '.csv'
                wettkampfErgebnis = importer.import(pfadZumCsvErgebnis);
                wettkaempfe[i].setErgebnis(wettkampfErgebnis);
            }
        }

        let berechner: Berechner = BerechnerFactory.makeBerechner(2017);
        let cupErgebnis: Array<CupErgebnis> = berechner.berechne(wettkaempfe);
    }
}

let main = new Main();
main.makeCupBerechnung();