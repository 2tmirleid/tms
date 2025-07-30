import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {FolderEntity} from "../entity/folder.entity";
import {FolderController} from "./folder.controller";
import {FolderService} from "./folder.service";
import {ScenarioEntity} from "../entity/scenario.entity";
import {ScenarioModule} from "../scenario/scenario.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            FolderEntity,
            ScenarioEntity
        ])
    ],
    controllers: [
        FolderController
    ],
    providers: [
        FolderService
    ],
    exports: [
        FolderService
    ]
})
export class FolderModule {}