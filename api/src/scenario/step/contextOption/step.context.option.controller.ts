import {Controller, Get} from "@nestjs/common";
import {StepContextOptionService} from "./step.context.option.service";
import {ApiOperation} from "@nestjs/swagger";

@Controller('/scenario/step/option')
export class StepContextOptionController {
    constructor(readonly stepContextOptionService: StepContextOptionService) {}

    @Get()
    @ApiOperation({ summary: 'Getting all step\'s context options' })
    async getOptions() {
        return await this.stepContextOptionService.getOptions();
    }
}