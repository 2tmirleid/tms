import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({ name: 'page' })
export class PageEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        type: 'varchar',
        length: 255
    })
    title: string;

    @Column({
        nullable: false,
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