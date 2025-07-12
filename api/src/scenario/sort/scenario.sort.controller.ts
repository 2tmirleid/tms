import {Controller, Get} from "@nestjs/common";
import {ScenarioSortService} from "./scenario.sort.service";
import {ApiOperation} from "@nestjs/swagger";

@Controller('/scenario/sort')
export class ScenarioSortController {
    constructor(private readonly scenarioSortService: ScenarioSortService) {}

    @Get()
    @ApiOperation({ summary: 'Getting all sorting options' })
    async getSortOptions() {
        return await this.scenarioSortService.getSortOptions();
    }
}