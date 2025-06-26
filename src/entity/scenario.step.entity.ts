import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import {ScenarioEntity} from "./scenario.entity";

@Entity({ name: 'scenario_step' })
export class ScenarioStepEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
        name: 'step',
    })
    step?: string;

    @Column({
        type: 'varchar',
        length: 255,
        name: 'expected_result',
    })
    @Expose({ name: 'expected_result' })
    expectedResult?: string;

    @ManyToOne(() => ScenarioEntity, scenario => scenario.steps, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'scenario_id' })
    @Expose({ name: 'scenario_id' })
    scenario: ScenarioEntity;
}
