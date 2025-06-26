import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ScenarioContextOptionEntity} from "../../entity/scenario.context.option.entity";
import {ScenarioContextOptionController} from "./scenario.context.option.controller";
import {ScenarioContextOptionService} from "./scenario.context.option.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ScenarioContextOptionEntity
        ])
    ],
    controllers: [
        ScenarioContextOptionController
    ],
    providers: [
        ScenarioContextOptionService
    ],
    exports: [
        ScenarioContextOptionService
    ]
})
export class ScenarioContextOptionModule {}