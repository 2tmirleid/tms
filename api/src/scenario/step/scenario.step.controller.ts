import {Controller, Param, Post, Body, Delete} from "@nestjs/common";
import {ScenarioStepService} from "./scenario.step.service";
import {CreateScenarioStepDto} from "../../dto/create.scenario.step.dto";
import {ApiBody, ApiOperation, ApiParam} from "@nestjs/swagger";

@Controller('/scenario/step')
export class ScenarioStepController {
    constructor(private readonly scenarioStepService: ScenarioStepService) {}

    @Post(':id')
    @ApiOperation({ summary: 'Creating scenario\'s steps' })
    @ApiParam({
        name: 'id',
        required: true,
        type: Number,
        description: 'Scenario id'
    })
    @ApiBody({ type: CreateScenarioStepDto })
    async createStep(
        @Param('id') scenarioID: number,
        @Body('steps') dto: CreateScenarioStepDto[]
    ) {
        return await this.scenarioStepService.createStep(scenarioID, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Deleting scenario\'s step' })
    @ApiParam({
        name: 'id',
        required: true,
        type: Number,
        description: 'Step id'
    })
    async deleteStep(@Param('id') id: number) {
        return await this.scenarioStepService.deleteStep(id);
    }
}