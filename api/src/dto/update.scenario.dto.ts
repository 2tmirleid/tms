import {IsArray, IsInt, IsOptional, IsString, MaxLength, ValidateNested} from "@nestjs/class-validator";
import {Type} from "class-transformer";
import {UpdateScenarioStepDto} from "./update.scenario.step.dto";
import {UpdateScenarioTagDto} from "./update.scenario.tag.dto";

export class UpdateScenarioDto {
    @IsOptional()
    @IsString({ message: 'Step must be string' })
    @MaxLength(255, { message: 'Title cannot be greater than 255 symbols' })
    title?: string;

    @IsOptional()
    @IsString({ message: 'Step must be string' })
    @MaxLength(255, { message: 'Description cannot be greater than 255 symbols' })
    description?: string;

    @IsOptional()
    @IsString({ message: 'Step must be string' })
    @MaxLength(255, { message: 'Precondition cannot be greater than 255 symbols' })
    precondition?: string;

    @IsOptional()
    @IsArray({ message: 'Steps must be an array' })
    @ValidateNested({ each: true })
    @Type(() => UpdateScenarioStepDto)
    steps?: UpdateScenarioStepDto[];

    @IsOptional()
    @IsArray({ message: 'Tags must be an array' })
    @ValidateNested({ each: true })
    @Type(() => UpdateScenarioTagDto)
    tags?: UpdateScenarioTagDto[];

    @IsOptional()
    @Type(() => Number)
    @IsInt({ message: 'Status must be an integer ID' })
    readonly status?: number;
}