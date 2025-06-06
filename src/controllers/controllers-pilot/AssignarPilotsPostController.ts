import { Request, Response } from "express";
import { UsuariEnLligaService } from "../../services/UsuariEnLligaService";

export class AssignarPilotsPostController {
    constructor(private readonly service: UsuariEnLligaService) {}

    async run(req: Request, res: Response) {
        try {
            const lligaId = req.params.lligaId;
            const usuariId = res.locals.id;
            const { pilots } = req.body;

            await this.service.assignarPilots(usuariId, lligaId, pilots);

            res.status(200).json({
                ok: true,
                message: "Pilotos asignados correctamente"
            });
        } catch (error) {
            console.log(error);
            res.status(500).send();
        }
    }
}