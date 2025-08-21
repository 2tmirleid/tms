import {IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength} from "@nestjs/class-validator";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class CreateLaunchStepResultDto {
    @IsNotEmpty({ message: 'Launch result id cannot be empty' })
    @IsInt({ message: 'Launch result id must be an integer' })
    @ApiProperty({
        description: 'Launch result id',
        type: Number
    })
    launchResultId: number;

    @IsNotEmpty({ message: 'Step id cannot be empty' })
    @IsInt({ message: 'Step id must be an integer' })
    @ApiProperty({
        description: 'Scenario step id',
        type: Number
    })
    stepId: number;

    @IsOptional()
    @IsString({ message: 'Comment must be string' })
    @MaxLength(255, { message: 'Comment cannot be greater than 255 symbols' })
    @ApiPropertyOptional({ description: 'Step result comment' })
    comment?: string;

    @IsOptional()
    @IsDateString({}, { message: 'StartedAt must be a valid ISO date string' })
    @ApiPropertyOptional({
        description: 'Date of launch start',
        example: '2025-08-16T17:00:00Z'
    })
    startedAt?: Date;

    @IsOptional()
    @IsDateString({}, { message: 'FinishedAt must be a valid ISO date string' })
    @ApiPropertyOptional({
        description: 'Date of launch finish',
        example: '2025-08-16T18:00:00Z'
    })
    finishedAt?: Date;
}