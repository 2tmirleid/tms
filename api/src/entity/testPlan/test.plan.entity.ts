import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn, JoinTable,
    ManyToMany, ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {ScenarioEntity} from "../scenario/scenario.entity";
import {LaunchEntity} from "../launch/launch.entity";
import {ProjectEntity} from "../project/project.entity";

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

    @OneToMany(() => LaunchEntity, launch => launch.testPlan)
    launches: LaunchEntity[];

    @ManyToOne(() => ProjectEntity, project => project.scenarios, {
        eager: true,
        nullable: false,
    })
    @JoinColumn({ name: 'project_id' })
    project: ProjectEntity;

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