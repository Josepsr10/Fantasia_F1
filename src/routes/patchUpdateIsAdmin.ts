import { Router } from "express";
import { UsuariService } from "../services/UsuariService";
import { UsuariHelper } from "../helpers/UsuariHelper";
import { UpdateIsAdminPatchController } from "../controllers/controllers-usuari/UpdateIsAdminPatchController";
import { Auth } from "../middlewares/Auth";
import { CheckIsAdmin } from "../middlewares/CheckIsAdmin";

export function patchUpdateIsAdmin(router: Router): void {

    const service = new UsuariService(new UsuariHelper());

    const controller = new UpdateIsAdminPatchController(service);
    
    const checkIsAdmin = new CheckIsAdmin(service);
    
    controller.run = controller.run.bind(controller);
    
    router.patch('/api/usuari/:id/admin', new Auth().authenticate, checkIsAdmin.check.bind(checkIsAdmin), controller.run);
}