import {
    AfterLoad,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {ScenarioStepEntity} from "./scenario.step.entity";
import {ScenarioTagEntity} from "./scenario.tag.entity";


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

    @OneToMany(() => ScenarioTagEntity, tag => tag.scenario, {
        cascade: ['insert', 'remove', 'update'],
        eager: true,
    })
    tags: ScenarioTagEntity[];

    @CreateDateColumn({
        type: 'timestamp with time zone'
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp with time zone',
    })
    updatedAt: Date;

    @AfterLoad()
    sortSteps() {
        if (this.steps) {
            this.steps.sort((a, b) => a.id - b.id);
        }
    }
}
