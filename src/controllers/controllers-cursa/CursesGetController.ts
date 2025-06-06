import { Request, Response } from "express";
import { CursaService } from "../../services/CursaService";

export class CursesGetController {
    constructor(private readonly service: CursaService) {}
    
    async run(req: Request, res: Response): Promise<void> {
        try {
            const curses = await this.service.findAllCurses();
            
            res.status(200).json({
                ok: true,
                curses
            });
            
        } catch (error) {
            console.error('Error en CursesGetAllController:', error);
            
            res.status(500).json({
                ok: false,
                message: "Error en el servidor."
            });
        }
    }
}