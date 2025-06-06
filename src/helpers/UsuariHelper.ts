import { Usuari } from "../entities/Usuari";
import { IHelper } from "./IHelper";
import { usuariSchema } from "../schemas/Usuari.schema";
import dataSource from "../dataSourceServer";
import { Equal } from "typeorm";
import { TipusRol } from "../types/usuari/TipusRol";

export class UsuariHelper extends IHelper<Usuari> {

    protected schema = usuariSchema;
    protected connection = dataSource;

    async createUser(usuari: Usuari) {
        const repository = (await this.connection).getRepository(this.schema);

        return await repository.save(usuari);
    }

    async findById(id: string): Promise<Usuari | null> {

        const repository = (await this.connection).getRepository(this.schema);
        const usuari = await repository.findOneBy({ usuariId: Equal(id) });

        return usuari;
    }

    async findByEmail(email: string): Promise<Usuari | null> {

        const repository = (await this.connection).getRepository(this.schema);
        const usuari = await repository.findOneBy({ correuElectronic: Equal(email) })

        return usuari;
    }

    async findByPassword(password: string): Promise<Usuari[]> {

        const repository = (await this.connection).getRepository(this.schema)
        return await repository.findBy({ contrasenyaUsuari: Equal(password) })
    }

    async update(usuari: Usuari) {

        const repository = (await this.connection).getRepository(this.schema);

        await repository.update({ usuariId: Equal(usuari.usuariId) }, usuari);
    }

    async updateRolById(usuariId: string, rol: TipusRol) {

        const repository = (await this.connection).getRepository(this.schema);

        await repository.update({ usuariId: Equal(usuariId) }, { rol: rol });

        /* const usuari = { usuariId: Equal(usuariId) } 
           const updateUsuari = { rol: rol }
           await repository.update(usuari, updateUsuari) 
        */
    }

    async delete(usuari: Usuari) {
        const repository = (await this.connection).getRepository(this.schema);

        await repository.remove(usuari);
    }
}