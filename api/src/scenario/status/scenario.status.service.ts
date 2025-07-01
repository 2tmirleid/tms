import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ScenarioStatusEntity} from "../../entity/scenario.status.entity";
import {Repository} from "typeorm";

@Injectable()
export class ScenarioStatusService {
    constructor(@InjectRepository(ScenarioStatusEntity) private readonly scenarioStatusRepository: Repository<ScenarioStatusEntity>) {}

    async getStatuses() {
        try {
            return await this.scenarioStatusRepository.find();
        } catch (error) {
            throw new HttpException(
                error,
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    async getStatus(id: number) {
        try {
            const status = await this.scenarioStatusRepository.findOneBy({ id });

            if (!status) {
                throw new HttpException(
                    `Status with id ${id} not found`,
                    HttpStatus.NOT_FOUND
                );
            }

            return status;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }

            throw new HttpException(
                error,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}