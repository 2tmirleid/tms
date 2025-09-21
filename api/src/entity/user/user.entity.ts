import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {LaunchResultCommentEntity} from "../launch/result/launch.result.comment.entity";

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

    @OneToOne(() => LaunchResultCommentEntity, comment => comment.user)
    launch_result_comment: LaunchResultCommentEntity;
}