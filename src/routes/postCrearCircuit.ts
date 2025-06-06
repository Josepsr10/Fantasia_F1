import { Router } from "express";
import { CircuitService } from "../services/CircuitService";
import { CircuitHelper } from "../helpers/CircuitHelper";
import { Auth } from "../middlewares/Auth";
import { CrearCircuitPostController } from "../controllers/controllers-circuit/CrearCircuitPostController";

export function postCrearCircuit(router: Router): void {

    const circuitHelper = new CircuitHelper();
    const circuitService = new CircuitService(circuitHelper);

    // Controlador para crear un circuito
    const controller = new CrearCircuitPostController(circuitService);
    controller.run = controller.run.bind(controller);

    router.post('/api/circuit', new Auth().authenticate, controller.run);

}