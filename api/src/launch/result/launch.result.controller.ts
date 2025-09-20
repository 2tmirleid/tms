import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from "@nestjs/common";
import {LaunchResultService} from "./launch.result.service";
import {ApiBody, ApiOperation, ApiParam} from "@nestjs/swagger";
import {CreateLaunchResultDto} from "../../dto/launch/result/create.launch.result.dto";
import {UpdateLaunchResultDto} from "../../dto/launch/result/update.launch.result.dto";
import {JwtAuthGuard} from "../../auth/jwt-auth.guard";

@Controller('/launch/result')
@UseGuards(JwtAuthGuard)
export class LaunchResultController {
    constructor(private readonly launchResultService: LaunchResultService) {}

    @Post()
    @ApiOperation({ summary: 'Creating a launch result for a scenario' })
    @ApiBody({ type: CreateLaunchResultDto })
    async createScenarioResult(@Body() dto: CreateLaunchResultDto) {
        return this.launchResultService.createScenarioResult(dto);
    }

    @Get('/list/:id')
    @ApiOperation({ summary: 'Get all launch results for a specific launch' })
    @ApiParam({
        name: 'id',
        required: true,
        type: Number,
        description: 'Launch id'
    })
    async getResults(@Param('id') launchId: number) {
        return this.launchResultService.getResults(launchId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get launch result by id' })
    @ApiParam({
        name: 'id',
        required: true,
        type: Number,
        description: 'LaunchResult id'
    })
    async getResult(@Param('id') id: number) {
        return this.launchResultService.getResult(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update launch result' })
    @ApiParam({
        name: 'id',
        required: true,
        type: Number,
        description: 'LaunchResult id'
    })
    @ApiBody({ type: UpdateLaunchResultDto })
    async updateScenarioResult(
        @Param('id') id: number,
        @Body() dto: UpdateLaunchResultDto
    ) {
        return this.launchResultService.updateScenarioResult(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete launch result by id' })
    @ApiParam({
        name: 'id',
        required: true,
        type: Number,
        description: 'LaunchResult id'
    })
    async deleteScenarioResult(@Param('id') id: number) {
        return await this.launchResultService.deleteScenarioResult(id);
    }
}