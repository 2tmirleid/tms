import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {TestPlanSortEntity} from "../../entity/testPlan/test.plan.sort.entity";
import {Repository} from "typeorm";

@Injectable()
export class TestPlanSortService {
    constructor(
        @InjectRepository(TestPlanSortEntity)
        private readonly testPlanRepository: Repository<TestPlanSortEntity>
    ) {}

    async getSortOptions() {
        try {
            return await this.testPlanRepository.find();
        } catch (error) {
            throw new HttpException(
                error,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}