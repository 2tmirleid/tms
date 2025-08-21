import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {LaunchStepResultStatusEntity} from "../../../../entity/launch/result/step/launch.step.result.status.entity";
import {LaunchStepResultStatusService} from "./launch.step.result.status.service";
import {LaunchStepResultStatusController} from "./launch.step.result.status.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            LaunchStepResultStatusEntity
        ])
    ],
    controllers: [LaunchStepResultStatusController],
    providers: [LaunchStepResultStatusService],
    exports: [LaunchStepResultStatusService]
})
export class LaunchStepResultStatusModule {}