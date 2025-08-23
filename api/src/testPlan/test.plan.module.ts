import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TestPlanEntity} from "../entity/testPlan/test.plan.entity";
import {TestPlanService} from "./test.plan.service";
import {TestPlanController} from "./test.plan.controller";
import {ScenarioEntity} from "../entity/scenario/scenario.entity";
import {TestPlanSortModule} from "./sort/test.plan.sort.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TestPlanEntity,
            ScenarioEntity
        ]),
        TestPlanSortModule
    ],
    controllers: [
        TestPlanController
    ],
    providers: [
        TestPlanService
    ],
    exports: [
        TestPlanService
    ]
})
export class TestPlanModule {}