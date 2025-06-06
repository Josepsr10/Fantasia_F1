import { Request, Response } from "express";
import { LligaService } from "../../services/LligaService";
import { UsuariEnLligaService } from "../../services/UsuariEnLligaService";
import { LligaJaExisteix } from "../../errors/LligaJaExisteix";
import { InvalidLligaType } from "../../errors/InvalidLligaType";
import { InvalidLligaNom } from "../../errors/InvalidLligaNom";
import { ContrasenyaAcces } from "../../errors/ContrasenyaAcces";
import { Lliga } from "../../entities/Lliga";

export class CrearLligaPostController {
    constructor(
        private readonly service: LligaService,
        private readonly usuariEnLligaService: UsuariEnLligaService
    ) { }

    async run(req: Request, res: Response): Promise<void> {
        try {
            const usuariId = res.locals.id;
            const { nomLliga, tipusLliga, contrasenya } = req.body;
            
            // Crear la liga estableciendo al usuario actual como creador
            const lliga = await this.service.createLliga(usuariId, nomLliga, tipusLliga, contrasenya);

            // Asociar el usuario con la liga creada
            await this.usuariEnLligaService.create(usuariId, lliga.lligaId, contrasenya);

            res.status(201).json({
                ok: true,
                message: "Liga creada exitosamente.",
                lliga: this.buildResponse(lliga)
            });

        } catch (error) {
            console.log(`Error en CrearLligaPostController:`, error);

            if (error instanceof LligaJaExisteix) {
                res.status(400).json({
                    ok: false,
                    message: error.message
                });
                return;
            }

            if (error instanceof InvalidLligaType) {
                res.status(400).json({
                    ok: false,
                    message: error.message
                });
                return;
            }

            if (error instanceof InvalidLligaNom) {
                res.status(400).json({
                    ok: false,
                    message: error.message
                });
                return;
            }

            if (error instanceof ContrasenyaAcces) {
                res.status(400).json({
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

    private buildResponse(lliga: Lliga) {
        return {
            lligaId: lliga.lligaId,
            nomLliga: lliga.nomLliga,
            tipusLliga: lliga.tipusLliga
        };
    }
}