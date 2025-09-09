import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ScenarioEntity} from "../scenario/scenario.entity";
import {TestPlanEntity} from "../testPlan/test.plan.entity";
import {LaunchEntity} from "../launch/launch.entity";
import {FolderEntity} from "../folder/folder.entity";

@Entity({ name: 'project' })
export class ProjectEntity {
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

    @OneToMany(() => ScenarioEntity, scenario => scenario.project, {
        cascade: ['insert', 'remove', 'update'],
    })
    scenarios: ScenarioEntity[];

    @OneToMany(() => TestPlanEntity, testPlan => testPlan.project, {
        cascade: ['insert', 'remove', 'update'],
    })
    testPlans: TestPlanEntity[];

    @OneToMany(() => FolderEntity, folder => folder.project, {
        cascade: ['insert', 'remove', 'update'],
    })
    folders: FolderEntity[];

    @OneToMany(() => LaunchEntity, launch => launch.project, {
        cascade: ['insert', 'remove', 'update'],
    })
    launches: LaunchEntity[];
}