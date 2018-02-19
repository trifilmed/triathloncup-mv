import { CupErgebnis, PunkteZuordnung } from "./ergebnis";

export class Utils {
    public static transformiereCupErgebnis(cupErgebnisArray: Array<CupErgebnis>): Array<any> {
        let rueckgabeArray: Array<any> = [];

        for(let ergebnisZeile of cupErgebnisArray) {
            let rueckgabeObjekt: any = {
                "athlet": ergebnisZeile.getAthlet(),
                "wettkaempfe": null,
                "gesamtPunkte": ergebnisZeile.getGesamtPunkte(),
                "gesamtPlatzierung": ergebnisZeile.getGesamtPlatzierung()
            }

            let punkteZuordnungsArray: Array<PunkteZuordnung> = ergebnisZeile.getPunkteZuordnungNachBerechnung();
        
            let wettkaempfe = [];
            for(let punkteZuordnung of punkteZuordnungsArray) {
                let wettkampfDerZuordnung = punkteZuordnung.getWettkampf();
                
                let wettkampf = {
                    "name": wettkampfDerZuordnung.getName(),
                    "landesmeisterschaft": wettkampfDerZuordnung.getLandesmeisterschaft(),
                    "punkteDesAthleten": punkteZuordnung.getPunkte()
                }

                wettkaempfe.push(wettkampf);
            }

            rueckgabeObjekt.wettkaempfe = wettkaempfe;
            rueckgabeArray.push(rueckgabeObjekt);
        }


        return rueckgabeArray;
    }
}