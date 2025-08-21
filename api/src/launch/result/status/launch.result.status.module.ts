import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {LaunchResultStatusEntity} from "../../../entity/launch/result/launch.result.status.entity";
import {LaunchResultStatusService} from "./launch.result.status.service";
import {LaunchResultStatusController} from "./launch.result.status.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            LaunchResultStatusEntity
        ])
    ],
    controllers: [LaunchResultStatusController],
    providers: [LaunchResultStatusService],
    exports: [LaunchResultStatusService]
})
export class LaunchResultStatusModule {}