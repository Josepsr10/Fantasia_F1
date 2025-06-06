import { Request, Response } from "express";
import { UsuariEnLligaService } from "../../services/UsuariEnLligaService";
import { UsuariNotFound } from "../../errors/UsuariNotFound";

export class PilotsInfoGetController {
    constructor(private readonly service: UsuariEnLligaService) { }

    async run(req: Request, res: Response): Promise<void> {
        try {
            const usuariId = res.locals.id;
            const lligaId = req.params.lligaId;

            const pilots = await this.service.getPilotsInfo(usuariId, lligaId);

            res.status(200).json({
                ok: true,
                message: "Pilotos del usuario en la liga.",
                data: {
                    pilots,
                }
            });

        } catch (error) {
            console.log(`Error en PilotsInfoGetController: `, error);

            if (error instanceof UsuariNotFound) {
                res.status(404).json({
                    ok: false,
                    message: error.message
                });
                return;
            }

            res.status(500).json({
                ok: false,
                message: "Error interno del servidor."
            });
        }
    }
}