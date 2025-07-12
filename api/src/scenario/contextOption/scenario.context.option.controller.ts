import {Controller, Get} from "@nestjs/common";
import {ScenarioContextOptionService} from "./scenario.context.option.service";
import {ApiOperation} from "@nestjs/swagger";

@Controller('/scenario/option')
export class ScenarioContextOptionController {
    constructor(readonly scenarioContextOptionService: ScenarioContextOptionService) {}

    @Get()
    @ApiOperation({ summary: 'Getting all scenario\'s context options' })
    async getOptions() {
        return await this.scenarioContextOptionService.getOptions();
    }
}