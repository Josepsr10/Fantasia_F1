import { Router } from "express";
import { CursaService } from "../services/CursaService";
import { CircuitService } from "../services/CircuitService";
import { CircuitHelper } from "../helpers/CircuitHelper";
import { CursaHelper } from "../helpers/CursaHelper";
import { CrearCursaPostController } from "../controllers/controllers-cursa/CrearCursaPostController ";
import { Auth } from "../middlewares/Auth";

export function postCrearCursa(router: Router): void {

    const circuitHelper = new CircuitHelper();
    const circuitService = new CircuitService(circuitHelper);

    const cursaHelper = new CursaHelper();
    const cursaService = new CursaService(cursaHelper, circuitService);

    // Controlador para obtener todas las carreras
    const controller = new CrearCursaPostController(cursaService);
    controller.run = controller.run.bind(controller);

    router.post('/api/cursa', new Auth().authenticate, controller.run);

}