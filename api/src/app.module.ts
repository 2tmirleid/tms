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
import {
    Createandseedscenariocontextoptiontable1751357117721
} from "./migration/1751357117721-createandseedscenariocontextoptiontable";
import {
    Createandseedscenariostepcontextoptiontable1751357144752
} from "./migration/1751357144752-createandseedscenariostepcontextoptiontable";
import {Createandseedpagetable1751357192213} from "./migration/1751357192213-createandseedpagetable";
import {ScenarioSortEntity} from "./entity/scenario.sort.entity";
import {Createandseedscenariosorttable1751542148667} from "./migration/1751542148667-createandseedscenariosorttable";
import {ScenarioSortModule} from "./scenario/sort/scenario.sort.module";
import {ScenarioAttachmentModule} from "./scenario/attachment/scenario.attachment.module";
import {ScenarioAttachmentEntity} from "./entity/scenario.attachment.entity";
import {FolderEntity} from "./entity/folder.entity";
import {FolderModule} from "./folder/folder.module";
import {Createfoldertable1754147102806} from "./migration/1754147102806-createfoldertable";
import {Createscenariotable1754147261578} from "./migration/1754147261578-createscenariotable";
import {Createscenariosteptable1754147353040} from "./migration/1754147353040-createscenariosteptable";
import {Createscenariotagtable1754147413377} from "./migration/1754147413377-createscenariotagtable";
import {Createscenarioattachmenttable1754148616132} from "./migration/1754148616132-createscenarioattachmenttable";
import {FolderContextOptionEntity} from "./entity/folder.context.option.entity";
import {FolderContextOptionModule} from "./folder/contextOption/folder.context.option.module";
import {
    Createandseedfoldercontextoptiontable1754055334376
} from "./migration/1754055334376-createandseedfoldercontextoptiontable";



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
                ScenarioStatusEntity,
                ScenarioSortEntity,
                ScenarioAttachmentEntity,
                FolderEntity,
                FolderContextOptionEntity
            ],
            migrations: [
                Createfoldertable1754147102806,
                Createandseedscenariostatustable1751356880625,
                Createandseedscenariocontextoptiontable1751357117721,
                Createandseedscenariostepcontextoptiontable1751357144752,
                Createandseedpagetable1751357192213,
                Createandseedscenariosorttable1751542148667,
                Createandseedfoldercontextoptiontable1754055334376,
                Createscenariotable1754147261578,
                Createscenariosteptable1754147353040,
                Createscenariotagtable1754147413377,
                Createscenarioattachmenttable1754148616132,
            ],
            migrationsRun: process.env.IS_PROD === 'true',
            synchronize: process.env.IS_PROD === 'false',
            logging: true
        }),
        FolderModule,
        ScenarioAttachmentModule,
        ScenarioSortModule,
        ScenarioStatusModule,
        ScenarioContextOptionModule,
        StepContextOptionModule,
        ScenarioModule,
        PageModule,
        FolderContextOptionModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {
}