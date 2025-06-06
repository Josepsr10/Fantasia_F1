import { CircuitNotFound } from "../../errors/CircuitNotFound";
import { CircuitService } from "../../services/CircuitService";
import { Request, Response } from "express";
import { InvalidIdCircuit } from "../../errors/InvalidIdCircuit";

export class CircuitGetController {
    constructor(private readonly service: CircuitService) {}

    async run(req: Request, res: Response): Promise<void> {
        try {
            const circuitId = req.params.id;
            
            const circuit = await this.service.findCircuitById(circuitId);
            
            res.status(200).json({
                ok: true,
                circuit
            });

        } catch (error) {
            console.error('Error en CircuitGetController:', error);
            
            if (error instanceof CircuitNotFound) {
                res.status(404).json({
                    ok: false,
                    message: error.message
                });
                return;
            }
            
            if (error instanceof InvalidIdCircuit) {
                res.status(404).json({
                    ok: false,
                    message: error.message
                });
                return;
            }
            
            res.status(500).json({
                ok: false,
                message: 'Error interno del servidor.'
            });
        }
    }
}