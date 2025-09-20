import {Controller, Get, UseGuards} from "@nestjs/common";
import {ScenarioStatusService} from "./scenario.status.service";
import {ApiOperation} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../auth/jwt-auth.guard";

@Controller('/scenario/status')
@UseGuards(JwtAuthGuard)
export class ScenarioStatusController {
    constructor(private readonly scenarioStatusService: ScenarioStatusService) {}

    @Get()
    @ApiOperation({ summary: 'Getting all statuses' })
    async getStatuses() {
        return await this.scenarioStatusService.getStatuses();
    }
}