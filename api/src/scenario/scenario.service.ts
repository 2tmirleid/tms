import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {ScenarioEntity} from "../entity/scenario.entity";
import {CreateScenarioDto} from "../dto/create.scenario.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";
import {UpdateScenarioDto} from "../dto/update.scenario.dto";
import {ScenarioStepEntity} from "../entity/scenario.step.entity";
import {ScenarioTagEntity} from "../entity/scenario.tag.entity";

@Injectable()
export class ScenarioService {
    constructor(
        @InjectRepository(ScenarioEntity)
        private scenarioRepository: Repository<ScenarioEntity>,

        private readonly dataSource: DataSource,
    ) {}

    async createScenario(dto: CreateScenarioDto) {
        try {
            const scenario = this.scenarioRepository.create(dto);

            return await this.scenarioRepository.save(scenario);
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
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

    async findScenario(property: string, value: string | number) {
        if (!property || !value) {
            throw new HttpException(
                'Оба параметра property и value обязательны.',
                HttpStatus.BAD_REQUEST
            );
        }

        const allowedProps = ['id', 'title', 'tag'];
        if (!allowedProps.includes(property)) {
            throw new HttpException(`Недопустимое поле: ${property}`, HttpStatus.BAD_REQUEST);
        }

        try {
            const qb = this.scenarioRepository.createQueryBuilder('scenario')
                .leftJoinAndSelect('scenario.steps', 'step')
                .leftJoinAndSelect('scenario.tags', 'tag');

            if (property === 'id' && typeof value === 'number') {
                qb.where('scenario.id = :value', { value });
            } else if (property === 'title') {
                qb.where('LOWER(scenario.title) LIKE LOWER(:value)', { value: `%${value}%` });
            } else if (property === 'tag') {
                qb.where('LOWER(tag.title) LIKE LOWER(:value)', { value: `%${value}%` });
            }

            qb.orderBy('scenario.id', 'ASC')
                .addOrderBy('step.id', 'ASC');

            return await qb.getMany();
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }

            throw new HttpException(
                error?.message || 'Ошибка при поиске сценария',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}