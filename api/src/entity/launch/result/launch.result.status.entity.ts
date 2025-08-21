import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {LaunchResultEntity} from "./launch.result.entity";

@Entity({ name: 'launch_result_status' })
export class LaunchResultStatusEntity {
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

    @OneToMany(() => LaunchResultEntity, result => result.status)
    results: LaunchResultEntity[];
}