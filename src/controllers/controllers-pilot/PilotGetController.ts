import { PilotsService } from "../../services/PilotsService";

export class PilotGetController {

    constructor (private readonly service: PilotsService) {} 

    asyn run(req: Request, res: Response): Promise<Pilot>

}