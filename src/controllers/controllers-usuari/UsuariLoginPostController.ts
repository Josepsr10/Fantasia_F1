import { Request, Response } from "express";
import { UsuariService } from "../../services/UsuariService";
import { EmailNotFound } from "../../errors/EmailNotFound";
import { ContrasenyaIncorrect } from "../../errors/ContrasenyaIncorrect";

export class UsuariLoginPostController {
    constructor(private readonly service: UsuariService) { }

    async run(req: Request, res: Response): Promise<void> {
        try {
            const token = await this.service.login(
                req.body.email,
                req.body.password
            );

            res.status(200).json({
                ok: true,
                token
            });
        } catch (error) {
            console.log("Error en UsuariLoginPostController:", error);

            if (error instanceof EmailNotFound) {
                res.status(404).json({
                    ok: false,
                    message: error.message
                });
                return
            }

            if (error instanceof ContrasenyaIncorrect) {
                res.status(404).json({
                    ok: false,
                    message: error.message
                });
                return
            }

            res.status(500).json({
                ok: false,
                message: "Error interno del servidor."
            });
        }
    }
}