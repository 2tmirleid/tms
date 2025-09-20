import {Controller, Get, UseGuards} from "@nestjs/common";
import {LaunchStatusService} from "./launch.status.service";
import {ApiOperation} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../auth/jwt-auth.guard";

@Controller('/launch/status')
@UseGuards(JwtAuthGuard)
export class LaunchStatusController {
    constructor(private readonly launchStatusService: LaunchStatusService) {}

    @Get()
    @ApiOperation({ summary: 'Getting all statuses' })
    async getStatuses() {
        return await this.launchStatusService.getStatuses();
    }
}