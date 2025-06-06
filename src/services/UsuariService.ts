import { createHmac, randomUUID } from "crypto";
import { Usuari } from "../entities/Usuari";
import { UsuariNotFound } from "../errors/UsuariNotFound";
import { UsuariHelper } from "../helpers/UsuariHelper";
import jwt from 'jsonwebtoken';
import { InvalidName } from "../errors/InvalidName";
import { TipusRol } from "../types/usuari/TipusRol";
import { v4 as uuidv4 } from 'uuid';
import { ContrasenyaIncorrect } from "../errors/ContrasenyaIncorrect";
import { EmailNotFound } from "../errors/EmailNotFound";
import { InvalidIdUsuari } from "../errors/InvalidIdUsuari";
import { InvalidEmail } from "../errors/InvalidEmail";
import { ContrasenyaAcces } from "../errors/ContrasenyaAcces";


export class UsuariService {

    constructor(private readonly helper: UsuariHelper) { }

    async create(nom: string, email: string, password: string): Promise<Usuari> {

        if (!nom || nom.trim() === '') {
            throw new InvalidName('El nombre no puede estar vacío.');
        }

        if (!email || email.trim() === '') {
            throw new InvalidEmail('El email no puede estar vacío.');
        }

        if (!password || password.trim() === '') {
            throw new ContrasenyaAcces('El password no puede estar vacío.');
        }

        if (nom.trim().length < 3) {
            throw new InvalidName(`El nombre debe tener al menos 3 caracteres.`);
        }

        // Validación básica de formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new InvalidEmail('El formato del email no es válido.');
        }

        /* Alternativa más simple sin regex:
        if (!email.includes('@') || !email.includes('.') || email.indexOf('@') > email.lastIndexOf('.')) {
            throw new InvalidEmail('El formato del email no es válido. Debe contener @ y un dominio válido.');
        }
        */

        if (password.length < 4) {
            throw new ContrasenyaIncorrect(`La contraseña debe tener al menos 4 caracteres.`);
        }

        const id = uuidv4();

        const hashGenerator = createHmac('sha512', 'salt');
        const hash = hashGenerator.update(password).digest('hex');

        const usuari = Usuari.create(
            id,
            nom.trim(),
            email.trim(),
            hash
        );

        await this.helper.createUser(usuari);

        return usuari;
    }

    async login(email: string, password: string): Promise<string> {

        const hashGenerator = createHmac('sha512', 'salt')
        const hash = hashGenerator.update(password).digest('hex')

        const usuari = await this.helper.findByEmail(email)
        if (!usuari) {
            throw new EmailNotFound(`Credencial ${email} incorrecto.`)
        }

        if (usuari.contrasenyaUsuari !== hash) {
            throw new ContrasenyaIncorrect(`Credencial incorrecto.`)
        }

        const token = jwt.sign({
            id: usuari.usuariId
        }, process.env.JWT_SECRET!)

        return token
    }

    async getUsuariById(usuariId: string): Promise<Usuari> {

        if (!usuariId || usuariId.trim() === '') {
            throw new InvalidIdUsuari(`El ID del usuario no puede estar vacio.`)
        }

        const usuari = await this.helper.findById(usuariId);
        if (!usuari) throw new UsuariNotFound(`Usuario con ID: ${usuariId} no encontrado.`);

        return usuari;
    }

    async updateNom(usuariId: string, nouNom: string): Promise<void> {

        if (!nouNom || nouNom.trim() === '') {
            throw new InvalidName('El nombre de usuario no puede estar vacio.')
        }

        if (nouNom.length < 3) {
            throw new InvalidName(`El nombre de usuario: ${nouNom} debe tener al menos 3 caracteres.`);
        }

        const usuariExistent = await this.helper.findById(usuariId);
        if (!usuariExistent) {
            throw new UsuariNotFound(`Usuario con ID: ${usuariId} no encontrado.`);
        }

        const updatedNom = usuariExistent.updateNom(nouNom);

        await this.helper.update(updatedNom);
    }

    async updatePassword(usuariId: string, password: string, nouPassword: string): Promise<void> {

        if (!password || password.trim() === '') {
            throw new ContrasenyaAcces('La contraseña actual no puede estar vacia.');
        }

        if (!nouPassword || nouPassword.trim() === '') {
            throw new ContrasenyaAcces('La nueva contraseña no puede estar vacia.');
        }

        if (nouPassword.trim().length < 4) {
            throw new ContrasenyaIncorrect('La nueva contraseña debe tener al menos 4 caracteres.');
        }

        const usuari = await this.helper.findById(usuariId);
        if (!usuari) {
            throw new UsuariNotFound(`Usuario con ID: ${usuariId} no encontrado.`);
        }

        const hashGenerator = createHmac('sha512', 'salt');
        const passwordHash = hashGenerator.update(password).digest('hex');

        if (usuari.contrasenyaUsuari !== passwordHash) {
            throw new ContrasenyaIncorrect('La contraseña actual no es correcta.');
        }

        const newHashGenerator = createHmac('sha512', 'salt');
        const nouPasswordHash = newHashGenerator.update(nouPassword).digest('hex');

        const updatedUsuari = usuari.updatePassword(nouPasswordHash);

        await this.helper.update(updatedUsuari);
    }

    async updateImatgePerfil(usuariId: string, imatgePerfil: boolean): Promise<void> {

        const usuariExistent = await this.helper.findById(usuariId);
        if (!usuariExistent) throw new UsuariNotFound(`Usuario con ID: ${usuariId} no encontrado.`);

        const updatedUsuari = usuariExistent.updateImatgePerfil(imatgePerfil);

        await this.helper.update(updatedUsuari);
    }

    async updateRol(usuariId: string, rol: TipusRol): Promise<void> {

        const usuariExistent = await this.helper.findById(usuariId);

        if (!usuariExistent) {
            throw new UsuariNotFound(`Usuario con ID: ${usuariId} no encontrado.`);
        }

        await this.helper.updateRolById(usuariId, rol);
    }

    async delete(id: string) {
        const usuari = await this.helper.findById(id);

        if (!usuari) throw new UsuariNotFound(`Usuario con id ${id} no encontrado`);

        await this.helper.delete(usuari);
    }
}