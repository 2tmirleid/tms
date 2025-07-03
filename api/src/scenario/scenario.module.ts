import {Module} from "@nestjs/common";
import {ScenarioService} from "./scenario.service";
import {ScenarioController} from "./scenario.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ScenarioEntity} from "../entity/scenario.entity";
import {ScenarioStepModule} from "./step/scenario.step.module";
import {ScenarioTagModule} from "./tag/scenario.tag.module";
import {ScenarioStatusModule} from "./status/scenario.status.module";
import {ScenarioSortModule} from "./sort/scenario.sort.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ScenarioEntity,
        ]),
        ScenarioSortModule,
        ScenarioStepModule,
        ScenarioTagModule,
        ScenarioStatusModule,
    ],
    controllers: [
        ScenarioController
    ],
    providers: [
        ScenarioService
    ]
})
export class ScenarioModule {}