import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {ApiBody, ApiOperation, ApiParam} from "@nestjs/swagger";
import {LaunchStepResultService} from "./launch.step.result.service";
import {CreateLaunchStepResultDto} from "../../../dto/launch/result/step/create.launch.step.result.dto";
import {UpdateLaunchStepResultDto} from "../../../dto/launch/result/step/update.launch.step.result.dto";

@Controller('/launch/result/step')
export class LaunchStepResultController {
    constructor(private readonly launchStepResultService: LaunchStepResultService) {}

    @Post()
    @ApiOperation({ summary: 'Create a launch step result' })
    @ApiBody({ type: CreateLaunchStepResultDto })
    async createStepResult(@Body() dto: CreateLaunchStepResultDto) {
        return await this.launchStepResultService.createStepResult(dto);
    }

    @Get('/list/:id')
    @ApiOperation({ summary: 'Get all step results for a launch result' })
    @ApiParam({
        name: 'id',
        required: true,
        type: Number,
        description: 'ID of the launch result'
    })
    async getSteps(@Param('id') launchResultId: number) {
        return await this.launchStepResultService.getSteps(launchResultId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a specific step result by its ID' })
    @ApiParam({
        name: 'id',
        required: true,
        type: Number,
        description: 'Step result ID'
    })
    async getStep(@Param('id') id: number) {
        return await this.launchStepResultService.getStep(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a step result by its ID' })
    @ApiParam({
        name: 'id',
        required: true,
        type: Number,
        description: 'Step result ID'
    })
    @ApiBody({ type: UpdateLaunchStepResultDto })
    async updateStepResult(@Param('id') id: number, @Body() dto: UpdateLaunchStepResultDto) {
        return await this.launchStepResultService.updateStepResult(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a step result by its ID' })
    @ApiParam({
        name: 'id',
        required: true,
        type: Number, 
        description: 'Step result ID'
    })
    async deleteStepResult(@Param('id') id: number) {
        await this.launchStepResultService.deleteStepResult(id);
        return { message: `Step result with id ${id} deleted successfully` };
    }
}