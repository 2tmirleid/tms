import { MigrationInterface, QueryRunner } from "typeorm";

/*
 * Миграция, создающая таблицу scenario
 */
export class Createscenariotable1753549792068 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS scenario
            (
                id           SERIAL PRIMARY KEY,
                title        VARCHAR(255) NOT NULL,
                description  VARCHAR(255),
                precondition VARCHAR(255),
                status_id    INTEGER REFERENCES scenario_status (id) ON DELETE SET NULL,
                folder_id    INTEGER REFERENCES folder (id) ON DELETE SET NULL,
                created_at   TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
                updated_at   TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
            );

            ALTER TABLE scenario
                OWNER TO postgres;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS scenario
        `);
    }
}
