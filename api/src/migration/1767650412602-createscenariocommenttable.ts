import { MigrationInterface, QueryRunner } from "typeorm";

export class Createscenariocommenttable1767650412602 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS scenario_comment (
                id SERIAL PRIMARY KEY,
                body VARCHAR(255) NOT NULL,
                user_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
                scenario_id INTEGER REFERENCES scenario (id) ON DELETE CASCADE,
                created_at   TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
                updated_at   TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS scenario_comment
        `);
    }
}
