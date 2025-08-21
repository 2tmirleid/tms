import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {LaunchEntity} from "../entity/launch/launch.entity";
import {LaunchService} from "./launch.service";
import {LaunchController} from "./launch.controller";
import {LaunchStatusModule} from "./status/launch.status.module";
import {LaunchStatusEntity} from "../entity/launch/launch.status.entity";
import {LaunchStepResultEntity} from "../entity/launch/result/step/launch.step.result.entity";
import {LaunchResultEntity} from "../entity/launch/result/launch.result.entity";
import {LaunchResultModule} from "./result/launch.result.module";
import {TestPlanModule} from "../testPlan/test.plan.module";
import {LaunchStepResultModule} from "./result/step/launch.step.result.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            LaunchEntity,
            LaunchStatusEntity,
            LaunchStepResultEntity,
            LaunchResultEntity,
        ]),
        LaunchStatusModule,
        LaunchResultModule,
        TestPlanModule,
        LaunchStepResultModule,
    ],
    controllers: [LaunchController],
    providers: [LaunchService],
    exports: [LaunchService]
})
export class LaunchModule {}