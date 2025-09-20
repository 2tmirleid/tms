import {Controller, Get, UseGuards} from "@nestjs/common";
import {StepContextOptionService} from "./step.context.option.service";
import {ApiOperation} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../../auth/jwt-auth.guard";

@Controller('/scenario/step/option')
@UseGuards(JwtAuthGuard)
export class StepContextOptionController {
    constructor(readonly stepContextOptionService: StepContextOptionService) {}

    @Get()
    @ApiOperation({ summary: 'Getting all step\'s context options' })
    async getOptions() {
        return await this.stepContextOptionService.getOptions();
    }
}