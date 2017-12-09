import { Wettkampf, KonkreterWettkampf } from "./wettkampf";
import * as fs from "fs";

export interface Repository {
    getWettkaempfe(): Array<Wettkampf>;
}

export class RepositoryFactory {
    public static makeRepository(storageType: string): Repository {
        if(storageType == 'json') {
            return new JSONRepository();
        }
    }
}

export class JSONRepository implements Repository {
    public getWettkaempfe(): Array<Wettkampf> {
       let jsonWettkaempfe = [
        {
            "name": "Güstrower Triathlon",
            "landesmeisterschaft": false,
            "jahr": 2017
        },
        {
            "name": "Warener Triathlon",
            "landesmeisterschaft": false,
            "jahr": 2017
        },
        {
            "name": "Rostocker Triathlon",
            "landesmeisterschaft": true,
            "jahr": 2017
        }
    ];

    let wettkaempfe: Array<Wettkampf> = [];

    for(let i = 0; i < jsonWettkaempfe.length; i++) {
        let wettkampf = new KonkreterWettkampf(jsonWettkaempfe[i].name, jsonWettkaempfe[i].landesmeisterschaft, jsonWettkaempfe[i].jahr);
        wettkaempfe.push(wettkampf);
    }

    return wettkaempfe;
    }
}