import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../entity/user/user.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "../dto/user/create.user.dto";
import {UpdateUserDto} from "../dto/user/update.user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async createUser(dto: CreateUserDto) {
        try {
            const user = this.userRepository.create(dto);

            return await this.userRepository.save(user);
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getUsers() {
        try {
            return await this.userRepository.find();
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getUser(id: number) {
        try {
            const user  = await this.userRepository.findOneBy({id});

            if (!user) {
                throw new HttpException(
                    `User with id ${id} not found`,
                    HttpStatus.NOT_FOUND
                );
            }

            return user;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }

            throw new HttpException(
                error,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getUserByEmail(email: string) {
        try {
            return await this.userRepository.findOne({
                where: {email: email}
            });
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }

            throw new HttpException(
                error,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async updateUser(id: number, dto: UpdateUserDto) {
        try {
            const user  = await this.userRepository.findOneBy({id});

            if (!user) {
                throw new HttpException(
                    `User with id ${id} not found`,
                    HttpStatus.NOT_FOUND
                );
            }

            if (dto.email !== undefined) {
                user.email = dto.email;
            }

            if (dto.username !== undefined) {
                user.username = dto.username;
            }

            return await this.userRepository.save(user);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }

            throw new HttpException(
                error,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}