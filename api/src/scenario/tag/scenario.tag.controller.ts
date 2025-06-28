import {Body, Controller, Delete, Param, Post} from "@nestjs/common";
import {ScenarioTagService} from "./scenario.tag.service";
import {CreateScenarioTagDto} from "../../dto/create.scenario.tag.dto";

@Controller('/scenario/tag')
export class ScenarioTagController {
    constructor(private readonly scenarioTagService: ScenarioTagService) {}

    @Post(':id')
    async createTag(
        @Param('id') scenarioID: number,
        @Body('tags') dto: CreateScenarioTagDto[]
    ) {
        return await this.scenarioTagService.createTag(scenarioID, dto);
    }

    @Delete(':id')
    async deleteTag(@Param('id') id: number) {
        return await this.scenarioTagService.deleteTag(id);
    }
}