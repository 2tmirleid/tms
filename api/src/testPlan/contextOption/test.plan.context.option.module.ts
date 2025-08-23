import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TestPlanContextOptionEntity} from "../../entity/testPlan/test.plan.context.option.entity";
import {TestPlanContextOptionService} from "./test.plan.context.option.service";
import {TestPlanContextOptionController} from "./test.plan.context.option.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TestPlanContextOptionEntity
        ])
    ],
    controllers: [TestPlanContextOptionController],
    providers: [TestPlanContextOptionService],
    exports: [TestPlanContextOptionService]
})
export class TestPlanContextOptionModule {}