import {Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ScenarioEntity} from "./scenario.entity";

@Entity({ name: 'scenario_related_tickets' })
export class ScenarioRelatedTicketEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: true,
        length: 255
    })
    target: string;

    @Column({
        type: 'text',
        nullable: false
    })
    link: string;

    @ManyToOne(() => ScenarioEntity, scenario => scenario.related_tickets, {
        eager: true
    })
    @JoinColumn({ name: 'scenario_id' })
    scenario: ScenarioEntity;
}