const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Migrations1748205519729 {
    name = 'Migrations1748205519729'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "usuaris_en_lligues" ("usuariId" character varying NOT NULL, "lligaId" character varying NOT NULL, "monedes" integer NOT NULL, "pilotsIds" text NOT NULL DEFAULT '[]', CONSTRAINT "PK_6dcc50374a10b9cacc41a00dc14" PRIMARY KEY ("usuariId", "lligaId"))`);
        await queryRunner.query(`CREATE TYPE "public"."usuaris_rol_enum" AS ENUM('USUARI', 'ADMINISTRADOR')`);
        await queryRunner.query(`CREATE TABLE "usuaris" ("usuariId" character varying NOT NULL, "nomUsuari" character varying NOT NULL, "correuElectronic" character varying NOT NULL, "contrasenyaUsuari" character varying NOT NULL, "imatgePerfil" boolean NOT NULL DEFAULT false, "rol" "public"."usuaris_rol_enum" NOT NULL, CONSTRAINT "UQ_709ebef17ee3c2d588788fb5721" UNIQUE ("correuElectronic"), CONSTRAINT "PK_faaa1c9f25be3fa8ca06e74d59b" PRIMARY KEY ("usuariId"))`);
        await queryRunner.query(`CREATE TABLE "pilots" ("pilotId" character varying NOT NULL, "nomPilot" character varying NOT NULL, "edat" integer NOT NULL, "nacionalitat" character varying NOT NULL, "escuderia" character varying NOT NULL, "foto" character varying NOT NULL, "posicio" integer NOT NULL, "punts" integer NOT NULL, "totalPunts" integer NOT NULL, "podiums" integer NOT NULL, "rendimentSec" integer NOT NULL, "rendimentPluja" integer NOT NULL, "rendimentMixt" integer NOT NULL, CONSTRAINT "PK_5549b4af152ef14a9d7ce43c1c8" PRIMARY KEY ("pilotId"))`);
        await queryRunner.query(`CREATE TYPE "public"."lligues_tipuslliga_enum" AS ENUM('PUBLICA', 'PRIVADA')`);
        await queryRunner.query(`CREATE TABLE "lligues" ("creadorId" character varying NOT NULL, "lligaId" character varying NOT NULL, "nomLliga" character varying NOT NULL, "tipusLliga" "public"."lligues_tipuslliga_enum" NOT NULL, "contrasenya" character varying, CONSTRAINT "PK_5bcc7661b770158f63bd542085c" PRIMARY KEY ("lligaId"))`);
        await queryRunner.query(`CREATE TYPE "public"."curses_tipusclima_enum" AS ENUM('SEC', 'PLUJA', 'MIXT')`);
        await queryRunner.query(`CREATE TABLE "curses" ("creadorId" character varying NOT NULL, "id" character varying NOT NULL, "nom" character varying NOT NULL, "fecha" TIMESTAMP NOT NULL, "circuitId" character varying NOT NULL, "tipusClima" "public"."curses_tipusclima_enum" NOT NULL, "voltes" integer NOT NULL, "pilotIds" text NOT NULL DEFAULT '[]', "resultats" text NOT NULL DEFAULT '[]', CONSTRAINT "PK_3a60161ebb94dd94d12f71d1dce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "circuits" ("creadorId" character varying NOT NULL, "id" character varying NOT NULL, "nom" character varying NOT NULL, "localitzacio" character varying NOT NULL, "cursaId" text NOT NULL DEFAULT '[]', CONSTRAINT "PK_8909faf3f3e7b1c1b002936b92d" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "circuits"`);
        await queryRunner.query(`DROP TABLE "curses"`);
        await queryRunner.query(`DROP TYPE "public"."curses_tipusclima_enum"`);
        await queryRunner.query(`DROP TABLE "lligues"`);
        await queryRunner.query(`DROP TYPE "public"."lligues_tipuslliga_enum"`);
        await queryRunner.query(`DROP TABLE "pilots"`);
        await queryRunner.query(`DROP TABLE "usuaris"`);
        await queryRunner.query(`DROP TYPE "public"."usuaris_rol_enum"`);
        await queryRunner.query(`DROP TABLE "usuaris_en_lligues"`);
    }
}
