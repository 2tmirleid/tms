import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UploadedFile,
    UseInterceptors
} from "@nestjs/common";
import {ScenarioService} from "./scenario.service";
import {CreateScenarioDto} from "../dto/create.scenario.dto";
import {UpdateScenarioDto} from "../dto/update.scenario.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {ApiBody, ApiConsumes, ApiOperation, ApiParam} from "@nestjs/swagger";

@Controller('/scenario')
export class ScenarioController {
    constructor(private readonly scenarioService: ScenarioService) {}

    @Post()
    @ApiOperation({ summary: 'Creating scenario' })
    @ApiBody({
        type: CreateScenarioDto
    })
    async createScenario(@Body() dto: CreateScenarioDto) {
        return await this.scenarioService.createScenario(dto);
    }

    @Post('import')
    @ApiOperation({ summary: 'Import scenario' })
    @ApiConsumes('multipart/form-data')
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
    async importScenario(@UploadedFile() scenario: Express.Multer.File) {
        return await this.scenarioService.importScenario(scenario);
    }

    @Get()
    @ApiOperation({ summary: 'Getting all scenarios' })
    async getScenarios() {
        return await this.scenarioService.getScenarios();
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