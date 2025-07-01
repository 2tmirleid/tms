import {Type} from 'class-transformer';
import {CreateScenarioStepDto} from "./create.scenario.step.dto";
import {IsArray, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, ValidateNested} from "@nestjs/class-validator";
import {CreateScenarioTagDto} from "./create.scenario.tag.dto";

export class CreateScenarioDto {
    @IsNotEmpty({ message: 'Title cannot be empty' })
    @IsString({ message: 'Title must be string' })
    @MaxLength(255, { message: 'Title cannot be greater than 255 symbols' })
    readonly title: string;

    @IsOptional()
    @IsString({ message: 'Description must be string' })
    @MaxLength(255, { message: 'Description cannot be greater than 255 symbols' })
    readonly description?: string;

    @IsOptional()
    @IsString({ message: 'Precondition must be string' })
    @MaxLength(255, { message: 'Precondition cannot be greater than 255 symbols' })
    readonly precondition?: string;

    @IsOptional()
    @IsArray({ message: 'Steps must be array' })
    @ValidateNested({ each: true })
    @Type(() => CreateScenarioStepDto)
    readonly steps?: CreateScenarioStepDto[];

    @IsOptional()
    @IsArray({ message: 'Tags must be array' })
    @ValidateNested({ each: true })
    readonly tags?: CreateScenarioTagDto[];
}
