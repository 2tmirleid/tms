import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({ name: 'step_context_option' })
export class StepContextOptionEntity {
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