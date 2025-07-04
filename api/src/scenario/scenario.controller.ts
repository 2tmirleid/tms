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
import {Readable} from "stream";
import * as csv from 'csv-parser';

@Controller('/scenario')
export class ScenarioController {
    constructor(private readonly scenarioService: ScenarioService) {}

    @Post()
    async createScenario(@Body() dto: CreateScenarioDto) {
        return await this.scenarioService.createScenario(dto);
    }

    @Post('import')
    @UseInterceptors(FileInterceptor('scenario'))
    async importScenario(@UploadedFile() scenario: Express.Multer.File) {
        const results: any[] = [];

        const stream = Readable.from(scenario.buffer);

        const uploadedScenario = await new Promise<any[]>((resolve, reject) => {
            stream
                .pipe(csv({ separator: ';' }))
                .on('data', (data) => results.push(data))
                .on('end', () => {
                    resolve(results);
                })
                .on('error', (err) => {
                    reject(`Ошибка парсинга CSV: ${err.message}`);
                });
        });

        return await this.scenarioService.importScenario(uploadedScenario, scenario.originalname.split('.')[1]);
    }

    @Get()
    async getScenarios() {
        return await this.scenarioService.getScenarios();
    }

    @Post('search')
    async searchScenario(@Body() filters: Record<string, string[]>) {
        return this.scenarioService.findScenario(filters);
    }

    @Get(':id')
    async getScenario(@Param('id', ParseIntPipe) id: number) {
        return await this.scenarioService.getScenario(id);
    }

    @Patch(':id')
    async updateScenario(
        @Param('id') id: number,
        @Body() dto: UpdateScenarioDto
    ) {
        return await this.scenarioService.updateScenario(id, dto);
    }

    @Delete(':id')
    async deleteScenario(@Param('id') id: number) {
        return await this.scenarioService.deleteScenario(id);
    }
}