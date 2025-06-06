import { Request, Response } from "express";
import { CircuitService } from "../../services/CircuitService";

export class CircuitsGetController {
    constructor(private readonly service: CircuitService) {}

    async run(req: Request, res: Response): Promise<void> {
        try {
            const circuits = await this.service.findAllCircuits();
            
            res.status(200).json({
                ok: true,
                circuits
            });

        } catch (error) {
            console.error('Error en CircuitsGetAllController:', error);
            
            res.status(500).json({
                ok: false,
                message: "Error en el servidor."
            });
        }
    }
}