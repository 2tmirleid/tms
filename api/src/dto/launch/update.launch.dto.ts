import {
    IsOptional,
    IsString,
    MaxLength,
    IsInt,
    IsDateString
} from "@nestjs/class-validator";
import {ApiPropertyOptional} from "@nestjs/swagger";

export class UpdateLaunchDto {
    @IsOptional()
    @IsString({ message: 'Title must be string' })
    @MaxLength(255, { message: 'Title cannot be greater than 255 symbols' })
    @ApiPropertyOptional({
        description: 'Launch title',
        maximum: 255
    })
    readonly title?: string;

    @IsOptional()
    @IsString({ message: 'Description must be string' })
    @MaxLength(255, { message: 'Description cannot be greater than 255 symbols' })
    @ApiPropertyOptional({
        description: 'Launch description',
        maximum: 255
    })
    readonly description?: string;

    @IsOptional()
    @IsInt({ message: 'Test plan ID must be an integer' })
    @ApiPropertyOptional({
        description: 'ID of the related test plan',
        example: 1
    })
    readonly testPlanId?: number;

    @IsOptional()
    @IsInt({ message: 'Status ID must be an integer' })
    @ApiPropertyOptional({
        description: 'ID of the launch status',
        example: 2
    })
    readonly statusId?: number;

    @IsOptional()
    @IsDateString({}, { message: 'Started at must be a valid ISO date string' })
    @ApiPropertyOptional({
        description: 'Launch start time',
        example: '2025-08-13T10:00:00Z'
    })
    readonly startedAt?: Date;

    @IsOptional()
    @IsDateString({}, { message: 'Finished at must be a valid ISO date string' })
    @ApiPropertyOptional({
        description: 'Launch finish time',
        example: '2025-08-13T12:00:00Z'
    })
    readonly finishedAt?: Date;
}
