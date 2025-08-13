import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {FolderContextOptionEntity} from "../../entity/folder/folder.context.option.entity";
import {FolderContextOptionController} from "./folder.context.option.controller";
import {FolderContextOptionService} from "./folder.context.option.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            FolderContextOptionEntity
        ])
    ],
    controllers: [
        FolderContextOptionController
    ],
    providers: [
        FolderContextOptionService
    ],
    exports: [
        FolderContextOptionService
    ]
})
export class FolderContextOptionModule {}