import { TipusLliga } from "../types/lliga/TipusLliga";

export class Lliga {
    constructor(
        readonly creadorId: string,
        readonly lligaId: string,
        readonly nomLliga: string,
        readonly tipusLliga: TipusLliga,
        readonly contrasenya?: string
    ) { }

    static create(
        creadorId: string,  // Parámetro añadido
        lligaId: string,
        nomLliga: string,
        tipus: TipusLliga,
        contrasenya?: string
    ): Lliga {
        return new Lliga(
            creadorId,
            lligaId,
            nomLliga,
            tipus,
            contrasenya
        );
    }

    // Actualiza otros métodos para incluir creadorId
    updateNom(nouNom: string): Lliga {
        return new Lliga(
            this.creadorId,
            this.lligaId,
            nouNom,
            this.tipusLliga,
            this.contrasenya
        );
    }
}