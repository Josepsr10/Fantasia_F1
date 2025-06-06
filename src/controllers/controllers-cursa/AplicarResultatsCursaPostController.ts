import { Request, Response } from "express";
import { SimulacioService } from "../../services/SimulacioService";
import { CursaNotFound } from "../../errors/CursaNotFound";
import { PilotNotFound } from "../../errors/PilotNotFound";
import { InvalidResultats } from "../../errors/InvalidResultats";
import { InvalidCursaId } from "../../errors/InvalidCursaId";

export class AplicarResultatsCursaPostController {
    constructor(private readonly service: SimulacioService) {}
    
    async run(req: Request, res: Response): Promise<void> {
        try {
            const { cursaId } = req.body;
            
            await this.service.aplicarResultatsCursa(cursaId);
            
            res.status(200).json({
                ok: true,
                message: "Resultados de la carrera aplicados correctamente a todos los pilotos en todas las ligas."
            });

        } catch (error) {
            console.log("Error en AplicarResultatsCursaPostController:", error);
            
            if (error instanceof InvalidCursaId || 
                error instanceof InvalidResultats) {
                res.status(400).json({
                    ok: false,
                    message: error.message
                });
                return;
            }
            
            if (error instanceof CursaNotFound ||
                error instanceof PilotNotFound) {
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