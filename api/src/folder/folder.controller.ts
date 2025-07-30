import {Body, Controller, Get, Param, Post, Query} from "@nestjs/common";
import {FolderService} from "./folder.service";
import {CreateFolderDto} from "../dto/create.folder.dto";
import {ApiBody, ApiOperation, ApiParam, ApiQuery} from "@nestjs/swagger";

@Controller('/folder')
export class FolderController {
    constructor(private readonly folderService: FolderService) {}

    @Post()
    @ApiOperation({ summary: 'Creating folder' })
    @ApiBody({ type: CreateFolderDto })
    async createFolder(@Body() dto: CreateFolderDto) {
        return await this.folderService.createFolder(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Getting all folders' })
    async getFolders() {
        return await this.folderService.getFolders();
    }

    @Post('/put/scenario')
    @ApiOperation({ summary: 'Putting scenario to folder' })
    @ApiQuery({
        name: 'scenarioID',
        required: true,
        type: Number,
        description: 'Scenario id'
    })
    @ApiQuery({
        name: 'folderID',
        required: true,
        type: Number,
        description: 'Folder id'
    })
    async putScenario(
        @Query('scenarioID') scenarioID: number,
        @Query('folderID') folderID: number
    ) {
        return await this.folderService.putScenario(scenarioID, folderID);
    }

    @Post('/put/folder')
    @ApiOperation({ summary: 'Putting folder to folder' })
    @ApiQuery({
        name: 'childID',
        required: true,
        type: Number,
        description: 'Child folder id'
    })
    @ApiQuery({
        name: 'parentID',
        required: true,
        type: Number,
        description: 'Parent folder id'
    })
    async putFolder(
        @Query('childID') childID: number,
        @Query('parentID') parentID: number
    ) {
        return await this.folderService.putFolder(childID, parentID);
    }

    @Post('/pullout/scenario')
    @ApiOperation({ summary: 'Pulling out scenario out of any folder and moving it in root' })
    @ApiQuery({
        name: 'scenarioID',
        required: true,
        type: Number,
        description: 'Scenario id'
    })
    async pullOutScenario(@Query('scenarioID') scenarioID: number) {
        return await this.folderService.pullOutScenario(scenarioID);
    }

    @Post('/pullout/folder')
    @ApiOperation({ summary: 'Pulling out folder out of any folder and moving it in root' })
    @ApiQuery({
        name: 'folderID',
        required: true,
        type: Number,
        description: 'Folder id'
    })
    async pullOutFolder(@Query('folderID') folderID: number) {
        return await this.folderService.pullOutFolder(folderID);
    }
}