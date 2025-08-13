import { MigrationInterface, QueryRunner } from "typeorm";

/*
 * Миграция, создающая таблицу scenario_step
 */
export class Createscenariosteptable1754851125783 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create table if not exists scenario_step
            (
                id              serial
                    primary key,
                step            varchar(255) not null,
                expected_result varchar(255) not null,
                scenario_id     integer
                    references scenario
                        on delete cascade
            );

            alter table scenario_step
                owner to postgres;

        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS scenario_step;
        `);
    }
}
