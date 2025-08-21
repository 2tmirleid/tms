import { MigrationInterface, QueryRunner } from "typeorm";

/*
 * Миграция, создающая таблицу launch_step_result
 */
export class Createlaunchstepresulttable1755359434140 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS launch_step_result
            (
                id               SERIAL PRIMARY KEY,
                launch_result_id INTEGER NOT NULL REFERENCES launch_result (id) ON DELETE CASCADE,
                step_id          INTEGER NOT NULL REFERENCES scenario_step (id) ON DELETE CASCADE,
                status_id        INTEGER  REFERENCES launch_step_result_status (id) ON DELETE SET NULL,
                comment          TEXT,
                started_at       TIMESTAMP WITH TIME ZONE NULL,
                finished_at      TIMESTAMP WITH TIME ZONE NULL,
                created_at       TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
                updated_at       TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS launch_step_result;`);
    }
}
