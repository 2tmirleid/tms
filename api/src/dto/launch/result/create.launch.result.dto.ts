import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsInt, IsNotEmpty, IsOptional, IsString, MaxLength} from "@nestjs/class-validator";

export class CreateLaunchResultDto {
    @IsNotEmpty({ message: 'Launch id cannot be empty' })
    @IsInt({ message: 'Launch id must be an integer' })
    @ApiProperty({
        description: 'Launch id',
        type: Number
    })
    launchId: number;

    @IsNotEmpty({ message: 'Scenario id cannot be empty' })
    @IsInt({ message: 'Scenario id must be an integer' })
    @ApiProperty({
        description: 'Scenario id',
        type: Number
    })
    scenarioId: number;

    @IsOptional()
    @IsString({ message: 'Comment must be string' })
    @MaxLength(255, { message: 'Comment cannot be greater than 255 symbols' })
    @ApiPropertyOptional({description: 'Result comment'})
    comment?: string;
}
