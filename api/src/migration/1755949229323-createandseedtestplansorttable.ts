import { MigrationInterface, QueryRunner } from "typeorm";

/*
 * Миграция, создающая и заполняющая данными по умолчанию таблицу test_plan_sort
 */
export class Createandseedtestplansorttable1755949229323 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create table if not exists test_plan_sort
            (
                id    serial
                    primary key,
                title varchar(255) not null,
                alias varchar(255) not null
            );

            alter table test_plan_sort
                owner to postgres;
        `);

        await queryRunner.query(`
            INSERT INTO test_plan_sort ("title", "alias")
            VALUES ('По возрастанию', 'sort_asc'),
                   ('По убыванию', 'sort_desc'),
                   ('По алфавиту', 'sort_alphabet')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS test_plan_sort
        `);
    }
}
