import { TipusClima } from "../types/cursa/clima"

export class Cursa {
    constructor(
        readonly creadorId: string,  // Nuevo campo
        readonly id: string,
        readonly nom: string,
        readonly fecha: Date,
        readonly circuitId: string,
        readonly tipusClima: TipusClima,
        readonly voltes: number,
        readonly pilotIds: string[] = [],
        readonly resultats: { pilotId: string, posicio: number, punts: number }[] = []
    ) { }

    static create(
        creadorId: string,
        id: string,
        nom: string,
        fecha: Date,
        circuitId: string,
        tipusClima: TipusClima,
        voltes: number,
        pilotIds: string[]
    ): Cursa {
        return new Cursa(
            creadorId,
            id,
            nom,
            fecha,
            circuitId,
            tipusClima,
            voltes,
            pilotIds,
            []
        );
    }

    updateResultats(resultats: { pilotId: string, posicio: number, punts: number }[]): Cursa {
        return new Cursa(
            this.creadorId,
            this.id,
            this.nom,
            this.fecha,
            this.circuitId,
            this.tipusClima,
            this.voltes,
            this.pilotIds,
            resultats
        );
    }

    updateNom(nouNom: string): Cursa {
        return new Cursa(
            this.creadorId,
            this.id,
            nouNom,
            this.fecha,
            this.circuitId,
            this.tipusClima,
            this.voltes,
            this.pilotIds,
            this.resultats
        )
    }
}