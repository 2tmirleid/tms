import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import {ScenarioEntity} from "./entity/scenario.entity";
import {ScenarioStepEntity} from "./entity/scenario.step.entity";
import {ScenarioModule} from "./scenario/scenario.module";
import {PageModule} from "./page/page.module";
import {PageEntity} from "./entity/page.entity";
import {ScenarioContextOptionEntity} from "./entity/scenario.context.option.entity";
import {ScenarioContextOptionModule} from "./scenario/contextOption/scenario.context.option.module";
import {StepContextOptionEntity} from "./entity/step.context.option.entity";
import {StepContextOptionModule} from "./scenario/step/contextOption/step.context.option.module";
import * as process from "node:process";
import {ScenarioTagEntity} from "./entity/scenario.tag.entity";
import { ScenarioStatusEntity } from "./entity/scenario.status.entity";
import {ScenarioStatusModule} from "./scenario/status/scenario.status.module";
import {
    Createandseedscenariostatustable1751356880625
} from "./migration/1751356880625-createandseedscenariostatustable";
import {Createscenariotable1751356924323} from "./migration/1751356924323-createscenariotable";
import {Createscenariosteptable1751357020661} from "./migration/1751357020661-createscenariosteptable";
import {Createscenariotagtable1751357067393} from "./migration/1751357067393-createscenariotagtable";
import {
    Createandseedscenariocontextoptiontable1751357117721
} from "./migration/1751357117721-createandseedscenariocontextoptiontable";
import {
    Createandseedscenariostepcontextoptiontable1751357144752
} from "./migration/1751357144752-createandseedscenariostepcontextoptiontable";
import {Createandseedpagetable1751357192213} from "./migration/1751357192213-createandseedpagetable";



@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            database: process.env.POSTGRES_DB,
            password: process.env.POSTGRES_PASSWORD,
            username: process.env.POSTGRES_USER,
            entities: [
                ScenarioEntity,
                ScenarioStepEntity,
                PageEntity,
                ScenarioContextOptionEntity,
                StepContextOptionEntity,
                ScenarioTagEntity,
                ScenarioStatusEntity
            ],
            migrations: [
                Createandseedscenariostatustable1751356880625,
                Createscenariotable1751356924323,
                Createscenariosteptable1751357020661,
                Createscenariotagtable1751357067393,
                Createandseedscenariocontextoptiontable1751357117721,
                Createandseedscenariostepcontextoptiontable1751357144752,
                Createandseedpagetable1751357192213
            ],
            migrationsRun: process.env.IS_PROD === 'true',
            synchronize: process.env.IS_PROD === 'false',
            logging: true
        }),
        ScenarioStatusModule,
        ScenarioContextOptionModule,
        StepContextOptionModule,
        ScenarioModule,
        PageModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {
}