import { Router } from "express";
import { CursaService } from "../services/CursaService";
import { CircuitService } from "../services/CircuitService";
import { CircuitHelper } from "../helpers/CircuitHelper";
import { CursaHelper } from "../helpers/CursaHelper";
import { UpdateResultatsCursaPostController } from "../controllers/controllers-cursa/UpdateResultatsCursaPostController";
import { Auth } from "../middlewares/Auth";

export function postUpdateResultatsCursa(router: Router): void {
    
    const circuitHelper = new CircuitHelper();
    const circuitService = new CircuitService(circuitHelper);
    
    const cursaHelper = new CursaHelper();
    const cursaService = new CursaService(cursaHelper, circuitService);
    
    const controller = new UpdateResultatsCursaPostController(cursaService);
    controller.run = controller.run.bind(controller);
    
    router.post('/api/cursa/:id/resultats', new Auth().authenticate, controller.run);
}