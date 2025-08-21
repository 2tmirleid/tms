import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {LaunchEntity} from "../entity/launch/launch.entity";
import {Repository} from "typeorm";
import {CreateLaunchDto} from "../dto/launch/create.launch.dto";
import {LaunchStatusService} from "./status/launch.status.service";
import {UpdateLaunchDto} from "../dto/launch/update.launch.dto";
import {LaunchResultService} from "./result/launch.result.service";
import {TestPlanService} from "../testPlan/test.plan.service";
import {LaunchStepResultService} from "./result/step/launch.step.result.service";

@Injectable()
export class LaunchService {
    constructor(
        @InjectRepository(LaunchEntity)
        private readonly launchRepository: Repository<LaunchEntity>,
        private readonly launchStatusService: LaunchStatusService,
        private readonly launchResultService: LaunchResultService,
        private readonly testPlanService: TestPlanService,
        private readonly launchStepResultService: LaunchStepResultService
    ) {}

    async createLaunch(dto: CreateLaunchDto) {
        try {
            const testPlan = await this.testPlanService.getTestPlan(dto.testPlanId);
            if (!testPlan) {
                throw new HttpException(
                    `TestPlan with id ${dto.testPlanId} not found`,
                    HttpStatus.NOT_FOUND
                );
            }

            const launch = this.launchRepository.create({
                title: dto.title,
                description: dto.description,
                testPlan: testPlan,
            });

            launch.status = await this.launchStatusService.getStatus(1);

            const savedLaunch = await this.launchRepository.save(launch);

            await Promise.all(
                testPlan.scenarios.map(async (scenario) => {
                    const launchResult = await this.launchResultService.createScenarioResult({
                        launchId: savedLaunch.id,
                        scenarioId: scenario.id,
                    });

                    await Promise.all(
                        scenario.steps.map((step) =>
                            this.launchStepResultService.createStepResult({
                                launchResultId: launchResult.id,
                                stepId: step.id,
                            }),
                        )
                    );
                })
            );


            return savedLaunch;
        } catch (error) {
            throw new HttpException(
                error.message || 'Failed to create launch',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getLaunches() {
        try {
            return await this.launchRepository.find({
                relations: ['status', 'testPlan']
            });
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getLaunch(id: number) {
        try {
            const launch = await this.launchRepository.findOneBy({id});

            if (!launch) {
                throw new HttpException(
                    `Launch with id ${id} not found`,
                    HttpStatus.NOT_FOUND
                );
            }

            return launch;
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

    async updateLaunch(id: number, dto: UpdateLaunchDto) {
        try {
            const launch = await this.launchRepository.findOne({
                where: { id },
                relations: ['status', 'testPlan']
            });

            if (!launch) {
                throw new HttpException(
                    `Launch with id ${id} not found`,
                    HttpStatus.NOT_FOUND
                );
            }

            if (dto.statusId !== undefined) {
                launch.status = await this.launchStatusService.getStatus(dto.statusId);
                launch.updatedAt = new Date();
            }

            if (dto.testPlanId !== undefined) {
                launch.testPlan = { id: dto.testPlanId } as any;
                launch.updatedAt = new Date();
            }

            if (dto.title !== undefined) {
                launch.title = dto.title;
                launch.updatedAt = new Date();
            }
            if (dto.description !== undefined) {
                launch.description = dto.description;
                launch.updatedAt = new Date();
            }
            if (dto.startedAt !== undefined) {
                launch.startedAt = dto.startedAt;
                launch.updatedAt = new Date();
            }
            if (dto.finishedAt !== undefined) {
                launch.finishedAt = dto.finishedAt;
                launch.updatedAt = new Date();
            }

            return await this.launchRepository.save(launch);
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

    async deleteLaunch(id: number) {
        try {
            const launch = await this.launchRepository.findOneBy({id});

            if (!launch) {
                throw new HttpException(
                    `Launch with id ${id} not found`,
                    HttpStatus.NOT_FOUND
                );
            }

            return await this.launchRepository.remove(launch);
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