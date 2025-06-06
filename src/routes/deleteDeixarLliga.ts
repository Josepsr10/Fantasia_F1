import { Router } from "express";
import { UsuariEnLligaHelper } from "../helpers/UsuariEnLligaHelper";
import { DeixarLligaDeleteController } from "../controllers/controllers-lliga/DeixarLligaDeleteController";
import { Auth } from "../middlewares/Auth";
import { UsuariEnLligaService } from "../services/UsuariEnLligaService";
import { PilotsHelper } from "../helpers/PilotsHelper";
import { PilotsService } from "../services/PilotsService";
import { LligaHelper } from "../helpers/LligaHelper";
import { LligaService } from "../services/LligaService";
import { UsuariService } from "../services/UsuariService";
import { UsuariHelper } from "../helpers/UsuariHelper";

export function deleteDeixarLliga(router: Router): void {

    const usuarihelper = new UsuariHelper()
    const usuariService = new UsuariService(usuarihelper)

    const lligaHelper = new LligaHelper()
    const lligaService = new LligaService(lligaHelper, usuariService)

    const pilotHelper = new PilotsHelper()
    const pilotService = new PilotsService(pilotHelper)

    const usuariEnLligaHelper = new UsuariEnLligaHelper()
    const usuariEnLligaService = new UsuariEnLligaService(
        usuariEnLligaHelper,
        pilotService,
        lligaService
    )

    const controller = new DeixarLligaDeleteController(usuariEnLligaService);

    controller.run = controller.run.bind(controller);

    router.delete('/api/lliga/:id/deixar-lliga', new Auth().authenticate, controller.run);
}