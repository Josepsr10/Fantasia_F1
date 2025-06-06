import { EntitySchema } from "typeorm";
import { Pilots } from "../entities/Pilots";

export const pilotsSchema = new EntitySchema<Pilots>({
    name: 'Pilots',
    target: Pilots,
    tableName: 'pilots',
    columns: {
        pilotId: {
            type: String,
            primary: true
        },
        nomPilot: {
            type: String
        },
        edat: {
            type: Number,
        },
        nacionalitat: {
            type: String,
        },
        escuderia: {
            type: String
        },
        foto: {
            type: String
        },
        posicio: {
            type: Number
        },
        punts: {
            type: Number
        },
        totalPunts: {
            type: Number
        },
        podiums: {
            type: Number
        },
        rendimentSec: {
            type: Number
        },
        rendimentPluja: {
            type: Number
        },
        rendimentMixt: {
            type: Number
        }
    },
});