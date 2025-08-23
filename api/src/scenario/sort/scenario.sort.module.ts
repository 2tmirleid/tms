import {Module} from "@nestjs/common";
import {ScenarioSortService} from "./scenario.sort.service";
import {ScenarioSortController} from "./scenario.sort.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ScenarioSortEntity} from "../../entity/scenario/scenario.sort.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ScenarioSortEntity
        ])
    ],
    controllers: [ScenarioSortController],
    providers: [ScenarioSortService],
    exports: [ScenarioSortService]
})
export class ScenarioSortModule {}