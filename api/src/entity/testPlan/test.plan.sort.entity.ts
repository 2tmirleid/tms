import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({ name: 'test_plan_sort' })
export class TestPlanSortEntity {
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