import {IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength} from "@nestjs/class-validator";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class CreateUserDto {
    @IsNotEmpty({message: 'Email cannot be empty'})
    @IsString({message: 'Email must be string'})
    @IsEmail({message: 'Email must be correct'})
    @MaxLength(255, {message: 'Email cannot be greater than 255 symbols'})
    @ApiProperty({
        description: 'User email',
        maximum: 255
    })
    readonly email: string;

    @IsNotEmpty({message: 'Password cannot be empty'})
    @IsString({message: 'Password must be string'})
    @MaxLength(255, {message: 'Password cannot be greater than 255 symbols'})
    @ApiProperty({
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