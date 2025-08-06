import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FolderContextOptionEntity} from "../../entity/folder.context.option.entity";
import {Repository} from "typeorm";

@Injectable()
export class FolderContextOptionService {
    constructor(@InjectRepository(FolderContextOptionEntity) private readonly folderContextOptionRepository: Repository<FolderContextOptionEntity>) {}

    async getOptions() {
        return await this.folderContextOptionRepository.find();
    }
}