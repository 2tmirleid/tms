import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn, ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserEntity} from "../../user/user.entity";
import {LaunchResultEntity} from "./launch.result.entity";

@Entity({ name: 'launch_result_comment' })
export class LaunchResultCommentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: false,
        length: 255
    })
    body: string;

    @OneToOne(() => UserEntity, user => user.launch_result_comment, {
        eager: true,
        nullable: false
    })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @ManyToOne(() => LaunchResultEntity, result => result.comment)
    @JoinColumn({ name: 'launch_result_id' })
    launch_result: LaunchResultEntity;

    @CreateDateColumn({
        type: 'timestamp with time zone',
        name: 'created_at'
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp with time zone',
        name: 'updated_at'
    })
    updatedAt: Date;
}