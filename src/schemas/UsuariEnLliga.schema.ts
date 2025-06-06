import { EntitySchema } from "typeorm";
import { UsuariEnLliga } from "../entities/UsuariEnLliga";

export const usuariEnLligaSchema = new EntitySchema<UsuariEnLliga>({
    name: 'UsuariEnLliga',
    target: UsuariEnLliga,
    tableName: 'usuaris_en_lligues',
    columns: {
        usuariId: {
            type: String,
            primary: true
        },
        lligaId: {
            type: String,
            primary: true
        },
        monedes: {
            type: Number
        },
        pilotsIds: {
            type: 'simple-json',
            default: []
        }
    }
});