import { EntitySchema } from "typeorm";
import { Circuit } from "../entities/Circuit";

export const circuitSchema = new EntitySchema<Circuit>({
    name: 'Circuit',
    target: Circuit,
    tableName: 'circuits',
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
        localitzacio: {
            type: String
        },
        cursaId: {
            type: 'simple-json',
            default: []
        }
    }
});