import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from "@nestjs/common";
import {ScenarioCommentService} from "./scenario.comment.service";
import {ApiBody, ApiOperation, ApiParam, ApiQuery} from "@nestjs/swagger";
import {CreateScenarioCommentDto} from "../../dto/scenarioComment/create.scenario.comment.dto";
import {UpdateLaunchResultCommentDto} from "../../dto/launch/result/comment/update.launch.result.comment.dto";
import {UpdateScenarioCommentDto} from "../../dto/scenarioComment/update.scenario.comment.dto";

@Controller('/scenario/comment')
export class ScenarioCommentController {
    constructor(private readonly scenarioCommentService: ScenarioCommentService) {}

    @Post()
    @ApiOperation({summary: 'Creating comment'})
    @ApiQuery({
        name: 'scenarioID',
        required: true,
        type: Number,
        description: 'Scenario id'
    })
    @ApiBody({ type: CreateScenarioCommentDto })
    async createComment(
        @Query('scenarioID') scenarioID: number,
        @Body() dto: CreateScenarioCommentDto
    ) {
        return await this.scenarioCommentService.createComment(scenarioID, dto);
    }

    @Get()
    @ApiOperation({summary: 'Getting all comments'})
    @ApiQuery({
        name: 'scenarioID',
        required: true,
        type: Number,
        description: 'Scenario id'
    })
    async getComments(@Query('scenarioID') scenarioID: number) {
        return await this.scenarioCommentService.getComments(scenarioID);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Getting comment by it\'s id' })
    @ApiParam({
        name: 'id',
        required: true,
        type: Number,
        description: 'Comment id'
    })
    async getComment(@Param('id') id: number) {
        return await this.scenarioCommentService.getComment(id);
    }

    @Patch('id')
    @ApiOperation({ summary: 'Updating comment by it\'s id' })
    @ApiParam({
        name: 'id',
        required: true,
        type: Number,
        description: 'Comment id'
    })
    @ApiBody({ type: UpdateScenarioCommentDto })
    async updateComment(
        @Param('id') id: number,
        @Body() dto: UpdateScenarioCommentDto
    ) {
        return await this.scenarioCommentService.updateComment(id, dto);
    }

    @Delete('id')
    @ApiOperation({ summary: 'Deleting comment by it\'s id' })
    @ApiParam({
        name: 'id',
        required: true,
        type: Number,
        description: 'Comment id'
    })
    async deleteComment(@Param('id') id: number) {
        return await this.scenarioCommentService.deleteComment(id);
    }
}