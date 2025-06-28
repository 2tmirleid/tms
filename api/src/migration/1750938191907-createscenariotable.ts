import { MigrationInterface, QueryRunner } from "typeorm";

/*
 * Миграция, создающая таблицу scenario
 */
export class Createscenariotable1750938191907 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create table if not exists scenario
            (
                id           serial
                primary key,
                title        varchar(255)                           not null,
                description  varchar(255),
                precondition varchar(255),
                "createdAt"  timestamp with time zone default now() not null,
                "updatedAt"  timestamp with time zone default now() not null
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
