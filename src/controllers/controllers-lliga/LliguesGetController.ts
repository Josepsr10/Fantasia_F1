import { Request, Response } from "express";
import { LligaService } from "../../services/LligaService";
import { Lliga } from "../../entities/Lliga";

export class LliguesGetController {
    constructor(private readonly service: LligaService) { }

    async run(req: Request, res: Response): Promise<void> {
        try {
            const usuariId = res.locals.id
            const lligues = await this.service.getAllLligues();

            res.status(200).json({
                ok: true,
                lligues: this.buildResponse(lligues)
            });
        } catch (error) {
            console.log(`Error en LliguesGetController:`, error);

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