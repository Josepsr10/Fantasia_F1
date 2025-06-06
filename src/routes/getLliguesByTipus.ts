import { Router } from "express";
import { LligaService } from "../services/LligaService";
import { LligaHelper } from "../helpers/LligaHelper";
import { Auth } from "../middlewares/Auth";
import { UsuariHelper } from "../helpers/UsuariHelper";
import { UsuariService } from "../services/UsuariService";
import { LliguesByTipusGetController } from "../controllers/controllers-lliga/LliguesByTipusGetController";


export function getLliguesByTipus(router: Router): void {

    const usuarihelper = new UsuariHelper()
    const usuariService = new UsuariService(usuarihelper)

    const lligaHelper = new LligaHelper()
    const lligaService = new LligaService(lligaHelper, usuariService)

    const controller = new LliguesByTipusGetController(lligaService);

    controller.run = controller.run.bind(controller);

    router.get('/api/lliga/:id/:tipus', new Auth().authenticate, controller.run);
}