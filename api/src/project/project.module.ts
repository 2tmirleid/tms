import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProjectEntity} from "../entity/project/project.entity";
import {ProjectService} from "./project.service";
import {ProjectController} from "./project.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProjectEntity
        ])
    ],
    controllers: [
        ProjectController
    ],
    providers: [
        ProjectService
    ],
    exports: [
        ProjectService
    ]
})
export class ProjectModule {}