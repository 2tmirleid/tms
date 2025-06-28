import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ScenarioEntity} from "./scenario.entity";
import {Expose} from "class-transformer";

@Entity({ name: 'scenario_tag' })
export class ScenarioTagEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true,
        type: 'varchar',
        length: 15
    })
    title?: string;

    @ManyToOne(() => ScenarioEntity, scenario => scenario.tags, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'scenario_id' })
    @Expose({ name: 'scenario_id' })
    scenario: ScenarioEntity;
}