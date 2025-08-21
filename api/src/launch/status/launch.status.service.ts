import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {LaunchStatusEntity} from "../../entity/launch/launch.status.entity";
import {Repository} from "typeorm";

@Injectable()
export class LaunchStatusService {
    constructor(@InjectRepository(LaunchStatusEntity) private readonly launchStatusRepository: Repository<LaunchStatusEntity>) {}

    async getStatuses() {
        try {
            return await this.launchStatusRepository.find();
        } catch (error) {
            throw new HttpException(
                error,
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    async getStatus(id: number) {
        try {
            const status = await this.launchStatusRepository.findOneBy({ id });

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