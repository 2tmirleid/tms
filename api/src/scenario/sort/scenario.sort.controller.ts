import {Controller, Get, UseGuards} from "@nestjs/common";
import {ScenarioSortService} from "./scenario.sort.service";
import {ApiOperation} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../auth/jwt-auth.guard";

@Controller('/scenario/sort')
@UseGuards(JwtAuthGuard)
export class ScenarioSortController {
    constructor(private readonly scenarioSortService: ScenarioSortService) {}

    @Get()
    @ApiOperation({ summary: 'Getting all sorting options' })
    async getSortOptions() {
        return await this.scenarioSortService.getSortOptions();
    }
}