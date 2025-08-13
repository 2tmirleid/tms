import { MigrationInterface, QueryRunner } from "typeorm";

/*
 * Миграция, создающая и заполняющая таблицу test_plan_context_option данными по умолчанию
 */
export class Createandseedtestplancontextoptiontable1755021446541 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create table if not exists test_plan_context_option
            (
                id    serial
                    primary key,
                title varchar(255) not null,
                link  varchar(255),
                alias varchar(255) not null
            );

            alter table test_plan_context_option
                owner to postgres;
        `);

        await queryRunner.query(`
            INSERT INTO test_plan_context_option ("title", "alias")
            VALUES ('Переименовать', 'rename'),
                   ('Изменить описание', 'edit-description'),
                   ('Изменить сценарии', 'edit-scenarios'),
                   ('Удалить', 'delete')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS test_plan_context_option
        `);
    }
}
