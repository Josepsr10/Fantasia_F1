import { EntitySchema } from "typeorm";
import { Lliga } from "../entities/Lliga";
import { TipusLliga } from "../types/lliga/TipusLliga";

export const lligaSchema = new EntitySchema<Lliga>({
    name: 'Lliga',
    target: Lliga,
    tableName: 'lligues',
    columns: {
        creadorId:{
            type: String
        },
        lligaId: {
            type: String,
            primary: true
        },
        nomLliga: {
            type: String
        },
        tipusLliga: {
            type: "enum",
            enum: TipusLliga
        },
        contrasenya: {
            type: String,
            nullable: true
        }
    },
});