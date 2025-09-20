import {Controller, Get, UseGuards} from "@nestjs/common";
import {LaunchStepResultStatusService} from "./launch.step.result.status.service";
import {ApiOperation} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../../../auth/jwt-auth.guard";

@Controller('/launch/result/step/status')
@UseGuards(JwtAuthGuard)
export class LaunchStepResultStatusController {
    constructor(private readonly launchStepResultStatusService: LaunchStepResultStatusService) {}

    @Get()
    @ApiOperation({ summary: 'Getting all statuses' })
    async getStatuses() {
        return await this.launchStepResultStatusService.getStatuses();
    }
}