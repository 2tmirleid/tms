import { MigrationInterface, QueryRunner } from "typeorm";

/*
 * Миграция, создающая таблицу launch_result
 */
export class Createlaunchresulttable1755359311310 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS launch_result
            (
                id           SERIAL PRIMARY KEY,
                launch_id    INTEGER NOT NULL REFERENCES launch (id) ON DELETE CASCADE,
                scenario_id  INTEGER NOT NULL REFERENCES scenario (id) ON DELETE CASCADE,
                status_id    INTEGER  REFERENCES launch_result_status (id) ON DELETE SET NULL,
                comment      TEXT,
                started_at   TIMESTAMP WITH TIME ZONE NULL,
                finished_at  TIMESTAMP WITH TIME ZONE NULL,
                created_at   TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
                updated_at   TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS launch_result;`);
    }
}
