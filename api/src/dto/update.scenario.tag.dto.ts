import {IsNumber, IsOptional, IsString, MaxLength} from "@nestjs/class-validator";
import {ApiPropertyOptional} from "@nestjs/swagger";

export class UpdateScenarioTagDto {
    @IsOptional()
    @IsNumber()
    id: number;

    @IsOptional()
    @IsString({ message: 'Title must be string' })
    @MaxLength(15, { message: 'Title cannot be greater than 15 symbols' })
    @ApiPropertyOptional({
        description: 'Updated tag',
        maximum: 15
    })
    title?: string;
}