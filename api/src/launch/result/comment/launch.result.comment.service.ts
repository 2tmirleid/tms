import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {LaunchResultCommentEntity} from "../../../entity/launch/result/launch.result.comment.entity";
import {Repository} from "typeorm";
import {CreateLaunchResultCommentDto} from "../../../dto/launch/result/comment/create.launch.result.comment.dto";
import {LaunchResultService} from "../launch.result.service";
import {UpdateLaunchResultCommentDto} from "../../../dto/launch/result/comment/update.launch.result.comment.dto";

@Injectable()
export class LaunchResultCommentService {
    constructor(
        @InjectRepository(LaunchResultCommentEntity)
        private readonly launchResultCommentRepository: Repository<LaunchResultCommentEntity>,
        private readonly launchResultService: LaunchResultService
    ) {}

    async createComment(launchResultID: number, dto: CreateLaunchResultCommentDto) {
        try {
            const comment = this.launchResultCommentRepository.create(dto);
            comment.launch_result = await this.launchResultService.getResult(launchResultID);

            return await this.launchResultCommentRepository.save(comment);
        } catch (error) {
            throw new HttpException(
                error.message,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getComments(launchResultID: number) {
        return await this.launchResultCommentRepository.find({
            where: { launch_result: { id: launchResultID } },
            relations: ['user', 'launch_result']
        });
    }

    async getComment(id: number) {
        const comment = await this.launchResultCommentRepository.findOne({
            where: {id: id},
            relations: ['user', 'launch_result']
        });

        if (!comment) {
            throw new HttpException(`Comment with id ${id} not found`, HttpStatus.NOT_FOUND);
        }

        return comment;
    }

    async updateComment(id: number, dto: UpdateLaunchResultCommentDto) {
        try {
            const comment = await this.getComment(id);

            if (dto.body !== undefined) {
                comment.body = dto.body;
                comment.updatedAt = new Date();
            }

            return await this.launchResultCommentRepository.save(comment);
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

    async deleteComment(id: number) {
        try {
            const comment = await this.getComment(id);

            return await this.launchResultCommentRepository.remove(comment);
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