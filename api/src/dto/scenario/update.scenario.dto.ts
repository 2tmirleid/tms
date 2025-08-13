import {IsArray, IsInt, IsOptional, IsString, MaxLength, ValidateNested} from "@nestjs/class-validator";
import {Type} from "class-transformer";
import {UpdateScenarioStepDto} from "../scenarioStep/update.scenario.step.dto";
import {UpdateScenarioTagDto} from "../tag/update.scenario.tag.dto";
import {ApiPropertyOptional} from "@nestjs/swagger";
import {UpdateScenarioAttachmentDto} from "../attachment/update.scenario.attachment.dto";

export class UpdateScenarioDto {
    @IsOptional()
    @IsString({ message: 'Step must be string' })
    @MaxLength(255, { message: 'Title cannot be greater than 255 symbols' })
    @ApiPropertyOptional({
        description: 'Edited scenario title',
        maximum: 255
    })
    title?: string;

    @IsOptional()
    @IsString({ message: 'Step must be string' })
    @MaxLength(255, { message: 'Description cannot be greater than 255 symbols' })
    @ApiPropertyOptional({
        description: 'Edited scenario description',
        maximum: 255
    })
    description?: string;

    @IsOptional()
    @IsString({ message: 'Step must be string' })
    @MaxLength(255, { message: 'Precondition cannot be greater than 255 symbols' })
    @ApiPropertyOptional({
        description: 'Edited scenario precondition',
        maximum: 255
    })
    precondition?: string;

    @IsOptional()
    @IsArray({ message: 'Steps must be an array' })
    @ValidateNested({ each: true })
    @Type(() => UpdateScenarioStepDto)
    @ApiPropertyOptional({
        description: 'Updated scenario steps',
        type: [UpdateScenarioStepDto]
    })
    steps?: UpdateScenarioStepDto[];

    @IsOptional()
    @IsArray({ message: 'Tags must be an array' })
    @ValidateNested({ each: true })
    @Type(() => UpdateScenarioTagDto)
    @ApiPropertyOptional({
        description: 'Updated scenario tags',
        type: [UpdateScenarioTagDto]
    })
    tags?: UpdateScenarioTagDto[];

    @IsOptional()
    @Type(() => Number)
    @IsInt({ message: 'Status must be an integer ID' })
    @ApiPropertyOptional({
        description: 'Updated scenario status'
    })
    readonly status?: number;

    @IsOptional()
    @IsArray({ message: 'Attachments must be an array' })
    @ValidateNested({ each: true })
    @Type(() => UpdateScenarioAttachmentDto)
    @ApiPropertyOptional({
        description: 'Updated scenario attachments',
        type: [UpdateScenarioAttachmentDto]
    })
    attachments?: UpdateScenarioAttachmentDto[];
}