import {IsNotEmpty, IsString, MaxLength} from "@nestjs/class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateScenarioRelatedTicketDto {
    @IsNotEmpty({ message: 'Link cannot be empty' })
    @IsString({ message: 'Link must be string' })
    @ApiProperty({
        description: 'Related ticket link',
    })
    readonly link: string;
}