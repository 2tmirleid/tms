import {IsNumber, IsOptional, IsString, MaxLength} from "@nestjs/class-validator";

export class UpdateScenarioTagDto {
    @IsOptional()
    @IsNumber()
    id: number;

    @IsOptional()
    @IsString({ message: 'Title must be string' })
    @MaxLength(15, { message: 'Title cannot be greater than 15 symbols' })
    title?: string;
}