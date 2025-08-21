import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {LaunchStepResultStatusEntity} from "../../../../entity/launch/result/step/launch.step.result.status.entity";
import {Repository} from "typeorm";

@Injectable()
export class LaunchStepResultStatusService {
    constructor(
        @InjectRepository(LaunchStepResultStatusEntity)
        private readonly launchStepResultStatusRepository: Repository<LaunchStepResultStatusEntity>
    ) {}

    async getStatuses() {
        try {
            return await this.launchStepResultStatusRepository.find();
        } catch (error) {
            throw new HttpException(
                error,
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    async getStatus(id: number) {
        try {
            const status = await this.launchStepResultStatusRepository.findOneBy({ id });

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