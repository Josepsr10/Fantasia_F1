import { Router } from "express";
import { UsuariService } from "../services/UsuariService";
import { UsuariHelper } from "../helpers/UsuariHelper";
import { UsuariLoginPostController } from "../controllers/controllers-usuari/UsuariLoginPostController";  

export function postLogin(router: Router): void {

    const service = new UsuariService(new UsuariHelper());
    const controller = new UsuariLoginPostController(service);
    
    controller.run = controller.run.bind(controller);
    
    router.post('/api/login', controller.run);
}