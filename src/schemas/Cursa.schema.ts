import { EntitySchema } from "typeorm";
import { Cursa } from "../entities/Cursa";
import { TipusClima } from "../types/cursa/clima";

export const cursaSchema = new EntitySchema<Cursa>({
    name: 'Cursa',
    target: Cursa,
    tableName: 'curses',
    columns: {
        creadorId: {
            type: String
        },
        id: {
            type: String,
            primary: true
        },
        nom: {
            type: String
        },
        fecha: {
            type: Date
        },
        circuitId: {
            type: String
        },
        tipusClima: {
            type: "enum",
            enum: TipusClima
        },
        voltes: {
            type: Number
        },
        pilotIds: {
            type: 'simple-json',
            default: []
        },
        resultats: {
            type: 'simple-json',
            default: []
        }
    }
});