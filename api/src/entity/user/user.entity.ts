import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'users'})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        type: 'varchar',
        length: 255,
    })
    email: string;

    @Column({
        nullable: false,
        type: 'varchar',
        length: 255,
    })
    password: string;

    @Column({
        nullable: true,
        type: 'varchar',
        length: 255,
    })
    username?: string | null;
}