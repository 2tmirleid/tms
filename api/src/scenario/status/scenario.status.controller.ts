import {Controller, Get} from "@nestjs/common";
import {ScenarioStatusService} from "./scenario.status.service";
import {ApiOperation} from "@nestjs/swagger";

@Controller('/scenario/status')
export class ScenarioStatusController {
    constructor(private readonly scenarioStatusService: ScenarioStatusService) {}

    @Get()
    @ApiOperation({ summary: 'Getting all statuses' })
    async getStatuses() {
        return await this.scenarioStatusService.getStatuses();
    }
}