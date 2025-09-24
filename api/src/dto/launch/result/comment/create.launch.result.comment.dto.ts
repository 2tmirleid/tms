import {IsInt, IsNotEmpty, IsString, MaxLength} from "@nestjs/class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateLaunchResultCommentDto {
    @IsNotEmpty({message: 'Body cannot be empty'})
    @IsString({message: 'Body must be string'})
    @MaxLength(255, {message: 'Body cannot be greater than 255 symbols'})
    @ApiProperty({
        description: 'Comment body',
        maximum: 255
    })
    readonly body: string;

    @IsNotEmpty({message: 'User ID is required'})
    @IsInt({message: 'User ID must be an integer'})
    @ApiProperty({
        description: 'ID of the related user'
    })
    readonly user_id: number;
}