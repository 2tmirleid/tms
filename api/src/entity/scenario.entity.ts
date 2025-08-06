import {
    AfterLoad,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {ScenarioStepEntity} from "./scenario.step.entity";
import {ScenarioTagEntity} from "./scenario.tag.entity";
import {ScenarioStatusEntity} from "./scenario.status.entity";
import {ScenarioAttachmentEntity} from "./scenario.attachment.entity";
import {FolderEntity} from "./folder.entity";


@Entity({ name: 'scenario' })
export class ScenarioEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        type: 'varchar',
        length: 255,
    })
    title: string;

    @Column({
        nullable: true,
        type: 'varchar',
        length: 255,
    })
    description: string;

    @Column({
        nullable: true,
        type: 'varchar',
        length: 255,
    })
    precondition: string;

    @OneToMany(() => ScenarioStepEntity, step => step.scenario, {
        cascade: ['insert', 'remove', 'update'],
        eager: true,
    })
    steps: ScenarioStepEntity[];

    @OneToMany(() => ScenarioTagEntity, tag => tag.scenario, {
        cascade: ['insert', 'remove', 'update'],
        eager: true,
    })
    tags: ScenarioTagEntity[];

    @ManyToOne(() => ScenarioStatusEntity, status => status.scenarios, {
        eager: true,
        nullable: false,
    })
    @JoinColumn({ name: 'status_id' })
    status: ScenarioStatusEntity;

    @OneToMany(() => ScenarioAttachmentEntity, attachment => attachment.scenario, {
        cascade: ['insert', 'remove', 'update'],
        eager: true,
    })
    attachments: ScenarioAttachmentEntity[];

    @ManyToOne(() => FolderEntity, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'folder_id' })
    folder?: FolderEntity;

    @Column({ type: 'int', nullable: true })
    folder_id?: number | null;

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

    @AfterLoad()
    sortSteps() {
        if (this.steps) {
            this.steps.sort((a, b) => a.id - b.id);
        }
    }
}
