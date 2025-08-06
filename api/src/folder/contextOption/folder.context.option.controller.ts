import {Controller, Get} from "@nestjs/common";
import {FolderContextOptionService} from "./folder.context.option.service";
import {ApiOperation} from "@nestjs/swagger";

@Controller('/folder/option')
export class FolderContextOptionController {
    constructor(private readonly folderContextOptionService: FolderContextOptionService) {}

    @Get()
    @ApiOperation({ summary: 'Getting all folder\'s context options' })
    async getOptions() {
        return await this.folderContextOptionService.getOptions();
    }
}