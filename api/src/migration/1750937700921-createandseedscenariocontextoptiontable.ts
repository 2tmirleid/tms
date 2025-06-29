import { MigrationInterface, QueryRunner } from "typeorm";

/*
 * Миграция, создающая и заполняющая таблицу scenario_context_option данными по умолчанию
 */
export class Createandseedscenariocontextoptiontable1750937700921 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create table if not exists scenario_context_option
            (
                id    serial
                    primary key,
                title varchar(255) not null,
                link  varchar(255),
                alias varchar(255) not null
            );

            alter table scenario_context_option
                owner to postgres;
        `);

        await queryRunner.query(`
            INSERT INTO scenario_context_option ("title", "alias")
            VALUES ('Переименовать', 'rename'),
                   ('Удалить', 'delete')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS scenario_context_option
        `);
    }
}
