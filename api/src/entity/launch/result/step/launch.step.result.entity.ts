import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {LaunchResultEntity} from "../launch.result.entity";
import {ScenarioStepEntity} from "../../../scenarioStep/scenario.step.entity";
import {LaunchStepResultStatusEntity} from "./launch.step.result.status.entity";

@Entity({ name: 'launch_step_result' })
export class LaunchStepResultEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => LaunchResultEntity, launchResult => launchResult.stepResults, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'launch_result_id' })
    launchResult: LaunchResultEntity;

    @ManyToOne(() => ScenarioStepEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'step_id' })
    step: ScenarioStepEntity;

    @ManyToOne(() => LaunchStepResultStatusEntity, status => status.results)
    @JoinColumn({ name: 'status_id' })
    status: LaunchStepResultStatusEntity;

    @Column({ type: 'text', nullable: true })
    comment: string;

    @Column({ type: 'timestamp with time zone', name: 'started_at', nullable: true })
    startedAt: Date;

    @Column({ type: 'timestamp with time zone', name: 'finished_at', nullable: true })
    finishedAt: Date;

    @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
    updatedAt: Date;
}
