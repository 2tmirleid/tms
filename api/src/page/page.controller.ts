import {Controller, Get, UseGuards} from "@nestjs/common";
import {PageService} from "./page.service";
import {ApiOperation} from "@nestjs/swagger";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('/page')
@UseGuards(JwtAuthGuard)
export class PageController {
    constructor(readonly pageService: PageService) {}

    @Get()
    @ApiOperation({ summary: 'Getting all pages' })
    async getPages() {
        return await this.pageService.getPages();
    }
}