import {IsNumber, IsOptional, IsString, MaxLength} from "@nestjs/class-validator";
import {ApiPropertyOptional} from "@nestjs/swagger";

export class UpdateScenarioStepDto {
    @IsOptional()
    @IsNumber()
    id: number;

    @IsOptional()
    @IsString({ message: 'Step must be string' })
    @MaxLength(255, { message: 'Step cannot be greater than 255 symbols' })
    @ApiPropertyOptional({
        description: 'Updated step',
        maximum: 255
    })
    step?: string;

    @IsOptional()
    @IsString({ message: 'ExpectedResult must be string' })
    @MaxLength(255, { message: 'ExpectedResult cannot be greater than 255 symbols' })
    @ApiPropertyOptional({
        description: 'Updated expected result of step',
        maximum: 255
    })
    expectedResult?: string;
}