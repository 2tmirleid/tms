import {Body, Controller, Post} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../dto/user/create.user.dto";
import {ApiBody, ApiOperation} from "@nestjs/swagger";

@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/login')
    @ApiOperation({ summary: 'Logging in' })
    @ApiBody({ type: CreateUserDto })
    async login(@Body() dto: CreateUserDto) {
        return this.authService.login(dto);
    }

    @Post('/register')
    @ApiOperation({ summary: 'Register' })
    @ApiBody({ type: CreateUserDto })
    async registration(@Body() dto: CreateUserDto) {
        return this.authService.register(dto);
    }
}