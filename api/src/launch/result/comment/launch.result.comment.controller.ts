import {Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards} from "@nestjs/common";
import {LaunchResultCommentService} from "./launch.result.comment.service";
import {ApiBody, ApiOperation, ApiParam, ApiQuery} from "@nestjs/swagger";
import {CreateLaunchResultCommentDto} from "../../../dto/launch/result/comment/create.launch.result.comment.dto";
import {UpdateLaunchResultCommentDto} from "../../../dto/launch/result/comment/update.launch.result.comment.dto";
import {JwtAuthGuard} from "../../../auth/jwt-auth.guard";

@Controller('/launch/result/comment')
@UseGuards(JwtAuthGuard)
export class LaunchResultCommentController {
    constructor(private readonly launchResultCommentService: LaunchResultCommentService) {}

    @Post()
    @ApiOperation({summary: 'Creating comment'})
    @ApiQuery({
        name: 'resultID',
        required: true,
        type: Number,
        description: 'Launch result id'
    })
    @ApiBody({ type: CreateLaunchResultCommentDto })
    async createComment(
        @Query('resultID') resultID: number,
        @Body() dto: CreateLaunchResultCommentDto
    ) {
        return await this.launchResultCommentService.createComment(resultID, dto);
    }

    @Get()
    @ApiOperation({summary: 'Getting all comments'})
    @ApiQuery({
        name: 'resultID',
        required: true,
        type: Number,
        description: 'Launch result id'
    })
    async getComments(@Query('resultID') resultID: number) {
        return await this.launchResultCommentService.getComments(resultID);
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
        return await this.launchResultCommentService.getComment(id);
    }

    @Patch('id')
    @ApiOperation({ summary: 'Updating comment by it\'s id' })
    @ApiParam({
        name: 'id',
        required: true,
        type: Number,
        description: 'Comment id'
    })
    @ApiBody({ type: UpdateLaunchResultCommentDto })
    async updateComment(
        @Param('id') id: number,
        @Body() dto: UpdateLaunchResultCommentDto
    ) {
        return await this.launchResultCommentService.updateComment(id, dto);
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
        return await this.launchResultCommentService.deleteComment(id);
    }
}