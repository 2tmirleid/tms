import { MigrationInterface, QueryRunner } from "typeorm";

/*
 * Миграция, создающая таблицу launch_result_comment
 */
export class Createlaunchresultcommenttable1758457478053 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS launch_result_comment (
                id SERIAL PRIMARY KEY,
                body VARCHAR(255) NOT NULL,
                user_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
                launch_result_id INTEGER REFERENCES launch_result (id) ON DELETE CASCADE,
                created_at   TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
                updated_at   TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS launch_result_comment
        `);
    }
}
