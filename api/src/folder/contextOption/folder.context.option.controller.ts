import {Controller, Get, UseGuards} from "@nestjs/common";
import {FolderContextOptionService} from "./folder.context.option.service";
import {ApiOperation} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../auth/jwt-auth.guard";

@Controller('/folder/option')
@UseGuards(JwtAuthGuard)
export class FolderContextOptionController {
    constructor(private readonly folderContextOptionService: FolderContextOptionService) {}

    @Get()
    @ApiOperation({ summary: 'Getting all folder\'s context options' })
    async getOptions() {
        return await this.folderContextOptionService.getOptions();
    }
}