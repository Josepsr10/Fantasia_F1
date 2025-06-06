import { Request, Response } from "express";
import { CursaService } from "../../services/CursaService";
import { CursaNotFound } from "../../errors/CursaNotFound";
import { InvalidCursaId } from "../../errors/InvalidCursaId";

export class CursaGetController {
    constructor(private readonly service: CursaService) {}
    
    async run(req: Request, res: Response): Promise<void> {
        try {
            const cursaId = req.params.id;
            
            const cursa = await this.service.findCursaById(cursaId);
            
            res.status(200).json({
                ok: true,
                cursa
            });

        } catch (error) {
            console.log("Error en CursaGetController:", error);
            
            if (error instanceof CursaNotFound) {
                res.status(404).json({
                    ok: false,
                    message: error.message
                });
                return;
            }
            
            if (error instanceof InvalidCursaId) {
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