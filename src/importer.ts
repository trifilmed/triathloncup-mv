import { Ergebnis } from "./ergebnis";

export interface ErgebnisImporter {
    import(source: string): Array<Ergebnis>;
}

export class CSVErgebnisImporter implements ErgebnisImporter {

    public import(source: string): Array<Ergebnis> {
        
    }
}