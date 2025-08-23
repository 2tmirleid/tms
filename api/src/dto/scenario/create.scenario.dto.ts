import {Type} from 'class-transformer';
import {CreateScenarioStepDto} from "../scenarioStep/create.scenario.step.dto";
import {IsArray, IsNotEmpty, IsOptional, IsString, MaxLength, ValidateNested} from "@nestjs/class-validator";
import {CreateScenarioTagDto} from "../tag/create.scenario.tag.dto";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {CreateScenarioAttachmentDto} from "../attachment/create.scenario.attachment.dto";

export class CreateScenarioDto {
    @IsNotEmpty({ message: 'Title cannot be empty' })
    @IsString({ message: 'Title must be string' })
    @MaxLength(255, { message: 'Title cannot be greater than 255 symbols' })
    @ApiProperty({
        description: 'Scenario title',
        maximum: 255
    })
    readonly title: string;

    @IsOptional()
    @IsString({ message: 'Description must be string' })
    @MaxLength(255, { message: 'Description cannot be greater than 255 symbols' })
    @ApiPropertyOptional({
        description: 'Scenario description',
        maximum: 255
    })
    readonly description?: string;

    @IsOptional()
    @IsString({ message: 'Precondition must be string' })
    @MaxLength(255, { message: 'Precondition cannot be greater than 255 symbols' })
    @ApiPropertyOptional({
        description: 'Scenario precondition',
        maximum: 255
    })
    readonly precondition?: string;

    @IsOptional()
    @IsArray({ message: 'Steps must be array' })
    @ValidateNested({ each: true })
    @Type(() => CreateScenarioStepDto)
    @ApiPropertyOptional({
        description: 'Scenario steps',
        type: [CreateScenarioStepDto]
    })
    readonly steps?: CreateScenarioStepDto[];

    @IsOptional()
    @IsArray({ message: 'Tags must be array' })
    @ValidateNested({ each: true })
    @ApiPropertyOptional({
        description: 'Scenario tags',
        type: [CreateScenarioTagDto]
    })
    readonly tags?: CreateScenarioTagDto[];

    @IsOptional()
    @IsArray({ message: 'Attachments must be array' })
    @ValidateNested({ each: true })
    @ApiPropertyOptional({
        description: 'Scenario attachments',
        type: [CreateScenarioAttachmentDto]
    })
    readonly attachments?: CreateScenarioAttachmentDto[];
}
