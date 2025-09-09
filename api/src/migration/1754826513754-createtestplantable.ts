import { MigrationInterface, QueryRunner } from "typeorm";

/*
 * Миграция, создающая таблицу test_plan
 */
export class Createtestplantable1754826513754 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS test_plan
            (
                id          SERIAL PRIMARY KEY,
                title       VARCHAR(255)                           NOT NULL,
                description VARCHAR(255),
                project_id   INTEGER REFERENCES project (id) ON DELETE CASCADE,
                created_at  TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
                updated_at  TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
            );

            ALTER TABLE test_plan
                OWNER TO postgres;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS test_plan;
        `);
    }
}
