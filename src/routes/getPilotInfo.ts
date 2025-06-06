import { Router } from "express";
import { UsuariEnLligaService } from "../services/UsuariEnLligaService";
import { UsuariEnLligaHelper } from "../helpers/UsuariEnLligaHelper";
import { Auth } from "../middlewares/Auth";
import { PilotsService } from "../services/PilotsService";
import { PilotsHelper } from "../helpers/PilotsHelper";
import { LligaHelper } from "../helpers/LligaHelper";
import { LligaService } from "../services/LligaService";
import { UsuariHelper } from "../helpers/UsuariHelper";
import { UsuariService } from "../services/UsuariService";
import { PilotInfoGetController } from "../controllers/controllers-pilot/PilotInfoGetController ";

export function getPilotInfo(router: Router): void {

    const usuariHelper = new UsuariHelper();
    const usuariService = new UsuariService(usuariHelper);

    const lligaHelper = new LligaHelper();
    const lligaService = new LligaService(lligaHelper, usuariService);

    const pilotsHelper = new PilotsHelper();
    const pilotService = new PilotsService(pilotsHelper);

    const usuariEnLligaHelper = new UsuariEnLligaHelper();
    const service = new UsuariEnLligaService(
        usuariEnLligaHelper,
        pilotService,
        lligaService
    );

    const controller = new PilotInfoGetController(service);
    controller.run = controller.run.bind(controller);

    router.get('/api/lliga/:lligaId/pilots/:pilotId', new Auth().authenticate, controller.run);
}