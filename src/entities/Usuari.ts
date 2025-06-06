import { TipusRol } from "../types/usuari/TipusRol";
import { ContrasenyaUsuari } from "../types/usuari/TipusContrasenyaUsuari";

export class Usuari {
    constructor(
        readonly usuariId: string,
        readonly nomUsuari: string,
        readonly correuElectronic: string,
        readonly contrasenyaUsuari: ContrasenyaUsuari,
        readonly imatgePerfil: boolean,
        readonly rol: TipusRol
    ) { }

    static create(
        usuariId: string,
        nomUsuari: string,
        correuElectronic: string,
        contrasenyaUsuari: ContrasenyaUsuari
    ): Usuari {
        return new Usuari(
            usuariId,
            nomUsuari,
            correuElectronic,
            contrasenyaUsuari,
            false,
            TipusRol.USUARI
        );
    }

    updateImatgePerfil(imatgePerfil: boolean): Usuari {
        return new Usuari(
            this.usuariId,
            this.nomUsuari,
            this.correuElectronic,
            this.contrasenyaUsuari,
            imatgePerfil,
            this.rol
        );
    }

    updateRol(rol: TipusRol): Usuari {
        return new Usuari(
            this.usuariId,
            this.nomUsuari,
            this.correuElectronic,
            this.contrasenyaUsuari,
            this.imatgePerfil,
            rol
        );
    }

    updateNom(nouNom: string): Usuari {
        return new Usuari(
            this.usuariId,
            nouNom,
            this.correuElectronic,
            this.contrasenyaUsuari,
            this.imatgePerfil,
            this.rol
            
        )
    }

    updatePassword(nouPassword: ContrasenyaUsuari): Usuari {
        return new Usuari(
            this.usuariId,
            this.nomUsuari,
            this.correuElectronic,
            nouPassword,
            this.imatgePerfil,
            this.rol
        );
    }

}