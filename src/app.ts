import * as express from 'express';
import { Main } from './main';
import { CupErgebnis } from './ergebnis';

class App {
  public express: any;

  constructor () {
    this.express = express();
    this.mountRoutes();
  }

  private mountRoutes (): void {
    const router = express.Router();
    router.get('/cupergebnis/:jahr', (req: any, res: any) => {
      let jahr: number = req.params.jahr;
      Main.makeCupBerechnung(jahr)
        .then((cupErgebnis: Array<any>) => {
          res.send(cupErgebnis);
        })
        .catch((e: any) => {
          res.send("Die Berechnung ist leider fehlgeschlagen" + e);
        });
    });

    this.express.use((req: any,res: any,next: any) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    this.express.use('/', router);
  }
}

export default new App().express;