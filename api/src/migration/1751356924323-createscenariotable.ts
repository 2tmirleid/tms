import { MigrationInterface, QueryRunner } from "typeorm";

/*
 * Миграция, создающая таблицу scenario
 */
export class Createscenariotable1751356924323 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create table if not exists scenario
            (
                id           serial
                primary key,
                title        varchar(255)                           not null,
                description  varchar(255),
                precondition varchar(255),
                status_id integer references scenario_status(id)
                                      on delete set null,
                created_at  timestamp with time zone default now() not null,
                updated_at  timestamp with time zone default now() not null
                );

            alter table scenario
                owner to postgres;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS scenario
        `);
    }
}
