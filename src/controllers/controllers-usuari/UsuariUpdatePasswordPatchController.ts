import { Request, Response } from "express";
import { UsuariService } from "../../services/UsuariService";
import { UsuariNotFound } from "../../errors/UsuariNotFound";
import { ContrasenyaAcces } from "../../errors/ContrasenyaAcces";
import { ContrasenyaIncorrect } from "../../errors/ContrasenyaIncorrect";

export class UsuariUpdatePasswordPatchController {
    constructor(private readonly service: UsuariService) {}

    async run(req: Request, res: Response): Promise<void> {
        try {
            const usuariId = res.locals.id;
            const { password, nouPassword } = req.body;
            
            await this.service.updatePassword(usuariId, password, nouPassword);
            
            res.status(200).json({
                ok: true,
                message: "Contraseña actualizada correctamente."
            });

        } catch (error) {
            console.log(`Error en UsuariUpdatePasswordPatchController: `, error);
            
            if (error instanceof UsuariNotFound) {
                res.status(404).json({
                    ok: false,
                    message: error.message
                });
                return;
            }
            
            if (error instanceof ContrasenyaAcces || error instanceof ContrasenyaIncorrect) {
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
}