import { MigrationInterface, QueryRunner } from "typeorm";

/*
 * Миграция, создающая таблицу scenario_tag
 */
export class Createscenariotagtable1754147413377 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create table if not exists scenario_tag
            (
                id          serial
                primary key,
                title       varchar,
                scenario_id integer
                references scenario
                on delete cascade
            );

            alter table scenario_tag
                owner to postgres;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS scenario_tag
        `);
    }
}
