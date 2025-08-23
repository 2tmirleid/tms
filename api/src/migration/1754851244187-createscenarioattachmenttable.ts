import { MigrationInterface, QueryRunner } from "typeorm";

/*
 * Миграция, создающая таблицу scenario_attachment
 */
export class Createscenarioattachmenttable1754851244187 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create table if not exists scenario_attachment
            (
                id          serial
                    primary key,
                title       varchar,
                path        varchar,
                scenario_id integer
                    references scenario
                        on delete cascade
            );

            alter table scenario_attachment
                owner to postgres;


        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS scenario_attachment;
        `);
    }
}
