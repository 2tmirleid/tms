import {
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    IsInt,
    IsDateString
} from "@nestjs/class-validator";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class CreateLaunchDto {
    @IsNotEmpty({ message: 'Title cannot be empty' })
    @IsString({ message: 'Title must be string' })
    @MaxLength(255, { message: 'Title cannot be greater than 255 symbols' })
    @ApiProperty({
        description: 'Launch title',
        maximum: 255
    })
    readonly title: string;

    @IsOptional()
    @IsString({ message: 'Description must be string' })
    @MaxLength(255, { message: 'Description cannot be greater than 255 symbols' })
    @ApiPropertyOptional({
        description: 'Launch description',
        maximum: 255
    })
    readonly description?: string;

    @IsNotEmpty({ message: 'Test plan ID is required' })
    @IsInt({ message: 'Test plan ID must be an integer' })
    @ApiProperty({
        description: 'ID of the related test plan'
    })
    readonly testPlanId: number;

    @IsOptional()
    @IsDateString({}, { message: 'Started_at must be a valid ISO date string' })
    @ApiPropertyOptional({
        description: 'Launch start time',
        example: '2025-08-13T10:00:00Z'
    })
    readonly startedAt?: Date;

    @IsOptional()
    @IsDateString({}, { message: 'Finished_at must be a valid ISO date string' })
    @ApiPropertyOptional({
        description: 'Launch finish time',
        example: '2025-08-13T12:00:00Z'
    })
    readonly finishedAt?: Date;
}
