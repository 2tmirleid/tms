import {Controller, Get} from "@nestjs/common";
import {ScenarioContextOptionService} from "./scenario.context.option.service";

@Controller('/scenario/option')
export class ScenarioContextOptionController {
    constructor(readonly scenarioContextOptionService: ScenarioContextOptionService) {}

    @Get()
    async getOptions() {
        return await this.scenarioContextOptionService.getOptions();
    }
}