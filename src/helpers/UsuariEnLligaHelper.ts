import { UsuariEnLliga } from "../entities/UsuariEnLliga";
import { IHelper } from "./IHelper";
import { usuariEnLligaSchema } from "../schemas/UsuariEnLliga.schema";
import dataSource from "../dataSourceServer";
import { Equal } from "typeorm";
import { Pilots } from "../entities/Pilots";

export class UsuariEnLligaHelper extends IHelper<UsuariEnLliga> {
    protected schema = usuariEnLligaSchema;
    protected connection = dataSource;

    async createUsuariEnLliga(usuari: UsuariEnLliga) {
        const repository = (await this.connection).getRepository(this.schema);
        const crearUsuariEnLliga = await repository.save(usuari);
        return crearUsuariEnLliga;
    }

    async findUsuariEnLliga(usuariId: string, lligaId: string): Promise<UsuariEnLliga | null> {
        const repository = (await this.connection).getRepository(this.schema);
        const findUsuariEnLliga = await repository.findOneBy({
            usuariId: Equal(usuariId),
            lligaId: Equal(lligaId)
        });
        return findUsuariEnLliga;
    }

    async listOfUsuarisEnLliga(lligaId: string): Promise<UsuariEnLliga[]> {
        const repository = (await this.connection).getRepository(this.schema);
        const listOfLliguesByUsuaris = await repository.findBy({ lligaId: Equal(lligaId) });
        return listOfLliguesByUsuaris;
    }

    async listOfLliguesByUsuari(usuariId: string): Promise<UsuariEnLliga[]> {
        const repository = (await this.connection).getRepository(this.schema);
        const listOfLliguesByUsuaris = await repository.findBy({ usuariId: Equal(usuariId) });
        return listOfLliguesByUsuaris;
    }


    async update(usuariEnLliga: UsuariEnLliga): Promise<UsuariEnLliga | null> {
        const repository = (await this.connection).getRepository(this.schema);
        const usuariEnLligaFromDb = await repository.findOneBy({
            usuariId: Equal(usuariEnLliga.usuariId),
            lligaId: Equal(usuariEnLliga.lligaId)
        });

        if (!usuariEnLligaFromDb) return null;

        const usuariEnLligaActualitzat = await repository.save(usuariEnLliga);

        console.log(usuariEnLligaActualitzat)

        return usuariEnLligaActualitzat;
    }

    async addPilotToUsuari(usuariEnLliga: UsuariEnLliga, pilot: Pilots): Promise<UsuariEnLliga | null> {
        const repository = (await this.connection).getRepository(this.schema);
        
        const existeixUsuariEnLliga = await repository.findOneBy({
            usuariId: Equal(usuariEnLliga.usuariId),
            lligaId: Equal(usuariEnLliga.lligaId)
        });
    
        if (!existeixUsuariEnLliga) return null;
    
        const updatedUsuariEnLliga = usuariEnLliga.addPilot(pilot);
    
        const saveUsuariEnLliga = await repository.save(updatedUsuariEnLliga);
        
        return saveUsuariEnLliga;
    }

    async deleteUsuariDeLliga(usuariEnLliga: UsuariEnLliga) {
        const repository = (await this.connection).getRepository(this.schema);
        await repository.remove(usuariEnLliga);
    }

}