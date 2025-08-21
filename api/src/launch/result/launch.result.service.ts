import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {LaunchResultEntity} from "../../entity/launch/result/launch.result.entity";
import {Repository} from "typeorm";
import {UpdateLaunchResultDto} from "../../dto/launch/result/update.launch.result.dto";
import {CreateLaunchResultDto} from "../../dto/launch/result/create.launch.result.dto";
import {LaunchResultStatusService} from "./status/launch.result.status.service";
import {LaunchEntity} from "../../entity/launch/launch.entity";
import {ScenarioEntity} from "../../entity/scenario/scenario.entity";

@Injectable()
export class LaunchResultService {
    constructor(
        @InjectRepository(LaunchResultEntity)
        private readonly launchResultRepository: Repository<LaunchResultEntity>,
        private readonly launchResultStatusService: LaunchResultStatusService
    ) {
    }

    async createScenarioResult(dto: CreateLaunchResultDto): Promise<LaunchResultEntity> {
        const result = this.launchResultRepository.create({
            launch: {id: dto.launchId} as LaunchEntity,
            scenario: {id: dto.scenarioId} as ScenarioEntity,
            comment: dto.comment,
        });

        result.status = await this.launchResultStatusService.getStatus(1);

        return this.launchResultRepository.save(result);
    }

    async updateScenarioResult(id: number, dto: UpdateLaunchResultDto): Promise<LaunchResultEntity> {
        const result = await this.launchResultRepository.findOne({where: {id}});
        if (!result) {
            throw new NotFoundException(`LaunchResult with id ${id} not found`);
        }

        if (dto.comment !== undefined) {
            result.comment = dto.comment;
            result.updatedAt = new Date();
        }

        if (dto.statusId !== undefined) {
            result.status = await this.launchResultStatusService.getStatus(dto.statusId);
            result.updatedAt = new Date();
        }

        return this.launchResultRepository.save(result);
    }

    async getResults(launchId: number): Promise<LaunchResultEntity[]> {
        return this.launchResultRepository.find({
            where: {launch: {id: launchId}},
            relations: ["scenario", "stepResults", "status"],
        });
    }

    async getResult(id: number): Promise<LaunchResultEntity> {
        const result = await this.launchResultRepository.findOne({
            where: {id},
            relations: ["scenario", "stepResults", "status"],
        });

        if (!result) {
            throw new NotFoundException(`LaunchResult with id ${id} not found`);
        }

        return result;
    }

    async deleteScenarioResult(id: number): Promise<void> {
        await this.launchResultRepository.delete(id);
    }
}