import { Request, Response } from "express";
import { UsuariService } from "../../services/UsuariService";
import { TipusRol } from "../../types/usuari/TipusRol";

export class UpdateIsAdminPatchController {
    constructor(private readonly service: UsuariService) {}

    async run(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const { isAdmin } = req.body;

            const rol = isAdmin ? TipusRol.ADMINISTRADOR : TipusRol.USUARI;
            await this.service.updateRol(id, rol);

            res.status(200).json({
                ok: true,
                message: `Usuario con id ${id} actualizado correctamente.`
            });
        } catch (error) {
            console.log(error);
            res.status(500).send();
        }
    }
}