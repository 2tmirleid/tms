import {IsDateString, IsInt, IsOptional, IsString, MaxLength} from "@nestjs/class-validator";
import {ApiPropertyOptional} from "@nestjs/swagger";

export class UpdateLaunchStepResultDto {
    @IsOptional()
    @IsInt({ message: 'Status ID must be an integer' })
    @ApiPropertyOptional({
        description: 'ID of the launch status',
        example: 2
    })
    readonly statusId?: number;

    @IsOptional()
    @IsString({ message: 'Comment must be a string' })
    @MaxLength(255, { message: 'Comment cannot be greater than 1000 symbols' })
    @ApiPropertyOptional({
        description: 'Launch step result comment',
        maximum: 255
    })
    readonly comment?: string;

    @IsOptional()
    @IsDateString({}, { message: 'StartedAt must be a valid ISO date string' })
    @ApiPropertyOptional({
        description: 'Date of launch start',
        example: '2025-08-16T17:00:00Z'
    })
    readonly startedAt?: Date;

    @IsOptional()
    @IsDateString({}, { message: 'FinishedAt must be a valid ISO date string' })
    @ApiPropertyOptional({
        description: 'Date of launch finish',
        example: '2025-08-16T18:00:00Z'
    })
    readonly finishedAt?: Date;
}