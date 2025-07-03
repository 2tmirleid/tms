import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({ name: 'scenario_sort' })
export class ScenarioSortEntity {
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