import {Controller, Get} from "@nestjs/common";
import {LaunchStatusService} from "./launch.status.service";
import {ApiOperation} from "@nestjs/swagger";

@Controller('/launch/status')
export class LaunchStatusController {
    constructor(private readonly launchStatusService: LaunchStatusService) {}

    @Get()
    @ApiOperation({ summary: 'Getting all statuses' })
    async getStatuses() {
        return await this.launchStatusService.getStatuses();
    }
}