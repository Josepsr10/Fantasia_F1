import { Request, Response } from "express";
import { UsuariEnLligaService } from "../../services/UsuariEnLligaService";
import { LligaNotFound } from "../../errors/LligaNotFound";
import { UsuariEnLligaJaExisteix } from "../../errors/UsuariEnLligaJaExisteix";
import { ContrasenyaAcces } from "../../errors/ContrasenyaAcces";
import { ContrasenyaIncorrect } from "../../errors/ContrasenyaIncorrect";

export class UnirALligaPostController {
    constructor(private readonly service: UsuariEnLligaService) { }

    async run(req: Request, res: Response): Promise<void> {
        try {
            const usuariId = res.locals.id;
            const lligaId = req.params.id;
            const { contrasenya } = req.body;

            // Delegar toda la validación al servicio
            await this.service.create(usuariId, lligaId, contrasenya);

            res.status(201).json({
                ok: true,
                message: "Te has unido a la liga correctamente."
            });
        } catch (error) {
            console.log(`Error en UnirALligaPostController:`, error);

            if (error instanceof LligaNotFound) {
                res.status(404).json({
                    ok: false,
                    message: error.message
                });
                return;
            }

            if (error instanceof UsuariEnLligaJaExisteix) {
                res.status(400).json({
                    ok: false,
                    message: error.message
                });
                return;
            }

            if (error instanceof ContrasenyaAcces || error instanceof ContrasenyaIncorrect) {
                res.status(401).json({
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