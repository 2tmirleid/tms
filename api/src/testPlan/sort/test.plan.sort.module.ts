import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TestPlanSortEntity} from "../../entity/testPlan/test.plan.sort.entity";
import {TestPlanSortService} from "./test.plan.sort.service";
import {TestPlanSortController} from "./test.plan.sort.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TestPlanSortEntity
        ])
    ],
    controllers: [TestPlanSortController],
    providers: [TestPlanSortService],
    exports: [TestPlanSortService]
})
export class TestPlanSortModule {}