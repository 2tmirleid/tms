import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import {CreateUserDto} from "../dto/user/create.user.dto";
import {HttpException, HttpStatus, Injectable, UnauthorizedException} from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import {UserEntity} from "../entity/user/user.entity";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async login(dto: CreateUserDto) {
        const user = await this.validateUser(dto);
        return this.generateToken(user);
    }

    async register(dto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(dto.email);

        if (candidate) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        const hashPass = await bcrypt.hash(dto.password, 5);
        const user = await this.userService.createUser({...dto, password: hashPass});

        return this.generateToken(user);
    }

    private async generateToken(user: UserEntity) {
        const payload = {
            email: user.email,
        }

        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(dto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(dto.email);

        if (!user) {
            throw new UnauthorizedException({message: 'Uncorrected email or password'})
        }

        // @ts-ignore
        const passEquals = await bcrypt.compare(dto.password, user.password);

        if (user && passEquals) {
            return user;
        }

        throw new UnauthorizedException({message: 'Uncorrected email or password'})
    }
}