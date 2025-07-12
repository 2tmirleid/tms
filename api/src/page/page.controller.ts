import {Controller, Get} from "@nestjs/common";
import {PageService} from "./page.service";
import {ApiOperation} from "@nestjs/swagger";

@Controller('/page')
export class PageController {
    constructor(readonly pageService: PageService) {}

    @Get()
    @ApiOperation({ summary: 'Getting all pages' })
    async getPages() {
        return await this.pageService.getPages();
    }
}