import { MigrationInterface, QueryRunner } from "typeorm";

export class Createscenariorelatedticketstable1767694629844 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS scenario_related_tickets (
                id SERIAL PRIMARY KEY,
                target VARCHAR(255) NOT NULL,
                link TEXT NOT NULL,
                scenario_id INTEGER REFERENCES scenario (id) ON DELETE CASCADE                           
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS scenario_related_tickets;
        `);
    }
}
