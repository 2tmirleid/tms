import {Body, Controller, Delete, Param, Post, UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../../auth/jwt-auth.guard";
import {ScenarioRelatedTicketService} from "./scenario.related.ticket.service";
import {ApiBody, ApiOperation, ApiParam} from "@nestjs/swagger";
import {CreateScenarioRelatedTicketDto} from "../../dto/relatedTicket/create.scenario.related.ticket.dto";

@Controller('/scenario/related_ticket')
@UseGuards(JwtAuthGuard)
export class ScenarioRelatedTicketController {
    constructor(private readonly scenarioRelatedTicketService: ScenarioRelatedTicketService) {}

    @Post(':id')
    @ApiOperation({ summary: 'Creating related ticket' })
    @ApiParam({
        name: 'id',
        required: true,
        type: Number,
        description: 'Scenario id'
    })
    @ApiBody({ type: CreateScenarioRelatedTicketDto })
    async createRelatedTicket(
        @Param('id') id: number,
        @Body() dto: CreateScenarioRelatedTicketDto
    ) {
        return await this.scenarioRelatedTicketService.createRelatedTicket(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Deleting related ticket' })
    @ApiParam({
        name: 'id',
        required: true,
        type: Number,
        description: 'Related ticket id'
    })
    async deleteRelatedTicket(@Param('id') id: number) {
        return await this.scenarioRelatedTicketService.deleteRelatedTicket(id);
    }
}