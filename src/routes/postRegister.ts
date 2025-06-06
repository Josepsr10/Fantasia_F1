
import { Router } from "express";
import { UsuariService } from "../services/UsuariService";
import { UsuariHelper } from "../helpers/UsuariHelper";
import { UsuariRegisterPostController } from "../controllers/controllers-usuari/UsuariRegisterPostController"; 

export function postRegister(router: Router): void {

    const service = new UsuariService(new UsuariHelper());
    const controller = new UsuariRegisterPostController(service);
    
    controller.run = controller.run.bind(controller);
    
    router.post('/api/register', controller.run);
}