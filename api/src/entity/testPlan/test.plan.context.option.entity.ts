import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({ name: 'test_plan_context_option' })
export class TestPlanContextOptionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        type: 'varchar',
        length: 255
    })
    title: string;

    @Column({
        nullable: true,
        type: 'varchar',
        length: 255
    })
    link: string;

    @Column({
        nullable: false,
        type: 'varchar',
        length: 255
    })
    alias: string;
}