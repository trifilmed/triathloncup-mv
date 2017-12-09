import { Athlet } from './athlet';
import { Berechner, Berechner2017, BerechnerFactory } from './berechner';
import { ErgebnisImporter, CSVErgebnisImporter } from './importer';
import { RepositoryFactory, Repository } from './repository';
import { Wettkampf } from './wettkampf';

export class Main {
    public makeCupBerechnung(): void {
        let importer: ErgebnisImporter = new CSVErgebnisImporter();

        let repository: Repository = RepositoryFactory.makeRepository('json');
        let wettkaempfe: Array<Wettkampf> = repository.getWettkaempfe();

        for(let i = 0; i < wettkaempfe.length; i++) {
            // erstelle die Ergebnisse
        }
    }
}

let main = new Main();
main.makeCupBerechnung();