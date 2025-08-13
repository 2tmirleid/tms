import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {TestPlanEntity} from "../entity/testPlan/test.plan.entity";
import {In, Repository} from "typeorm";
import {CreateTestPlanDto} from "../dto/testPlan/create.test.plan.dto";
import {UpdateTestPlanDto} from "../dto/testPlan/update.test.plan.dto";
import {ScenarioEntity} from "../entity/scenario/scenario.entity";

@Injectable()
export class TestPlanService {
    constructor(
        @InjectRepository(TestPlanEntity)
        private readonly testPlanRepository: Repository<TestPlanEntity>,
        @InjectRepository(ScenarioEntity)
        private readonly scenarioRepository: Repository<ScenarioEntity>
        ) {}

    async createTestPlan(dto: CreateTestPlanDto) {
        try {
            const testPlan = this.testPlanRepository.create(dto);

            return await this.testPlanRepository.save(testPlan);
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getTestPlan(id: number) {
        try {
            const testPlan = await this.testPlanRepository.findOne({
                where: { id },
                relations: ['scenarios']
            });

            if (!testPlan) {
                throw new HttpException(
                    `Test-plan with id ${id} not found`,
                    HttpStatus.NOT_FOUND
                );
            }

            return testPlan;
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

    async getTestPlans() {
        try {
            return await this.testPlanRepository.find({
                relations: ['scenarios']
            });
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateTestPlan(id: number, dto: UpdateTestPlanDto) {
        try {
            const testPlan = await this.testPlanRepository.findOne({
                where: { id },
                relations: ['scenarios']
            });

            if (!testPlan) {
                throw new HttpException(
                    `Test-plan with id ${id} not found`,
                    HttpStatus.NOT_FOUND
                );
            }

            if (dto.title !== undefined) {
                testPlan.title = dto.title;

                testPlan.updatedAt = new Date();
            }

            if (dto.description !== undefined) {
                testPlan.description = dto.description;

                testPlan.updatedAt = new Date();
            }

            if (dto.scenarios !== undefined) {
                const scenarios = await this.scenarioRepository.find({
                    where: { id: In(dto.scenarios) }
                });

                testPlan.scenarios = scenarios;
                testPlan.updatedAt = new Date();
            }

            return await this.testPlanRepository.save(testPlan);
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

    async deleteTestPlan(id: number) {
        try {
            const testPlan = await this.testPlanRepository.findOne({
                where: { id },
                relations: ['scenarios']
            });

            if (!testPlan) {
                throw new HttpException(
                    `Test-plan with id ${id} not found`,
                    HttpStatus.NOT_FOUND
                );
            }

            return await this.testPlanRepository.remove(testPlan);
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