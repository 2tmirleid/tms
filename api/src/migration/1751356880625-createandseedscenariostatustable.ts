import { MigrationInterface, QueryRunner } from "typeorm";

/*
 * Миграция, создающая и заполняющая таблицу scenario_status данными по умолчанию
 */
export class Createandseedscenariostatustable1751356880625 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create table if not exists scenario_status
            (
                id    serial
                    primary key,
                title varchar not null,
                color varchar not null
            );

            alter table scenario_status
                owner to postgres;
        `);

        await queryRunner.query(`
            INSERT INTO scenario_status ("title", "color")
            VALUES ('Активный', '#28a745'),
                   ('Ревью', '#fd7e14'),
                   ('Устаревший', '#6e4b3a'),
                   ('Черновик', '#adb5bd')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS scenario_status
        `);
    }
}
