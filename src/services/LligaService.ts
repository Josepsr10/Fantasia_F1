import { Lliga } from "../entities/Lliga";
import { ContrasenyaAcces } from "../errors/ContrasenyaAcces";
import { InvalidIdLliga } from "../errors/InvalidIdLliga";
import { InvalidLligaNom } from "../errors/InvalidLligaNom";
import { InvalidLligaType } from "../errors/InvalidLligaType";
import { LligaJaExisteix } from "../errors/LligaJaExisteix";
import { LligaNotFound } from "../errors/LligaNotFound";
import { LligaHelper } from "../helpers/LligaHelper";
import { TipusLliga } from "../types/lliga/TipusLliga";
import { v4 as uuidv4 } from 'uuid';
import { UsuariService } from "./UsuariService";
import { UsuariNotFound } from "../errors/UsuariNotFound";
import { InvalidIdUsuari } from "../errors/InvalidIdUsuari";
import { UsuariEnLligaService } from "./UsuariEnLligaService";

export class LligaService {

    constructor(
        private readonly lligaHelper: LligaHelper,
        private readonly usuariService: UsuariService,
       
    ) { }

    async createLliga(
        creadorId: string,
        nomLliga: string,
        tipus: TipusLliga,
        contrasenya?: string
    ): Promise<Lliga> {

        if (!nomLliga || nomLliga.trim() === '') {
            throw new InvalidLligaNom('El nombre de la liga no puede estar vacío.');
        }

        const lligaExistent = await this.lligaHelper.findByNom(nomLliga);
        if (lligaExistent) {
            throw new LligaJaExisteix(`Ya existe una liga con el nombre ${nomLliga}.`);
        }

        if (tipus !== TipusLliga.PUBLICA && tipus !== TipusLliga.PRIVADA) {
            throw new InvalidLligaType("El tipo de liga no es Publica ni Privada.")
        }

        if (tipus === TipusLliga.PRIVADA && !contrasenya) {
            throw new ContrasenyaAcces("La liga privada, necesita contraseña.")
        }

        const lligaId = uuidv4();

        const novaLliga = Lliga.create(
            creadorId,
            lligaId,
            nomLliga,
            tipus,
            contrasenya
        );

        console.log('Lliga creada:', novaLliga);

        await this.lligaHelper.create(novaLliga);

        return novaLliga;
    }

    async getLligaById(id: string): Promise<Lliga> {

        if (!id || id.trim() === '') {
            throw new InvalidIdLliga('El ID de la liga no puede estar vacío.');
        }

        const lliga = await this.lligaHelper.findById(id);
        if (!lliga) throw new LligaNotFound(`Liga con ID: ${id} no fue encontrada.`);

        return lliga;
    }

    async findLliguesCreatedByUsuari(usuariId: string): Promise<Lliga[]> {

        if (!usuariId || usuariId.trim() === '') {
            throw new InvalidIdUsuari('El ID del Usuario no puede estar vacío.');
        }

        const usuariExistent = await this.usuariService.getUsuariById(usuariId);
        if (!usuariExistent) {
            throw new UsuariNotFound(`El usuario no fue encontrado.`);
        }

        const lligues = await this.lligaHelper.findLliguesCreatedByUsuari(usuariId);

        return lligues;
    }

    async getAllLligues(): Promise<Lliga[]> {

        console.log('Obteniendo todas las ligas: ');
        return await this.lligaHelper.findAll();
    }

    async getLliguesByTipus(tipus: string | TipusLliga, lligaId: string): Promise<Lliga[]> {
        // Normalizar el tipo a mayúsculas
        const tipusNormalizado = typeof tipus === 'string' ? tipus.toUpperCase() : tipus;

        const lligaExistent = await this.lligaHelper.findById(lligaId)
        if (!lligaExistent) {
            throw new InvalidIdLliga(`El ID de la liga no puede estar vacío o no existe.`)
        }

        if (tipusNormalizado !== TipusLliga.PUBLICA && tipusNormalizado !== TipusLliga.PRIVADA) {
            throw new InvalidLligaType(`El tipo de liga '${tipus}' no es válido. Debe ser '${TipusLliga.PUBLICA}' o '${TipusLliga.PRIVADA}'.`);
        }

        return await this.lligaHelper.findByTipus(tipusNormalizado as TipusLliga);
    }

    async updateLligaNom(id: string, nouNom: string): Promise<Lliga> {

        if (!nouNom || nouNom.trim() === '') {
            throw new InvalidLligaNom('El nuevo nombre de la liga, no puede estar vacio.');
        }

        const lliga = await this.getLligaById(id);

        const lligaAmbNouNom = await this.lligaHelper.findByNom(nouNom);
        if (lligaAmbNouNom) {
            throw new LligaJaExisteix(`Ya existe una liga con el nombre: ${nouNom}`);
        }

        lliga.updateNom(nouNom);

        await this.lligaHelper.update(lliga);

        console.log(`Liga actualizada, ID: ${id} con nuevo Nombre: ${nouNom}`);

        return lliga;
    }

}