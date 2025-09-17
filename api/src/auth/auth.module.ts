import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import * as process from "node:process";
import {UserModule} from "../user/user.module";
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        JwtModule.register({
            secret: process.env.PRIVATE_KEY,
            signOptions: {
                expiresIn: '24h',
            }
        }),
        UserModule
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {}