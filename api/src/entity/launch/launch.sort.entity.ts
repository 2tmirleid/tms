import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({ name: 'launch_sort' })
export class LaunchSortEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    title: string;

    @Column({
        nullable: false
    })
    alias: string;
}