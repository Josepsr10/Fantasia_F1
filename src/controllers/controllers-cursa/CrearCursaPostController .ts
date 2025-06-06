import { Request, Response } from "express";
import { CursaService } from "../../services/CursaService";
import { CursaJaExisteix } from "../../errors/CursaJaExisteix";
import { CircuitNotFound } from "../../errors/CircuitNotFound";
import { InvalidCursaNom } from "../../errors/InvalidCursaNom";
import { InvalidVoltesNumber } from "../../errors/InvalidVoltesNumber";
import { TipusClimaInvalid } from "../../errors/TipusClimaInvalid";
import { Cursa } from "../../entities/Cursa";

export class CrearCursaPostController {
    constructor(private readonly service: CursaService) { }

    async run(req: Request, res: Response): Promise<void> {
        try {
            const usuariId = res.locals.id
            const { nom, fecha, circuitId, tipusClima, voltes, pilotIds } = req.body;

            const cursa = await this.service.createCursa(
                usuariId,
                nom,
                new Date(fecha),
                circuitId,
                tipusClima,
                voltes,
                pilotIds || []
            );

            res.status(201).json({
                ok: true,
                message: 'Carrera creada exitosamente.',
                cursa: this.buildResponse(cursa)

            });

        } catch (error) {
            console.log("Error en CrearCursaPostController:", error);

            if (error instanceof CursaJaExisteix ||
                error instanceof InvalidCursaNom ||
                error instanceof InvalidVoltesNumber ||
                error instanceof TipusClimaInvalid) {
                res.status(404).json({
                    ok: false,
                    message: error.message
                });
                return;
            }

            if (error instanceof CircuitNotFound) {
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
            pilotsId: cursa.pilotIds 
        };
    }
}