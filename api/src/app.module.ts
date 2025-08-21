import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import {ScenarioEntity} from "./entity/scenario/scenario.entity";
import {ScenarioStepEntity} from "./entity/scenarioStep/scenario.step.entity";
import {ScenarioModule} from "./scenario/scenario.module";
import {PageModule} from "./page/page.module";
import {PageEntity} from "./entity/page.entity";
import {ScenarioContextOptionEntity} from "./entity/scenario/scenario.context.option.entity";
import {ScenarioContextOptionModule} from "./scenario/contextOption/scenario.context.option.module";
import {StepContextOptionEntity} from "./entity/scenarioStep/step.context.option.entity";
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
import {ScenarioSortEntity} from "./entity/scenario/scenario.sort.entity";
import {Createandseedscenariosorttable1751542148667} from "./migration/1751542148667-createandseedscenariosorttable";
import {ScenarioSortModule} from "./scenario/sort/scenario.sort.module";
import {ScenarioAttachmentModule} from "./scenario/attachment/scenario.attachment.module";
import {ScenarioAttachmentEntity} from "./entity/scenario.attachment.entity";
import {FolderEntity} from "./entity/folder/folder.entity";
import {FolderModule} from "./folder/folder.module";
import {Createfoldertable1754147102806} from "./migration/1754147102806-createfoldertable";
import {FolderContextOptionEntity} from "./entity/folder/folder.context.option.entity";
import {FolderContextOptionModule} from "./folder/contextOption/folder.context.option.module";
import {
    Createandseedfoldercontextoptiontable1754055334376
} from "./migration/1754055334376-createandseedfoldercontextoptiontable";
import {TestPlanModule} from "./testPlan/test.plan.module";
import {TestPlanEntity} from "./entity/testPlan/test.plan.entity";
import {Createtestplantable1754826513754} from "./migration/1754826513754-createtestplantable";
import {Createscenariotable1754851055896} from "./migration/1754851055896-createscenariotable";
import {Createscenariosteptable1754851125783} from "./migration/1754851125783-createscenariosteptable";
import {Createscenariotagtable1754851186070} from "./migration/1754851186070-createscenariotagtable";
import {Createscenarioattachmenttable1754851244187} from "./migration/1754851244187-createscenarioattachmenttable";
import {TestPlanContextOptionEntity} from "./entity/testPlan/test.plan.context.option.entity";
import {TestPlanContextOptionModule} from "./testPlan/contextOption/test.plan.context.option.module";
import {
    Createandseedtestplancontextoptiontable1755021446541
} from "./migration/1755021446541-createandseedtestplancontextoptiontable";
import {Createtestplanscenariostable1755105236403} from "./migration/1755105236403-createtestplanscenariostable";

import {LaunchModule} from "./launch/launch.module";
import {LaunchEntity} from "./entity/launch/launch.entity";
import {Createandseedlaunchstatustable1755195751060} from "./migration/1755195751060-createandseedlaunchstatustable";
import {LaunchStatusModule} from "./launch/status/launch.status.module";
import {LaunchStatusEntity} from "./entity/launch/launch.status.entity";
import {Createlaunchtable1755352949379} from "./migration/1755352949379-createlaunchtable";
import {LaunchStepResultEntity} from "./entity/launch/result/step/launch.step.result.entity";
import {LaunchResultEntity} from "./entity/launch/result/launch.result.entity";

import {LaunchStepResultModule} from "./launch/result/step/launch.step.result.module";
import {LaunchResultModule} from "./launch/result/launch.result.module";
import {LaunchResultStatusModule} from "./launch/result/status/launch.result.status.module";
import {LaunchResultStatusEntity} from "./entity/launch/result/launch.result.status.entity";
import {LaunchStepResultStatusModule} from "./launch/result/step/status/launch.step.result.status.module";
import {LaunchStepResultStatusEntity} from "./entity/launch/result/step/launch.step.result.status.entity";
import {
    Createandseedlaunchresultstatustable1755359080451
} from "./migration/1755359080451-createandseedlaunchresultstatustable";
import {
    Createandseedlaunchstepresultstatustable1755359226260
} from "./migration/1755359226260-createandseedlaunchstepresultstatustable";
import {Createlaunchresulttable1755359311310} from "./migration/1755359311310-createlaunchresulttable";
import {Createlaunchstepresulttable1755359434140} from "./migration/1755359434140-createlaunchstepresulttable";


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
                FolderContextOptionEntity,
                TestPlanEntity,
                TestPlanContextOptionEntity,
                LaunchEntity,
                LaunchStatusEntity,
                LaunchStepResultEntity,
                LaunchResultEntity,
                LaunchResultStatusEntity,
                LaunchStepResultStatusEntity
            ],
            migrations: [
                Createfoldertable1754147102806,
                Createandseedscenariostatustable1751356880625,
                Createandseedscenariocontextoptiontable1751357117721,
                Createandseedscenariostepcontextoptiontable1751357144752,
                Createandseedpagetable1751357192213,
                Createandseedscenariosorttable1751542148667,
                Createandseedfoldercontextoptiontable1754055334376,
                Createscenariotable1754851055896,
                Createscenariosteptable1754851125783,
                Createscenariotagtable1754851186070,
                Createscenarioattachmenttable1754851244187,
                Createtestplantable1754826513754,
                Createandseedtestplancontextoptiontable1755021446541,
                Createtestplanscenariostable1755105236403,
                Createlaunchtable1755352949379,
                Createandseedlaunchstatustable1755195751060,
                Createlaunchresulttable1755359311310,
                Createlaunchstepresulttable1755359434140,
                Createandseedlaunchresultstatustable1755359080451,
                Createandseedlaunchstepresultstatustable1755359226260
            ],
            migrationsRun: process.env.IS_PROD === 'true',
            synchronize: process.env.IS_PROD === 'false',
            logging: true
        }),
        TestPlanContextOptionModule,
        LaunchStepResultStatusModule,
        LaunchResultStatusModule,
        LaunchResultModule,
        LaunchStepResultModule,
        LaunchStatusModule,
        LaunchModule,
        TestPlanModule,
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