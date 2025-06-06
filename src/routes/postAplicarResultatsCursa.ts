import { Router } from "express";
import { CircuitHelper } from "../helpers/CircuitHelper";
import { CircuitService } from "../services/CircuitService";
import { CursaHelper } from "../helpers/CursaHelper";
import { CursaService } from "../services/CursaService";
import { PilotsHelper } from "../helpers/PilotsHelper";
import { PilotsService } from "../services/PilotsService";
import { LligaHelper } from "../helpers/LligaHelper";
import { UsuariHelper } from "../helpers/UsuariHelper";
import { UsuariService } from "../services/UsuariService";
import { LligaService } from "../services/LligaService";
import { UsuariEnLligaHelper } from "../helpers/UsuariEnLligaHelper";
import { UsuariEnLligaService } from "../services/UsuariEnLligaService";
import { SimulacioService } from "../services/SimulacioService";
import { AplicarResultatsCursaPostController } from "../controllers/controllers-cursa/AplicarResultatsCursaPostController"; 
import { Auth } from "../middlewares/Auth";

export function postAplicarResultatsCursa(router: Router): void {
    
    const circuitHelper = new CircuitHelper();
    const circuitService = new CircuitService(circuitHelper);
    
    const cursaHelper = new CursaHelper();
    const cursaService = new CursaService(cursaHelper, circuitService);
    
    const pilotsHelper = new PilotsHelper();
    const pilotsService = new PilotsService(pilotsHelper);
    
    const usuariHelper = new UsuariHelper();
    const usuariService = new UsuariService(usuariHelper);
    
    const lligaHelper = new LligaHelper();
    const lligaService = new LligaService(lligaHelper, usuariService);
    
    const usuariEnLligaHelper = new UsuariEnLligaHelper();
    const usuariEnLligaService = new UsuariEnLligaService(
        usuariEnLligaHelper,
        pilotsService,
        lligaService
    );
    
    const simulacioService = new SimulacioService(
        cursaService,
        lligaService,
        usuariEnLligaService,
        pilotsService
    );
    
    const controller = new AplicarResultatsCursaPostController(simulacioService);
    controller.run = controller.run.bind(controller);
    
    router.post('/api/simulacio/aplicar-resultats', new Auth().authenticate, controller.run);
}