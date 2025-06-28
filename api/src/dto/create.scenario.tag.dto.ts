import {IsString, MaxLength} from "@nestjs/class-validator";

export class CreateScenarioTagDto {
    @IsString({ message: 'Title must be string' })
    @MaxLength(15, { message: 'Title cannot be greater than 15 symbols' })
    readonly title?: string;
}