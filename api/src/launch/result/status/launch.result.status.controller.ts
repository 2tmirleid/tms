import {Controller, Get, UseGuards} from "@nestjs/common";
import {LaunchResultStatusService} from "./launch.result.status.service";
import {ApiOperation} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../../auth/jwt-auth.guard";

@Controller('/launch/result/status')
@UseGuards(JwtAuthGuard)
export class LaunchResultStatusController {
    constructor(private readonly launchResultStatusService: LaunchResultStatusService) {}

    @Get()
    @ApiOperation({ summary: 'Getting all statuses' })
    async getStatuses() {
        return await this.launchResultStatusService.getStatuses();
    }
}