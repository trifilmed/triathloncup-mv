import { Ergebnis, WettkampfErgebnis } from "./ergebnis";
import { Athlet } from "./athlet";
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
            .on('json', (data: any) => {
                for(let key in data) {
                    console.log(key);
                }
            })
            .on('done', (error: any) => {
                if(error) {
                    console.log(error);
                }
                console.log('done with importing');
            });
    }
    
    private athletExistiert() {
        
    }
}