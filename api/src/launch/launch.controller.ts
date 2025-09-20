import {Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards} from "@nestjs/common";
import {LaunchService} from "./launch.service";
import {ApiBody, ApiOperation, ApiParam, ApiQuery} from "@nestjs/swagger";
import {CreateLaunchDto} from "../dto/launch/create.launch.dto";
import {UpdateLaunchDto} from "../dto/launch/update.launch.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('/launch')
@UseGuards(JwtAuthGuard)
export class LaunchController {
    constructor(private readonly launchService: LaunchService) {}

    @Post()
    @ApiOperation({summary: 'Creating launch'})
    @ApiQuery({
        name: 'projectID',
        required: true,
        type: Number,
        description: 'Project id'
    })
    @ApiBody({
        type: CreateLaunchDto
    })
    async createLaunch(
        @Query('projectID') projectID: number,
        @Body() dto: CreateLaunchDto
    ) {
        return await this.launchService.createLaunch(projectID, dto);
    }

    @Post('search')
    @ApiOperation({ summary: 'Searching launch' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                id: {
                    type: 'array',
                    items: { type: 'string' },
                },
                title: {
                    type: 'array',
                    items: { type: 'string' },
                },
                status: {
                    type: 'array',
                    items: { type: 'string' },
                }
            },
            additionalProperties: false
        }
    })
    async searchLaunch(@Body() filters: Record<string, string[]>) {
        return this.launchService.findLaunch(filters);
    }

    @Get()
    @ApiQuery({
        name: 'projectID',
        required: true,
        type: Number,
        description: 'Project id'
    })
    @ApiOperation({summary: 'Getting all launches'})
    async getLaunches(@Query('projectID') projectID: number) {
        return await this.launchService.getLaunches(projectID);
    }

    @Get(':id')
    @ApiOperation({summary: 'Getting launch by it\'s id'})
    @ApiParam({
        name: 'id',
        required: true,
        type: Number,
        description: 'Launch id'
    })
    async getLaunch(@Param('id') id: number) {
        return await this.launchService.getLaunch(id);
    }

    @Patch(':id')
    @ApiOperation({summary: 'Editing launch by it\'s id'})
    @ApiParam({
        name: 'id',
        required: true,
        type: Number,
        description: 'Launch id'
    })
    @ApiBody({type: UpdateLaunchDto})
    async updateLaunch(
        @Param('id') id: number,
        @Body() dto: UpdateLaunchDto
    ) {
        return await this.launchService.updateLaunch(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Deleting launch by it\'s id' })
    @ApiParam({
        name: 'id',
        required: true,
        type: Number,
        description: 'Launch id'
    })
    async deleteLaunch(@Param('id') id: number) {
        return await this.launchService.deleteLaunch(id);
    }
}