import { MigrationInterface, QueryRunner } from "typeorm";

/*
 * Миграция, создающая таблицу launch
 */
export class Createlaunchtable1755352949379 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS launch
            (
                id           SERIAL PRIMARY KEY,
                title        VARCHAR(255) NOT NULL,
                description  VARCHAR(255),
                status_id    INTEGER  REFERENCES launch_status (id) ON DELETE SET NULL,
                test_plan_id INTEGER REFERENCES test_plan (id) ON DELETE CASCADE,
                started_at   TIMESTAMP WITH TIME ZONE NULL,
                finished_at  TIMESTAMP WITH TIME ZONE NULL,
                created_at   TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
                updated_at   TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS launch;
        `);
    }
}
