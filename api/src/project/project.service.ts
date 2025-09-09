import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ProjectEntity} from "../entity/project/project.entity";
import {Repository} from "typeorm";
import {CreateProjectDto} from "../dto/project/create.project.dto";
import {UpdateProjectDto} from "../dto/project/update.project.dto";

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(ProjectEntity)
        private readonly projectRepository: Repository<ProjectEntity>
    ) {}

    async createProject(dto: CreateProjectDto) {
        try {
            const project = this.projectRepository.create(dto);

            return await this.projectRepository.save(project);
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getProjects() {
        try {
            return await this.projectRepository.find({
                relations: ['scenarios', 'testPlans', 'launches']
            });
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getProject(id: number) {
        try {
            const project = await this.projectRepository.findOne({
                where: { id },
                relations: ['scenarios', 'testPlans', 'launches']
            });

            if (!project) {
                throw new HttpException(
                    `Project with id ${id} not found`,
                    HttpStatus.NOT_FOUND
                );
            }

            return project;
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

    async updateProject(id: number, dto: UpdateProjectDto) {
        try {
            const project = await this.projectRepository.findOne({
                where: { id },
                relations: ['scenarios', 'testPlans', 'launches']
            });

            if (!project) {
                throw new HttpException(
                    `Project with id ${id} not found`,
                    HttpStatus.NOT_FOUND
                );
            }

            if (dto.title !== undefined) {
                project.title = dto.title;
            }

            if (dto.description !== undefined) {
                project.description = dto.description;
            }

            return await this.projectRepository.save(project);
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

    async deleteProject(id: number) {
        try {
            const project = await this.projectRepository.findOneBy({id});

            if (!project) {
                throw new HttpException(
                    `Project with id ${id} not found`,
                    HttpStatus.NOT_FOUND
                );
            }

            return await this.projectRepository.remove(project);
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