import {Controller, Get, UseGuards} from "@nestjs/common";
import {LaunchSortService} from "./launch.sort.service";
import {ApiOperation} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../auth/jwt-auth.guard";

@Controller('/launch/sort')
@UseGuards(JwtAuthGuard)
export class LaunchSortController {
    constructor(private readonly launchSortService: LaunchSortService) {
    }

    @Get()
    @ApiOperation({ summary: 'Getting all sorting options' })
    async getSortOptions() {
        return await this.launchSortService.getSortOptions();
    }
}