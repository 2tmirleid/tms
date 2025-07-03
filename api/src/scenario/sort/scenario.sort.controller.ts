import {Controller, Get} from "@nestjs/common";
import {ScenarioSortService} from "./scenario.sort.service";

@Controller('/scenario/sort')
export class ScenarioSortController {
    constructor(private readonly scenarioSortService: ScenarioSortService) {}

    @Get()
    async getSortOptions() {
        return await this.scenarioSortService.getSortOptions();
    }
}