import {Controller, Get} from "@nestjs/common";
import {ScenarioStatusService} from "./scenario.status.service";

@Controller('/scenario/status')
export class ScenarioStatusController {
    constructor(private readonly scenarioStatusService: ScenarioStatusService) {}

    @Get()
    async getStatuses() {
        return await this.scenarioStatusService.getStatuses();
    }
}