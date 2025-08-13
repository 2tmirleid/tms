import {IsInt, IsNotEmpty, IsOptional, IsString, MaxLength} from "@nestjs/class-validator";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class UpdateFolderDto {
    @IsOptional()
    @IsNotEmpty({message: 'Title cannot be empty'})
    @IsString({message: 'Title must be string'})
    @MaxLength(255, {message: 'Title cannot be greater than 255 symbols'})
    @ApiPropertyOptional({
        description: 'Folder title',
        maximum: 255
    })
    readonly title?: string;

    @IsOptional()
    @IsInt({ message: 'Parent ID must be an integer' })
    @ApiPropertyOptional({
        description: 'Optional parent folder ID for nested structure',
        nullable: true
    })
    readonly parent_id?: number;
}