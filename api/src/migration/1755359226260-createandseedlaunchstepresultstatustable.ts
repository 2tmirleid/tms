import { MigrationInterface, QueryRunner } from "typeorm";

/*
 * Миграция, создающая и заполняющая данными по умолчанию таблицу launch_step_result_status
 */
export class Createandseedlaunchstepresultstatustable1755359226260 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS launch_step_result_status (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                color VARCHAR(7) NOT NULL
            );
        `);

        await queryRunner.query(`
            INSERT INTO launch_step_result_status ("title", "color")
            VALUES ('В процессе', '#e1e8ed'),
                   ('Пройден', '#28a745'),
                   ('Не пройден', '#c00000')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS launch_step_result_status;
        `);
    }
}
