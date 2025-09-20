import {
    Body,
    Controller,
    Delete,
    Param,
    ParseIntPipe,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import {ScenarioAttachmentService} from "./scenario.attachment.service";
import {ApiBody, ApiConsumes, ApiOperation, ApiParam} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";
import {JwtAuthGuard} from "../../auth/jwt-auth.guard";

@Controller('/scenario/attachment')
@UseGuards(JwtAuthGuard)
export class ScenarioAttachmentController {
    constructor(private readonly scenarioAttachmentService: ScenarioAttachmentService) {}

    @Post(':id')
    @ApiOperation({ summary: 'Upload attachment to scenario' })
    @ApiParam({
        name: 'id',
        required: true,
        type: Number,
        description: 'Scenario id'
    })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary'
                },
                title: {
                    type: 'string',
                    nullable: true
                }
            }
        }
    })
    @UseInterceptors(FileInterceptor('file'))
    async uploadAttachment(
        @Param('id', ParseIntPipe) scenarioID: number,
        @UploadedFile() file: Express.Multer.File,
        @Body('title') title?: string
    ) {
        return await this.scenarioAttachmentService.uploadAttachment(scenarioID, file, title);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Deleting scenario\'s attachment' })
    @ApiParam({
        name: 'id',
        required: true,
        type: Number,
        description: 'Attachment id'
    })
    async deleteAttachment(@Param('id') id: number) {
        return await this.scenarioAttachmentService.deleteAttachment(id);
    }
}