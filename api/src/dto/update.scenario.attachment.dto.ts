import {IsNumber, IsOptional, IsString, MaxLength} from "@nestjs/class-validator";
import {ApiPropertyOptional} from "@nestjs/swagger";

export class UpdateScenarioAttachmentDto {
    @IsOptional()
    @IsNumber()
    id: number;

    @IsOptional()
    @IsString({ message: 'Title must be string' })
    @MaxLength(255, { message: 'Title cannot be greater than 255 symbols' })
    @ApiPropertyOptional({
        description: 'Updated attachment title',
        maximum: 255
    })
    title: string;

    @IsOptional()
    @IsString({ message: 'Path must be string' })
    @MaxLength(255, { message: 'Path cannot be greater than 255 symbols' })
    @ApiPropertyOptional({
        description: 'Updated attachment path',
        maximum: 255
    })
    path: string;
}