import {IsArray, IsOptional, MaxLength, ValidateNested} from "@nestjs/class-validator";
import {Type} from "class-transformer";
import {UpdateScenarioStepDto} from "./update.scenario.step.dto";

export class UpdateScenarioDto {
    @IsOptional()
    @MaxLength(255, { message: 'Title cannot be greater than 255 symbols' })
    title?: string;

    @IsOptional()
    @MaxLength(255, { message: 'Description cannot be greater than 255 symbols' })
    description?: string;

    @IsOptional()
    @MaxLength(255, { message: 'Precondition cannot be greater than 255 symbols' })
    precondition?: string;

    @IsOptional()
    @IsArray({ message: 'Steps must be an array' })
    @ValidateNested({ each: true })
    @Type(() => UpdateScenarioStepDto)
    steps?: UpdateScenarioStepDto[];
}