import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ScenarioSortEntity} from "../../entity/scenario/scenario.sort.entity";
import {Repository} from "typeorm";

@Injectable()
export class ScenarioSortService {
    constructor(@InjectRepository(ScenarioSortEntity) private readonly scenarioSortRepository: Repository<ScenarioSortEntity>) {}

    async getSortOptions() {
        try {
            return await this.scenarioSortRepository.find();
        } catch (error) {
            throw new HttpException(
                error,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}