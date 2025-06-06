import { EntitySchema } from "typeorm";
import { Usuari } from "../entities/Usuari";
import { TipusRol } from "../types/usuari/TipusRol";

export const usuariSchema = new EntitySchema<Usuari>({
    name: 'Usuari',
    target: Usuari,
    tableName: 'usuaris',
    columns: {
        usuariId: {
            type: String,
            primary: true
        },
        nomUsuari: {
            type: String
        },
        correuElectronic: {
            type: String,
            unique: true
        },
        contrasenyaUsuari: {
            type: String
        },
        imatgePerfil: {
            type: Boolean,
            default: false
        },
        rol: {
            type: "enum",
            enum: TipusRol
        }
    }
});