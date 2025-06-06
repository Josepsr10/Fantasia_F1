import { Request, Response } from "express";
import { LligaService } from "../../services/LligaService";
import { TipusLliga } from "../../types/lliga/TipusLliga";
import { InvalidLligaType } from "../../errors/InvalidLligaType";
import { Lliga } from "../../entities/Lliga";

export class LliguesByTipusGetController {
    constructor(private readonly service: LligaService) { }

    async run(req: Request, res: Response): Promise<void> {
        try {
            const tipusParam = req.params.tipus
            const lligaId = req.params.id
            const lliguesTipus = await this.service.getLliguesByTipus(tipusParam as TipusLliga, lligaId);

            res.status(200).json({
                ok: true,
                lligues: this.buildResponse(lliguesTipus)
            });
        } catch (error) {
            console.log(`Error en LliguesByTipusGetController:`, error);

            if (error instanceof InvalidLligaType) {
                res.status(400).json({
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

    private buildResponse(lligues: Lliga[]) {
        return lligues.map(lliga => ({
            lligaId: lliga.lligaId,
            nomLliga: lliga.nomLliga,
            tipusLliga: lliga.tipusLliga
        }));
    }
}