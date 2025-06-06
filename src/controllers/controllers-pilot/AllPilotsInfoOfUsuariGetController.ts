import { Request, Response } from "express";
import { UsuariEnLligaService } from "../../services/UsuariEnLligaService";
import { InvalidIdUsuari } from "../../errors/InvalidIdUsuari";
import { LligaNotFound } from "../../errors/LligaNotFound";
import { Pilots } from "../../entities/Pilots";

export class AllPilotsInfoGetController {
    constructor(private readonly service: UsuariEnLligaService) { }

    async run(req: Request, res: Response): Promise<void> {
        try {
            const usuariId = res.locals.id;

            const pilots = await this.service.getAllPilotsInfoByUsuari(usuariId);

            res.status(200).json({
                ok: true,
                pilots: this.buildResponse(pilots)
            });

        } catch (error) {
            console.log(`Error en AllPilotsInfoGetController: `, error);

            if (error instanceof InvalidIdUsuari) {
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

            res.status(500).json({
                ok: false,
                message: "Error interno del servidor."
            });
        }
    }

    private buildResponse(pilots: Pilots[]) {
        return pilots.map(pilot => ({
            pilotId: pilot.pilotId,
            nomPilot: pilot.nomPilot,
            edat: pilot.edat,
            nacionalitat: pilot.nacionalitat,
            escuderia: pilot.escuderia,
            foto: pilot.foto,
            posicio: pilot.posicio,
            punts: pilot.punts,
            totalPunts: pilot.totalPunts,
            podiums: pilot.podiums,
            rendimentSec: pilot.rendimentSec,
            rendimentPluja: pilot.rendimentPluja,
            rendimentMixt: pilot.rendimentMixt
        }));
    }
}

