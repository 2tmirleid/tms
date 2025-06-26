import {Controller, Param, Post, Body, Delete} from "@nestjs/common";
import {ScenarioStepService} from "./scenario.step.service";
import {CreateScenarioStepDto} from "../../dto/create.scenario.step.dto";

@Controller('/scenario/step')
export class ScenarioStepController {
    constructor(private readonly scenarioStepService: ScenarioStepService) {}

    @Post(':id')
    async createStep(
        @Param('id') scenarioID: number,
        @Body('steps') dto: CreateScenarioStepDto[]
    ) {
        return await this.scenarioStepService.createStep(scenarioID, dto);
    }

    @Delete(':id')
    async deleteStep(@Param('id') id: number) {
        return await this.scenarioStepService.deleteStep(id);
    }
}