import { Router } from "express";
import { UsuariEnLligaHelper } from "../helpers/UsuariEnLligaHelper";
import { Auth } from "../middlewares/Auth";
import { UsuariEnLligaService } from "../services/UsuariEnLligaService";
import { PilotsHelper } from "../helpers/PilotsHelper";
import { PilotsService } from "../services/PilotsService";
import { LligaHelper } from "../helpers/LligaHelper";
import { LligaService } from "../services/LligaService";
import { UsuariHelper } from "../helpers/UsuariHelper";
import { UsuariService } from "../services/UsuariService";
import { FindLliguesOnUsuariParticipaGetController } from "../controllers/controllers-lliga/findLliguesOnUsuariParticipaGetController";

export function getLliguesOnUsuariParticipa(router: Router): void {
    const usuarihelper = new UsuariHelper();
    const usuariService = new UsuariService(usuarihelper);

    const lligaHelper = new LligaHelper();
    const lligaService = new LligaService(lligaHelper, usuariService);

    const pilotsHelper = new PilotsHelper();
    const pilotService = new PilotsService(pilotsHelper);

    const usuariEnLligaHelper = new UsuariEnLligaHelper();
    const usuariEnLligaService = new UsuariEnLligaService(
        usuariEnLligaHelper,
        pilotService,
        lligaService
    );

    const controller = new FindLliguesOnUsuariParticipaGetController(usuariEnLligaService);

    controller.run = controller.run.bind(controller);

    router.get('/api/lligues/participacio', new Auth().authenticate, controller.run);
}   