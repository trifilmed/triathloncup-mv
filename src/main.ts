import { Athlet } from './athlet';
import { Berechner, Berechner2017, BerechnerFactory } from './berechner';
import { ErgebnisImporter, CSVErgebnisImporter } from './importer';
import { RepositoryFactory, Repository } from './repository';
import { Wettkampf } from './wettkampf';
import { Ergebnis, CupErgebnis } from './ergebnis';
import { config } from './../config';

export class Main {
    public makeCupBerechnung(): void {
        let repository: Repository = RepositoryFactory.makeRepository('json');
        let wettkaempfe: Array<Wettkampf> = repository.getWettkaempfe();

        // let berechner: Berechner = BerechnerFactory.makeBerechner(2017);
        // let cupErgebnis: Array<CupErgebnis> = berechner.berechne(wettkaempfe);
    }
}

let main = new Main();
main.makeCupBerechnung();