import { Router } from "express";
import { LligaService } from "../services/LligaService";
import { LligaHelper } from "../helpers/LligaHelper";
import { LliguesGetController } from "../controllers/controllers-lliga/LliguesGetController";
import { Auth } from "../middlewares/Auth";
import { UsuariHelper } from "../helpers/UsuariHelper";
import { UsuariService } from "../services/UsuariService";


export function getLligues(router: Router): void {

    const usuarihelper = new UsuariHelper()
    const usuariService = new UsuariService(usuarihelper)

    const lligaHelper = new LligaHelper()
    const lligaService = new LligaService(lligaHelper, usuariService)

    const controller = new LliguesGetController(lligaService);

    controller.run = controller.run.bind(controller);

    router.get('/api/lligues', new Auth().authenticate, controller.run);
}