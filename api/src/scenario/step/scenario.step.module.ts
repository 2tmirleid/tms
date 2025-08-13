import {Module} from "@nestjs/common";
import {ScenarioStepService} from "./scenario.step.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ScenarioStepEntity} from "../../entity/scenarioStep/scenario.step.entity";
import {ScenarioStepController} from "./scenario.step.controller";
import {ScenarioEntity} from "../../entity/scenario/scenario.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ScenarioEntity,
            ScenarioStepEntity
        ])
    ],
    controllers: [
        ScenarioStepController
    ],
    providers: [
        ScenarioStepService
    ],
    exports: [
        ScenarioStepService
    ]
})
export class ScenarioStepModule {}