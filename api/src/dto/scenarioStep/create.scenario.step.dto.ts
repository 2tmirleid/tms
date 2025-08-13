import {IsString, MaxLength} from "@nestjs/class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateScenarioStepDto {
    @IsString({ message: 'Step must be string' })
    @MaxLength(255, { message: 'Step cannot be greater than 255 symbols' })
    @ApiProperty({
        description: 'Step',
        maximum: 255
    })
    readonly step: string;

    @IsString({ message: 'ExpectedResult must be string' })
    @MaxLength(255, { message: 'ExpectedResult cannot be greater than 255 symbols' })
    @ApiProperty({
        description: 'Expected result of step',
        maximum: 255
    })
    readonly expectedResult: string;
}
