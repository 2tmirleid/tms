import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {LaunchSortEntity} from "../../entity/launch/launch.sort.entity";
import {Repository} from "typeorm";

@Injectable()
export class LaunchSortService {
    constructor(
        @InjectRepository(LaunchSortEntity)
        private readonly launchSortRepository: Repository<LaunchSortEntity>
    ) {
    }

    async getSortOptions() {
        try {
            return await this.launchSortRepository.find();
        } catch (error) {
            throw new HttpException(
                error,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}