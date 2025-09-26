import {IsInt, IsOptional, IsString, MaxLength} from "@nestjs/class-validator";
import {ApiPropertyOptional} from "@nestjs/swagger";

export class UpdateScenarioCommentDto {
    @IsOptional()
    @IsString({message: 'Body must be string'})
    @MaxLength(255, {message: 'Body cannot be greater than 255 symbols'})
    @ApiPropertyOptional({
        description: 'Comment body',
        maximum: 255
    })
    readonly body?: string;
}