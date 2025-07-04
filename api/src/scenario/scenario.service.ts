import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {ScenarioEntity} from "../entity/scenario.entity";
import {CreateScenarioDto} from "../dto/create.scenario.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";
import {UpdateScenarioDto} from "../dto/update.scenario.dto";
import {ScenarioStepEntity} from "../entity/scenario.step.entity";
import {ScenarioTagEntity} from "../entity/scenario.tag.entity";
import {ScenarioStatusService} from "./status/scenario.status.service";
import {parseScenarioSteps} from "../utils/parse.scenario";

@Injectable()
export class ScenarioService {
    constructor(
        @InjectRepository(ScenarioEntity)
        private scenarioRepository: Repository<ScenarioEntity>,
        private readonly scenarioStatusRepository: ScenarioStatusService,
        private readonly dataSource: DataSource,
    ) {
    }

    async createScenario(dto: CreateScenarioDto) {
        try {
            const scenario = this.scenarioRepository.create(dto);

            scenario.status = await this.scenarioStatusRepository.getStatus(4);

            return await this.scenarioRepository.save(scenario);
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getScenarios() {
        try {
            return await this.scenarioRepository.find();
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getScenario(id: number) {
        try {
            const scenario = await this.scenarioRepository.findOneBy({id});

            if (!scenario) {
                throw new HttpException(
                    `Scenario with id ${id} not found`,
                    HttpStatus.NOT_FOUND
                );
            }

            return scenario;
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

    async updateScenario(id: number, dto: UpdateScenarioDto) {
        try {
            const scenario = await this.scenarioRepository.findOne({
                where: {id},
                relations: ['steps'],
            });

            if (!scenario) {
                throw new HttpException(
                    `Scenario with id ${id} not found`,
                    HttpStatus.NOT_FOUND
                );
            }

            this.scenarioRepository.merge(scenario, {
                title: dto.title ?? scenario.title,
                description: dto.description ?? scenario.description,
                precondition: dto.precondition ?? scenario.precondition,
            });

            if (dto.steps !== undefined) {
                scenario.steps = dto.steps.map(stepDto => {
                    const step = new ScenarioStepEntity();
                    step.id = stepDto.id;
                    step.step = stepDto.step;
                    step.expectedResult = stepDto.expectedResult;
                    return step;
                });

                scenario.updatedAt = new Date();
            }

            if (dto.tags !== undefined) {
                scenario.tags = dto.tags.map(tagDto => {
                    const tag = new ScenarioTagEntity();
                    tag.id = tagDto.id;
                    tag.title = tagDto.title;
                    return tag;
                });

                scenario.updatedAt = new Date();
            }

            if (dto.status !== undefined) {
                scenario.status = await this.scenarioStatusRepository.getStatus(dto.status);
            }

            return this.scenarioRepository.save(scenario);
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

    async deleteScenario(id: number) {
        try {
            const scenario = await this.scenarioRepository.findOneBy({id});

            if (!scenario) {
                throw new HttpException(
                    `Scenario with id ${id} not found`,
                    HttpStatus.NOT_FOUND
                );
            }

            return this.scenarioRepository.remove(scenario);
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

    async findScenario(filters: Record<string, string[]>) {
        const allowedProps = ['id', 'title', 'tag', 'status'];

        const qb = this.scenarioRepository.createQueryBuilder('scenario')
            .leftJoinAndSelect('scenario.steps', 'step')
            .leftJoinAndSelect('scenario.tags', 'tag')
            .leftJoinAndSelect('scenario.status', 'status');

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

        qb.orderBy("scenario.id", "ASC")
            .addOrderBy("step.id", "ASC");

        return qb.getMany();

        function getField(property: string): string {
            switch (property) {
                case 'id':
                    return 'CAST(scenario.id AS TEXT)';
                case 'title':
                    return 'LOWER(scenario.title)';
                case 'tag':
                    return 'LOWER(tag.title)';
                case 'status':
                    return 'LOWER(status.title)';
                default:
                    return '1=0';
            }
        }
    }

    async importScenario(file: any, type: string) {
        try {
            let dto = {}

            if (type === 'csv') {
                dto = {
                    title: file[0]?.name,
                    description: file[0]?.description,
                    precondition: file[0]?.precondition,
                    steps: parseScenarioSteps(file[0]?.scenario),
                };
            }

            const scenario = this.scenarioRepository.create(dto);

            scenario.status = await this.scenarioStatusRepository.getStatus(4);

            return await this.scenarioRepository.save(scenario);
        } catch (error) {
            throw new HttpException(
                error,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}