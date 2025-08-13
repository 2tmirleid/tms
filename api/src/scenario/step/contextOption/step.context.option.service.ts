import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {StepContextOptionEntity} from "../../../entity/scenarioStep/step.context.option.entity";

@Injectable()
export class StepContextOptionService {
    constructor(@InjectRepository(StepContextOptionEntity) private stepContextOptionEntityRepository: Repository<StepContextOptionEntity>) {}

    async getOptions() {
        try {
            return await this.stepContextOptionEntityRepository.find();
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}