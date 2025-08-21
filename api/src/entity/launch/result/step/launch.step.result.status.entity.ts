import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {LaunchStepResultEntity} from "./launch.step.result.entity";

@Entity({ name: 'launch_step_result_status' })
export class LaunchStepResultStatusEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    title: string;

    @Column({
        nullable: false
    })
    color: string;

    @OneToMany(() => LaunchStepResultEntity, result => result.status)
    results: LaunchStepResultEntity[];
}