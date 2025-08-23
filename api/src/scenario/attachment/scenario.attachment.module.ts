import {Module} from "@nestjs/common";
import {ScenarioAttachmentService} from "./scenario.attachment.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ScenarioAttachmentEntity} from "../../entity/scenario.attachment.entity";
import {ScenarioEntity} from "../../entity/scenario/scenario.entity";
import {ScenarioAttachmentController} from "./scenario.attachment.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ScenarioEntity,
            ScenarioAttachmentEntity
        ])
    ],
    controllers: [
        ScenarioAttachmentController
    ],
    providers: [
        ScenarioAttachmentService
    ],
    exports: [
        ScenarioAttachmentService
    ]
})
export class ScenarioAttachmentModule {}