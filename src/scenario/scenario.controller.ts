import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post} from "@nestjs/common";
import {ScenarioService} from "./scenario.service";
import {CreateScenarioDto} from "../dto/create.scenario.dto";
import {UpdateScenarioDto} from "../dto/update.scenario.dto";

@Controller('/scenario')
export class ScenarioController {
    constructor(private readonly scenarioService: ScenarioService) {}

    @Post()
    async createScenario(@Body() dto: CreateScenarioDto) {
        return await this.scenarioService.createScenario(dto);
    }

    @Get()
    async getScenarios() {
        return await this.scenarioService.getScenarios();
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