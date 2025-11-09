import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1762625062010 implements MigrationInterface {
    name = 'InitialSchema1762625062010'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text NOT NULL, "price" numeric(10,2) NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
