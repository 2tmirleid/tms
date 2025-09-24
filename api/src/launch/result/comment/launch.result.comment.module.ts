import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {LaunchResultCommentEntity} from "../../../entity/launch/result/launch.result.comment.entity";
import {LaunchResultCommentService} from "./launch.result.comment.service";
import {LaunchResultCommentController} from "./launch.result.comment.controller";
import {LaunchResultModule} from "../launch.result.module";
import {UserModule} from "../../../user/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            LaunchResultCommentEntity
        ]),
        LaunchResultModule,
        UserModule,
    ],
    controllers: [LaunchResultCommentController],
    providers: [LaunchResultCommentService],
    exports: [LaunchResultCommentService]
})
export class LaunchResultCommentModule {}