import {
    Column,
    CreateDateColumn,
    Entity, JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {ScenarioEntity} from "../scenario/scenario.entity";

@Entity({ name: 'test_plan' })
export class TestPlanEntity {
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

    @ManyToMany(() => ScenarioEntity, scenario => scenario.test_plans, {
        cascade: true,
        eager: true
    })
    @JoinTable({
        name: 'test_plan_scenarios',
        joinColumn: {
            name: 'test_plan_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'scenario_id',
            referencedColumnName: 'id'
        }
    })
    scenarios: ScenarioEntity[];

    @CreateDateColumn({
        type: 'timestamp with time zone',
        name: 'created_at'
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp with time zone',
        name: 'updated_at'
    })
    updatedAt: Date;
}