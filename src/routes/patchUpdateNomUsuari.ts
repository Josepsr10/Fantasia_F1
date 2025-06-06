import { Router } from "express";
import { UsuariHelper } from "../helpers/UsuariHelper";
import { UsuariService } from "../services/UsuariService";
import { UsuariUpdateNomPatchController } from "../controllers/controllers-usuari/UsuariUpdateNomPatchController";
import { Auth } from "../middlewares/Auth";

export function patchUpdateNomUsuari(router: Router): void {
    
    const usuariHelper = new UsuariHelper()
    const usuariService = new UsuariService(usuariHelper)

    const controller = new UsuariUpdateNomPatchController(usuariService)

    controller.run = controller.run.bind(controller)

    router.patch('/api/usuari/update-nom', new Auth().authenticate, controller.run)

}