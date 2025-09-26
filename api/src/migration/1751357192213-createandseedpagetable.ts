import { MigrationInterface, QueryRunner } from "typeorm";

/*
 * Миграция, создающая и заполняющая таблицу page данными по умолчанию
 */
export class Createandseedpagetable1751357192213 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create table if not exists page
            (
                id    serial
                    primary key,
                title varchar(255) not null,
                link  varchar(255) not null,
                alias varchar(255) not null
            );

            alter table page
                owner to postgres;
        `);

        await queryRunner.query(`
            INSERT INTO page ("title", "link", "alias")
            VALUES ('Главная', '/', 'Home'),
                   ('Сценарии', 'scenarios', 'Scenario'),
                   ('Тест-планы', 'test-plans', 'TestPlan'),
                   ('Запуски', 'launches', 'Launch'),
                   ('Статистика', 'stats', 'Stat')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS page
        `);
    }
}
