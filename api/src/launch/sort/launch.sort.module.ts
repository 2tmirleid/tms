import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {LaunchSortEntity} from "../../entity/launch/launch.sort.entity";
import {LaunchSortService} from "./launch.sort.service";
import {LaunchSortController} from "./launch.sort.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            LaunchSortEntity
        ])
    ],
    controllers: [
        LaunchSortController
    ],
    providers: [LaunchSortService],
    exports: [LaunchSortService]
})
export class LaunchSortModule {}