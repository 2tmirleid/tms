import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ScenarioAttachmentEntity} from "../../entity/scenario.attachment.entity";
import {DataSource, Repository} from "typeorm";
import {ScenarioEntity} from "../../entity/scenario/scenario.entity";
import * as fs from "node:fs";
import * as path from "node:path";

@Injectable()
export class ScenarioAttachmentService {
    constructor(
        @InjectRepository(ScenarioAttachmentEntity)
        private readonly scenarioAttachmentRepository: Repository<ScenarioAttachmentEntity>,
        @InjectRepository(ScenarioEntity)
        private scenarioRepository: Repository<ScenarioEntity>,
        private readonly dataSource: DataSource,
    ) {}

    async uploadAttachment(
        id: number,
        file: Express.Multer.File,
        title?: string
    ): Promise<ScenarioEntity> {
        const queryRunner = this.dataSource.createQueryRunner();

        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();

            const scenario = await queryRunner.manager.findOne(ScenarioEntity, {
                where: { id },
                relations: ['attachments']
            });

            if (!scenario) {
                throw new HttpException(
                    `Scenario with id ${id} not found`,
                    HttpStatus.NOT_FOUND
                );
            }

            const uploadDir = './upload';
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
            const fileName = originalName;
            const filePath = path.join(uploadDir, fileName);

            await fs.promises.writeFile(filePath, file.buffer);

            const attachment = new ScenarioAttachmentEntity();
            attachment.title = title || originalName;
            attachment.path = `/upload/${encodeURIComponent(fileName)}`;

            scenario.attachments = [...(scenario.attachments || []), attachment];
            scenario.updatedAt = new Date();

            await queryRunner.manager.save(scenario);
            await queryRunner.commitTransaction();

            return scenario;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new HttpException(
                error.message,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        } finally {
            await queryRunner.release();
        }
    }

    async deleteAttachment(id: number) {
        try {
            const attachment = await this.scenarioAttachmentRepository.findOneBy({ id });

            if (!attachment) {
                throw new HttpException(
                    `Attachment with id ${id} not found`,
                    HttpStatus.NOT_FOUND
                );
            }

            let filePath = attachment.path.startsWith('/')
                ? attachment.path.substring(1)
                : attachment.path;
            filePath = decodeURIComponent(filePath);

            const fullPath = path.join(process.cwd(), filePath);

            if (fs.existsSync(fullPath)) {
                await fs.promises.unlink(fullPath);
            }

            console.log(fullPath);

            return await this.scenarioAttachmentRepository.remove(attachment);
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