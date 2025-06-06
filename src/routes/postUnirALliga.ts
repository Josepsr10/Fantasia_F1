import { Router } from "express";
import { UsuariEnLligaHelper } from "../helpers/UsuariEnLligaHelper";
import { UnirALligaPostController } from "../controllers/controllers-lliga/UnirALligaPostController";
import { Auth } from "../middlewares/Auth";
import { UsuariEnLligaService } from "../services/UsuariEnLligaService";
import { PilotsHelper } from "../helpers/PilotsHelper";
import { PilotsService } from "../services/PilotsService";
import { LligaHelper } from "../helpers/LligaHelper";
import { LligaService } from "../services/LligaService";
import { UsuariHelper } from "../helpers/UsuariHelper";
import { UsuariService } from "../services/UsuariService";

export function postUnirALliga(router: Router): void {

    const usuarihelper = new UsuariHelper()
    const usuariService = new UsuariService(usuarihelper)

    const lligaHelper = new LligaHelper()
    const lligaService = new LligaService(lligaHelper, usuariService)

    const pilotsHelper = new PilotsHelper();
    const pilotService = new PilotsService(pilotsHelper);

    const usuariEnLligaHelper = new UsuariEnLligaHelper()
    const usuariEnLligaService = new UsuariEnLligaService(
        usuariEnLligaHelper,
        pilotService,
        lligaService
    )

    const controller = new UnirALligaPostController(usuariEnLligaService);

    controller.run = controller.run.bind(controller);

    router.post('/api/lliga/:id/unirse', new Auth().authenticate, controller.run);
}