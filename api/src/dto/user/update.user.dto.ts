import {IsOptional, IsString, MaxLength} from "@nestjs/class-validator";
import {ApiPropertyOptional} from "@nestjs/swagger";

export class UpdateUserDto {
    @IsOptional()
    @IsString({message: 'Email must be string'})
    @MaxLength(255, {message: 'Email cannot be greater than 255 symbols'})
    @ApiPropertyOptional({
        description: 'User email',
        maximum: 255
    })
    readonly email: string;

    @IsOptional()
    @IsString({message: 'Password must be string'})
    @MaxLength(255, {message: 'Password cannot be greater than 255 symbols'})
    @ApiPropertyOptional({
        description: 'User Password',
        maximum: 255
    })
    readonly password: string;

    @IsOptional()
    @IsString({ message: 'Username must be string' })
    @MaxLength(255, { message: 'Username cannot be greater than 255 symbols' })
    @ApiPropertyOptional({
        description: 'Username',
        maximum: 255
    })
    readonly username?: string;
}