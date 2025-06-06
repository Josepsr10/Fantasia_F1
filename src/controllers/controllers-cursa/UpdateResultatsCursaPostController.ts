import { Request, Response } from "express";
import { CursaService } from "../../services/CursaService";
import { CursaNotFound } from "../../errors/CursaNotFound";
import { InvalidCursaId } from "../../errors/InvalidCursaId";
import { Cursa } from "../../entities/Cursa";
import { InvalidResultats } from "../../errors/InvalidResultats";

export class UpdateResultatsCursaPostController {
    constructor(private readonly service: CursaService) {}
    
    async run(req: Request, res: Response): Promise<void> {
        try {
            const cursaId = req.params.id;
            const { resultats } = req.body;
            
            const cursaActualizada = await this.service.updateResultats(cursaId, resultats);
            
            res.status(200).json({
                ok: true,
                message: "Resultados actualizados correctamente",
                cursa: this.buildResponse(cursaActualizada)
            });

        } catch (error) {
            console.log("Error en UpdateResultatsCursaPostController:", error);
            
            if (error instanceof InvalidCursaId || 
                error instanceof InvalidResultats) {
                res.status(400).json({
                    ok: false,
                    message: error.message
                });
                return;
            }
            
            if (error instanceof CursaNotFound) {
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
    
    private buildResponse(cursa: Cursa) {
        return {
            id: cursa.id,
            nom: cursa.nom,
            fecha: cursa.fecha,
            circuitId: cursa.circuitId,
            tipusClima: cursa.tipusClima,
            voltes: cursa.voltes,
            pilotIds: cursa.pilotIds,
            resultats: cursa.resultats
        };
    }
}