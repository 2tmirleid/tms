// import { MigrationInterface, QueryRunner } from "typeorm";
//
// export class Createscenariorelatedticketsjointable1767651322340 implements MigrationInterface {
//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`
//             CREATE TABLE IF NOT EXISTS scenario_related_tickets_join (
//                 scenario_id INT NOT NULL,
//                 ticket_id INT NOT NULL,
//                 PRIMARY KEY (scenario_id, ticket_id),
//                 CONSTRAINT fk_scenario
//                     FOREIGN KEY (scenario_id)
//                     REFERENCES scenario(id)
//                     ON DELETE CASCADE,
//                 CONSTRAINT fk_ticket
//                     FOREIGN KEY (ticket_id)
//                     REFERENCES scenario_related_tickets(id)
//                     ON DELETE CASCADE
//             );
//         `);
//     }
//
//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`
//             DROP TABLE IF EXISTS scenario_related_tickets_join;
//         `);
//     }
// }
