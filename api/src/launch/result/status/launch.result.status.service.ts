import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {LaunchResultStatusEntity} from "../../../entity/launch/result/launch.result.status.entity";
import {Repository} from "typeorm";

@Injectable()
export class LaunchResultStatusService {
    constructor(
        @InjectRepository(LaunchResultStatusEntity)
        private readonly launchResultStatusRepository: Repository<LaunchResultStatusEntity>
    ) {}

    async getStatuses() {
        try {
            return await this.launchResultStatusRepository.find();
        } catch (error) {
            throw new HttpException(
                error,
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    async getStatus(id: number) {
        try {
            const status = await this.launchResultStatusRepository.findOneBy({ id });

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