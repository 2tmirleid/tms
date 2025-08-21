import {forwardRef, Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {LaunchResultEntity} from "../../entity/launch/result/launch.result.entity";
import {LaunchStepResultEntity} from "../../entity/launch/result/step/launch.step.result.entity";
import {LaunchResultService} from "./launch.result.service";
import {LaunchResultController} from "./launch.result.controller";
import {LaunchStepResultModule} from "./step/launch.step.result.module";
import {LaunchResultStatusModule} from "./status/launch.result.status.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            LaunchResultEntity,
            LaunchStepResultEntity,
        ]),
        forwardRef(() => LaunchStepResultModule),
        LaunchResultStatusModule,
    ],
    controllers: [
        LaunchResultController
    ],
    providers: [
        LaunchResultService
    ],
    exports: [LaunchResultService]
})
export class LaunchResultModule {}