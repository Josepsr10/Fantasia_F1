import { Request, Response } from "express";
import { UsuariService } from "../../services/UsuariService";
import { Usuari } from "../../entities/Usuari";
import { InvalidIdUsuari } from "../../errors/InvalidIdUsuari";
import { UsuariNotFound } from "../../errors/UsuariNotFound";

export class UsuariInfoGetController {
    constructor(private readonly service: UsuariService) { }

    async run(req: Request, res: Response): Promise<void> {

        try {
            const usuariId = res.locals.id
            const usuari = await this.service.getUsuariById(usuariId);

            res.status(200).json({
                ok: true,
                message: "Informacion del Usuario.",
                usuari: this.buildResponse(usuari)
            })

        } catch (error) {
            console.log(`Error en UsuariGetController: `, error);

            if (error instanceof InvalidIdUsuari || error instanceof UsuariNotFound) {
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

    private buildResponse(usuari: Usuari) {
        return {
            usuariId: usuari.usuariId,
            nomUsuari: usuari.nomUsuari,
            correuElectronic: usuari.correuElectronic,
            rol: usuari.rol,
            imatgePerfil: usuari.imatgePerfil
        }
    }
}