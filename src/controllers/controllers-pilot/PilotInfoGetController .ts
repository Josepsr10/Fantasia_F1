import { Request, Response } from "express";
import { UsuariEnLligaService } from "../../services/UsuariEnLligaService";
import { UsuariNotFound } from "../../errors/UsuariNotFound";
import { InvalidIdPilot } from "../../errors/InvalidIdPilot";

export class PilotInfoGetController {
    constructor(private readonly service: UsuariEnLligaService) { }

    async run(req: Request, res: Response): Promise<void> {
        try {
            const usuariId = res.locals.id;
            const lligaId = req.params.lligaId;
            const pilotId = req.params.pilotId;

            const pilot = await this.service.getPilotInfo(usuariId, lligaId, pilotId);

            res.status(200).json({
                ok: true,
                message: "Información del piloto.",
                pilot
            });
            
        } catch (error) {
            console.log(`Error en PilotInfoGetController: `, error);

            if (error instanceof UsuariNotFound) {
                res.status(404).json({
                    ok: false,
                    message: error.message
                });
                return;
            }

            if (error instanceof InvalidIdPilot) {
                res.status(400).json({
                    ok: false,
                    message: error.message
                });
                return;
            }

            res.status(500).json({
                ok: false,
                message: "Error interno del servidor"
            });
        }
    }
}