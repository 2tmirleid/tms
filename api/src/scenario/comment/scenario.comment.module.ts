import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ScenarioCommentEntity} from "../../entity/scenario/scenario.comment.entity";
import {ScenarioCommentService} from "./scenario.comment.service";
import {ScenarioCommentController} from "./scenario.comment.controller";
import {ScenarioModule} from "../scenario.module";
import {UserModule} from "../../user/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ScenarioCommentEntity
        ]),
        ScenarioModule,
        UserModule
    ],
    controllers: [ScenarioCommentController],
    providers: [ScenarioCommentService],
    exports: [ScenarioCommentService]
})
export class ScenarioCommentModule {}