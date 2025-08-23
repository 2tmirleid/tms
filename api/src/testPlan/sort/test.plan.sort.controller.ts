import {Controller, Get} from "@nestjs/common";
import {ApiOperation} from "@nestjs/swagger";
import {TestPlanSortService} from "./test.plan.sort.service";

@Controller('/test-plan/sort')
export class TestPlanSortController {
    constructor(private readonly testPlanSortService: TestPlanSortService) {}

    @Get()
    @ApiOperation({ summary: 'Getting all sorting options' })
    async getSortOptions() {
        return await this.testPlanSortService.getSortOptions();
    }
}