import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ScenarioEntity} from "./scenario.entity";
import {Expose} from "class-transformer";

@Entity({name: 'scenario_attachment'})
export class ScenarioAttachmentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        type: 'varchar',
        length: 255
    })
    title: string;

    @Column({
        nullable: false,
        type: 'varchar',
        length: 255
    })
    path: string;

    @ManyToOne(() => ScenarioEntity, scenario => scenario.attachments, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({name: 'scenario_id'})
    @Expose({name: 'scenario_id'})
    scenario: ScenarioEntity;
}