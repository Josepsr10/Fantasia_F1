import { Router } from "express";
import { CircuitService } from "../services/CircuitService";
import { CircuitHelper } from "../helpers/CircuitHelper";
import { CircuitGetController } from "../controllers/controllers-circuit/CircuitGetController";

export function getCircuit(router: Router): void {

    const circuitHelper = new CircuitHelper();
    const circuitService = new CircuitService(circuitHelper);

    // Controlador para obtener un circuito por ID
    const controller = new CircuitGetController(circuitService);
    controller.run = controller.run.bind(controller);

    router.get('/api/circuit/:id', controller.run);

}