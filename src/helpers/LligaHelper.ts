import { Lliga } from "../entities/Lliga";
import { IHelper } from "./IHelper";
import { lligaSchema } from "../schemas/Lliga.schema";
import dataSource from "../dataSourceServer";
import { Equal } from "typeorm";
import { TipusLliga } from "../types/lliga/TipusLliga";
import { UsuariEnLligaHelper } from "./UsuariEnLligaHelper";

export class LligaHelper extends IHelper<Lliga> {
    protected schema = lligaSchema;
    protected connection = dataSource;


    async create(lliga: Lliga) {
        const repository = (await this.connection).getRepository(this.schema);

        const lligaCreada = await repository.save(lliga);

        return lligaCreada
    }

    async findById(id: string): Promise<Lliga | null> {
        const repository = (await this.connection).getRepository(this.schema);

        const lligaFindById = await repository.findOneBy({ lligaId: Equal(id) });

        return lligaFindById
    }

    async findByNom(nom: string): Promise<Lliga | null> {
        const repository = (await this.connection).getRepository(this.schema);

        const lliga = await repository.findOneBy({ nomLliga: Equal(nom) });

        return lliga;
    }

    async findAll(): Promise<Lliga[]> {
        const repository = (await this.connection).getRepository(this.schema);

        const lliguesFindAll = await repository.find()

        return lliguesFindAll
    }

    async findByTipus(tipus: TipusLliga): Promise<Lliga[]> {
        const repository = (await this.connection).getRepository(this.schema);

        const lliguesFindByTipus = await repository.findBy({ tipusLliga: Equal(tipus) });

        return lliguesFindByTipus
    }

    async findLliguesCreatedByUsuari(usuariId: string): Promise<Lliga[]> {
        const repository = (await this.connection).getRepository(this.schema);

        const lliguesOfUsuari = await repository.findBy({ creadorId: Equal(usuariId) });

        return lliguesOfUsuari;
    }
/*
    // En LligaHelper.ts
    async findLliguesOnUsuariParticipa(usuariId: string): Promise<Lliga[]> {
        // Obtener primero las ligas donde el usuario participa
        const usuariEnLligaHelper = new UsuariEnLligaHelper(); // O como lo tengas configurado
        const relacions = await usuariEnLligaHelper.listOfLliguesByUsuari(usuariId);

        // Si no hay relaciones, devolver un array vacío
        if (relacions.length === 0) {
            return [];
        }

        // Buscar cada liga individualmente
        const lligues: Lliga[] = [];
        for (const relacio of relacions) {
            const lliga = await this.findById(relacio.lligaId);
            if (lliga) {
                lligues.push(lliga);
            }
        }

        return lligues;
    }*/



    async update(lliga: Lliga) {
        const repository = (await this.connection).getRepository(this.schema);

        const lligaFromDb = await repository.findOneBy({ lligaId: Equal(lliga.lligaId) })

        if (!lligaFromDb) return null

        return await repository.update({ lligaId: Equal(lliga.lligaId) }, lliga);
    }

    async delete(lliga: Lliga) {
        const repository = (await this.connection).getRepository(this.schema);

        await repository.remove(lliga);
    }

}