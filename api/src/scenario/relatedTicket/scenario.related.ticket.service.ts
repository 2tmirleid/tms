import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ScenarioRelatedTicketEntity} from "../../entity/scenario/scenario.related.ticket.entity";
import {Repository} from "typeorm";
import {CreateScenarioRelatedTicketDto} from "../../dto/relatedTicket/create.scenario.related.ticket.dto";
import {ScenarioService} from "../scenario.service";

@Injectable()
export class ScenarioRelatedTicketService {
    constructor(
        @InjectRepository(ScenarioRelatedTicketEntity)
        private readonly scenarioRelatedTicketRepository: Repository<ScenarioRelatedTicketEntity>,
        private scenarioService: ScenarioService,
    ) {
    }

    async createRelatedTicket(scenarioID: number, dto: CreateScenarioRelatedTicketDto) {
        try {
            const scenario = await this.scenarioService.getScenario(scenarioID);

            if (!scenario) {
                throw new HttpException(
                    `Scenario with id ${scenarioID} not found`,
                    HttpStatus.NOT_FOUND
                );
            }

            const relatedTicket = this.scenarioRelatedTicketRepository.create(dto);
            relatedTicket.scenario = await this.scenarioService.getScenario(scenarioID);

            const url = new URL(dto.link);
            relatedTicket.target = url.hostname.split('.')[0];

            return await this.scenarioRelatedTicketRepository.save(relatedTicket);
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteRelatedTicket(id: number) {
        try {
            const relatedTicket = await this.scenarioRelatedTicketRepository.findOneBy({id});

            if (!relatedTicket) {
                throw new HttpException(
                    `Related ticket with id ${id} not found`,
                    HttpStatus.NOT_FOUND
                );
            }

            return await this.scenarioRelatedTicketRepository.remove(relatedTicket);
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}