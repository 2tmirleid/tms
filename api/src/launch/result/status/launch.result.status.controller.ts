import {Controller, Get} from "@nestjs/common";
import {LaunchResultStatusService} from "./launch.result.status.service";
import {ApiOperation} from "@nestjs/swagger";

@Controller('/launch/result/status')
export class LaunchResultStatusController {
    constructor(private readonly launchResultStatusService: LaunchResultStatusService) {}

    @Get()
    @ApiOperation({ summary: 'Getting all statuses' })
    async getStatuses() {
        return await this.launchResultStatusService.getStatuses();
    }
}