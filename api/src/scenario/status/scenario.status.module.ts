import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ScenarioStatusEntity} from "../../entity/scenario.status.entity";
import {ScenarioStatusController} from "./scenario.status.controller";
import {ScenarioStatusService} from "./scenario.status.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ScenarioStatusEntity
        ])
    ],
    controllers: [
        ScenarioStatusController
    ],
    providers: [
        ScenarioStatusService
    ],
    exports: [
        ScenarioStatusService
    ]
})
export class ScenarioStatusModule {}