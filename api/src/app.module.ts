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
import {Createandseedpagetable1750936677511} from "./migration/1750936677511-createandseedpagetable";
import {
    Createandseedscenariocontextoptiontable1750937700921
} from "./migration/1750937700921-createandseedscenariocontextoptiontable";
import {
    Createandseedstepcontextoptiontable1750937820203
} from "./migration/1750937820203-createandseedstepcontextoptiontable";
import {Createscenariotable1750938191907} from "./migration/1750938191907-createscenariotable";
import {Createscenariosteptable1750938254814} from "./migration/1750938254814-createscenariosteptable";


@Module({
    imports: [
        ConfigModule.forRoot({
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
                StepContextOptionEntity
            ],
            migrations: [
                Createandseedpagetable1750936677511,
                Createandseedscenariocontextoptiontable1750937700921,
                Createandseedstepcontextoptiontable1750937820203,
                Createscenariotable1750938191907,
                Createscenariosteptable1750938254814
            ],
            migrationsRun: false,
            synchronize: true,
            logging: true
        }),
        ScenarioContextOptionModule,
        StepContextOptionModule,
        ScenarioModule,
        PageModule,
    ],
    controllers: [],
    providers: []
})
export class AppModule {
}