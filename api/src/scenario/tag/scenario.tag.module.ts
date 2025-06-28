import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ScenarioTagEntity} from "../../entity/scenario.tag.entity";
import {ScenarioTagController} from "./scenario.tag.controller";
import {ScenarioTagService} from "./scenario.tag.service";
import {ScenarioEntity} from "../../entity/scenario.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ScenarioEntity,
            ScenarioTagEntity
        ])
    ],
    controllers: [
        ScenarioTagController
    ],
    providers: [
        ScenarioTagService
    ],
    exports: [
        ScenarioTagService
    ]
})
export class ScenarioTagModule {}