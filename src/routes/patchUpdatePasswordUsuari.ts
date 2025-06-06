import { Router } from "express";
import { UsuariHelper } from "../helpers/UsuariHelper";
import { UsuariService } from "../services/UsuariService";
import { UsuariUpdatePasswordPatchController } from "../controllers/controllers-usuari/UsuariUpdatePasswordPatchController";
import { Auth } from "../middlewares/Auth";

export function patchUpdatePasswordUsuari(router: Router): void {

    const usuariHelper = new UsuariHelper();
    const usuariService = new UsuariService(usuariHelper);
    
    const controller = new UsuariUpdatePasswordPatchController(usuariService);
    
    controller.run = controller.run.bind(controller);
    
    router.patch('/api/usuari/update-password', new Auth().authenticate, controller.run);
}