import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FolderEntity} from "../entity/folder.entity";
import {Repository} from "typeorm";
import {CreateFolderDto} from "../dto/create.folder.dto";
import {ScenarioEntity} from "../entity/scenario.entity";

@Injectable()
export class FolderService {
    constructor(
        @InjectRepository(FolderEntity)
        private folderRepository: Repository<FolderEntity>,
        @InjectRepository(ScenarioEntity)
        private scenarioRepository: Repository<ScenarioEntity>
    ) {}

    async createFolder(dto: CreateFolderDto) {
        try {
            const folder = this.folderRepository.create(dto);

            return await this.folderRepository.save(folder);
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getFolders() {
        try {
            return await this.folderRepository.find();
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
}