import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {ScenarioEntity} from "../../scenario/scenario.entity";
import {LaunchEntity} from "../launch.entity";
import {LaunchStepResultEntity} from "./step/launch.step.result.entity";
import {LaunchResultStatusEntity} from "./launch.result.status.entity";

@Entity({ name: 'launch_result' })
export class LaunchResultEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => LaunchEntity, launch => launch.results, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'launch_id' })
    launch: LaunchEntity;

    @ManyToOne(() => ScenarioEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'scenario_id' })
    scenario: ScenarioEntity;

    @ManyToOne(() => LaunchResultStatusEntity, status => status.results)
    @JoinColumn({ name: 'status_id' })
    status: LaunchResultStatusEntity;

    @Column({ type: 'text', nullable: true })
    comment: string;

    @Column({ type: 'timestamp with time zone', name: 'started_at', nullable: true })
    startedAt: Date;

    @Column({ type: 'timestamp with time zone', name: 'finished_at', nullable: true })
    finishedAt: Date;

    @OneToMany(() => LaunchStepResultEntity, stepResult => stepResult.launchResult)
    stepResults: LaunchStepResultEntity[];

    @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
    updatedAt: Date;
}
