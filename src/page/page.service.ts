import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {PageEntity} from "../entity/page.entity";
import {Repository} from "typeorm";

@Injectable()
export class PageService {
    constructor(@InjectRepository(PageEntity) private pageRepository: Repository<PageEntity>) {}

    async getPages() {
        try {
            return await this.pageRepository.find();
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}