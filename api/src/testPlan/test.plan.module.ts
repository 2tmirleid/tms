import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TestPlanEntity} from "../entity/testPlan/test.plan.entity";
import {TestPlanService} from "./test.plan.service";
import {TestPlanController} from "./test.plan.controller";
import {ScenarioEntity} from "../entity/scenario/scenario.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TestPlanEntity,
            ScenarioEntity
        ])
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