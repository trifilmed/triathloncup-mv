import { Ergebnis } from "./ergebnis";
import * as csv from "csvtojson";
import * as path from "path";
import * as fs from "fs";

export interface ErgebnisImporter {
    import(source: string): Array<Ergebnis>;
}

export class CSVErgebnisImporter implements ErgebnisImporter {

    public import(source: string): Array<WettkampfErgebnis> {
        let pathName = path.join(__dirname, '../csv/' + source + '.csv');

        csv({noheader: false})
            .fromFile(pathName)
            .on('json', (jsonObj: any) => {
                console.log(jsonObj);
            })
            .on('done', (error: any) => {
                console.log('end');
            });
    }
}