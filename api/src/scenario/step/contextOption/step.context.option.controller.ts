import {Controller, Get} from "@nestjs/common";
import {StepContextOptionService} from "./step.context.option.service";

@Controller('/scenario/step/option')
export class StepContextOptionController {
    constructor(readonly stepContextOptionService: StepContextOptionService) {}

    @Get()
    async getOptions() {
        return await this.stepContextOptionService.getOptions();
    }
}