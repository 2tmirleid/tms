import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ScenarioEntity} from "./scenario/scenario.entity";

@Entity({ name: 'scenario_status' })
export class ScenarioStatusEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    title: string;

    @Column({
        nullable: false
    })
    color: string;

    @OneToMany(() => ScenarioEntity, scenario => scenario.status)
    scenarios: ScenarioEntity[];
}