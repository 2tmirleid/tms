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
import {TestPlanContextOptionEntity} from "./entity/testPlan/test.plan.context.option.entity";
import {TestPlanContextOptionModule} from "./testPlan/contextOption/test.plan.context.option.module";
import {
    Createandseedtestplancontextoptiontable1755021446541
} from "./migration/1755021446541-createandseedtestplancontextoptiontable";
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
import {TestPlanSortEntity} from "./entity/testPlan/test.plan.sort.entity";
import {TestPlanSortModule} from "./testPlan/sort/test.plan.sort.module";
import {Createandseedtestplansorttable1755949229323} from "./migration/1755949229323-createandseedtestplansorttable";
import {Createandseedlaunchsorttable1755950273207} from "./migration/1755950273207-createandseedlaunchsorttable";
import {LaunchSortModule} from "./launch/sort/launch.sort.module";
import {LaunchSortEntity} from "./entity/launch/launch.sort.entity";
import {
    Createprojecttable1000000000000,
} from "./migration/1000000000000-createprojecttable";
import {ProjectModule} from "./project/project.module";
import {ProjectEntity} from "./entity/project/project.entity";
import {UserEntity} from "./entity/user/user.entity";
import {UserModule} from "./user/user.module";
import {AuthModule} from "./auth/auth.module";
import {LaunchResultCommentEntity} from "./entity/launch/result/launch.result.comment.entity";
import {LaunchResultCommentModule} from "./launch/result/comment/launch.result.comment.module";
import {Createuserstable1758464212342} from "./migration/1758464212342-createuserstable";
import {ScenarioCommentEntity} from "./entity/scenario/scenario.comment.entity";
import {ScenarioCommentModule} from "./scenario/comment/scenario.comment.module";
import {ScenarioRelatedTicketEntity} from "./entity/scenario/scenario.related.ticket.entity";
import {Createscenariotable1767649949671} from "./migration/1767649949671-createscenariotable";
import {Createscenariosteptable1767650011010} from "./migration/1767650011010-createscenariosteptable";
import {Createscenariotagtable1767650059319} from "./migration/1767650059319-createscenariotagtable";
import {Createscenarioattachmenttable1767650107985} from "./migration/1767650107985-createscenarioattachmenttable";
import {Createtestplanscenariostable1767650184576} from "./migration/1767650184576-createtestplanscenariostable";
import {Createlaunchresulttable1767650251214} from "./migration/1767650251214-createlaunchresulttable";
import {Createlaunchstepresulttable1767650309907} from "./migration/1767650309907-createlaunchstepresulttable";
import {Createlaunchresultcommenttable1767650363657} from "./migration/1767650363657-createlaunchresultcommenttable";
import {Createscenariocommenttable1767650412602} from "./migration/1767650412602-createscenariocommenttable";
import {ScenarioRelatedTicketModule} from "./scenario/relatedTicket/scenario.related.ticket.module";
import {
    Createscenariorelatedticketstable1767694629844
} from "./migration/1767694629844-createscenariorelatedticketstable";


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
                LaunchStepResultStatusEntity,
                TestPlanSortEntity,
                LaunchSortEntity,
                ProjectEntity,
                UserEntity,
                LaunchResultCommentEntity,
                ScenarioCommentEntity,
                ScenarioRelatedTicketEntity
            ],
            migrations: [
                Createfoldertable1754147102806,
                Createandseedscenariostatustable1751356880625,
                Createandseedscenariocontextoptiontable1751357117721,
                Createandseedscenariostepcontextoptiontable1751357144752,
                Createandseedpagetable1751357192213,
                Createandseedscenariosorttable1751542148667,
                Createandseedfoldercontextoptiontable1754055334376,
                Createscenariotable1767649949671,
                Createscenariosteptable1767650011010,
                Createscenariotagtable1767650059319,
                Createscenarioattachmenttable1767650107985,
                Createtestplantable1754826513754,
                Createandseedtestplancontextoptiontable1755021446541,
                Createtestplanscenariostable1767650184576,
                Createlaunchtable1755352949379,
                Createandseedlaunchstatustable1755195751060,
                Createlaunchresulttable1767650251214,
                Createlaunchstepresulttable1767650309907,
                Createandseedlaunchresultstatustable1755359080451,
                Createandseedlaunchstepresultstatustable1755359226260,
                Createandseedtestplansorttable1755949229323,
                Createandseedlaunchsorttable1755950273207,
                Createprojecttable1000000000000,
                Createuserstable1758464212342,
                Createlaunchresultcommenttable1767650363657,
                Createscenariocommenttable1767650412602,
                Createscenariorelatedticketstable1767694629844,
            ],
            migrationsRun: process.env.IS_PROD === 'true',
            synchronize: process.env.IS_PROD === 'false',
            logging: true
        }),
        ScenarioContextOptionModule,
        ScenarioStatusModule,
        ScenarioSortModule,
        ScenarioCommentModule,
        ScenarioRelatedTicketModule,
        ProjectModule,
        TestPlanSortModule,
        TestPlanContextOptionModule,
        LaunchResultStatusModule,
        LaunchResultCommentModule,
        AuthModule,
        UserModule,
        LaunchSortModule,
        LaunchStepResultStatusModule,
        LaunchResultModule,
        LaunchStepResultModule,
        LaunchStatusModule,
        LaunchModule,
        TestPlanModule,
        FolderModule,
        ScenarioAttachmentModule,
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