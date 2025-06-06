import { Circuit } from "../entities/Circuit";
import { circuitSchema } from "../schemas/Circuit.schema";
import { IHelper } from "./IHelper";
import dataSource from "../dataSourceServer";
import { Equal } from "typeorm";

export class CircuitHelper extends IHelper<Circuit> {
    protected schema = circuitSchema
    protected connection = dataSource;

    async create(circuit: Circuit) {
        const repository = (await this.connection).getRepository(this.schema)
        const circuitCreado = await repository.save(circuit)

        return circuitCreado
    }

    async findById(id: string): Promise<Circuit | null> {
        const repository = (await this.connection).getRepository(this.schema)
        const circuit = await repository.findOneBy({ id: Equal(id) })

        return circuit
    }

    async findByNom(nom: string): Promise<Circuit | null> {
        const repository = (await this.connection).getRepository(this.schema)
        const circuit = await repository.findOneBy({ nom: Equal(nom) })

        return circuit
    }

    async findAll(): Promise<Circuit[]> {
        const repository = (await this.connection).getRepository(this.schema);
        const circuitsFindAll = await repository.find()

        return circuitsFindAll
    }

    async update(circuit: Circuit) {
        const repository = (await this.connection).getRepository(this.schema);
        const lligaFromDb = await repository.findOneBy({ id: Equal(circuit.id) })

        if (!lligaFromDb)

            return await repository.update({ id: Equal(circuit.id) }, circuit);
    }

    async delete(circuit: Circuit) {
        const repository = (await this.connection).getRepository(this.schema);

        await repository.remove(circuit);
    }

}