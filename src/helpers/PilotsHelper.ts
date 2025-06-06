import { Pilots } from "../entities/Pilots";
import { pilotsSchema } from "../schemas/Pilots.schema";
import { IHelper } from "./IHelper";
import { Equal } from "typeorm";
import dataSource from "../dataSourceServer";

export class PilotsHelper extends IHelper<Pilots> {
    protected schema = pilotsSchema
    protected connection = dataSource

    async create(pilots: Pilots) {

        const repository = (await this.connection).getRepository(this.schema)
        const crearPilots = await repository.save(pilots)

        return crearPilots
    }

    async findById(id: string): Promise<Pilots | null> {

        const repository = (await this.connection).getRepository(this.schema)
        const pilot = await repository.findOneBy({ pilotId: Equal(id)})

        return pilot
    }

    async findAll(): Promise<Pilots[]> {

        const  repository = (await this.connection).getRepository(this.schema)
        const allPilots = await repository.find()

        return allPilots
    }

    async update(pilot: Pilots): Promise<Pilots | null> {

        const repository = (await this.connection).getRepository(this.schema)
    
        const pilotFromDb = await repository.findOneBy({pilotId: Equal(pilot.pilotId)})
        if (!pilotFromDb) return null
        
        const pilotActualitzat = await repository.save(pilot)

        return pilotActualitzat
    }

    async delete(pilotId: string): Promise<Pilots | null> {

        const repository = (await this.connection).getRepository(this.schema);
        
        const pilot = await repository.findOneBy({pilotId: Equal(pilotId)});
        if (!pilot) return null;
        
        return await repository.remove(pilot);
    }
}