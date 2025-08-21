import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {LaunchService} from "./launch.service";
import {ApiBody, ApiOperation, ApiParam} from "@nestjs/swagger";
import {CreateLaunchDto} from "../dto/launch/create.launch.dto";
import {UpdateLaunchDto} from "../dto/launch/update.launch.dto";

@Controller('/launch')
export class LaunchController {
    constructor(private readonly launchService: LaunchService) {}

    @Post()
    @ApiOperation({summary: 'Creating launch'})
    @ApiBody({
        type: CreateLaunchDto
    })
    async createLaunch(@Body() dto: CreateLaunchDto) {
        return await this.launchService.createLaunch(dto);
    }

    @Get()
    @ApiOperation({summary: 'Getting all launches'})
    async getLaunches() {
        return await this.launchService.getLaunches();
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