import { Circuit } from "../entities/Circuit";
import { CircuitJaExistent } from "../errors/CircuitJaExisteix";
import { CircuitHelper } from "../helpers/CircuitHelper";
import { v4 as uuidv4 } from 'uuid';
import { CircuitNotFound } from "../errors/CircuitNotFound";
import { InvalidCircuitNom } from "../errors/InvalidCircuitNom";
import { InvalidCircuitLocalitzacio } from "../errors/InvalidCircuitLocalitzacio";
import { InvalidIdCircuit } from "../errors/InvalidIdCircuit";
import { InvalidCursaId } from "../errors/InvalidCursaId";

export class CircuitService {
    constructor(
        private readonly helper: CircuitHelper,
    ) { }

    async createCircuit(creadorId: string, nom: string, localitzacio: string, ): Promise<Circuit> {

        if (!nom || nom.trim() === '') {
            throw new InvalidCircuitNom("El nombre del circuito es requerido y no puede estar vacio.");
        }

        if (!localitzacio || localitzacio.trim() === '') {
            throw new InvalidCircuitLocalitzacio("La localización del circuito es requerida y no puede estar vacia.");
        }

        const existeixCircuit = await this.helper.findByNom(nom);
        if (existeixCircuit) {
            throw new CircuitJaExistent(`El circuito ${nom} ya existe.`);
        }

        const circuitId = uuidv4();

        const crearCircuit = Circuit.create(
            creadorId,
            circuitId,
            nom,
            localitzacio,
        );

        await this.helper.create(crearCircuit);

        return crearCircuit;
    }

    async findCircuitById(circuitId: string): Promise<Circuit> {

        if (!circuitId || circuitId.trim() === '') {
            throw new InvalidIdCircuit("El ID del circuito es requerido y no puede estar vacio.");
        }

        const existeixCircuit = await this.helper.findById(circuitId);
        if (!existeixCircuit) {
            throw new CircuitNotFound(`No existe el circuito con ID: ${circuitId}.`);
        }

        return existeixCircuit;
    }

    async findAllCircuits(): Promise<Circuit[]> {
        const circuits = await this.helper.findAll();
        return circuits;
    }

    async afegirCursaACircuit(circuitId: string, cursaId: string): Promise<Circuit> {

        if (!circuitId || circuitId.trim() === '') {
            throw new InvalidIdCircuit("El ID del circuito es requerido y no puede estar vacio.");
        }

        if (!cursaId || cursaId.trim() === '') {
            throw new InvalidCursaId("El ID de la carrera es requerido y no puede estar vacio.");
        }

        const existeixCircuit = await this.helper.findById(circuitId);
        if (!existeixCircuit) {
            throw new CircuitNotFound(`No existe el circuito con ID: ${circuitId}.`);
        }

        const circuitActualitzat = new Circuit(
            existeixCircuit.id,
            existeixCircuit.nom,
            existeixCircuit.localitzacio,
            existeixCircuit.creadorId,
            [...existeixCircuit.cursaId, cursaId]
        );

        await this.helper.update(circuitActualitzat);

        return circuitActualitzat;
    }
}