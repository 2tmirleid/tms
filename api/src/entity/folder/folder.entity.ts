import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ScenarioEntity} from "../scenario/scenario.entity";
import {ProjectEntity} from "../project/project.entity";

@Entity({ name: 'folder' })
export class FolderEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        type: 'varchar',
        length: 255
    })
    title: string;

    @ManyToOne(() => ProjectEntity, project => project.folders, {
        eager: true,
        nullable: false,
    })
    @JoinColumn({ name: 'project_id' })
    project: ProjectEntity;

    @ManyToOne(() => FolderEntity, folder => folder.children, {
        nullable: true, onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'parent_id' })
    parent?: FolderEntity;

    @Column({ type: 'int', nullable: true })
    parent_id?: number | null;

    @OneToMany(() => FolderEntity, folder => folder.parent)
    children?: FolderEntity[];

    @OneToMany(() => ScenarioEntity, scenario => scenario.folder)
    scenarios?: ScenarioEntity[];
}