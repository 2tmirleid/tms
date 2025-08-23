import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {StepContextOptionController} from "./step.context.option.controller";
import {StepContextOptionService} from "./step.context.option.service";
import {StepContextOptionEntity} from "../../../entity/scenarioStep/step.context.option.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            StepContextOptionEntity
        ])
    ],
    controllers: [
        StepContextOptionController
    ],
    providers: [
        StepContextOptionService
    ],
    exports: [
        StepContextOptionService
    ]
})
export class StepContextOptionModule {}