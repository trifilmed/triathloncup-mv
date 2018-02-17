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
    router.get('/cupergebnis', (req: any, res: any) => {
      Main.makeCupBerechnung()
        .then((cupErgebnis: Array<CupErgebnis>) => {
          res.send(cupErgebnis);
        })
        .catch((e: any) => {
          res.send("Die Berechnung ist leider fehlgeschlagen" + e);
        });
    });

    this.express.use('/', router);
  }
}

export default new App().express;