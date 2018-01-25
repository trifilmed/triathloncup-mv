import { Ergebnis } from "./ergebnis";
import * as csv from "csvtojson";

export interface ErgebnisImporter {
    import(source: string): Array<Ergebnis>;
}

export class CSVErgebnisImporter implements ErgebnisImporter {

    constructor() { /* no op */ }

    public import(source: string): Array<WettkampfErgebnis> {
        console.log(source);
        
        csv({noheader: true})
            .fromFile(source)
            .on('json', (jsonObj: any) => {
                console.log(jsonObj);
            })
             .on('done', (error: any) => {
                console.log('end');
            });
        // csvtojson()
        //     .fromFile(this.folder)
        //     .on('json', (jsonObj: any) => {
        //         console.log(jsonObj);
        //     })
        //     .on('done', (error: any) => {
        //         console.log('end');
        //     })
    }
}