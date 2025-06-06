import { Router } from "express";
import { CursaService } from "../services/CursaService";
import { CircuitService } from "../services/CircuitService";
import { CircuitHelper } from "../helpers/CircuitHelper";
import { CursaHelper } from "../helpers/CursaHelper";
import { CursaGetController } from "../controllers/controllers-cursa/CursaGetController";

export function getCursa(router: Router): void {

    const circuitHelper = new CircuitHelper();
    const circuitService = new CircuitService(circuitHelper);

    const cursaHelper = new CursaHelper();
    const cursaService = new CursaService(cursaHelper, circuitService);

    // Controlador para obtener una carrera por ID
    const controller = new CursaGetController(cursaService);
    controller.run = controller.run.bind(controller);

    router.get('/api/cursa/:id', controller.run);

}