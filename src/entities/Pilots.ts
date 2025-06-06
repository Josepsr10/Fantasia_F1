export class Pilots {
    constructor(
        readonly pilotId: string,
        readonly nomPilot: string,
        readonly edat: number,
        readonly nacionalitat: string,
        readonly escuderia: string,
        readonly foto: string,
        readonly posicio: number,
        readonly punts: number,
        readonly totalPunts: number,
        readonly podiums: number,
        readonly rendimentSec: number,
        readonly rendimentPluja: number,
        readonly rendimentMixt: number
    ) { }

    static create(
        pilotId: string,
        nomPilot: string,
        edat: number,
        nacionalitat: string,
        escuderia: string,
        foto: string,
        rendimentSec: number,
        rendimentPluja: number,
        rendimentMixt: number
    ): Pilots {
        return new Pilots(
            pilotId,
            nomPilot,
            edat,
            nacionalitat,
            escuderia,
            foto,
            0, // posición inicial
            0, // puntos iniciales
            0, // total puntos iniciales
            0, // podiums iniciales
            rendimentSec,
            rendimentPluja,
            rendimentMixt
        )
    }

    updateEdat(novaEdat: number): Pilots {
        return new Pilots(
            this.pilotId,
            this.nomPilot,
            novaEdat,
            this.nacionalitat,
            this.escuderia,
            this.foto,
            this.posicio,
            this.punts,
            this.totalPunts,
            this.podiums,
            this.rendimentSec,
            this.rendimentPluja,
            this.rendimentMixt
        )
    }

    updateEscuderia(novaEscuderia: string): Pilots {
        return new Pilots(
            this.pilotId,
            this.nomPilot,
            this.edat,
            this.nacionalitat,
            novaEscuderia,
            this.foto,
            this.posicio,
            this.punts,
            this.totalPunts,
            this.podiums,
            this.rendimentSec,
            this.rendimentPluja,
            this.rendimentMixt
        )
    }

    updateFoto(novaFoto: string): Pilots {
        return new Pilots(
            this.pilotId,
            this.nomPilot,
            this.edat,
            this.nacionalitat,
            this.escuderia,
            novaFoto,
            this.posicio,
            this.punts,
            this.totalPunts,
            this.podiums,
            this.rendimentSec,
            this.rendimentPluja,
            this.rendimentMixt
        )
    }

    updatePosicio(novaPosicio: number): Pilots {
        return new Pilots(
            this.pilotId,
            this.nomPilot,
            this.edat,
            this.nacionalitat,
            this.escuderia,
            this.foto,
            novaPosicio,
            this.punts,
            this.totalPunts,
            this.podiums,
            this.rendimentSec,
            this.rendimentPluja,
            this.rendimentMixt
        )
    }

    updatePunts(nousPunts: number): Pilots {
        return new Pilots(
            this.pilotId,
            this.nomPilot,
            this.edat,
            this.nacionalitat,
            this.escuderia,
            this.foto,
            this.posicio,
            nousPunts,
            this.totalPunts,
            this.podiums,
            this.rendimentSec,
            this.rendimentPluja,
            this.rendimentMixt
        )
    }

    updateSumarTotalPunts(sumarPuntsDespresDeCarrera: number): Pilots {
        return new Pilots(
            this.pilotId,
            this.nomPilot,
            this.edat,
            this.nacionalitat,
            this.escuderia,
            this.foto,
            this.posicio,
            this.punts,
            this.totalPunts + sumarPuntsDespresDeCarrera,
            this.podiums,
            this.rendimentSec,
            this.rendimentPluja,
            this.rendimentMixt
        )
    }

    updateIncrementarPodiums(): Pilots {
        return new Pilots(
            this.pilotId,
            this.nomPilot,
            this.edat,
            this.nacionalitat,
            this.escuderia,
            this.foto,
            this.posicio,
            this.punts,
            this.totalPunts,
            this.podiums + 1,
            this.rendimentSec,
            this.rendimentPluja,
            this.rendimentMixt
        )
    }

    updateRendiments(
        nouRendimentSec: number,
        nouRendimentPluja: number,
        nouRendimentMixt: number
    ): Pilots {
        return new Pilots(
            this.pilotId,
            this.nomPilot,
            this.edat,
            this.nacionalitat,
            this.escuderia,
            this.foto,
            this.posicio,
            this.punts,
            this.totalPunts,
            this.podiums,
            nouRendimentSec,
            nouRendimentPluja,
            nouRendimentMixt
        )
    }

}