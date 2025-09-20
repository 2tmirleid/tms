import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post, Query,
    UploadedFile, UseGuards,
    UseInterceptors
} from "@nestjs/common";
import {ScenarioService} from "./scenario.service";
import {CreateScenarioDto} from "../dto/scenario/create.scenario.dto";
import {UpdateScenarioDto} from "../dto/scenario/update.scenario.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiQuery} from "@nestjs/swagger";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('/scenario')
@UseGuards(JwtAuthGuard)
export class ScenarioController {
    constructor(private readonly scenarioService: ScenarioService) {}

    @Post()
    @ApiOperation({ summary: 'Creating scenario' })
    @ApiQuery({
        name: 'projectID',
        required: true,
        type: Number,
        description: 'Project id'
    })
    @ApiBody({ type: CreateScenarioDto })
    async createScenario(
        @Query('projectID') projectID: number,
        @Body() dto: CreateScenarioDto
    ) {
        return await this.scenarioService.createScenario(projectID, dto);
    }

    @Post('import')
    @ApiOperation({ summary: 'Import scenario' })
    @ApiConsumes('multipart/form-data')
    @ApiQuery({
        name: 'projectID',
        required: true,
        type: Number,
        description: 'Project id'
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    format: 'binary'
                }
            }
        }
    })
    @UseInterceptors(FileInterceptor('scenario'))
    async importScenario(
        @Query('projectID') projectID: number,
        @UploadedFile() scenario: Express.Multer.File
    ) {
        return await this.scenarioService.importScenario(projectID, scenario);
    }

    @Get()
    @ApiQuery({
        name: 'projectID',
        required: true,
        type: Number,
        description: 'Project id'
    })
    @ApiOperation({ summary: 'Getting all scenarios' })
    async getScenarios(@Query('projectID') projectID: number,) {
        return await this.scenarioService.getScenarios(projectID);
    }

    @Post('search')
    @ApiOperation({ summary: 'Searching scenario' })
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
                tag: {
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
    async searchScenario(@Body() filters: Record<string, string[]>) {
        return this.scenarioService.findScenario(filters);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Getting scenario by it\'s id' })
    @ApiParam({
        name: 'id',
        required: true,
        type: Number,
        description: 'Scenario id'
    })
    async getScenario(@Param('id', ParseIntPipe) id: number) {
        return await this.scenarioService.getScenario(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Editing scenario by it\'s id' })
    @ApiParam({
        name: 'id',
        required: true,
        type: Number,
        description: 'Scenario id'
    })
    @ApiBody({ type: UpdateScenarioDto })
    async updateScenario(
        @Param('id') id: number,
        @Body() dto: UpdateScenarioDto
    ) {
        return await this.scenarioService.updateScenario(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Deleting scenario by it\'s id' })
    @ApiParam({
        name: 'id',
        required: true,
        type: Number,
        description: 'Scenario id'
    })
    async deleteScenario(@Param('id') id: number) {
        return await this.scenarioService.deleteScenario(id);
    }
}