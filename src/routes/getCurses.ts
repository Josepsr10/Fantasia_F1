import { Router } from "express";
import { CursaService } from "../services/CursaService";
import { CircuitService } from "../services/CircuitService";
import { CircuitHelper } from "../helpers/CircuitHelper";
import { CursaHelper } from "../helpers/CursaHelper";
import { CursesGetController } from "../controllers/controllers-cursa/CursesGetController";

export function getCurses(router: Router): void {

    const circuitHelper = new CircuitHelper();
    const circuitService = new CircuitService(circuitHelper);

    const cursaHelper = new CursaHelper();
    const cursaService = new CursaService(cursaHelper, circuitService);

    // Controlador para obtener todas las carreras
    const controller = new CursesGetController(cursaService);
    controller.run = controller.run.bind(controller);

    router.get('/api/curses', controller.run);

}