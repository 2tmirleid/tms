import {Expose} from 'class-transformer';
import {IsInt, IsString, MaxLength} from "@nestjs/class-validator";

export class CreateScenarioStepDto {
    @IsString({ message: 'Step must be string' })
    @MaxLength(255, { message: 'Step cannot be greater than 255 symbols' })
    readonly step: string;

    @IsString({ message: 'ExpectedResult must be string' })
    @MaxLength(255, { message: 'ExpectedResult cannot be greater than 255 symbols' })
    readonly expectedResult: string;
}
