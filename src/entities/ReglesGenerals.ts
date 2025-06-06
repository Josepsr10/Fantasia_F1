export class Rules {
    constructor(
        readonly id: string,                     // Identificador único de reglas
        readonly pointsPerPosition: { [position: number]: number },  // Sistema de puntuación por posición
        readonly bonusPoints: { [event: string]: number },           // Bonificaciones (ej. vuelta rápida)
        readonly penalties: { [infraction: string]: number },       // Penalizaciones (DNF, bandera negra, etc.)
        readonly circuitPerformance: { [circuitType: string]: number }, // Rendimiento en circuitos (seco, lluvia, mixto)
        readonly specialPenalties?: { [event: string]: number }     // Penalizaciones opcionales (pit lane, boxes, etc.)
    ) {}

    static create(id: string): Rules {
        return new Rules(
            id,
            { 1: 10, 2: 9, 3: 8, 4: 7, 5: 6, 6: 5, 7: 4, 8: 3, 9: 2, 10: 1 },
            { "fastestLap": 1 },
            { "DNF": -1, "blackFlag": -3 },
            { "dry": 0, "rain": 0, "mixed": 0 },
            { "pitLaneSpeeding": -5, "trackLimits": -2 }
        );
    }

    updatePointsPerPosition(newPoints: { [position: number]: number }): Rules {
        return new Rules(
            this.id,
            newPoints,
            this.bonusPoints,
            this.penalties,
            this.circuitPerformance,
            this.specialPenalties
        );
    }

    updateBonusPoints(newBonusPoints: { [event: string]: number }): Rules {
        return new Rules(
            this.id,
            this.pointsPerPosition,
            newBonusPoints,
            this.penalties,
            this.circuitPerformance,
            this.specialPenalties
        );
    }

    updatePenalties(newPenalties: { [infraction: string]: number }): Rules {
        return new Rules(
            this.id,
            this.pointsPerPosition,
            this.bonusPoints,
            newPenalties,
            this.circuitPerformance,
            this.specialPenalties
        );
    }

    updateCircuitPerformance(newPerformance: { [circuitType: string]: number }): Rules {
        return new Rules(
            this.id,
            this.pointsPerPosition,
            this.bonusPoints,
            this.penalties,
            newPerformance,
            this.specialPenalties
        );
    }
}
