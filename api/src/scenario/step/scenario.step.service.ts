import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {ScenarioStepEntity} from "../../entity/scenario.step.entity";
import {ScenarioEntity} from "../../entity/scenario.entity";
import {CreateScenarioStepDto} from "../../dto/create.scenario.step.dto";

@Injectable()
export class ScenarioStepService {
    constructor(
        @InjectRepository(ScenarioStepEntity)
        private scenarioStepRepository: Repository<ScenarioStepEntity>,

        @InjectRepository(ScenarioEntity)
        private scenarioRepository: Repository<ScenarioEntity>
    ) {}

    async createStep(scenarioID: number, steps: CreateScenarioStepDto[]) {
        try {
            const scenario = await this.scenarioRepository.findOne({
                where: { id: scenarioID },
                relations: ['steps'],
            });

            if (!scenario) {
                throw new NotFoundException(`Scenario with id ${scenarioID} not found`);
            }

            const newSteps = steps.map(dto => {
                return this.scenarioStepRepository.create({
                    step: dto.step,
                    expectedResult: dto.expectedResult,
                    scenario: scenario,
                });
            });

            return await this.scenarioStepRepository.save(newSteps);
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

    async deleteStep(id: number) {
        try {
            const step = await this.scenarioStepRepository.findOneBy({ id });

            if (!step) {
                throw new HttpException(
                    `Step with id ${id} not found`,
                    HttpStatus.NOT_FOUND
                );
            }

            return await this.scenarioStepRepository.remove(step);
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