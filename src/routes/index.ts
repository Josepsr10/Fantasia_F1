import { Router } from "express";
import { getUsuariInfo } from "./getUsuari";
import { postLogin } from "./postLogin";
import { postRegister } from "./postRegister";
import { patchUpdateIsAdmin } from "./patchUpdateIsAdmin";
import { getLligues } from "./getLligues";
import { getLliga } from "./getLliga";
import { postCrearLliga } from "./postCrearLliga";
import { postUnirALliga } from "./postUnirALliga";
import { postAssignarPilots } from "./postAssignarPilots";
import { deleteDeixarLliga } from "./deleteDeixarLliga";
import { getLliguesByTipus } from "./getLliguesByTipus";
import { getLliguesUsuari } from "./getLliguesUsuari";
import { patchUpdateNomUsuari } from "./patchUpdateNomUsuari";
import { patchUpdatePasswordUsuari } from "./patchUpdatePasswordUsuari";
import { getPilotInfo } from "./getPilotInfo";
import { getPilotsInfo } from "./getPilotsInfo";
import { postCrearCircuit } from "./postCrearCircuit";
import { getCircuit } from "./getCircuit";
import { getCircuits } from "./getCircuits";
import { postCrearCursa } from "./postCrearCursa";
import { getCursa } from "./getCursa";
import { getCurses } from "./getCurses";
import { postUpdateResultatsCursa } from "./postUpdateResultatsCursa";
import { postAplicarResultatsCursa } from "./postAplicarResultatsCursa";
import { getLliguesOnUsuariParticipa } from "./getLliguesOnParticipaUsuari";
import { getAllPilotsInfoByUsuari } from "./getAllPilotsInfoByUsuari";


export function registerRoutes(router: Router): Router {

    // Rutas de usuario
    postRegister(router)
    postLogin(router)
    patchUpdateIsAdmin(router)
    patchUpdateNomUsuari(router)
    patchUpdatePasswordUsuari(router)
    getUsuariInfo(router)

    // Rutas de ligas
    postCrearLliga(router)
    postUnirALliga(router)
    getLliga(router)
    getLligues(router)
    getLliguesUsuari(router)
    getLliguesByTipus(router)
    deleteDeixarLliga(router)

    // Rutas de usuari en lliga
    getLliguesOnUsuariParticipa(router)
    getAllPilotsInfoByUsuari(router)

    // Rutas de pilotos
    postAssignarPilots(router)
    getPilotInfo(router)
    getPilotsInfo(router)

    //Rutas de Ciruit
    postCrearCircuit(router)
    getCircuit(router)
    getCircuits(router)

    //Rutas de Cursa
    postCrearCursa(router)
    getCursa(router)
    getCurses(router)
    postUpdateResultatsCursa(router);
    postAplicarResultatsCursa(router);

    return router
}