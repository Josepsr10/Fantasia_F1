import { Request, Response } from "express";
import { LligaService } from "../../services/LligaService";
import { LligaNotFound } from "../../errors/LligaNotFound";
import { InvalidIdLliga } from "../../errors/InvalidIdLliga";
import { Lliga } from "../../entities/Lliga";

export class LligaGetController {
    constructor(private readonly service: LligaService) { }

    async run(req: Request, res: Response): Promise<void> {
        try {
            const lliga = await this.service.getLligaById(req.params.id);

            res.status(200).json({
                ok: true,
                lliga: this.buildResponse(lliga)
            });
        } catch (error) {
            console.log(`Error en LligaGetController:`, error);

            // Manejo de errores específicos
            if (error instanceof InvalidIdLliga) {
                res.status(400).json({
                    ok: false,
                    message: error.message
                });
                return;
            }

            if (error instanceof LligaNotFound) {
                res.status(404).json({
                    ok: false,
                    message: error.message
                });
                return;
            }

            // Error genérico para cualquier otro tipo de error
            res.status(500).json({
                ok: false,
                message: "Error interno del servidor."
            });
        }
    }

    private buildResponse(lliga: Lliga) {
        return {
            lligaId: lliga.lligaId,
            nomLliga: lliga.nomLliga,
            tipusLliga: lliga.tipusLliga
        }
    }
}