import { MigrationInterface, QueryRunner } from "typeorm";

/*
 * Миграция, создающая и заполняющая таблицу step_context_option данными по умолчанию
 */
export class Createandseedstepcontextoptiontable1750937820203 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create table if not exists step_context_option
            (
                id    serial
                    primary key,
                title varchar(255) not null,
                link  varchar(255),
                alias varchar(255) not null
            );

            alter table step_context_option
                owner to postgres;
        `);

        await queryRunner.query(`
            INSERT INTO step_context_option ("title", "alias")
            VALUES ('Удалить', 'delete')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS step_context_option
        `);
    }
}
