import { IHelper } from "./IHelper";
import dataSource from "../dataSourceServer";
import { Equal } from "typeorm";
import { Cursa } from "../entities/Cursa";
import { cursaSchema } from "../schemas/Cursa.schema";

export class CursaHelper extends IHelper<Cursa> {
    protected schema = cursaSchema
    protected connection = dataSource;

    async create(cursa: Cursa) {
        const repository = (await this.connection).getRepository(this.schema)
        const cursaCreada = await repository.save(cursa)

        return cursaCreada
    }

    async findById(id: string): Promise<Cursa | null> {

        const repository = (await this.connection).getRepository(this.schema)
        const cursa = await repository.findOneBy({ id: Equal(id) })

        return cursa
    }

    async findByNom(nom: string): Promise<Cursa | null> {

        const repository = (await this.connection).getRepository(this.schema)
        const cursa = await repository.findOneBy({ nom: Equal(nom) })

        return cursa
    }

    async findAll(): Promise<Cursa[]> {

        const repository = (await this.connection).getRepository(this.schema);
        const cursasFindAll = await repository.find()

        return cursasFindAll
    }

    async update(cursa: Cursa) {

        const repository = (await this.connection).getRepository(this.schema);
        const cursaFromDb = await repository.findOneBy({ id: Equal(cursa.id) })

        if (!cursaFromDb) return null

        return await repository.update({ id: Equal(cursa.id) }, cursa);
    }

    async delete(cursa: Cursa) {
        
        const repository = (await this.connection).getRepository(this.schema);

        await repository.remove(cursa);
    }

}