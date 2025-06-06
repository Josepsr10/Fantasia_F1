import { CursaService } from "./CursaService";
import { LligaService } from "./LligaService";
import { UsuariEnLligaService } from "./UsuariEnLligaService";
import { PilotsService } from "./PilotsService";
import { InvalidResultats } from "../errors/InvalidResultats";
import { PilotNotFound } from "../errors/PilotNotFound";

export class SimulacioService {
    constructor(
        private readonly cursaService: CursaService,
        private readonly lligaService: LligaService,
        private readonly usuariEnLligaService: UsuariEnLligaService,
        private readonly pilotsService: PilotsService
    ) { }

    async aplicarResultatsCursa(cursaId: string): Promise<void> {

        const cursa = await this.cursaService.findCursaById(cursaId);
        if (!cursa.resultats || cursa.resultats.length === 0) {
            throw new InvalidResultats("La carrera no tiene resultados definidos.");
        }

        const lligues = await this.lligaService.getAllLligues();
        for (const lliga of lligues) {
            await this.aplicarResultatsEnLliga(cursa.resultats, lliga.lligaId);
        }

        // Añadir esta línea para actualizar las posiciones después de procesar los resultados
        await this.actualizarPosicionesGenerales();
    }

    async aplicarResultatsEnLliga(resultats: { pilotId: string, posicio: number, punts: number }[], lligaId: string): Promise<void> {

        const usuarisEnLliga = await this.usuariEnLligaService.listOfUsuarisEnLliga(lligaId);

        for (const usuariEnLliga of usuarisEnLliga) {
            const pilotsUsuari = await this.usuariEnLligaService.getPilotsInfo(usuariEnLliga.usuariId, lligaId);

            for (const pilot of pilotsUsuari) {
                const resultatPilot = resultats.find(r => r.pilotId === pilot.pilotId);

                if (resultatPilot) {
                    await this.actualitzarPilot(
                        pilot.pilotId,
                        resultatPilot.punts,
                        resultatPilot.posicio
                    );
                }
            }
        }
    }

    async actualitzarPilot(pilotId: string, puntos: number, posicion: number): Promise<void> {

        const pilot = await this.pilotsService.getPilotById(pilotId);
        if (!pilot) {
            throw new PilotNotFound(`Piloto con ID: ${pilotId} no encotrado. `)
        }

        // Actualizar puntos
        let pilotActulizat = pilot.updatePunts(pilot.punts + puntos);

        // Actualizar total de puntos
        pilotActulizat = pilotActulizat.updateSumarTotalPunts(puntos);

        // Si quedó en podio, incrementar contador
        if (posicion <= 3) {
            pilotActulizat = pilotActulizat.updateIncrementarPodiums();
        }

        await this.pilotsService.updatePilot(pilotActulizat);
    }

    async actualizarPosicionesGenerales(): Promise<void> {
        // 1. Obtener todos los pilotos
        const pilotos = await this.pilotsService.getAllPilots();

        // 2. Ordenarlos por puntos (de mayor a menor)
        pilotos.sort((a, b) => b.punts - a.punts);

        // 3. Actualizar la posición de cada piloto
        for (let i = 0; i < pilotos.length; i++) {
            const pilotoActualizado = pilotos[i].updatePosicio(i + 1);
            await this.pilotsService.updatePilot(pilotoActualizado);
        }
    }
}