import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {TestPlanEntity} from "../entity/testPlan/test.plan.entity";
import {In, Repository} from "typeorm";
import {CreateTestPlanDto} from "../dto/testPlan/create.test.plan.dto";
import {UpdateTestPlanDto} from "../dto/testPlan/update.test.plan.dto";
import {ScenarioEntity} from "../entity/scenario/scenario.entity";
import {ProjectService} from "../project/project.service";

@Injectable()
export class TestPlanService {
    constructor(
        @InjectRepository(TestPlanEntity)
        private readonly testPlanRepository: Repository<TestPlanEntity>,
        @InjectRepository(ScenarioEntity)
        private readonly scenarioRepository: Repository<ScenarioEntity>,
        private readonly projectService: ProjectService,
        ) {}

    async createTestPlan(projectID: number, dto: CreateTestPlanDto) {
        try {
            const testPlan = this.testPlanRepository.create(dto);

            testPlan.project = await this.projectService.getProject(projectID);

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

    async getTestPlans(projectID: number) {
        try {
            return await this.testPlanRepository.find({
                where: { project: { id: projectID } },
                relations: ['scenarios', 'project']
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

    async findTestPlan(filters: Record<string, string[]>) {
        const allowedProps = ['id', 'title'];

        const qb = this.testPlanRepository.createQueryBuilder('testPlan')
            .leftJoinAndSelect('testPlan.scenarios', 'scenario');

        let firstCondition = true;

        for (const [key, values] of Object.entries(filters)) {
            if (!allowedProps.includes(key)) continue;
            if (!Array.isArray(values) || values.length === 0) continue;

            const paramName = `${key}_values`;
            const conditionGroup: string[] = [];

            values.forEach((_, index) => {
                conditionGroup.push(`${getField(key)} LIKE :${paramName}${index}`);
            });

            const joinedGroup = `(${conditionGroup.join(" OR ")})`;

            if (firstCondition) {
                qb.where(joinedGroup);
                firstCondition = false;
            } else {
                qb.andWhere(joinedGroup);
            }

            values.forEach((val, index) => {
                qb.setParameter(`${paramName}${index}`, `%${val.toLowerCase()}%`);
            });
        }

        qb.orderBy("testPlan.id", "ASC")
            .addOrderBy("scenario.id", "ASC");

        return qb.getMany();

        function getField(property: string): string {
            switch (property) {
                case 'id':
                    return 'CAST(testPlan.id AS TEXT)';
                case 'title':
                    return 'LOWER(testPlan.title)';
                default:
                    return '1=0';
            }
        }
    }
}