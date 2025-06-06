import { Router } from "express";
import { LligaService } from "../services/LligaService";
import { LligaHelper } from "../helpers/LligaHelper";
import { LligaGetController } from "../controllers/controllers-lliga/LligaGetController"; 
import { Auth } from "../middlewares/Auth";
import { UsuariHelper } from "../helpers/UsuariHelper";
import { UsuariService } from "../services/UsuariService";


export function getLliga(router: Router): void {

    const usuarihelper = new UsuariHelper()
    const usuariService = new UsuariService(usuarihelper)

    const lligaHelper = new LligaHelper()
    const lligaService = new LligaService(lligaHelper, usuariService)

    const controller = new LligaGetController(lligaService);
    controller.run = controller.run.bind(controller);

    router.get('/api/lliga/:id', new Auth().authenticate, controller.run);
}