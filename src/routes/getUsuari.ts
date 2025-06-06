import { Router } from "express";
import { UsuariService } from "../services/UsuariService";
import { UsuariHelper } from "../helpers/UsuariHelper";
import { Auth } from "../middlewares/Auth";
import { UsuariInfoGetController } from "../controllers/controllers-usuari/UsuariInfoGetController";

export function getUsuariInfo(router: Router): void {

    const service = new UsuariService(new UsuariHelper());

    const controller = new UsuariInfoGetController(service);
    
    controller.run = controller.run.bind(controller);
    
    router.get('/api/usuari-info', new Auth().authenticate, controller.run);
}