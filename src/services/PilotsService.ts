import { Pilots } from "../entities/Pilots";
import { PilotsHelper } from "../helpers/PilotsHelper";

export class PilotsService {
    constructor(private readonly helper: PilotsHelper) { }

    async creaarPilot(
        pilotId: string,
        nomPilot: string,
        edat: number,
        nacionalitat: string,
        escuderia: string,
        foto: string,
        rendimentSec: number,
        rendimentPluja: number,
        rendimentMixt: number
    ): Promise<Pilots> {
        const newPilot = Pilots.create(
            pilotId,
            nomPilot,
            edat,
            nacionalitat,
            escuderia,
            foto,
            rendimentSec,
            rendimentPluja,
            rendimentMixt
        );

        return await this.helper.create(newPilot);
    }

    async getPilotById(pilotId: string): Promise<Pilots | null> {
        return await this.helper.findById(pilotId);
    }

    async getAllPilots(): Promise<Pilots[]> {
        return await this.helper.findAll();
    }

    async updatePilotEdat(pilotId: string, novaEdat: number): Promise<Pilots | null> {
        const pilot = await this.helper.findById(pilotId);
        if (!pilot) return null;

        const updatedPilot = pilot.updateEdat(novaEdat);
        return await this.helper.update(updatedPilot);
    }

    async updatePilotEscuderia(pilotId: string, novaEscuderia: string): Promise<Pilots | null> {
        const pilot = await this.helper.findById(pilotId);
        if (!pilot) return null;

        const updatedPilot = pilot.updateEscuderia(novaEscuderia);
        return await this.helper.update(updatedPilot);
    }

    async deletePilot(pilotId: string): Promise<Pilots | null> {
        return await this.helper.delete(pilotId);
    }

    async updatePilotRendiments(
        pilotId: string,
        nouRendimentSec: number,
        nouRendimentPluja: number,
        nouRendimentMixt: number
    ): Promise<Pilots | null> {

        const pilot = await this.helper.findById(pilotId);
        if (!pilot) return null;

        const updatedPilot = pilot.updateRendiments(
            nouRendimentSec,
            nouRendimentPluja,
            nouRendimentMixt
        );

        return await this.helper.update(updatedPilot);
    }

    async updatePilot(pilot: Pilots): Promise<Pilots | null> {
        return await this.helper.update(pilot);
    }
}