import { Request, Response } from "express";
import { UsuariService } from "../../services/UsuariService";
import { InvalidName } from "../../errors/InvalidName";
import { InvalidEmail } from "../../errors/InvalidEmail";
import { ContrasenyaAcces } from "../../errors/ContrasenyaAcces";
import { ContrasenyaIncorrect } from "../../errors/ContrasenyaIncorrect";

export class UsuariRegisterPostController {
    constructor(private readonly service: UsuariService) {}

    async run(req: Request, res: Response) {
        try {
            const { nom, email, password } = req.body
            await this.service.create(nom, email, password)
            /*await this.service.create(
                req.body.nom,
                req.body.email,
                req.body.password
            );*/
            res.status(201).json({
                ok: true,
                message: "Usuario registrado correctamente."
            });

        } catch (error) {
            console.log(`Error en UsuariRegisterPostController: `, error);
            
            if (error instanceof InvalidName || 
                error instanceof InvalidEmail || 
                error instanceof ContrasenyaAcces || 
                error instanceof ContrasenyaIncorrect) {
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
}