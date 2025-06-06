export type ClassificacioPilot = {
    pilotId: string;
    posicio: number;
    puntsTotals: number;
}

export class ClassificacioGeneral{
    constructor(
        readonly classificacioId: string,
        readonly lligaId: string,
        readonly temporadaId: string,
        readonly pilotClassificacions: ClassificacioPilot[] = []
    ) {}

    static create(
        classificacioId: string,
        lligaId: string,
        temporadaId: string
    ): ClassificacioGeneral {
        return new ClassificacioGeneral(
            classificacioId,
            lligaId,
            temporadaId,
            []
        );
    }

    actualitzarClassificacio(pilotClassificacions: ClassificacioPilot[]): ClassificacioGeneral {
        return new ClassificacioGeneral(
            this.classificacioId,
            this.lligaId,
            this.temporadaId,
            pilotClassificacions
        );
    }
}