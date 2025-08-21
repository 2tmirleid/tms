import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {LaunchStatusEntity} from "../../entity/launch/launch.status.entity";
import {LaunchStatusService} from "./launch.status.service";
import {LaunchStatusController} from "./launch.status.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            LaunchStatusEntity
        ])
    ],
    controllers: [LaunchStatusController],
    providers: [LaunchStatusService],
    exports: [LaunchStatusService]
})
export class LaunchStatusModule {}