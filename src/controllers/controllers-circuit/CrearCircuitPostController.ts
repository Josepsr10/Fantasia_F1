import { CircuitService } from "../../services/CircuitService";
import { Request, Response } from "express";
import { CircuitJaExistent } from "../../errors/CircuitJaExisteix";
import { InvalidCircuitNom } from "../../errors/InvalidCircuitNom";
import { InvalidCircuitLocalitzacio } from "../../errors/InvalidCircuitLocalitzacio";
import { Circuit } from "../../entities/Circuit";

export class CrearCircuitPostController {
    constructor(private readonly service: CircuitService) { }

    async run(req: Request, res: Response): Promise<void> {
        try {
            const usuariId = res.locals.id;
            const { nom, localitzacio } = req.body;

            const circuit = await this.service.createCircuit(usuariId, nom, localitzacio);

            res.status(201).json({
                ok: true,
                message: 'Circuito creado exitosamente.',
                circuit: this.buildResponse(circuit)
            });

        } catch (error) {
            console.log("Error en CrearCircuitPostController:", error);

            if (error instanceof CircuitJaExistent ||
                error instanceof InvalidCircuitNom ||
                error instanceof InvalidCircuitLocalitzacio) {
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

    private buildResponse(circuit: Circuit) {
        return {
            id: circuit.id,
            nom: circuit.nom,
            localitzacio: circuit.localitzacio,
        };
    }
}