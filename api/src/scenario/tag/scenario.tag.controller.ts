import {Body, Controller, Delete, Param, Post, UseGuards} from "@nestjs/common";
import {ScenarioTagService} from "./scenario.tag.service";
import {CreateScenarioTagDto} from "../../dto/tag/create.scenario.tag.dto";
import {ApiBody, ApiOperation, ApiParam} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../auth/jwt-auth.guard";

@Controller('/scenario/tag')
@UseGuards(JwtAuthGuard)
export class ScenarioTagController {
    constructor(private readonly scenarioTagService: ScenarioTagService) {}

    @Post(':id')
    @ApiOperation({ summary: 'Creating scenario\'s tag' })
    @ApiParam({
        name: 'id',
        required: true,
        type: Number,
        description: 'Scenario id'
    })
    @ApiBody({ type: CreateScenarioTagDto })
    async createTag(
        @Param('id') scenarioID: number,
        @Body('tags') dto: CreateScenarioTagDto[]
    ) {
        return await this.scenarioTagService.createTag(scenarioID, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Deleting scenario\'s tag' })
    @ApiParam({
        name: 'id',
        required: true,
        type: Number,
        description: 'Tag id'
    })
    async deleteTag(@Param('id') id: number) {
        return await this.scenarioTagService.deleteTag(id);
    }
}