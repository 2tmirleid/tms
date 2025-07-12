import {IsString, MaxLength} from "@nestjs/class-validator";
import {ApiPropertyOptional} from "@nestjs/swagger";

export class CreateScenarioTagDto {
    @IsString({ message: 'Title must be string' })
    @MaxLength(15, { message: 'Title cannot be greater than 15 symbols' })
    @ApiPropertyOptional({
        description: 'Tag title',
        maximum: 15
    })
    readonly title?: string;
}