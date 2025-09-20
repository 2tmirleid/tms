import {Controller, Get, UseGuards} from "@nestjs/common";
import {ScenarioContextOptionService} from "./scenario.context.option.service";
import {ApiOperation} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../auth/jwt-auth.guard";

@Controller('/scenario/option')
@UseGuards(JwtAuthGuard)
export class ScenarioContextOptionController {
    constructor(readonly scenarioContextOptionService: ScenarioContextOptionService) {}

    @Get()
    @ApiOperation({ summary: 'Getting all scenario\'s context options' })
    async getOptions() {
        return await this.scenarioContextOptionService.getOptions();
    }
}