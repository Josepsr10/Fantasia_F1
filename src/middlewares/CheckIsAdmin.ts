import { NextFunction, Request, Response } from "express";
import { UsuariService } from "../services/UsuariService";
import { TipusRol } from "../types/usuari/TipusRol";

export class CheckIsAdmin {
    constructor(private readonly usuariService: UsuariService) {}

    async check(req: Request, res: Response, next: NextFunction) {
        const usuari = await this.usuariService.getUsuariById(res.locals.id);

        if (!usuari || usuari.rol !== TipusRol.ADMINISTRADOR) {
            res.status(401).send();
            return;
        }

        next();
    }
}