import {AfterLoad, Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {ScenarioStepEntity} from "./scenario.step.entity";


@Entity({ name: 'scenario' })
export class ScenarioEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        type: 'varchar',
        length: 255,
    })
    title: string;

    @Column({
        nullable: true,
        type: 'varchar',
        length: 255,
    })
    description: string;

    @Column({
        nullable: true,
        type: 'varchar',
        length: 255,
    })
    precondition: string;

    @OneToMany(() => ScenarioStepEntity, step => step.scenario, {
        cascade: ['insert', 'remove', 'update'],
        eager: true,
    })
    steps: ScenarioStepEntity[];

    @AfterLoad()
    sortSteps() {
        if (this.steps) {
            this.steps.sort((a, b) => a.id - b.id);
        }
    }
}
