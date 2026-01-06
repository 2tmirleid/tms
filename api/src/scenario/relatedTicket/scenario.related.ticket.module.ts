import {forwardRef, Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ScenarioRelatedTicketEntity} from "../../entity/scenario/scenario.related.ticket.entity";
import {ScenarioRelatedTicketService} from "./scenario.related.ticket.service";
import {ScenarioRelatedTicketController} from "./scenario.related.ticket.controller";
import {ScenarioModule} from "../scenario.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ScenarioRelatedTicketEntity
        ]),
        forwardRef(() => ScenarioModule),
    ],
    controllers: [ScenarioRelatedTicketController],
    providers: [ScenarioRelatedTicketService],
    exports: [ScenarioRelatedTicketService]
})
export class ScenarioRelatedTicketModule {}