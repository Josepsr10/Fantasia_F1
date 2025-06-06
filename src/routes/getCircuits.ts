import { Router } from "express";
import { CircuitService } from "../services/CircuitService";
import { CircuitHelper } from "../helpers/CircuitHelper";
import { CircuitsGetController } from "../controllers/controllers-circuit/CircuitsGetController";

export function getCircuits(router: Router): void {

    const circuitHelper = new CircuitHelper();
    const circuitService = new CircuitService(circuitHelper);

    // Controlador para obtener todos los circuitos
    const controller = new CircuitsGetController(circuitService);
    controller.run = controller.run.bind(controller);

    router.get('/api/circuits', controller.run);

}