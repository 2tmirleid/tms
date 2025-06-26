import {IsNumber, IsOptional, IsString, MaxLength} from "@nestjs/class-validator";

export class UpdateScenarioStepDto {
    @IsOptional()
    @IsNumber()
    id: number;

    @IsOptional()
    @IsString({ message: 'Step must be string' })
    @MaxLength(255, { message: 'Step cannot be greater than 255 symbols' })
    step?: string;

    @IsOptional()
    @IsString({ message: 'ExpectedResult must be string' })
    @MaxLength(255, { message: 'ExpectedResult cannot be greater than 255 symbols' })
    expectedResult?: string;
}