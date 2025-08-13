import {IsNotEmpty, IsString, MaxLength} from "@nestjs/class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateScenarioAttachmentDto {
    @IsNotEmpty({message: 'Title cannot be empty'})
    @IsString({message: 'Title must be string'})
    @MaxLength(255, {message: 'Title cannot be greater than 255 symbols'})
    @ApiProperty({
        description: 'Attachment title',
        maximum: 255
    })
    readonly title: string;

    @IsNotEmpty({message: 'Title cannot be empty'})
    @IsString({message: 'Title must be string'})
    @MaxLength(255, {message: 'Title cannot be greater than 255 symbols'})
    @ApiProperty({
        description: 'Attachment path',
        maximum: 255
    })
    readonly path: string;
}