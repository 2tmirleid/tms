import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import * as process from "node:process";
import {UserModule} from "../user/user.module";
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "./jwt.strategy";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        PassportModule,
        JwtModule.register({
            secret: process.env.PRIVATE_KEY,
            signOptions: {
                expiresIn: '24h',
            }
        }),
        UserModule
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {}