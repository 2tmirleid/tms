import {Controller, Get, UseGuards} from "@nestjs/common";
import {ApiOperation} from "@nestjs/swagger";
import {TestPlanSortService} from "./test.plan.sort.service";
import {JwtAuthGuard} from "../../auth/jwt-auth.guard";

@Controller('/test-plan/sort')
@UseGuards(JwtAuthGuard)
export class TestPlanSortController {
    constructor(private readonly testPlanSortService: TestPlanSortService) {}

    @Get()
    @ApiOperation({ summary: 'Getting all sorting options' })
    async getSortOptions() {
        return await this.testPlanSortService.getSortOptions();
    }
}