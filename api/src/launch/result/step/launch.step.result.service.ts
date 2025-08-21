import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {LaunchStepResultEntity} from "../../../entity/launch/result/step/launch.step.result.entity";
import {Repository} from "typeorm";
import {CreateLaunchStepResultDto} from "../../../dto/launch/result/step/create.launch.step.result.dto";
import {UpdateLaunchStepResultDto} from "../../../dto/launch/result/step/update.launch.step.result.dto";
import {LaunchStepResultStatusService} from "./status/launch.step.result.status.service";

@Injectable()
export class LaunchStepResultService {
    constructor(
        @InjectRepository(LaunchStepResultEntity)
        private readonly launchStepResultRepository: Repository<LaunchStepResultEntity>,
        private readonly launchStepResultStatusService: LaunchStepResultStatusService
    ) {}

    async createStepResult(dto: CreateLaunchStepResultDto): Promise<LaunchStepResultEntity> {
        const stepResult = this.launchStepResultRepository.create({
            comment: dto.comment,
            startedAt: dto.startedAt,
            finishedAt: dto.finishedAt,

            launchResult: { id: dto.launchResultId },
            step: { id: dto.stepId }
        });

        stepResult.status = await this.launchStepResultStatusService.getStatus(1);

        return this.launchStepResultRepository.save(stepResult);
    }

    async updateStepResult(id: number, dto: UpdateLaunchStepResultDto): Promise<LaunchStepResultEntity> {
        const stepResult = await this.launchStepResultRepository.findOne({ where: { id } });
        if (!stepResult) {
            throw new NotFoundException(`StepResult with id ${id} not found`);
        }

        if (dto.comment !== undefined) {
            stepResult.comment = dto.comment;
            stepResult.updatedAt = new Date();
        }

        if (dto.statusId !== undefined) {
            stepResult.status = await this.launchStepResultStatusService.getStatus(dto.statusId);
            stepResult.updatedAt = new Date();
        }

        return this.launchStepResultRepository.save(stepResult);
    }

    async getSteps(launchResultId: number): Promise<LaunchStepResultEntity[]> {
        return this.launchStepResultRepository.find({
            where: { launchResult: { id: launchResultId } },
            relations: ["step", "status"],
        });
    }

    async getStep(id: number): Promise<LaunchStepResultEntity> {
        const stepResult = await this.launchStepResultRepository.findOne({
            where: { id },
            relations: ["step", "launchResult"],
        });

        if (!stepResult) {
            throw new NotFoundException(`StepResult with id ${id} not found`);
        }

        return stepResult;
    }

    async deleteStepResult(id: number): Promise<void> {
        await this.launchStepResultRepository.delete(id);
    }
}