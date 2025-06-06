import { Router } from "express";
import { UsuariEnLligaService } from "../services/UsuariEnLligaService";
import { UsuariEnLligaHelper } from "../helpers/UsuariEnLligaHelper";
import { Auth } from "../middlewares/Auth";
import { PilotsHelper } from "../helpers/PilotsHelper";
import { PilotsService } from "../services/PilotsService";
import { AssignarPilotsPostController } from "../controllers/controllers-pilot/AssignarPilotsPostController";
import { LligaHelper } from "../helpers/LligaHelper";
import { LligaService } from "../services/LligaService";
import { UsuariHelper } from "../helpers/UsuariHelper";
import { UsuariService } from "../services/UsuariService";

export function postAssignarPilots(router: Router): void {

    const usuarihelper = new UsuariHelper()
    const usuariService = new UsuariService(usuarihelper)

    const lligaHelper = new LligaHelper()
    const lligaService = new LligaService(lligaHelper, usuariService)

    const pilotsHelper = new PilotsHelper();
    const pilotService = new PilotsService(pilotsHelper);

    const usuariEnLligaHelper = new UsuariEnLligaHelper()
    const service = new UsuariEnLligaService(
        usuariEnLligaHelper,
        pilotService,
        lligaService

    )

    const controller = new AssignarPilotsPostController(service);

    controller.run = controller.run.bind(controller);

    router.post('/api/lliga/:lligaId/pilots/assignar-pilots', new Auth().authenticate, controller.run);
}