import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {ProjectService} from "./project.service";
import {ApiBody, ApiOperation, ApiParam} from "@nestjs/swagger";
import {CreateProjectDto} from "../dto/project/create.project.dto";
import {UpdateProjectDto} from "../dto/project/update.project.dto";

@Controller('/project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {
    }

    @Post()
    @ApiOperation({summary: 'Creating project'})
    @ApiBody({type: CreateProjectDto})
    async createProject(@Body() dto: CreateProjectDto) {
        return await this.projectService.createProject(dto);
    }

    @Get()
    @ApiOperation({summary: 'Getting all projects'})
    async getProjects() {
        return await this.projectService.getProjects();
    }

    @Get(':id')
    @ApiOperation({summary: 'Getting project by it\'s id'})
    @ApiParam({
        name: 'id',
        required: true,
        type: Number,
        description: 'Project id'
    })
    async getProject(@Param('id') id: number) {
        return await this.projectService.getProject(id);
    }

    @Patch(':id')
    @ApiOperation({summary: 'Editing project by it\'s id'})
    @ApiParam({
        name: 'id',
        required: true,
        type: Number,
        description: 'Project id'
    })
    @ApiBody({type: UpdateProjectDto})
    async updateProject(
        @Param('id') id: number,
        @Body() dto: UpdateProjectDto
    ) {
        return await this.projectService.updateProject(id, dto);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Deleting project by it\'s id'})
    @ApiParam({
        name: 'id',
        required: true,
        type: Number,
        description: 'Project id'
    })
    async deleteProject(@Param('id') id: number) {
        return await this.projectService.deleteProject(id);
    }
}