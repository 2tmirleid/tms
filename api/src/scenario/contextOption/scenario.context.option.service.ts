import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ScenarioContextOptionEntity} from "../../entity/scenario/scenario.context.option.entity";
import {Repository} from "typeorm";

@Injectable()
export class ScenarioContextOptionService {
    constructor(@InjectRepository(ScenarioContextOptionEntity) private scenarioContextOptionRepository: Repository<ScenarioContextOptionEntity>) {}

    async getOptions() {
        try {
            return await this.scenarioContextOptionRepository.find();
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}