import { Router } from "express";
import { LligaService } from "../services/LligaService";
import { LligaHelper } from "../helpers/LligaHelper";
import { FindLliguesCreateByUsuariGetController } from "../controllers/controllers-lliga/FindLliguesCreatedByUsuariGetController"; 
import { Auth } from "../middlewares/Auth";
import { UsuariService } from "../services/UsuariService";
import { UsuariHelper } from "../helpers/UsuariHelper";

export function getLliguesUsuari(router: Router): void {

    const usuarihelper = new UsuariHelper()
    const usuariService = new UsuariService(usuarihelper)

    const lligaHelper = new LligaHelper();
    const lligaService = new LligaService(lligaHelper, usuariService);
    
    const controller = new FindLliguesCreateByUsuariGetController(lligaService);
    controller.run = controller.run.bind(controller);
    
    router.get('/api/usuari/lligues', new Auth().authenticate, controller.run);
}   