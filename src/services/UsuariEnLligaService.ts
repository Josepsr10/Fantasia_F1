import { UsuariEnLliga } from "../entities/UsuariEnLliga";
import { UsuariEnLligaHelper } from "../helpers/UsuariEnLligaHelper";
import { Pilots } from "../entities/Pilots";
import { PilotsService } from "./PilotsService";
import { UsuariEnLligaJaExisteix } from "../errors/UsuariEnLligaJaExisteix";
import { UsuariNotFound } from "../errors/UsuariNotFound";
import { UsuariAmbPilots } from "../errors/UsuarioAmbPilots";
import { LligaService } from "./LligaService";
import { LligaNotFound } from "../errors/LligaNotFound";
import { PilotJaExisteix } from "../errors/PilotJaExisteix";
import { UsuariNoEnLliga } from "../errors/UsuariNoEnLliga";
import { TipusLliga } from "../types/lliga/TipusLliga";
import { ContrasenyaAcces } from "../errors/ContrasenyaAcces";
import { ContrasenyaIncorrect } from "../errors/ContrasenyaIncorrect";
import { InvalidIdUsuari } from "../errors/InvalidIdUsuari";
import { InvalidIdLliga } from "../errors/InvalidIdLliga";
import { InvalidIdPilot } from "../errors/InvalidIdPilot";
import { Lliga } from "../entities/Lliga";

export class UsuariEnLligaService {
    constructor(
        private readonly helper: UsuariEnLligaHelper,
        private readonly pilotService: PilotsService,
        private readonly lligaService: LligaService
    ) { }

    async create(usuariId: string, lligaId: string, contrasenya?: string): Promise<UsuariEnLliga> {

        if (!usuariId || usuariId.trim() === '') {
            throw new InvalidIdUsuari("El ID de usuario es requerido y no puede estar vacio.");
        }

        if (!lligaId || lligaId.trim() === '') {
            throw new InvalidIdLliga("El ID de liga es requerido y no puede estar vacio.");
        }

        const lliga = await this.lligaService.getLligaById(lligaId);

        const existeixUsuariEnLliga = await this.helper.findUsuariEnLliga(usuariId, lligaId);
        if (existeixUsuariEnLliga) {
            throw new UsuariEnLligaJaExisteix(`El usuario con ID: ${usuariId} en la liga con ID:  ${lligaId} ya existe.`);
        }

        if (lliga.tipusLliga === TipusLliga.PRIVADA) {
            if (!contrasenya) {
                throw new ContrasenyaAcces("Se requiere contraseña para unirse a una liga privada.");
            }

            if (contrasenya !== lliga.contrasenya) {
                throw new ContrasenyaIncorrect("La contraseña proporcionada es incorrecta.");
            }
        }

        const pilotsInicials = await this.seleccionarPilotosAleatorios(4);
        const nouUsuari = UsuariEnLliga.create(usuariId, lligaId, pilotsInicials.map(x => x.pilotId));

        await this.helper.createUsuariEnLliga(nouUsuari);

        return nouUsuari;
    }

    async assignarPilots(usuariId: string, lligaId: string, pilots?: Pilots[]): Promise<UsuariEnLliga> {

        let usuariEnLliga = await this.helper.findUsuariEnLliga(usuariId, lligaId);
        if (!usuariEnLliga) {
            throw new UsuariNotFound(`Usuario con id ${usuariId} no encontrado en la liga con id ${lligaId}.`);
        }

        if (usuariEnLliga.pilotsIds.length > 0) {
            throw new UsuariAmbPilots(`El usuario ya tiene pilotos asignados.`);
        }

        let pilotsAAssignar: Pilots[];
        if (pilots && pilots.length > 0) {
            pilotsAAssignar = pilots;
        } else {
            pilotsAAssignar = await this.seleccionarPilotosAleatorios(4);
        }

        console.log("Pilotos seleccionados:", pilotsAAssignar);

        for (const pilot of pilotsAAssignar) {
            usuariEnLliga = usuariEnLliga.addPilot(pilot);
        }

        await this.helper.update(usuariEnLliga);

        return usuariEnLliga;
    }

    async seleccionarPilotosAleatorios(cantidad: number): Promise<Pilots[]> {

        const todosLosPilotos = await this.pilotService.getAllPilots();
        if (todosLosPilotos.length < cantidad) {
            throw new Error(`No hay suficientes pilotos disponibles.`);
        }

        const idsSeleccionados: string[] = [];
        const pilotosSeleccionados: Pilots[] = [];

        while (pilotosSeleccionados.length < cantidad) {

            const random = Math.floor(Math.random() * todosLosPilotos.length);
            const piloto = todosLosPilotos[random];

            if (!idsSeleccionados.includes(piloto.pilotId)) {

                idsSeleccionados.push(piloto.pilotId);
                pilotosSeleccionados.push(piloto);
            }
        }

        return pilotosSeleccionados;
    }

    async getFindUsuariEnLliga(usuariId: string, lligaId: string): Promise<UsuariEnLliga> {

        const usuariEnLliga = await this.helper.findUsuariEnLliga(usuariId, lligaId);
        if (!usuariEnLliga) {
            throw new UsuariNotFound(`Usuario con ID: ${usuariId} no encontrado en la liga con id ${lligaId}`);
        }

        return usuariEnLliga;
    }

    async findLliguesOnUsuariParticipa(usuariId: string): Promise<Lliga[]> {
        if (!usuariId || usuariId.trim() === '') {
            throw new InvalidIdUsuari('El ID del Usuario no puede estar vacío.');
        }

        // Aquí usamos this directamente porque estamos en UsuariEnLligaService
        const lliguesOnParticipaUsuari = await this.getLliguesDeUsuari(usuariId);

        const response: Lliga[] = [];

        for (const usuari of lliguesOnParticipaUsuari) {
            // Usamos this.lligaService porque es una propiedad de UsuariEnLligaService
            response.push(await this.lligaService.getLligaById(usuari.lligaId));
        }
        return response;
    }

    async getLliguesDeUsuari(usuariId: string): Promise<UsuariEnLliga[]> {
        return await this.helper.listOfLliguesByUsuari(usuariId);
    }

    async getPilotInfo(usuariId: string, lligaId: string, pilotId: string): Promise<Pilots | null> {

        const usuariEnLliga = await this.helper.findUsuariEnLliga(usuariId, lligaId);
        if (!usuariEnLliga) {
            throw new UsuariNotFound(`Usuario con ID: ${usuariId} no encontrado en la liga con ID: ${lligaId}.`);
        }

        const pilot = await this.pilotService.getPilotById(pilotId);
        if (!usuariEnLliga.pilotsIds.includes(pilotId)) {
            throw new InvalidIdPilot(`El piloto con ID: ${pilotId} no pertenece al usuario en esta liga.`);
        }

        return pilot;
    }

    async getPilotsInfo(usuariId: string, lligaId: string): Promise<Pilots[]> {

        const usuariEnLliga = await this.helper.findUsuariEnLliga(usuariId, lligaId);
        if (!usuariEnLliga) {
            throw new UsuariNotFound(`Usuario con id ${usuariId} no encontrado en la liga con id ${lligaId}`);
        }

        const pilots: Pilots[] = [];
        for (const pilotId of usuariEnLliga.pilotsIds) {
            const pilot = await this.pilotService.getPilotById(pilotId);
            if (pilot) {
                pilots.push(pilot);
            }
        }

        return pilots;
    }
    async getAllPilotsInfoByUsuari(usuariId: string): Promise<Pilots[]> {

        if (!usuariId || usuariId.trim() === '') {
            throw new InvalidIdUsuari(`El ID: ${usuariId} no puede estar vacío.`);
        }

        const lliguesUsuari = await this.getLliguesDeUsuari(usuariId);

        if (lliguesUsuari.length === 0) {
            throw new LligaNotFound(`Ligas no encontradas.`)
        }

        // Array para evitar duplicados de pilotos entre ligas
        const idsYaAgregados: string[] = [];
        const todosLosPilotos: Pilots[] = [];

        for (const usuariEnLliga of lliguesUsuari) {
            const pilotsInfo = await this.getPilotsInfo(usuariId, usuariEnLliga.lligaId);

            for (const pilot of pilotsInfo) {
                if (!idsYaAgregados.includes(pilot.pilotId)) {
                    idsYaAgregados.push(pilot.pilotId);
                    todosLosPilotos.push(pilot);
                }
            }
        }

        return todosLosPilotos;
    }


    async afegirPilotAUsuari(usuariId: string, lligaId: string, pilotId: Pilots): Promise<UsuariEnLliga> {

        const usuariEnLliga = await this.helper.findUsuariEnLliga(usuariId, lligaId);
        if (!usuariEnLliga) {
            throw new UsuariNotFound(`Usuario con ID: ${usuariId} no se encuentra en la liga con ID: ${lligaId}`);
        }

        const lligaExistent = await this.lligaService.getLligaById(lligaId);
        if (!lligaExistent) {
            throw new LligaNotFound(`La liga ${lligaId} no existe`);
        }

        const pilotExistent = usuariEnLliga.pilotsIds.includes(pilotId.pilotId);
        if (pilotExistent) {
            throw new PilotJaExisteix('Este piloto ya está en tu lista');
        }

        const actualitzarLlistaPilotsdelUsuari = usuariEnLliga.addPilot(pilotId);

        await this.helper.update(actualitzarLlistaPilotsdelUsuari);

        return actualitzarLlistaPilotsdelUsuari;
    }

    async eliminarPilotDeUsuari(usuariId: string, lligaId: string, pilotId: string): Promise<UsuariEnLliga> {
        const usuariEnLliga = await this.helper.findUsuariEnLliga(usuariId, lligaId);

        if (!usuariEnLliga) {
            throw new Error(`Usuario con ID: ${usuariId} no encontrado en la liga con ID: ${lligaId}`);
        }

        const usuariActualitzat = usuariEnLliga.deletePilot(pilotId);

        await this.helper.update(usuariActualitzat);

        return usuariActualitzat;
    }

    async listOfUsuarisEnLliga(lligaId: string): Promise<UsuariEnLliga[]> {
        const lliga = await this.lligaService.getLligaById(lligaId);
        if (!lliga) {
            throw new LligaNotFound(`Liga con ID: ${lligaId} no encontrado.`);
        }

        return await this.helper.listOfUsuarisEnLliga(lligaId);
    }

    async updateMonedes(usuariId: string, lligaId: string, monedes: number): Promise<UsuariEnLliga> {
        const usuariEnLliga = await this.helper.findUsuariEnLliga(usuariId, lligaId);

        if (!usuariEnLliga) {
            throw new Error(`Usuario con id ${usuariId} no encontrado en la liga con id ${lligaId}`);
        }

        const updatedUser = usuariEnLliga.updateMonedes(monedes);

        await this.helper.update(updatedUser);

        return updatedUser;
    }

    async delete(usuariId: string, lligaId: string): Promise<UsuariEnLliga> {

        await this.lligaService.getLligaById(lligaId);

        const usuariEnLliga = await this.helper.findUsuariEnLliga(usuariId, lligaId);
        if (!usuariEnLliga) {
            throw new UsuariNoEnLliga(`El usuario con ID: ${usuariId} no está registrado en la liga con ID: ${lligaId}.`);
        }

        await this.helper.deleteUsuariDeLliga(usuariEnLliga);

        return usuariEnLliga;
    }

}