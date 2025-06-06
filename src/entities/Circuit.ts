
export class Circuit {
    constructor(
        readonly creadorId: string,  // Nuevo campo
        readonly id: string,
        readonly nom: string,
        readonly localitzacio: string,
        readonly cursaId: string[] = []
    ) { }

    static create(
        creadorId: string,
        id: string,
        nom: string,
        localitzacio: string,
    ): Circuit {
        return new Circuit(
            creadorId,
            id,
            nom,
            localitzacio,
            []
        )
    }

    updateNom(nouNom: string): Circuit {
        return new Circuit(
            this.creadorId,
            this.id,
            nouNom,
            this.localitzacio,
            this.cursaId
        )
    }
}
