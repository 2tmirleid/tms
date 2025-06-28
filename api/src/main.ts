import {NestFactory} from "@nestjs/core";
import * as date from "./utils/date";
import {AppModule} from "./app.module";
import {ValidationPipe} from '@nestjs/common';
import {BadRequestLoggingFilter} from "./utils/bad.request.logging.filter";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as process from "node:process";


async function start() {
    const PORT = process.env.PORT || 8080;
    const HOST = process.env.HOST || 'localhost';

    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: ['http://localhost:5173'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type, Accept, Authorization',
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: 204,
    });

    app.setGlobalPrefix('api/v2');

    if (process.env.IS_PROD === 'false') {
        app.useGlobalFilters(new BadRequestLoggingFilter());
    }

    const config = new DocumentBuilder()
        .setTitle('TMS API v2')
        .setDescription('TMS REST API docs.')
        .setVersion('2.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );

    await app.listen(PORT, () => {
        console.log(`[${date.DateNow.dateNow}] :: [Application has been started]`);
    });
}

start();