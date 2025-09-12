import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {TestPlanEntity} from "../testPlan/test.plan.entity";
import {LaunchStatusEntity} from "./launch.status.entity";
import {LaunchResultEntity} from "./result/launch.result.entity";
import {ProjectEntity} from "../project/project.entity";

@Entity({ name: 'launch' })
export class LaunchEntity {
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

    @ManyToOne(() => LaunchStatusEntity, status => status.launches)
    @JoinColumn({ name: 'status_id' })
    status: LaunchStatusEntity;

    @ManyToOne(() => TestPlanEntity, testPlan => testPlan.launches, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'test_plan_id' })
    testPlan: TestPlanEntity;

    @OneToMany(() => LaunchResultEntity, result => result.launch)
    results: LaunchResultEntity[];

    @ManyToOne(() => ProjectEntity, project => project.scenarios, {
        eager: true,
        nullable: false,
    })
    @JoinColumn({ name: 'project_id' })
    project: ProjectEntity;

    @Column({
        type: 'timestamp with time zone',
        name: 'started_at',
        nullable: true
    })
    startedAt: Date;

    @Column({
        type: 'timestamp with time zone',
        name: 'finished_at',
        nullable: true
    })
    finishedAt: Date;

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