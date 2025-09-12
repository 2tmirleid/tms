import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FolderEntity} from "../entity/folder/folder.entity";
import {Repository} from "typeorm";
import {CreateFolderDto} from "../dto/folder/create.folder.dto";
import {ScenarioEntity} from "../entity/scenario/scenario.entity";
import {UpdateFolderDto} from "../dto/folder/update.folder.dto";
import {ProjectService} from "../project/project.service";

@Injectable()
export class FolderService {
    constructor(
        @InjectRepository(FolderEntity)
        private folderRepository: Repository<FolderEntity>,
        @InjectRepository(ScenarioEntity)
        private scenarioRepository: Repository<ScenarioEntity>,
        private readonly projectService: ProjectService,
    ) {}

    async createFolder(projectID: number, dto: CreateFolderDto) {
        try {
            const folder = this.folderRepository.create(dto);

            folder.project = await this.projectService.getProject(projectID);

            return await this.folderRepository.save(folder);
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getFolders(projectID: number,) {
        try {
            return await this.folderRepository.find({
                where: {project: {id: projectID}},
                relations: ['children', 'scenarios']
            });
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async putScenario(scenarioID: number, folderID: number) {
        try {
            const scenario = await this.scenarioRepository.findOneBy({ id: scenarioID });

            if (!scenario) {
                throw new HttpException(
                    `Scenario with id ${scenarioID} not found`,
                    HttpStatus.NOT_FOUND
                );
            }

            scenario.folder_id = folderID;

            return await this.scenarioRepository.save(scenario);
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

    async putFolder(childFolderID: number, parentFolderID: number) {
        try {
            if (childFolderID === parentFolderID) {
                throw new HttpException(
                    'A folder cannot be its own parent',
                    HttpStatus.BAD_REQUEST
                );
            }

            const childFolder = await this.folderRepository.findOneBy({ id: childFolderID });
            if (!childFolder) {
                throw new HttpException(
                    `Child folder with id ${childFolderID} not found`,
                    HttpStatus.NOT_FOUND
                );
            }

            const parentFolder = await this.folderRepository.findOneBy({ id: parentFolderID });
            if (!parentFolder) {
                throw new HttpException(
                    `Parent folder with id ${parentFolderID} not found`,
                    HttpStatus.NOT_FOUND
                );
            }

            let currentParent: FolderEntity | null = parentFolder;
            while (currentParent) {
                if (currentParent.id === childFolderID) {
                    parentFolder.parent_id = childFolder.parent_id;
                    await this.folderRepository.save(parentFolder);
                    break;
                }

                if (!currentParent.parent_id) break;
                currentParent = await this.folderRepository.findOneBy({ id: currentParent.parent_id });
            }

            childFolder.parent_id = parentFolderID;
            return await this.folderRepository.save(childFolder);
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

    async pullOutScenario(scenarioID: number) {
        try {
            const scenario = await this.scenarioRepository.findOneBy({ id: scenarioID });

            if (!scenario) {
                throw new HttpException(
                    `Scenario with id ${scenarioID} not found`,
                    HttpStatus.NOT_FOUND
                );
            }

            scenario.folder_id = null;

            return await this.scenarioRepository.save(scenario);
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

    async pullOutFolder(folderID: number) {
        try {
            const folder = await this.folderRepository.findOneBy({ id: folderID });

            if (!folder) {
                throw new HttpException(
                    `Folder with id ${folderID} not found`,
                    HttpStatus.NOT_FOUND
                );
            }

            folder.parent_id = null;

            return await this.folderRepository.save(folder);
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

    async updateFolder(id: number, dto: UpdateFolderDto) {
        try {
            const folder = await this.folderRepository.findOneBy({id});

            if (!folder) {
                throw new HttpException(
                    `folder with id ${id} not found`,
                    HttpStatus.NOT_FOUND
                );
            }

            if (dto.title !== undefined) {
                folder.title = dto.title;
            }

            return this.folderRepository.save(folder);
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

    async deleteFolder(id: number) {
        try {
            const folder = await this.folderRepository.findOne({
                where: { id },
                relations: ['scenarios'],
            });

            if (!folder) {
                throw new HttpException(
                    `folder with id ${id} not found`,
                    HttpStatus.NOT_FOUND
                );
            }

            return await this.folderRepository.remove(folder);
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