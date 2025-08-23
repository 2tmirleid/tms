import {Controller, Get} from "@nestjs/common";
import {LaunchSortService} from "./launch.sort.service";
import {ApiOperation} from "@nestjs/swagger";

@Controller('/launch/sort')
export class LaunchSortController {
    constructor(private readonly launchSortService: LaunchSortService) {
    }

    @Get()
    @ApiOperation({ summary: 'Getting all sorting options' })
    async getSortOptions() {
        return await this.launchSortService.getSortOptions();
    }
}