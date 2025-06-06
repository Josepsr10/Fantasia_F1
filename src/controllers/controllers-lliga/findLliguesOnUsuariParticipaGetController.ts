import { Request, Response } from "express";
import { UsuariEnLligaService } from "../../services/UsuariEnLligaService";
import { Lliga } from "../../entities/Lliga";
import { InvalidIdUsuari } from "../../errors/InvalidIdUsuari";
import { UsuariNotFound } from "../../errors/UsuariNotFound";

export class FindLliguesOnUsuariParticipaGetController {
    constructor(private readonly usuariEnLligaService: UsuariEnLligaService) { }

    async run(req: Request, res: Response): Promise<void> {
        try {
            const usuariId = res.locals.id;
            const lligues = await this.usuariEnLligaService.findLliguesOnUsuariParticipa(usuariId);

            res.status(200).json({
                ok: true,
                lligues: this.buildResponse(lligues)
            });

        } catch (error) {
            console.log(`Error en FindLliguesOnUsuariParticipaGetController:`, error);

            if (error instanceof InvalidIdUsuari) {
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

    private buildResponse(lligues: Lliga[]) {
        return lligues.map(lliga => ({
            lligaId: lliga.lligaId,
            nomLliga: lliga.nomLliga,
            tipusLliga: lliga.tipusLliga,
            creadorId: lliga.creadorId
        }));
    }
}