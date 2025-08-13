import {IsArray, IsNotEmpty, IsOptional, IsString, MaxLength} from "@nestjs/class-validator";
import {ApiPropertyOptional} from "@nestjs/swagger";
import {ScenarioEntity} from "../../entity/scenario/scenario.entity";

export class UpdateTestPlanDto {
    @IsOptional()
    @IsNotEmpty({message: 'Title cannot be empty'})
    @IsString({message: 'Title must be string'})
    @MaxLength(255, {message: 'Title cannot be greater than 255 symbols'})
    @ApiPropertyOptional({
        description: 'Test-plan title',
        maximum: 255
    })
    readonly title?: string;

    @IsOptional()
    @IsNotEmpty({message: 'Description cannot be empty'})
    @IsString({message: 'Description must be string'})
    @MaxLength(255, {message: 'Description cannot be greater than 255 symbols'})
    @ApiPropertyOptional({
        description: 'Test-plan description',
        maximum: 255
    })
    readonly description?: string;

    @IsOptional()
    @IsArray({message: 'Scenarios must be array'})
    @ApiPropertyOptional({
        description: 'Test-plan scenarios'
    })
    readonly scenarios?: ScenarioEntity[];
}