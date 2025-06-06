import { Request, Response } from "express";
import { UsuariEnLligaService } from "../../services/UsuariEnLligaService";
import { LligaNotFound } from "../../errors/LligaNotFound";
import { UsuariNoEnLliga } from "../../errors/UsuariNoEnLliga";

export class DeixarLligaDeleteController {
    constructor(private readonly service: UsuariEnLligaService) { }

    async run(req: Request, res: Response): Promise<void> {
        try {
            const usuariId = res.locals.id;
            const lligaId = req.params.id;

            await this.service.delete(usuariId, lligaId);

            res.status(200).json({
                ok: true,
                message: "Has abandonado la liga correctamente."
            });
                    
        } catch (error) {
            console.log(`Error en DeixarLligaDeleteController:`, error);
            
            if (error instanceof LligaNotFound) {
                res.status(404).json({
                    ok: false,
                    message: error.message
                });
                return;
            }
            
            if (error instanceof UsuariNoEnLliga) {
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