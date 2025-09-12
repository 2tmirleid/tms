import { MigrationInterface, QueryRunner } from "typeorm";

/*
 * Миграция, создающая таблицу project
 */
export class Createprojecttable1000000000000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS project
            (
                id           SERIAL PRIMARY KEY,
                title        VARCHAR(255) NOT NULL,
                description  VARCHAR(255)
            );

            ALTER TABLE project
                OWNER TO postgres;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS project;
        `);
    }

}
