import { Wettkampf, KonkreterWettkampf } from "./wettkampf";
import { wettkaempfe as jsonWettkaempfe } from "./json/wettkaempfe";
import { json } from "body-parser";

export interface Repository {
    getWettkaempfe(jahr: number): Array<Wettkampf>;
}

export class RepositoryFactory {
    public static makeRepository(storageType: string): Repository {
        if (storageType == 'json') {
            return new JSONRepository();
        }
    }
}

export class JSONRepository implements Repository {
    public getWettkaempfe(jahr?: number): Array<Wettkampf> {
        let wettkaempfe: Array<Wettkampf> = [];

        for (let i = 0; i < jsonWettkaempfe.length; i++) {
            if (jahr) {
                if (jsonWettkaempfe[i].jahr == jahr) {
                    let wettkampf = new KonkreterWettkampf(jsonWettkaempfe[i].name, jsonWettkaempfe[i].landesmeisterschaft, jsonWettkaempfe[i].jahr, jsonWettkaempfe[i].dateiname);
                    wettkaempfe.push(wettkampf);
                }
            } else {
                let wettkampf = new KonkreterWettkampf(jsonWettkaempfe[i].name, jsonWettkaempfe[i].landesmeisterschaft, jsonWettkaempfe[i].jahr, jsonWettkaempfe[i].dateiname);
                wettkaempfe.push(wettkampf);
            }
        }

        return wettkaempfe;
    }
}