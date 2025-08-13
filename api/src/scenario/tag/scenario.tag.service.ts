import {HttpException, HttpStatus, Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ScenarioTagEntity} from "../../entity/scenario.tag.entity";
import {Repository} from "typeorm";
import {CreateScenarioTagDto} from "../../dto/tag/create.scenario.tag.dto";
import {ScenarioEntity} from "../../entity/scenario/scenario.entity";

@Injectable()
export class ScenarioTagService {
    constructor(
        @InjectRepository(ScenarioTagEntity)
        private scenarioTagRepository: Repository<ScenarioTagEntity>,
        @InjectRepository(ScenarioEntity)
        private scenarioRepository: Repository<ScenarioEntity>
    ) {}

    async createTag(scenarioID: number, tags: CreateScenarioTagDto[]) {
        try {
            const scenario = await this.scenarioRepository.findOne({
                where: { id: scenarioID },
                relations: ['tags'],
            });

            if (!scenario) {
                throw new NotFoundException(`Scenario with id ${scenarioID} not found`);
            }

            const newTags = tags.map(dto => {
               return this.scenarioTagRepository.create({
                  title: dto.title,
                  scenario: scenario,
               });
            });

            return await this.scenarioTagRepository.save(newTags);
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

    async deleteTag(id: number) {
        try {
            const tag = await this.scenarioTagRepository.findOneBy({ id });

            if (!tag) {
                throw new HttpException(
                    `tag with id ${id} not found`,
                    HttpStatus.NOT_FOUND
                );
            }

            return await this.scenarioTagRepository.remove(tag);
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