import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserEntity} from "../user/user.entity";
import {ScenarioEntity} from "./scenario.entity";

@Entity({ name: 'scenario_comment' })
export class ScenarioCommentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: false,
        length: 255
    })
    body: string;

    @OneToOne(() => UserEntity, user => user.scenario_comment, {
        eager: true,
        nullable: false
    })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @ManyToOne(() => ScenarioEntity, scenario => scenario.comment)
    @JoinColumn({ name: 'scenario_id' })
    scenario: ScenarioEntity;

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