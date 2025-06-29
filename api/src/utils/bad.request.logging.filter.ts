import {ArgumentsHost, BadRequestException, Catch, ExceptionFilter} from '@nestjs/common';
import {Request, Response} from 'express';

@Catch(BadRequestException)
export class BadRequestLoggingFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const req = ctx.getRequest<Request>();
        const res = ctx.getResponse<Response>();

        console.warn(`BadRequest on ${req.method} ${req.url}:`, exception.message);

        res.status(400).json({
            statusCode: 400,
            message: exception.message,
            error: 'Bad Request',
        });
    }
}
