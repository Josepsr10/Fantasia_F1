import { QuantitatMonedes } from "../types/usuari-en-lliga/QuantitatMonedes";
import { Pilots } from "./Pilots";

export class UsuariEnLliga {
    constructor(
        readonly usuariId: string,
        readonly lligaId: string,
        readonly monedes: number = QuantitatMonedes.TEMPORADA1,
        readonly pilotsIds: string[] = []
    ) {}

    static create(
        usuariId: string,
        lligaId: string,
        pilotsIds: string[]
    ): UsuariEnLliga {
        return new UsuariEnLliga(
            usuariId,
            lligaId,
            QuantitatMonedes.TEMPORADA1,
            pilotsIds
        );
    }
    
    addPilot(pilot: Pilots): UsuariEnLliga {
        return new UsuariEnLliga(
            this.usuariId,
            this.lligaId,
            this.monedes,
            [...this.pilotsIds, pilot.pilotId]
        );
    }
    
    deletePilot(pilotId: string): UsuariEnLliga {
        const pilotsActualitzats = this.pilotsIds.filter(pilot => pilot !== pilotId);
        return new UsuariEnLliga(
            this.usuariId,
            this.lligaId,
            this.monedes,
            pilotsActualitzats
        );
    }
    
    updateMonedes(nouValor: number): UsuariEnLliga {
        return new UsuariEnLliga(
            this.usuariId,
            this.lligaId,
            nouValor,
            this.pilotsIds
        );
    }

    delete(): UsuariEnLliga {
        return new UsuariEnLliga(
            this.usuariId,
            this.lligaId,
            this.monedes,
            this.pilotsIds
        );
    } 
}