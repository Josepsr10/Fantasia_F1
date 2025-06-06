import { Cursa } from "../entities/Cursa";
import { CircuitNotFound } from "../errors/CircuitNotFound";
import { CursaJaExisteix } from "../errors/CursaJaExisteix";
import { CursaHelper } from "../helpers/CursaHelper";
import { TipusClima } from "../types/cursa/clima";
import { v4 as uuidv4 } from 'uuid';
import { CircuitService } from "./CircuitService";
import { InvalidCursaNom } from "../errors/InvalidCursaNom";
import { InvalidVoltesNumber } from "../errors/InvalidVoltesNumber";
import { TipusClimaInvalid } from "../errors/TipusClimaInvalid";
import { CursaNotFound } from "../errors/CursaNotFound";
import { InvalidCursaId } from "../errors/InvalidCursaId";
import { InvalidIdPilot } from "../errors/InvalidIdPilot";
import { InvalidResultats } from "../errors/InvalidResultats";

export class CursaService {
    constructor(
        private readonly helper: CursaHelper,
        private readonly circuitService: CircuitService
    ) { }

    async createCursa(
        creadorId: string,
        nom: string,
        fecha: Date,
        circuitId: string,
        tipusClima: TipusClima,
        voltes: number,
        pilotsId: string[]
    ): Promise<Cursa> {

        if (!nom || nom.trim() === '') {
            throw new InvalidCursaNom("El nombre de la carrera es requerido y no puede estar vacío.");
        }

        if (voltes <= 0) {
            throw new InvalidVoltesNumber("El número de vueltas debe ser mayor que cero.");
        }

        if (!Object.values(TipusClima).includes(tipusClima)) {
            throw new TipusClimaInvalid(`Tipo de clima no válido. Debe ser: ${Object.values(TipusClima).join(', ')}`);
        }

        const existeixCircuit = await this.circuitService.findCircuitById(circuitId);
        if (!existeixCircuit) {
            throw new CircuitNotFound(`No se encuentra el circuito con ID: ${circuitId}.`);
        }

        const existeixCursa = await this.helper.findByNom(nom);
        if (existeixCursa) {
            throw new CursaJaExisteix(`La carrera ${nom} ya existe.`);
        }

        const cursaId = uuidv4();

        const novaCursa = Cursa.create(
            creadorId,
            cursaId,
            nom,
            fecha,
            circuitId,
            tipusClima,
            voltes,
            pilotsId
        );

        await this.helper.create(novaCursa);

        // Actualizar el circuito para incluir la referencia a esta carrera
        await this.circuitService.afegirCursaACircuit(circuitId, cursaId);

        return novaCursa;
    }

    async findCursaById(cursaId: string): Promise<Cursa> {

        if (!cursaId || cursaId.trim() === '') {
            throw new InvalidCursaId("El ID de la carrera es requerido y no puede estar vacío.");
        }

        const cursa = await this.helper.findById(cursaId);
        if (!cursa) {
            throw new CursaNotFound(`No existe la carrera con ID: ${cursaId}.`);
        }

        return cursa;
    }

    async findAllCurses(): Promise<Cursa[]> {
        return await this.helper.findAll();
    }

    async updateResultats(cursaId: string, resultats: { pilotId: string, posicio: number, punts: number }[]): Promise<Cursa> {
        
        if (!cursaId || cursaId.trim() === '') {
            throw new InvalidCursaId("El ID de la carrera es requerido y no puede estar vacio.");
        }

        const cursa = await this.helper.findById(cursaId);
        if (!cursa) {
            throw new CursaNotFound(`No se encuentra la carrera con ID: ${cursaId}.`);
        }

        // Verificar que los pilotos y sus resultats existen en la carrera
        for (const resultat of resultats) {
            if (!cursa.pilotIds.includes(resultat.pilotId)) {
                throw new InvalidResultats(`El piloto con ID: ${resultat.pilotId} no esta asignado a esta carrera.`);
            }
        }

        const cursaActualizada = cursa.updateResultats(resultats);

        // Usar el método update del helper
        await this.helper.update(cursaActualizada);

        return cursaActualizada;
    }
}