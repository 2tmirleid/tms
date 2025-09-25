import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ScenarioCommentEntity} from "../../entity/scenario/scenario.comment.entity";
import {Repository} from "typeorm";
import {CreateLaunchResultCommentDto} from "../../dto/launch/result/comment/create.launch.result.comment.dto";
import {ScenarioService} from "../scenario.service";
import {UserService} from "../../user/user.service";
import {UpdateLaunchResultCommentDto} from "../../dto/launch/result/comment/update.launch.result.comment.dto";
import {UpdateScenarioCommentDto} from "../../dto/scenarioComment/update.scenario.comment.dto";

@Injectable()
export class ScenarioCommentService {
    constructor(
       @InjectRepository(ScenarioCommentEntity)
       private readonly scenarioCommentRepository: Repository<ScenarioCommentEntity>,
       private readonly scenarioService: ScenarioService,
       private readonly userService: UserService,
    ) {}

    async createComment(scenarioID: number, dto: CreateLaunchResultCommentDto) {
        try {
            const comment = this.scenarioCommentRepository.create(dto);
            comment.scenario = await this.scenarioService.getScenario(scenarioID);
            comment.user = await this.userService.getUser(dto.user_id);

            return await this.scenarioCommentRepository.save(comment);
        } catch (error) {
            throw new HttpException(
                error.message,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getComments(scenarioID: number) {
        return await this.scenarioCommentRepository
            .createQueryBuilder('comment')
            .leftJoinAndSelect('comment.scenario', 'scenario')
            .leftJoin('comment.user', 'user')
            .addSelect(['user.email', 'user.id'])
            .where('scenario.id = :id', { id: scenarioID })
            .getMany();
    }

    async getComment(id: number) {
        const comment = await this.scenarioCommentRepository
            .createQueryBuilder('comment')
            .leftJoinAndSelect('comment.scenario', 'scenario')
            .leftJoin('comment.user', 'user')
            .addSelect(['user.email'])
            .where('comment.id = :id', { id })
            .getOne();

        if (!comment) {
            throw new HttpException(
                `Comment with id ${id} not found`,
                HttpStatus.NOT_FOUND,
            );
        }

        return comment;
    }

    async updateComment(id: number, dto: UpdateScenarioCommentDto) {
        try {
            const comment = await this.getComment(id);

            if (dto.body !== undefined) {
                comment.body = dto.body;
                comment.updatedAt = new Date();
            }

            return await this.scenarioCommentRepository.save(comment);
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

            return await this.scenarioCommentRepository.remove(comment);
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