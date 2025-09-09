import {Module} from "@nestjs/common";
import {ScenarioService} from "./scenario.service";
import {ScenarioController} from "./scenario.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ScenarioEntity} from "../entity/scenario/scenario.entity";
import {ScenarioStepModule} from "./step/scenario.step.module";
import {ScenarioTagModule} from "./tag/scenario.tag.module";
import {ScenarioStatusModule} from "./status/scenario.status.module";
import {ScenarioSortModule} from "./sort/scenario.sort.module";
import {ScenarioAttachmentModule} from "./attachment/scenario.attachment.module";
import {FolderEntity} from "../entity/folder/folder.entity";
import {TestPlanModule} from "../testPlan/test.plan.module";
import {ProjectService} from "../project/project.service";
import {ProjectModule} from "../project/project.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ScenarioEntity,
        ]),
        ScenarioAttachmentModule,
        ScenarioSortModule,
        ScenarioStepModule,
        ScenarioTagModule,
        ScenarioStatusModule,
        FolderEntity,
        TestPlanModule,
        ProjectModule
    ],
    controllers: [
        ScenarioController
    ],
    providers: [
        ScenarioService
    ]
})
export class ScenarioModule {}