import {Controller, Get} from "@nestjs/common";
import {TestPlanContextOptionService} from "./test.plan.context.option.service";
import {ApiOperation} from "@nestjs/swagger";

@Controller('/test-plan/option')
export class TestPlanContextOptionController {
    constructor(private readonly testPlanContextOptionService: TestPlanContextOptionService) {}

    @Get()
    @ApiOperation({ summary: 'Getting all test-plan\'s context options' })
    async getOptions() {
        return await this.testPlanContextOptionService.getOptions();
    }
}