import {forwardRef, Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {LaunchStepResultEntity} from "../../../entity/launch/result/step/launch.step.result.entity";
import {LaunchResultEntity} from "../../../entity/launch/result/launch.result.entity";
import {LaunchResultModule} from "../launch.result.module";
import {LaunchStepResultService} from "./launch.step.result.service";
import {LaunchStepResultController} from "./launch.step.result.controller";
import {LaunchStepResultStatusModule} from "./status/launch.step.result.status.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            LaunchStepResultEntity,
            LaunchResultEntity
        ]),
        forwardRef(() => LaunchResultModule),
        LaunchStepResultStatusModule,
    ],
    controllers: [LaunchStepResultController],
    providers: [LaunchStepResultService],
    exports: [LaunchStepResultService]
})
export class LaunchStepResultModule {}