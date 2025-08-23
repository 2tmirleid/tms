import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {TestPlanContextOptionEntity} from "../../entity/testPlan/test.plan.context.option.entity";
import {Repository} from "typeorm";

@Injectable()
export class TestPlanContextOptionService {
    constructor(@InjectRepository(TestPlanContextOptionEntity) private readonly testPlanContextOptionRepository: Repository<TestPlanContextOptionEntity>) {}

    async getOptions() {
        try {
            return await this.testPlanContextOptionRepository.find();
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}