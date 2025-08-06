import { MigrationInterface, QueryRunner } from "typeorm";

/*
 * Миграция, создающая таблицу folder
 */
export class Createfoldertable1754147102806 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS folder (
                id         SERIAL PRIMARY KEY,
                title      VARCHAR(255) NOT NULL,
                parent_id  INTEGER REFERENCES folder(id) ON DELETE CASCADE
            );

            ALTER TABLE folder
                OWNER TO postgres;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS folder;
        `);
    }
}
