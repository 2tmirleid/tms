import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {TestPlanService} from "./test.plan.service";
import {ApiBody, ApiOperation, ApiParam} from "@nestjs/swagger";
import {CreateTestPlanDto} from "../dto/testPlan/create.test.plan.dto";
import {UpdateTestPlanDto} from "../dto/testPlan/update.test.plan.dto";

@Controller('/test-plan')
export class TestPlanController {
    constructor(private readonly testPlanService: TestPlanService) {}

    @Post()
    @ApiOperation({ summary: 'Creating test-plan' })
    @ApiBody({ type: CreateTestPlanDto })
    async createTestPlan(@Body() dto: CreateTestPlanDto) {
        return await this.testPlanService.createTestPlan(dto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Getting test-plan by it\'s id' })
    @ApiParam({
        name: 'id',
        required: true,
        type: Number,
        description: 'Test-plan id'
    })
    async getTestPlan(@Param('id') id: number) {
        return await this.testPlanService.getTestPlan(id);
    }

    @Get()
    @ApiOperation({ summary: 'Getting all test-plans' })
    async getTestPlans() {
        return await this.testPlanService.getTestPlans();
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Editing test-plan by it\'s id' })
    @ApiParam({
        name: 'id',
        required: true,
        type: Number,
        description: 'Test-plan id'
    })
    @ApiBody({ type: UpdateTestPlanDto })
    async updateTestPlan(
        @Param('id') id: number,
        @Body() dto: UpdateTestPlanDto
    ) {
        return await this.testPlanService.updateTestPlan(id, dto);
    }
    
    @Delete(':id')
    @ApiOperation({ summary: 'Deleting test-plan by it\'s id' })
    @ApiParam({
        name: 'id',
        required: true,
        type: Number,
        description: 'Test-plan id'
    })
    async deleteTestPlan(@Param('id') id: number) {
        return await this.testPlanService.deleteTestPlan(id);
    }
}
