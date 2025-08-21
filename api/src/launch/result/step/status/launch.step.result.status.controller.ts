import {Controller, Get} from "@nestjs/common";
import {LaunchStepResultStatusService} from "./launch.step.result.status.service";
import {ApiOperation} from "@nestjs/swagger";

@Controller('/launch/result/step/status')
export class LaunchStepResultStatusController {
    constructor(private readonly launchStepResultStatusService: LaunchStepResultStatusService) {}

    @Get()
    @ApiOperation({ summary: 'Getting all statuses' })
    async getStatuses() {
        return await this.launchStepResultStatusService.getStatuses();
    }
}