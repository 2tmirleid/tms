import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {LaunchEntity} from "./launch.entity";

@Entity({ name: 'launch_status' })
export class LaunchStatusEntity {
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

    @OneToMany(() => LaunchEntity, launch => launch.status)
    launches: LaunchEntity[];
}