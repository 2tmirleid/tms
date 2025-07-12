import { MigrationInterface, QueryRunner } from "typeorm";

/*
 * Миграция, создающая и заполняющая таблицу scenario_sort данными по умолчанию
 */
export class Createandseedscenariosorttable1751542148667 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create table if not exists scenario_sort
            (
                id    serial
                    primary key,
                title varchar(255) not null,
                alias varchar(255) not null
            );

            alter table scenario_sort
                owner to postgres;
        `);

        await queryRunner.query(`
            INSERT INTO scenario_sort ("title", "alias")
            VALUES ('По возрастанию', 'sort_asc'),
                   ('По убыванию', 'sort_desc'),
                   ('По алфавиту', 'sort_alphabet'),
                   ('По статусу', 'sort_status')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS scenario_sort
        `);
    }
}
