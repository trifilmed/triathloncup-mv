import * as csv from "csvtojson";
import { CSVErgebnisImporter } from "../src/importer";

describe('Importer', () => {
    let csvImporter: CSVErgebnisImporter;
    let csvSpy: jasmine.Spy;

    beforeEach(() => {
        csvImporter = new CSVErgebnisImporter();
        csvSpy = spyOn(csv.prototype, 'fromFile').and.callThrough();
    });

    it('import Funktion ruft csv.fromFile mit richtigem pfadNamen auf', () => {
        let source: string = 'testsource';
        csvImporter.import(source);

        expect(csvSpy).toHaveBeenCalled();
    });

    it('import Funktion liefert ein Promise', (done: any) => {

    });
});