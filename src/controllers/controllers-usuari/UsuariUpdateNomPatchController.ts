import { Request, Response } from 'express';
import { UsuariService } from '../../services/UsuariService';
import { InvalidName } from '../../errors/InvalidName';
import { UsuariNotFound } from '../../errors/UsuariNotFound';


export class UsuariUpdateNomPatchController {
    constructor(private readonly service: UsuariService) { }

    async run(req: Request, res: Response): Promise<void> {
        try {
            const usuariId = res.locals.id;
            const { nouNom } = req.body;

            await this.service.updateNom(usuariId, nouNom);

            res.status(200).json({ 
                ok: true,
                message: 'Nombre de usuario actualizado correctamente.' 
            });

        } catch (error) {
            console.log(`Error en UsuariUpdateNomPatchController: `, error)

            if (error instanceof InvalidName || error instanceof UsuariNotFound) {
                res.status(400).json({
                    ok: false,
                    message: error.message
                });
                return;
            }

            res.status(500).json({
                ok: false,
                message: "Error interno del servidor"
            });
        }
    }
}