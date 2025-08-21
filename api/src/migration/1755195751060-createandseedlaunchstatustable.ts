import { MigrationInterface, QueryRunner } from "typeorm";

/*
 * Миграция, создающая и заполняющая данными по умолчанию таблицу launch_status
 */
export class Createandseedlaunchstatustable1755195751060 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS launch_status (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                color VARCHAR(7) NOT NULL
            );
        `);

        await queryRunner.query(`
            INSERT INTO launch_status ("title", "color")
            VALUES ('Активный', '#28a745'),
                   ('Приостановлен', '#fd7e14'),
                   ('Завершенный', '#adb5bd')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS launch_status;
        `);
    }
}
