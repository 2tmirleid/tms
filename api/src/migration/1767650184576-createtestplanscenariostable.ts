import { MigrationInterface, QueryRunner } from "typeorm";

export class Createtestplanscenariostable1767650184576 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS test_plan_scenarios
            (
                test_plan_id INTEGER NOT NULL REFERENCES test_plan(id) ON DELETE CASCADE,
                scenario_id  INTEGER NOT NULL REFERENCES scenario(id) ON DELETE CASCADE,
                PRIMARY KEY (test_plan_id, scenario_id)
            );

            ALTER TABLE test_plan_scenarios
                OWNER TO postgres;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS test_plan_scenarios;
        `);
    }
}
